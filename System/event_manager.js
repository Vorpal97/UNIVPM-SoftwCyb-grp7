const Web3 = require("web3");
var fs = require('fs')
var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var https = require('https');
var serveStatic = require('serve-static');
const path = require('path');

var privateKey  = fs.readFileSync('./certs/selfsigned.key', 'utf8');
var certificate = fs.readFileSync('./certs/selfsigned.crt', 'utf8');
var credentials = {key: privateKey, cert: certificate};

var app = express();

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

// httpServer.listen(8080, () => {
//   console.log('Il client del Buyer è accessibile a http://127.0.0.1:8080/');
// });
httpsServer.listen(10000, () => {
  console.log('Il client dell\' Event Manager è accessibile a https://127.0.0.1:10000/');
});


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());



let nodo = 'http://localhost:22000';

let web3 = new Web3(nodo);

const Contract = require("./contract.js");
const cont = new Contract();

var abi = cont.abi;
var bytecode = cont.bytecode;

var listaEventi = [];

var address_list_tmp = [];

fs.readFile('accounts.txt', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  address_list_tmp = data.split("\n");
  address_list_tmp.pop();
});

web3.eth.getAccounts().then((value)=> {
  console.log("Accounts: " + value);
  main(value[0]);
});

function sleep(ms){
  return new Promise(resolve =>setTimeout(resolve, ms));
}

function popList(list, pattern){
  var tmp = [];
  for(i = 0; i < list.length; i++){
    if(list[i] != pattern){
      tmp.push(list[i]);
    }
  }
  return tmp;
}

async function getEventData(address){

  var Contract = require('web3-eth-contract');
  Contract.setProvider(nodo);
  var contract = new Contract(abi, address);
  tmp = {};

  await contract.methods.getLuogo().call()
    .then((result) => {
      tmp.luogo = result;
    })

  await contract.methods.getNomeEvento().call()
  .then((result) => {
    tmp.nome = result;
  });

  await contract.methods.getDataEvento().call()
  .then((result) => {
    tmp.data = result;
  });

  await contract.methods.getNumPosti().call()
  .then((result) => {
    tmp.numPosti = result;
  });

  await contract.methods.getPostiDisponibili().call()
  .then((result) => {
    tmp.postiDisponibili = result;
  });

  await contract.methods.getPrezzoBiglietto().call()
  .then((result) => {
    tmp.prezzoBiglietto = result;
  });

  await contract.methods.getStato().call()
  .then((result) => {
    switch(result){
      case '0':
        tmp.stato = "inVendita";
        break;
      case '1':
        tmp.stato = "inCorso";
        break;
      case '2':
        tmp.stato = "sospeso";
        break;
      case '3':
        tmp.stato = "soldout";
        break;
      case '4':
        tmp.stato = "cancellato";
        break;
      case '5':
        tmp.stato="terminato";
        break;
      default:
      tmp.stato="errore";
        break;
    }
  });

  await contract.methods.getTicketCounter().call()
  .then((result) => {
    tmp.ticketCounter = result;
  });

  return JSON.stringify(tmp);
}

