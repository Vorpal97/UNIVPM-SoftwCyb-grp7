const Web3 = require("web3");

let web3 = new Web3('http://localhost:22000');

var abi = obj.abi;
var bytecode = obj.bytecode;

web3.eth.getAccounts().then((value)=> {
  console.log("Accounts: " + value);
  demo(value[0]);
});

function sleep(ms){
  return new Promise(resolve =>setTimeout(resolve, ms));
}


function demo(a){
  console.log("used account: " + a);
  var abi = [
  	{
  		"inputs": [],
  		"name": "retrieve",
  		"outputs": [
  			{
  				"internalType": "uint256",
  				"name": "",
  				"type": "uint256"
  			}
  		],
  		"stateMutability": "view",
  		"type": "function"
  	},
  	{
  		"inputs": [
  			{
  				"internalType": "uint256",
  				"name": "num",
  				"type": "uint256"
  			}
  		],
  		"name": "store",
  		"outputs": [],
  		"stateMutability": "nonpayable",
  		"type": "function"
  	}
  ];

  var address = "0x1932c48b2bF8102Ba33B4A6B545C32236e342f34";


  //var Contract = new web3.eth.contract.setProvider()
  var Contract = require('web3-eth-contract');

  // set provider for all later instances to use
  Contract.setProvider('http://localhost:22000');

  var contract = new Contract(abi, address);

  //SCRIVERE
  contract.methods.store(21).send({from: a})
  .on('receipt', function(){
      console.log("stored: " + 21);
  });

//LEGGERE
  contract.methods.retrieve().call()
  .then((a) => {
    x = a;
  });

}
