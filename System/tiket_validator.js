const Web3 = require("web3");

let nodo = 'http://localhost:22002';

let web3 = new Web3(nodo);

const Contract = require("./contract.js");
const cont = new Contract();

var abi = cont.abi;


web3.eth.getAccounts().then((value)=> {
  console.log("Accounts: " + value);
  demo(value[0]);
});

function sleep(ms){
  return new Promise(resolve =>setTimeout(resolve, ms));
}


function demo(a){
  console.log("used account: " + a);

  var address = "0x84272f3E148eb3f957E3Df666d91a15a6Bd1DB7F";


  //var Contract = new web3.eth.contract.setProvider()
  var Contract = require('web3-eth-contract');

  // set provider for all later instances to use
  Contract.setProvider(nodo);

  var contract = new Contract(abi, address);

      var idBiglietto= 3;
      console.log(a);
      contract.methods.vidimaBiglietto(idBiglietto).send({from:a})
      .on('receipt', function(){
        contract.methods.isBigliettoVidimato(idBiglietto).call()
        .then((endorsed) => {
          if(endorsed){
            console.log("Brav uagliù");
            contract.methods.getBiglietto(idBiglietto).call()
            .then((biglietto) => {
              v = Object.values(biglietto)
                console.log("getBiglietto(): \n" +
                            "ticketId = " + v[1] + "\n" +
                             "validateHash = " + v[2] + "\n" +
                             "isValid = " + v[3] + "\n" +
                             "endorsed = " + v[4] + "\n" +
                             "ownerAddress = " + v[5] + "\nFINE")
            }).catch(()=>{
              console.log("getBiglietto() errore");
            });
          } else {
            //Biglietto non vidimato o ticketID non valido o ticket non valido
            console.log("Errore generico, controlla i dati inseriti.");
          }
        }).catch(()=>{
          console.log("isBigliettoVidimato() errore");
        });
     }).catch(()=>{
       console.log("vidimaBiglietto() errore");
     });


}
