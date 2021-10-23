const Web3 = require("web3");

let web3 = new Web3('http://localhost:22000');

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

  var address = "0x744732A694CBda311676e38d7B26d336d2e74383";


  //var Contract = new web3.eth.contract.setProvider()
  var Contract = require('web3-eth-contract');

  // set provider for all later instances to use
  Contract.setProvider('http://localhost:22000');

  var contract = new Contract(abi, address);
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

  contract.methods.getAddressChiamante().call()
  .then((a) => {
    console.log("getAddressChiamante() -> " + a);
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

	contract.methods.onSale().call()
	.then((result) => {
		if(result == true){
			var ticketNumber;
			contract.methods.venditaBiglietto(a).send({from: a})
			.on('receipt', function(){
				console.log("venditaBiglietto() -> OK");

				contract.methods.getNumeroBiglietti().call()
				.then((a) => {
					ticketNumber = a;
					console.log("getTicketCounter() -> " + a);
				});

				contract.methods.getPostiDisponibili().call()
				.then((a) => {
					console.log("getPostiDisponibili() -> " + a);
				});

				contract.methods.getBiglietto(ticketNumber).call()
				.then((biglietto) => {
					v = Object.values(biglietto)
					console.log("getBiglietto() -> " + v[0] + " " + v[1] + " " + v[2]);
				});
			});
		} else {
			console.log("I biglietti per l'evento selezionato sono esauriti!")
		}
	});

}
