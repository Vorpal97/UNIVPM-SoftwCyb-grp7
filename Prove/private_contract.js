const Web3 = require("web3");

let web3 = new Web3('http://localhost:22000');

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

var bytecode = {
	"functionDebugData": {},
	"generatedSources": [],
	"linkReferences": {},
	"object": "608060405234801561001057600080fd5b50610150806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c80632e64cec11461003b5780636057361d14610059575b600080fd5b610043610075565b60405161005091906100d9565b60405180910390f35b610073600480360381019061006e919061009d565b61007e565b005b60008054905090565b8060008190555050565b60008135905061009781610103565b92915050565b6000602082840312156100b3576100b26100fe565b5b60006100c184828501610088565b91505092915050565b6100d3816100f4565b82525050565b60006020820190506100ee60008301846100ca565b92915050565b6000819050919050565b600080fd5b61010c816100f4565b811461011757600080fd5b5056fea2646970667358221220404e37f487a89a932dca5e77faaf6ca2de3b991f93d230604b1b8daaef64766264736f6c63430008070033",
	"opcodes": "PUSH1 0x80 PUSH1 0x40 MSTORE CALLVALUE DUP1 ISZERO PUSH2 0x10 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x150 DUP1 PUSH2 0x20 PUSH1 0x0 CODECOPY PUSH1 0x0 RETURN INVALID PUSH1 0x80 PUSH1 0x40 MSTORE CALLVALUE DUP1 ISZERO PUSH2 0x10 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH1 0x4 CALLDATASIZE LT PUSH2 0x36 JUMPI PUSH1 0x0 CALLDATALOAD PUSH1 0xE0 SHR DUP1 PUSH4 0x2E64CEC1 EQ PUSH2 0x3B JUMPI DUP1 PUSH4 0x6057361D EQ PUSH2 0x59 JUMPI JUMPDEST PUSH1 0x0 DUP1 REVERT JUMPDEST PUSH2 0x43 PUSH2 0x75 JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH2 0x50 SWAP2 SWAP1 PUSH2 0xD9 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST PUSH2 0x73 PUSH1 0x4 DUP1 CALLDATASIZE SUB DUP2 ADD SWAP1 PUSH2 0x6E SWAP2 SWAP1 PUSH2 0x9D JUMP JUMPDEST PUSH2 0x7E JUMP JUMPDEST STOP JUMPDEST PUSH1 0x0 DUP1 SLOAD SWAP1 POP SWAP1 JUMP JUMPDEST DUP1 PUSH1 0x0 DUP2 SWAP1 SSTORE POP POP JUMP JUMPDEST PUSH1 0x0 DUP2 CALLDATALOAD SWAP1 POP PUSH2 0x97 DUP2 PUSH2 0x103 JUMP JUMPDEST SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 DUP5 SUB SLT ISZERO PUSH2 0xB3 JUMPI PUSH2 0xB2 PUSH2 0xFE JUMP JUMPDEST JUMPDEST PUSH1 0x0 PUSH2 0xC1 DUP5 DUP3 DUP6 ADD PUSH2 0x88 JUMP JUMPDEST SWAP2 POP POP SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH2 0xD3 DUP2 PUSH2 0xF4 JUMP JUMPDEST DUP3 MSTORE POP POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 ADD SWAP1 POP PUSH2 0xEE PUSH1 0x0 DUP4 ADD DUP5 PUSH2 0xCA JUMP JUMPDEST SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 DUP2 SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 DUP1 REVERT JUMPDEST PUSH2 0x10C DUP2 PUSH2 0xF4 JUMP JUMPDEST DUP2 EQ PUSH2 0x117 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP JUMP INVALID LOG2 PUSH5 0x6970667358 0x22 SLT KECCAK256 BLOCKHASH 0x4E CALLDATACOPY DELEGATECALL DUP8 0xA8 SWAP11 SWAP4 0x2D 0xCA 0x5E PUSH24 0xFAAF6CA2DE3B991F93D230604B1B8DAAEF64766264736F6C PUSH4 0x43000807 STOP CALLER ",
	"sourceMap": "141:356:0:-:0;;;;;;;;;;;;;;;;;;;"
};

var simpleContract = new web3.eth.Contract(abi, { from: a });
var simple = simpleContract.deploy({from: a, data:"0x" + bytecode.object}).
            send({ from: a }, deploy_handler).
            on('receipt', receipt_handler);
}

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
    console.log("contract mined: " + receipt.contractAddress);
    console.log(receipt);
  }