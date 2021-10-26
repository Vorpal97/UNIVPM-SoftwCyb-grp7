const Web3 = require("web3");

let web3 = new Web3('http://localhost:22003');

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

  var address = "0x938781b9796aeA6376E40ca158f67Fa89D5d8a18";


  //var Contract = new web3.eth.contract.setProvider()
  var Contract = require('web3-eth-contract');

  // set provider for all later instances to use
  Contract.setProvider('http://localhost:22003');

  var contract = new Contract(abi, address);

//VECCHI METODI DEL BUYER
//SCRIVERE
//  contract.methods.creaEvento(nome, data, numPosti, prezzoBiglietto, luogo).send({from: a})
//  .on('receipt', function(){
//      console.log("New event" + nome + "created");
//  });
/*
  //LEGGERE
  contract.methods.getNome().call()
  .then((a) => {
    console.log("getNome() -> " + a);
  });

  contract.methods.getData().call()
  .then((a) => {
    console.log("getData() -> " + a);
  });

  contract.methods.getNumPosti().call()
  .then((a) => {
    console.log("getNumPosti() -> " + a);
  });

  contract.methods.getPrezzoBiglietto().call()
  .then((a) => {
    console.log("getPrezzoBiglietto() -> " + a);
  });

  contract.methods.getLuogo().call()
  .then((a) => {
    console.log("getLuogo() -> " + a);
  });

  contract.methods.getStato().call()
  .then((a) => {
    console.log("getStato() -> " + a);
  });

  contract.methods.getPostiDisponibili().call()
  .then((a) => {
    console.log("getPostiDisponibili() -> " + a);
  });

  contract.methods.getPrezzoBiglietto().call()
  .then((a) => {
    console.log("getPrezzoBiglietto() -> " + a);
  });

  contract.methods.venditaBiglietto(a).send({from: a})
    .on('receipt', function(){
        console.log("Biglietto comprato");
    });
		*/

    /*
    contract.methods.diminuisciBiglietti().call()
    .then(() => {
      console.log("diminuisciBiglietti() ");
    });*/
/*
	contract.methods.getBiglietto(0).call()
  .then((biglietto) => {
		v = Object.values(biglietto)
		console.log("getBiglietto() -> " + v[0] + " " + v[1] + " " + v[2]);
  });
*/


      // contract.methods.getAddressChiamante().call({from: a})
      // .then((addr) => {
      //   console.log("getAddressChiamante() -> " + addr);
      // });
      //
      // contract.methods.getAddresses().call()
      // .then((ruoli) => {
      //   wallets = Object.values(ruoli);
      //   console.log("get addresses(): " +
      //               "\n eventManager -> " + wallets[0] +
      //               "\n buyer - > " + wallets[1] +
      //               "\n reseller - > " + wallets[2] +
      //               "\n validator - > " + wallets[3]);
      // });

      var idBiglietto= 0;
      console.log(a);
      contract.methods.validaBiglietto(idBiglietto).send({from:a})
      .on('receipt', function(){
          console.log("Ciao")
        // contract.methods.isBigliettoVidimato(idBiglietto).call()s
        // .then((endorsed) => {
        //   if(endorsed){
        //     console.log("Brav uagliù");
        //   } else {
        //     console.log("meh veffengul");
        //   }
        // });

        // contract.methods.getBiglietto(idBiglietto).call()
        // .then((biglietto) => {
        //   v = Object.values(biglietto)
        //   console.log("getBiglietto() -> " + v[0] + " " + v[1] + " " + v[2]);
        // });

     }).catch(()=>{
       console.log("suca");
     });


}
