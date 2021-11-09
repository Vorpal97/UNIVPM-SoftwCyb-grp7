const Web3 = require("web3");

var express = require('express');
var bodyParser = require('body-parser');
var serveStatic = require('serve-static');
var app     = express();
const path = require('path');


app.use(bodyParser.urlencoded({ extended: true }));


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
      //res.sendFile('../Client/event_manager/index.html', { root: __dirname });
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

    // var data = `<h2>Acquista 1 biglietto per quest'evento</h2><br><input type="hidden" value=${address} name="address"> <h4> Nome evento: ${evento.nome} </h4><h4>Data dell'evento: ${evento.data} </h4><h4>Luogo dell'evento: ${evento.luogo} </h4><h4>Numero posti: ${evento.numPosti}</h4><h4> Posti disponibli:${evento.postiDisponibili} </h4><h4>Prezzo: ${evento.prezzoBiglietto} euro</h4><input type='button' value='Conferma' onClick="window.location.href='http://localhost:8080/acquista?address=${address}'"> <input type="button" name="cancel" value="Annulla" onClick="window.location.href='http://localhost:8080/visualizzaeventi';"/>`;
    // var html = "<html>\n<head>\n<link rel='stylesheet'href='http://localhost:8080/style'>\n</head>\n<body>\n\n<ul>\n  <li><a href='http://localhost:8080/'>Home</a></li>\n  <li><a href='http://localhost:8080/visualizzaeventi'>Visualizza eventi disponibili</a></li>\n  <li><a href='http://localhost:8080/visualizzabiglietti'>I miei biglietti</a></li>\n</ul>\n\n<div style='padding:20px;margin-top:30px;background-color:#1abc9c;height:1500px;'>\n " +
    //            data +
    //            "</div>\n\n</body>\n</html>\n"

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

  app.get("/acquista", (req, res) => {
    address = req.query.address;
    console.log(address)

    var Contract = require('web3-eth-contract');
    Contract.setProvider(nodo);
    var contract = new Contract(abi, address);
    contract.methods.venditaBiglietto(a).send({from: a})
            .on('receipt', function(){
             console.log("venditaBiglietto() -> OK");
             res.redirect("http://localhost:8080/")
      });
    });
  }

  app.get('/mytickets', async(req, res) => {
      var Contract = require('web3-eth-contract');
      Contract.setProvider(nodo);
      const fs = require('fs');
      var data = fs.readFileSync('contracts.json', 'utf8');
      address = data.split("\n");
      console.log(address);
      var a = [];
      for(var i=0; i < address.length -1 ; i++){
        var add = JSON.parse(address[i]).address;
        console.log("dioc->" + add);
        var contract = new Contract(abi, add);
        console.log("CAZZO");
        console.log("###->" + JSON.parse(address[i]).address);
        var listaBiglietti = [];
        await contract.methods.getBigliettoByAddress().call({from: a})
            .then((result) => {
              listaBiglietti = result.split(";");
              listaBiglietti.pop();
            }).catch(()=>{
              console.log("errore sulla getBigliettoByAddress")
            });

            for(var i = 0; i < listaBiglietti.length; i++){
              var o = {};
              await contract.methods.getBiglietto(i).call()
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
              a.push(o)
            }
          console.log("Oggetto o--->" + o);
      }
      console.log("#############-->" + a);
      // for(i = 0; i < listaEventi.length - 1; i++){
      //   var address = JSON.parse(listaEventi[i]).address
      //   var a = {};
      //   await getEventData(address).then((result) => {
      //       a = result;
      //   })
      //   a = JSON.parse(a)
      //   a.address = address;
      //   o.push(a);
      // }
      res.setHeader('Content-Type', 'application/json');
      res.end("");
  });




  // console.log("used account: " + a);
  //
  // var address = "0x84272f3E148eb3f957E3Df666d91a15a6Bd1DB7F";
  //
  //
  // //var Contract = new web3.eth.contract.setProvider()
  // var Contract = require('web3-eth-contract');
  //
  // // set provider for all later instances to use
  // Contract.setProvider(nodo);
  //
  // var contract = new Contract(abi, address);
  //
  // contract.methods.getEventManager().call()
  // .then((result) => {
  //   console.log("getEventManager() -> " + result);
  // });
  //
  // contract.methods.getBuyer().call()
  // .then((result) => {
  //   console.log("getBuyer() -> " + result);
  // });
  //
  // contract.methods.getReseller().call()
  // .then((result) => {
  //   console.log("getReseller() -> " + result);
  // });
  //
  // contract.methods.getValidator().call()
  // .then((result) => {
  //   console.log("getValidator() -> " + result);
  // });
  //
  //
  //   contract.methods.isOnSale().call()
  //   .then((result) => {
  //     if(result == true){
  //
  //       contract.methods.getAddressChiamante().call({from: a})
  //       .then((addr) => {
  //         console.log("getAddressChiamante() -> " + addr);
  //       });
  //
  //       contract.methods.getAddresses().call()
  //       .then((ruoli) => {
  //         wallets = Object.values(ruoli);
  //         console.log("get addresses(): " +
  //                     "\n eventManager -> " + wallets[0] +
  //                     "\n buyer - > " + wallets[1] +
  //                     "\n reseller - > " + wallets[2] +
  //                     "\n validator - > " + wallets[3]);
  //       })
  //
  //       contract.methods.venditaBiglietto(a).send({from: a})
  //       .on('receipt', function(){
  //         console.log("venditaBiglietto() -> OK");
  //
  //         contract.methods.getTicketCounter().call()
  //         .then((a) => {
  //           console.log("getTicketCounter() -> " + a);
  //
  //           contract.methods.getBiglietto(a - 1).call()
  //           .then((biglietto) => {
  //             v = Object.values(biglietto)
  //             if(v[0]){
  //               console.log("getBiglietto(): \n" +
  //                           "ticketId = " + v[1] + "\n" +
  //                            "validateHash = " + v[2] + "\n" +
  //                            "isValid = " + v[3] + "\n" +
  //                            "endorsed = " + v[4] + "\n" +
  //                            "ownerAddress = " + v[5] + "\nFINE")
  //             }else{
  //               console.log("Id del biglietto non valido!");
  //             }
  //
  //           });
  //
  //         });
  //
  //         contract.methods.getPostiDisponibili().call({from: a})
  //         .then((a) => {
  //           console.log("getPostiDisponibili() -> " + a);
  //         });
  //
  //       });
  //     } else {
  //       contract.methods.getAddressChiamante().call({from: a})
  //       .then((a) => {
  //         console.log("getAddressChiamante() -> " + a);
  //       });
  //       console.log("I biglietti per l'evento selezionato sono esauriti!");
  //     }
  //   });
