const Web3 = require("web3");

var express = require('express');
var bodyParser = require('body-parser');
var serveStatic = require('serve-static');
var app     = express();
const path = require('path');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())


let nodo = 'http://localhost:22001';

let web3 = new Web3(nodo);

const Contract_data = require("./contract.js");
const cont = new Contract_data();

var abi = cont.abi;


web3.eth.getAccounts().then((value)=> {
  console.log("Accounts: " + value);
  main(value[0]);
});

function sleep(ms){
  return new Promise(resolve =>setTimeout(resolve, ms));
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
      res.sendFile(path.resolve('../Client/buyer/index.html'));
  });

  app.get('/style', (req, res) => {
      res.sendFile(path.resolve('../Client/css/main.css'));
  });

  app.get('/address', (req, res) => {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ address: a }));
  });

  app.get('/visualizzaeventi', (req, res) => {
    res.sendFile(path.resolve('../Client/buyer/VisualizzaEventi.html'));
  });

  app.get('/visualizzabiglietti', (req, res) => {
    res.sendFile(path.resolve('../Client/buyer/VisualizzaBiglietti.html'));
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

  app.get('/acquistabiglietto', async (req, res) => {

    var address = req.query.address;
    if(address == null)
      res.end("");

    var evento = await getEventData(address);

    evento = JSON.parse(evento);

    fs = require('fs');
    var data = fs.readFileSync('../Client/buyer/compraBiglietto.html', 'utf8');
    data = data.replace("${address}", address);
    data = data.replace("${evento.nome}", evento.nome);
    data = data.replace("${evento.data}", evento.data);
    data = data.replace("${evento.luogo}", evento.luogo);
    data = data.replace("${evento.numPosti}", evento.numPosti);
    data = data.replace("${evento.postiDisponibili}", evento.postiDisponibili);
    data = data.replace("${evento.prezzoBiglietto}", evento.prezzoBiglietto);

   res.setHeader('Content-Type', 'text/html');
   res.end(data);
  });

  app.listen(8080, function() {
    console.log('Il client del Buyer è accessibile a http://127.0.0.1:8080/');
  });

  app.post("/acquista", async(req, res) => {
    address = req.body.address;
    numBiglietti = req.body.numeroBiglietti;
    console.log("address: " + address)
    console.log("numbiglietti: " + numBiglietti)

    var Contract = require('web3-eth-contract');
    Contract.setProvider(nodo);
    var contract = new Contract(abi, address);

    for(var i = 0; i < parseInt(numBiglietti); i++){
      await contract.methods.venditaBiglietto(a).send({from: a})
                  .on('receipt', function(){
                   console.log("venditaBiglietto " + i + " -> OK");
          });
      }

      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({stato:"successo"}));
    });

    app.get('/mytickets', async(req, res) => {
        var Contract = require('web3-eth-contract');
        Contract.setProvider(nodo);
        const fs = require('fs');
        var data = fs.readFileSync('contracts.json', 'utf8');
        address = data.split("\n");
        address.pop()
        var list = [];
        for(var i=0; i < address.length; i++){
          var add = JSON.parse(address[i]).address;
          var contract = new Contract(abi, add);
          var listaBiglietti = [];
          await contract.methods.getBigliettoByAddress().call({from: a})
              .then((result) => {
                listaBiglietti = result.split(";");
                listaBiglietti.pop();
              }).catch(()=>{
                console.log("errore sulla getBigliettoByAddress")
              });

              for(var j = 0; j < listaBiglietti.length; j++){
                var o = {};
                await contract.methods.getBiglietto(j).call()
                  .then((result) => {
                    obj = Object.values(result);
                    o.okOp = obj[0];
                    o.id = obj[1];
                    o.hash = obj[2];
                    o.isValid = obj[3];
                    o.isEndorsed = obj[4];
                    o.owner = obj[5];
                }).catch(()=>{
                  console.log("errore sulla getBiglietto")
                });
                var event_data = await getEventData(add);
                var event_data = JSON.parse(event_data);
                o.nomeEvento = event_data.nome;
                o.data = event_data.data;
                o.prezzoBiglietto = event_data.prezzoBiglietto;
                o.luogo = event_data.luogo;
                o.stato = event_data.stato;
                list.push(o)
              }
        }
        console.log("Ritornata lista di biglietti dell'utente " + a);

        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(list));
    });

  }
