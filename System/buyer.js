const Web3 = require("web3");

let nodo = 'http://localhost:22001';

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

  contract.methods.getEventManager().call()
  .then((result) => {
    console.log("getEventManager() -> " + result);
  });

  contract.methods.getBuyer().call()
  .then((result) => {
    console.log("getBuyer() -> " + result);
  });

  contract.methods.getReseller().call()
  .then((result) => {
    console.log("getReseller() -> " + result);
  });

  contract.methods.getValidator().call()
  .then((result) => {
    console.log("getValidator() -> " + result);
  });


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
              if(v[0]){
                console.log("getBiglietto(): \n" +
                            "ticketId = " + v[1] + "\n" +
                             "validateHash = " + v[2] + "\n" +
                             "isValid = " + v[3] + "\n" +
                             "endorsed = " + v[4] + "\n" +
                             "ownerAddress = " + v[5] + "\nFINE")
              }else{
                console.log("Id del biglietto non valido!");
              }

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
