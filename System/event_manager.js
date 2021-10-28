const Web3 = require("web3");

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
  demo(value[0]);
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


function demo(a){
  console.log("used account: " + a);

  address_list = popList(address_list_tmp, a);

  var simpleContract = new web3.eth.Contract(abi, { from: a });
  var simple = simpleContract.deploy({from: a, data:"0x" + bytecode.object}).
              send({ from: a }, deploy_handler).
              on('receipt', receipt_handler);


  var address;

  // INFORMAZIONI EVENTO
  var nome = "Suca";
  var data = "10/10/2021"
  var numPosti = 5;
  var prezzoBiglietto = 10;
  var luogo = "SucaSuca";
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
