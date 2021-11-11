const Web3 = require("web3");

var express = require('express');
var bodyParser = require('body-parser');
var serveStatic = require('serve-static');
var app     = express();
const path = require('path');


app.use(bodyParser.urlencoded({ extended: true }));

let nodo = 'http://localhost:22003';

let web3 = new Web3(nodo);

const Contract = require("./contract.js");
const cont = new Contract();

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

  app.listen(8080, function() {
    console.log('Il client del Ticket Validator è accessibile a http://127.0.0.1:8080/');
  });

  app.get('/', (req, res) => {
      res.sendFile(path.resolve('../Client/ticket_inspector/index.html'));
  });

  app.get('/style', (req, res) => {
      res.sendFile(path.resolve('../Client/css/main.css'));
  });

  app.get('/visualizzaeventi', (req, res) => {
      res.sendFile(path.resolve('../Client/ticket_inspector/VisualizzaEventi.html'));
  });

  app.get('/visualizzabiglietti', (req, res) => {
        var address = req.query.address;
        if(address == null)
          res.end("");

        fs = require('fs');
        var data = fs.readFileSync('../Client/ticket_inspector/VisualizzaBiglietti.html', 'utf8');
        data = data.replace("${address}", address);

       res.setHeader('Content-Type', 'text/html');
       res.end(data);
  });

  app.get('/address', (req, res) => {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ address: a }));
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
        if(a.stato == "inCorso"){
          o.push(a);
        }
      }
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(o));
  });

  app.get('/alltickets', async(req, res) => {
      var Contract = require('web3-eth-contract');
      Contract.setProvider(nodo);
      var address = req.query.address;
      console.log(address)
      var contract = new Contract(abi, address);
      var ticketcounter;
      var list = [];
      await contract.methods.getTicketCounter().call()
            .then((result) => {
              ticketcounter = result;
            }).catch(()=>{
              console.log("errore sulla getTicketCounter")
            });

            for(var j = 0; j < ticketcounter; j++){
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
              list.push(o)
            }
    console.log("Ritornata lista di biglietti dell'evento: " + a);
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(list));
  });

  app.post('/vidimabiglietto', async(req, res) => {
    var address = req.body.address;
    var id = req.body.id;

    console.log("#######---------------" + address + "#######---------------"+ id)


    console.log("used account: " + a);

    //var Contract = new web3.eth.contract.setProvider()
    var Contract = require('web3-eth-contract');

    // set provider for all later instances to use
    Contract.setProvider(nodo);

    var contract = new Contract(abi, address);
    var result = {stato:"errore"}

    await contract.methods.vidimaBiglietto(id).send({from:a})
    .on('receipt', function(){
          result = {stato:"successo"}
          console.log("vidimaBiglietto() ---> OK");

    }).catch(()=>{
      console.log("vidimaBiglietto() errore");
      console.log("vidimaBiglietto() ---> Errore");

      result = {stato:"errore"}

    });

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result));

  });

}
