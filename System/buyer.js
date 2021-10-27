const Web3 = require("web3");

let web3 = new Web3('http://localhost:22001');

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

  var address = "0x2A4aA27B00AcB48287c2F3f7567C71550F8d945d";


  //var Contract = new web3.eth.contract.setProvider()
  var Contract = require('web3-eth-contract');

  // set provider for all later instances to use
  Contract.setProvider('http://localhost:22001');

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

	contract.methods.isOnSale().call()
	.then((result) => {
		if(result == true){

      contract.methods.getAddressChiamante().call({from: a})
      .then((addr) => {
        console.log("getAddressChiamante() -> " + addr);
      });

      contract.methods.getAddresses().call()
      .then((ruoli) => {
        wallets = Object.values(ruoli);
        console.log("get addresses(): " +
                    "\n eventManager -> " + wallets[0] +
                    "\n buyer - > " + wallets[1] +
                    "\n reseller - > " + wallets[2] +
                    "\n validator - > " + wallets[3]);
      })

			contract.methods.venditaBiglietto(a).send({from: a})
			.on('receipt', function(){
				console.log("venditaBiglietto() -> OK");

				contract.methods.getTicketCounter().call()
				.then((a) => {
					console.log("getTicketCounter() -> " + a);

          contract.methods.getBiglietto(a - 1).call()
  				.then((biglietto) => {
  					v = Object.values(biglietto)
  					console.log("getBiglietto() -> " + v[0] + " " + v[1] + " " + v[2]);
  				});

				});

				contract.methods.getPostiDisponibili().call({from: a})
				.then((a) => {
					console.log("getPostiDisponibili() -> " + a);
				});

			});
		} else {
      contract.methods.getAddressChiamante().call({from: a})
      .then((a) => {
        console.log("getAddressChiamante() -> " + a);
      });
			console.log("I biglietti per l'evento selezionato sono esauriti!");
		}
	});

}
