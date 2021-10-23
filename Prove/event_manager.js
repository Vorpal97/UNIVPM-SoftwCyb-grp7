const Web3 = require("web3");

let web3 = new Web3('http://localhost:22000');

const Contract = require("./contract.js");
const cont = new Contract();

var abi = cont.abi;
var bytecode = cont.bytecode;


web3.eth.getAccounts().then((value)=> {
  console.log("Accounts: " + value);
  demo(value[0]);
});

function sleep(ms){
  return new Promise(resolve =>setTimeout(resolve, ms));
}


function demo(a){
  console.log("used account: " + a);

  var simpleContract = new web3.eth.Contract(abi, { from: a });
  var simple = simpleContract.deploy({from: a, data:"0x" + bytecode.object}).
              send({ from: a }, deploy_handler).
              on('receipt', receipt_handler);


  var address;

  // INFORMAZIONI EVENTO
  var nome = "Concerto";
  var data = "10/10/2021"
  var numPosti = 100;
  var prezzoBiglietto = 5;
  var luogo = "Ancona";
	var ticketCounter = 0;


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

      //var Contract = new web3.eth.contract.setProvider()
      var Contract = require('web3-eth-contract');

      // set provider for all later instances to use
      Contract.setProvider('http://localhost:22000');

      var contract = new Contract(abi, address);

      //SCRIVERE
			/*
			contract.methods.setup(a,0,0,0).send({from: a})
      .on('receipt', function(){
          console.log("eventManager " + a + " set");
      });
			*/
      contract.methods.creaEvento(nome, data, numPosti, prezzoBiglietto, luogo, ticketCounter).send({from: a})
      .on('receipt', function(){
          console.log("New event " + nome + " created");
      });

    }


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
*/
}
