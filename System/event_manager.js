const Web3 = require("web3");

var express = require('express');
var bodyParser = require('body-parser');
var serveStatic = require('serve-static');
var app     = express();
const path = require('path');


app.use(bodyParser.urlencoded({ extended: true }));



let nodo = 'http://localhost:22000';

let web3 = new Web3(nodo);

const Contract = require("./contract.js");
const cont = new Contract();

var abi = cont.abi;
var bytecode = cont.bytecode;

var listaEventi = [];

var address_list_tmp = [];
fs = require('fs')
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
    if(list[i] != pattern){12
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
      //res.sendFile('../Client/event_manager/index.html', { root: __dirname });
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

    var evento = await getEventData(address);

    evento = JSON.parse(evento);

    var form = `<form action='http://127.0.0.1:8080/nuovoevento' method='post'>  <label for='fname'>Nome dell'evento:</label><br>  <input type='text' id='fname' value=${evento.nome} name='eventName'><br>  <label for='fname'>Data dell'evento:</label><br>  <input type='text' id='fname' value=${evento.data} name='eventDate'><br>  <label for='fname'>Luogo dell'evento:</label><br>  <input type='text' id='fname' value=${evento.luogo} name='eventPlace'><br>  <label for='fname'>Numero posti:</label><br>  <input type='text' id='fname' value=${evento.numPosti} name='eventNPosti'><br>  <label for='fname'>Prezzo del biglietto:</label><br>  <input type='text' id='fname' value=${evento.prezzoBiglietto} name='eventPrice'><br>  <p>Stato:</p>    <input type='radio' id='html' name='stato' value='inVendita'>    <label for='inVendita'>In vendita</label><br>    <input type='radio' id='css' name='stato' value='inCorso'>    <label for='inCorso'>In corso</label><br>    <input type='radio' id='javascript' name='stato' value='sospeso'>    <label for='sospeso'>Sospeso</label><br>    <input type='radio' id='javascript' name='stato' value='soldout'>    <label for='soldout'>Sold out</label><br>    <input type='radio' id='javascript' name='stato' value='cancellato'>    <label for='cancellato'>Cancellato</label><br>    <input type='radio' id='javascript' name='stato' value='terminato'>    <label for='terminato'>Terminato</label><br>    <input type='submit' value='Modifica evento'>    <input type="button" name="cancel" value="Annulla" onClick="window.location.href='http://localhost:8080/visualizzaeventi';" /> </form>`;
    var html = "<html>\n<head>\n<link rel='stylesheet'href='http://localhost:8080/style'>\n</head>\n<body>\n\n<ul>\n  <li><a href='http://localhost:8080/'>Home</a></li>\n  <li><a href='http://localhost:8080/creaevento'>Crea Evento</a></li>\n  <li><a href='http://localhost:8080/visualizzaeventi'>Visualizza Eventi</a></li>\n</ul>\n\n<div style='padding:20px;margin-top:30px;background-color:#1abc9c;height:1500px;'>\n  <h1>Modifica Evento</h1>\n" +
               form +
               "</div>\n\n</body>\n</html>\n"

   res.setHeader('Content-Type', 'text/html');
   res.end(html);
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

        const fs = require('fs');
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

        await contract.methods.setup(a, address_list[0], address_list[1], address_list[2]).send({from: a})
        .on('receipt', function(){

          console.log("Address impostati: \n" +
                      " eventManager -> " + a +
                      "\n buyer - > " + address_list[0] +
                      "\n reseller - > " + address_list[1] +
                      "\n validator - > " + address_list[2]);
        });

        await contract.methods.creaEvento(nome, data, numPosti, prezzoBiglietto, luogo).send({from: a})
        .on('receipt', function(){
            console.log("New event " + nome + " created");
        });

      }
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({status:"success"}));
  });

  app.get('/ottienieventi', (req, res) => {
    res.sendFile(path.resolve('contracts.json'));
  });

  app.get('/eventi', async(req, res) => {
      var listaEventi = [];
      fs = require('fs');
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

  app.listen(8080, function() {
    console.log('Event Manager è accessibile a http://127.0.0.1:8080/');
  });

}