function main(a){
  app.get('/', (req, res) => {
      res.sendFile(path.resolve('../Client/event_manager/index.html'));
  });

  app.get('/style', (req, res) => {
      res.sendFile(path.resolve('../Client/css/main.css'));
  });

  app.get('/address', (req, res) => {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ address: a }));
  });

  app.get('/creaevento', (req, res) => {
    res.sendFile(path.resolve('../Client/event_manager/CreaEvento.html'));
  });

  app.get('/modificaevento', async (req, res) => {

    var address = req.query.address;

    if(address == null)
      res.end("");

    var address = req.query.address;

    var evento = await getEventData(address);

    evento = JSON.parse(evento);

    var data = fs.readFileSync('../Client/event_manager/ModificaEventi.html', 'utf8');
    data = data.replace("${address}", address);
    data = data.replace("${evento.nome}", evento.nome);
    data = data.replace("${evento.data}", evento.data);
    data = data.replace("${evento.luogo}", evento.luogo);
    data = data.replace("${evento.numPosti}", evento.numPosti);
    data = data.replace("${evento.stato}", evento.stato);
    data = data.replace("${evento.ticketCounter}", evento.ticketCounter);


   res.setHeader('Content-Type', 'text/html');
   res.end(data);
  });

  app.post("/aggiornaevento", async(req, res) => {
    var nome = req.body.eventName;
    var data = req.body.eventDate;
    var numPosti = req.body.eventNPosti;
    var luogo = req.body.eventPlace;
    var stato = req.body.eventStatus;
    var address = req.body.address;
    var inserted_date = data.split("-");

    eventdata = await getEventData(address)
    console.log(eventdata)
    var curEvent = JSON.parse(eventdata);

    var curev_data = curEvent.data;
    var tmp = curev_data.split("-");
    curev_data = new Date(tmp[1] + "/" + tmp[2] + "/" + tmp[0])

    var Contract = require('web3-eth-contract');
    Contract.setProvider(nodo);
    var contract = new Contract(abi, address);

    var data = inserted_date[1] + "/" + inserted_date[2] + "/" + inserted_date[0];
    var data = new Date(data);
    var regex = /\d+/;
    var toDay = new Date()
    var dateMin = new Date(toDay.getFullYear(), toDay.getMonth(), toDay.getDate() +7);
    dateMin.setDate(dateMin.getDate());

    if (!regex.test(numPosti) || (data.getTime() != curev_data.getTime() && (data.getTime() < dateMin.getTime())) || parseInt(numPosti) < parseInt(curEvent.ticketCounter)){
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({stato:"errore"}));
    } else {
      data = data.getFullYear() + "-" + (data.getMonth() + 1) + "-" + data.getDate();
      contract.methods.setNomeEvento(nome).send({from: a})
      .on('receipt', function(){
          console.log("Nome evento aggiornato a " + nome);
      });


      contract.methods.setNumPosti(numPosti).send({from: a})
      .on('receipt', function(){
          console.log("Numero posti evento aggiornato a " + numPosti);
      });

      contract.methods.setPostiDisponibili(parseInt(numPosti) - parseInt(curEvent.ticketCounter)).send({from: a})
      .on('receipt', function(){
          console.log("Posti disponibili evento aggiornato a " + (parseInt(numPosti) - parseInt(curEvent.ticketCounter)));
      });

      contract.methods.setData(data).send({from: a})
      .on('receipt', function(){
          console.log("Data evento aggiornato a " + data);
      });

      contract.methods.setLuogo(luogo).send({from: a})
      .on('receipt', function(){
          console.log("Luogo evento aggiornato a " + luogo);
      });

      var statoNum = -1;

      console.log("stato da settare a " + stato)

      switch (stato) {
        case "inVendita":
          contract.methods.setStatoInVendita().send({from: a})
          .on('receipt', function(){
              console.log("Stato evento aggiornato " + nome + " created");
          });
          break;
        case "inCorso":
          contract.methods.setStatoInCorso().send({from: a})
          .on('receipt', function(){
              console.log("Stato evento aggiornato " + nome + " created");
          });
          break;
        case "sospeso":
          contract.methods.setStatoSospeso().send({from: a})
          .on('receipt', function(){
              console.log("Stato evento aggiornato " + nome + " created");
          });
          break;
        case "soldout":
          contract.methods.setStatoSoldout().send({from: a})
          .on('receipt', function(){
              console.log("Stato evento aggiornato " + nome + " created");
          });
          break;
        case "cancellato":
          contract.methods.setStatoCancellato().send({from: a})
          .on('receipt', function(){
              console.log("Stato evento aggiornato " + nome + " created");
          });
          break;
        case "terminato":
          contract.methods.setStatoTerminato().send({from: a})
          .on('receipt', function(){
              console.log("Stato evento aggiornato " + nome + " created");
          });
          break;
        default:
        // Errore
      }
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({stato:"successo"}));
  }

  })

  app.get('/redistribuisci', async(req, res) => {
    var address = req.query.address;

    var Contract = require('web3-eth-contract');
    Contract.setProvider(nodo);
    var contract = new Contract(abi, address);

    var risultato;
    var pagato;
    var terminato;

    await contract.methods.getPagato().call()
      .then((result) => {
        pagato = result;
      })

    await contract.methods.isTerminato().call()
      .then((result) => {
      terminato = result;
    })

    if(!pagato && terminato){
      await contract.methods.redistribuisciIncassi().call({from: a})
      .then((result) => {
        risultato = result;
      })
      await contract.methods.setPagato().send({from: a})
      .on('receipt', function(){
        console.log("setPagato --> OK")
      }).catch(()=>{
        console.log("setPagato --> ERRORE")
      });
      console.log("Redistribuzione incassi --> OK");
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({stato:"successo", incasso:risultato}));
    }else if(terminato && pagato){
      console.log("Redistribuzione incassi --> GIA AVVENUTA");
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({stato:"pagato"}));
    }else{
      console.log("Redistribuzione incassi --> ERRORE");
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({stato:"errore"}));
    }

  });


  app.get('/visualizzaeventi', (req, res) => {
    res.sendFile(path.resolve('../Client/event_manager/VisualizzaEventi.html'));
  });

  app.post('/nuovoevento', (req, res) => {
    var nome = req.body.eventName;
    var data = req.body.eventDate;
    var numPosti = req.body.eventNPosti;
    var prezzoBiglietto = req.body.eventPrice;
    var luogo = req.body.eventPlace;
    var inserted_date = data.split("-");

    var data = inserted_date[1] + "/" + inserted_date[2] + "/" + inserted_date[0];
    var data = new Date(data);

    console.log("Data nel body------->"  + data.getTime());

    var regex = /\d+/;
    var toDay = new Date()
    var dateMin = new Date(toDay.getFullYear(), toDay.getMonth(), toDay.getDate());
    dateMin.setDate(dateMin.getDate() + 7);
    console.log("Data Minima------->"  + dateMin.getTime());

    if((!(regex.test(numPosti) && regex.test(prezzoBiglietto))) || (data.getTime() < dateMin.getTime())){
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({stato:"errore"}));
    } else {
      data = data.getFullYear() + "-" + (data.getMonth() + 1) + "-" + data.getDate() ;

     console.log ("Nuovo evento creato: \n" +
                   "nome: " + nome + "\n" +
                   "data: " + data + "\n" +
                   "numPosti: " + numPosti + "\n" +
                   "prezzoBiglietto:" + prezzoBiglietto + "\n" +
                   "luogo: " + luogo + "\n")

    console.log("used account: " + a);

    address_list = popList(address_list_tmp, a);

    var simpleContract = new web3.eth.Contract(abi, { from: a });
    var simple = simpleContract.deploy({from: a, data:"0x" + bytecode.object}).
                send({ from: a }, deploy_handler).
                on('receipt', receipt_handler);


    var address;


    async function deploy_handler(e, transactionHash){
      console.log("Submitted transaction with hash: ", transactionHash);
      if (e) {
        console.log("err creating contract", e);
      } else {
        let transactionReceipt = null;
        do{
          console.log("wait 1 sec to get transaction recipt ..");
          await sleep(1000);
          transactionReceipt = await web3.eth.getTransactionReceipt(transactionHash);
        } while(! transactionReceipt);
        console.log("Got the transaction receipt: ", transactionReceipt);

      }
    }

      async function receipt_handler(receipt){
        address = receipt.contractAddress
        console.log("contract mined: " + address);
        console.log(receipt);

        const smartContract = {
          address: address
        };

        const smartContractJson = JSON.stringify(smartContract)
        fs.writeFile('./contracts.json', smartContractJson + "\n", { flag: 'a+' }, err => {
          if(err){
            console.log('Errore durante la scrittura del JSON', err)
          } else {
            console.log('JSON scritto con successo')
          }
        });

        //var Contract = new web3.eth.contract.setProvider()
        var Contract = require('web3-eth-contract');

        // set provider for all later instances to use
        Contract.setProvider(nodo);

        var contract = new Contract(abi, address);

        //SCRIVERE

        await contract.methods.setup(a, address_list[0], address_list[1]).send({from: a})
        .on('receipt', function(){

          console.log("Address impostati: \n" +
                      " eventManager -> " + a +
                      "\n buyer - > " + address_list[0] +
                      "\n validator - > " + address_list[1]);
        });

        await contract.methods.creaEvento(nome, data, numPosti, prezzoBiglietto, luogo).send({from: a})
        .on('receipt', function(){
            console.log("New event " + nome + " created");
        });

      }

      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({stato:"successo"}));
    }
  });

  app.get('/ottienieventi', (req, res) => {
    res.sendFile(path.resolve('contracts.json'));
  });

  app.get('/eventi', async(req, res) => {
      var listaEventi = [];
      var data = fs.readFileSync('contracts.json', 'utf8');
      listaEventi = data.split("\n")
      var o = [];
      for(i = 0; i < listaEventi.length - 1; i++){
        var address = JSON.parse(listaEventi[i]).address
        var a = {};
        await getEventData(address).then((result) => {
            a = result;
        })
        a = JSON.parse(a)
        a.address = address;
        o.push(a);
      }
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(o));
  });
}
