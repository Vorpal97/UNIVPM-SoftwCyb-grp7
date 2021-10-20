const Web3 = require("web3");

let web3 = new Web3('http://localhost:22000');
var abi = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_nome",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_data",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_numPosti",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_prezzoBiglietto",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_luogo",
				"type": "string"
			}
		],
		"name": "creaEvento",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "ticketId",
				"type": "uint256"
			}
		],
		"name": "getBiglietto",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getData",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getLuogo",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getNome",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getNumPosti",
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
		"inputs": [],
		"name": "getNumeroBiglietti",
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
		"inputs": [],
		"name": "getPrezzoBiglietto",
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
		"inputs": [],
		"name": "getStato",
		"outputs": [
			{
				"internalType": "enum Evento.status",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "owenerAddress",
				"type": "string"
			}
		],
		"name": "venditaBiglietto",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];

web3.eth.getAccounts().then((value)=> {
  console.log("Accounts: " + value);
  demo(value[0]);
});

function sleep(ms){
  return new Promise(resolve =>setTimeout(resolve, ms));
}


function demo(a){
  console.log("used account: " + a);

  var address = "0x1932c48b2bF8102Ba33B4A6B545C32236e342f34";


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
	/*
  contract.methods.venditaBiglietto(a).send({from: a})
    .on('receipt', function(){
        console.log("Biglietto comprato");
    });
		*/

  contract.methods.getNumeroBiglietti().call()
  .then((a) => {
    console.log("getNumeroBiglietti() -> " + a);
  });

	contract.methods.getBiglietto(0).call()
  .then((biglietto) => {
		v = Object.values(biglietto)
		console.log("getBiglietto() -> " + v[0] + " " + v[1] + " " + v[2]);
  });

}
