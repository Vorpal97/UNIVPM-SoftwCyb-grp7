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

const promisify = (inner) =>
    new Promise((resolve, reject) =>
         inner((err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        })
    );


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

  app.get('/modificaeventi', (req, res) => {
    res.sendFile(path.resolve('../Client/event_manager/ModificaEventi.html'));
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

    // console.log ("Nuovo evento creato: \n" +
    //               "nome: " + nome + "\n" +
    //               "data: " + data + "\n" +
    //               "numPosti: " + numPosti + "\n" +
    //               "prezzoBiglietto:" + prezzoBiglietto + "\n" +
    //               "luogo: " + luogo + "\n")

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

      function receipt_handler(receipt){
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

        contract.methods.setup(a, address_list[0], address_list[1], address_list[2]).send({from: a})
        .on('receipt', function(){

          console.log("Address impostati: \n" +
                      " eventManager -> " + a +
                      "\n buyer - > " + address_list[0] +
                      "\n reseller - > " + address_list[1] +
                      "\n validator - > " + address_list[2]);
        });

        contract.methods.creaEvento(nome, data, numPosti, prezzoBiglietto, luogo).send({from: a})
        .on('receipt', function(){
            console.log("New event " + nome + " created");
        });

      }

  res.sendFile(path.resolve('../Client/event_manager/VisualizzaEventi.html'));

  });

  app.get('/ottienieventi', (req, res) => {
    res.sendFile(path.resolve('contracts.json'));
  });

  app.get('/eventi', (req, res) => {

      var address = "0x1932c48b2bF8102Ba33B4A6B545C32236e342f34";

      var Contract = require('web3-eth-contract');
      Contract.setProvider(nodo);
      var contract = new Contract(abi, address);
      tmp = {};
      contract.methods.getNomeEvento().call()
      .then((result1) => {
        contract.methods.getDataEvento().call()
        .then((result2) => {
          contract.methods.getNumPosti().call()
          .then((result3) => {
            contract.methods.getPrezzoBiglietto().call()
            .then((result4) => {
              contract.methods.getLuogo().call()
              .then((result5) => {
                contract.methods.getTicketCounter().call()
                .then((result6) => {
                  tmp.nome = result1;
                  tmp.data = result2;
                  tmp.numPosti = result3;
                  tmp.prezzoBiglietto = result4;
                  tmp.luogo = result5;
                  tmp.ticketCounter = result6;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify(tmp));
                });
              });
            });
          });
        });
      });
  });


  app.listen(8080, function() {
    console.log('Event Manager è accessibile a http://127.0.0.1:8080/');
  });

}
