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

var bytecode = {
	"functionDebugData": {},
	"generatedSources": [],
	"linkReferences": {},
	"object": "6080604052600060075534801561001557600080fd5b50610d54806100256000396000f3fe608060405234801561001057600080fd5b506004361061009e5760003560e01c8063b094a32e11610066578063b094a32e1461014b578063e0bb29a614610167578063e0cfc23314610185578063f3bd38fa146101a3578063fcfec995146101c15761009e565b80630fce9823146100a35780633bc5de30146100bf5780637e34a423146100dd5780638b386b9d146100fb57806392a5628214610119575b600080fd5b6100bd60048036038101906100b89190610800565b6101df565b005b6100c76102c0565b6040516100d491906109c6565b60405180910390f35b6100e5610352565b6040516100f291906109c6565b60405180910390f35b6101036103e4565b60405161011091906109c6565b60405180910390f35b610133600480360381019061012e9190610918565b610476565b604051610142939291906109e8565b60405180910390f35b61016560048036038101906101609190610849565b61061e565b005b61016f6106a3565b60405161017c9190610a2d565b60405180910390f35b61018d6106ad565b60405161019a9190610a2d565b60405180910390f35b6101ab6106b7565b6040516101b891906109ab565b60405180910390f35b6101c96106ce565b6040516101d69190610a2d565b60405180910390f35b6006604051806080016040528060075481526020016040518060200160405280600081525081526020016001151581526020018381525090806001815401808255809150506001900390600052602060002090600402016000909190919091506000820151816000015560208201518160010190805190602001906102659291906106d8565b5060408201518160020160006101000a81548160ff02191690831515021790555060608201518160030190805190602001906102a29291906106d8565b505050600760008154809291906102b890610b9a565b919050555050565b6060600180546102cf90610b37565b80601f01602080910402602001604051908101604052809291908181526020018280546102fb90610b37565b80156103485780601f1061031d57610100808354040283529160200191610348565b820191906000526020600020905b81548152906001019060200180831161032b57829003601f168201915b5050505050905090565b60606000805461036190610b37565b80601f016020809104026020016040519081016040528092919081815260200182805461038d90610b37565b80156103da5780601f106103af576101008083540402835291602001916103da565b820191906000526020600020905b8154815290600101906020018083116103bd57829003601f168201915b5050505050905090565b6060600480546103f390610b37565b80601f016020809104026020016040519081016040528092919081815260200182805461041f90610b37565b801561046c5780601f106104415761010080835404028352916020019161046c565b820191906000526020600020905b81548152906001019060200180831161044f57829003601f168201915b5050505050905090565b606060006060600684815481106104905761048f610c70565b5b9060005260206000209060040201600101600685815481106104b5576104b4610c70565b5b906000526020600020906004020160020160009054906101000a900460ff16600686815481106104e8576104e7610c70565b5b906000526020600020906004020160030182805461050590610b37565b80601f016020809104026020016040519081016040528092919081815260200182805461053190610b37565b801561057e5780601f106105535761010080835404028352916020019161057e565b820191906000526020600020905b81548152906001019060200180831161056157829003601f168201915b5050505050925080805461059190610b37565b80601f01602080910402602001604051908101604052809291908181526020018280546105bd90610b37565b801561060a5780601f106105df5761010080835404028352916020019161060a565b820191906000526020600020905b8154815290600101906020018083116105ed57829003601f168201915b505050505090509250925092509193909250565b84600090805190602001906106349291906106d8565b50836001908051906020019061064b9291906106d8565b50826002819055508160038190555080600490805190602001906106709291906106d8565b506000600560006101000a81548160ff0219169083600381111561069757610696610c12565b5b02179055505050505050565b6000600254905090565b6000600754905090565b6000600560009054906101000a900460ff16905090565b6000600354905090565b8280546106e490610b37565b90600052602060002090601f016020900481019282610706576000855561074d565b82601f1061071f57805160ff191683800117855561074d565b8280016001018555821561074d579182015b8281111561074c578251825591602001919060010190610731565b5b50905061075a919061075e565b5090565b5b8082111561077757600081600090555060010161075f565b5090565b600061078e61078984610a6d565b610a48565b9050828152602081018484840111156107aa576107a9610cd3565b5b6107b5848285610af5565b509392505050565b600082601f8301126107d2576107d1610cce565b5b81356107e284826020860161077b565b91505092915050565b6000813590506107fa81610d07565b92915050565b60006020828403121561081657610815610cdd565b5b600082013567ffffffffffffffff81111561083457610833610cd8565b5b610840848285016107bd565b91505092915050565b600080600080600060a0868803121561086557610864610cdd565b5b600086013567ffffffffffffffff81111561088357610882610cd8565b5b61088f888289016107bd565b955050602086013567ffffffffffffffff8111156108b0576108af610cd8565b5b6108bc888289016107bd565b94505060406108cd888289016107eb565b93505060606108de888289016107eb565b925050608086013567ffffffffffffffff8111156108ff576108fe610cd8565b5b61090b888289016107bd565b9150509295509295909350565b60006020828403121561092e5761092d610cdd565b5b600061093c848285016107eb565b91505092915050565b61094e81610aba565b82525050565b61095d81610ae3565b82525050565b600061096e82610a9e565b6109788185610aa9565b9350610988818560208601610b04565b61099181610ce2565b840191505092915050565b6109a581610ad9565b82525050565b60006020820190506109c06000830184610954565b92915050565b600060208201905081810360008301526109e08184610963565b905092915050565b60006060820190508181036000830152610a028186610963565b9050610a116020830185610945565b8181036040830152610a238184610963565b9050949350505050565b6000602082019050610a42600083018461099c565b92915050565b6000610a52610a63565b9050610a5e8282610b69565b919050565b6000604051905090565b600067ffffffffffffffff821115610a8857610a87610c9f565b5b610a9182610ce2565b9050602081019050919050565b600081519050919050565b600082825260208201905092915050565b60008115159050919050565b6000819050610ad482610cf3565b919050565b6000819050919050565b6000610aee82610ac6565b9050919050565b82818337600083830152505050565b60005b83811015610b22578082015181840152602081019050610b07565b83811115610b31576000848401525b50505050565b60006002820490506001821680610b4f57607f821691505b60208210811415610b6357610b62610c41565b5b50919050565b610b7282610ce2565b810181811067ffffffffffffffff82111715610b9157610b90610c9f565b5b80604052505050565b6000610ba582610ad9565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff821415610bd857610bd7610be3565b5b600182019050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b60048110610d0457610d03610c12565b5b50565b610d1081610ad9565b8114610d1b57600080fd5b5056fea26469706673582212203b7845405457cc453c873b08b9aa4a24a77e4a59484bceae01ea0e4deb9c000564736f6c63430008070033",
	"opcodes": "PUSH1 0x80 PUSH1 0x40 MSTORE PUSH1 0x0 PUSH1 0x7 SSTORE CALLVALUE DUP1 ISZERO PUSH2 0x15 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0xD54 DUP1 PUSH2 0x25 PUSH1 0x0 CODECOPY PUSH1 0x0 RETURN INVALID PUSH1 0x80 PUSH1 0x40 MSTORE CALLVALUE DUP1 ISZERO PUSH2 0x10 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH1 0x4 CALLDATASIZE LT PUSH2 0x9E JUMPI PUSH1 0x0 CALLDATALOAD PUSH1 0xE0 SHR DUP1 PUSH4 0xB094A32E GT PUSH2 0x66 JUMPI DUP1 PUSH4 0xB094A32E EQ PUSH2 0x14B JUMPI DUP1 PUSH4 0xE0BB29A6 EQ PUSH2 0x167 JUMPI DUP1 PUSH4 0xE0CFC233 EQ PUSH2 0x185 JUMPI DUP1 PUSH4 0xF3BD38FA EQ PUSH2 0x1A3 JUMPI DUP1 PUSH4 0xFCFEC995 EQ PUSH2 0x1C1 JUMPI PUSH2 0x9E JUMP JUMPDEST DUP1 PUSH4 0xFCE9823 EQ PUSH2 0xA3 JUMPI DUP1 PUSH4 0x3BC5DE30 EQ PUSH2 0xBF JUMPI DUP1 PUSH4 0x7E34A423 EQ PUSH2 0xDD JUMPI DUP1 PUSH4 0x8B386B9D EQ PUSH2 0xFB JUMPI DUP1 PUSH4 0x92A56282 EQ PUSH2 0x119 JUMPI JUMPDEST PUSH1 0x0 DUP1 REVERT JUMPDEST PUSH2 0xBD PUSH1 0x4 DUP1 CALLDATASIZE SUB DUP2 ADD SWAP1 PUSH2 0xB8 SWAP2 SWAP1 PUSH2 0x800 JUMP JUMPDEST PUSH2 0x1DF JUMP JUMPDEST STOP JUMPDEST PUSH2 0xC7 PUSH2 0x2C0 JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH2 0xD4 SWAP2 SWAP1 PUSH2 0x9C6 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST PUSH2 0xE5 PUSH2 0x352 JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH2 0xF2 SWAP2 SWAP1 PUSH2 0x9C6 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST PUSH2 0x103 PUSH2 0x3E4 JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH2 0x110 SWAP2 SWAP1 PUSH2 0x9C6 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST PUSH2 0x133 PUSH1 0x4 DUP1 CALLDATASIZE SUB DUP2 ADD SWAP1 PUSH2 0x12E SWAP2 SWAP1 PUSH2 0x918 JUMP JUMPDEST PUSH2 0x476 JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH2 0x142 SWAP4 SWAP3 SWAP2 SWAP1 PUSH2 0x9E8 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST PUSH2 0x165 PUSH1 0x4 DUP1 CALLDATASIZE SUB DUP2 ADD SWAP1 PUSH2 0x160 SWAP2 SWAP1 PUSH2 0x849 JUMP JUMPDEST PUSH2 0x61E JUMP JUMPDEST STOP JUMPDEST PUSH2 0x16F PUSH2 0x6A3 JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH2 0x17C SWAP2 SWAP1 PUSH2 0xA2D JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST PUSH2 0x18D PUSH2 0x6AD JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH2 0x19A SWAP2 SWAP1 PUSH2 0xA2D JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST PUSH2 0x1AB PUSH2 0x6B7 JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH2 0x1B8 SWAP2 SWAP1 PUSH2 0x9AB JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST PUSH2 0x1C9 PUSH2 0x6CE JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH2 0x1D6 SWAP2 SWAP1 PUSH2 0xA2D JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST PUSH1 0x6 PUSH1 0x40 MLOAD DUP1 PUSH1 0x80 ADD PUSH1 0x40 MSTORE DUP1 PUSH1 0x7 SLOAD DUP2 MSTORE PUSH1 0x20 ADD PUSH1 0x40 MLOAD DUP1 PUSH1 0x20 ADD PUSH1 0x40 MSTORE DUP1 PUSH1 0x0 DUP2 MSTORE POP DUP2 MSTORE PUSH1 0x20 ADD PUSH1 0x1 ISZERO ISZERO DUP2 MSTORE PUSH1 0x20 ADD DUP4 DUP2 MSTORE POP SWAP1 DUP1 PUSH1 0x1 DUP2 SLOAD ADD DUP1 DUP3 SSTORE DUP1 SWAP2 POP POP PUSH1 0x1 SWAP1 SUB SWAP1 PUSH1 0x0 MSTORE PUSH1 0x20 PUSH1 0x0 KECCAK256 SWAP1 PUSH1 0x4 MUL ADD PUSH1 0x0 SWAP1 SWAP2 SWAP1 SWAP2 SWAP1 SWAP2 POP PUSH1 0x0 DUP3 ADD MLOAD DUP2 PUSH1 0x0 ADD SSTORE PUSH1 0x20 DUP3 ADD MLOAD DUP2 PUSH1 0x1 ADD SWAP1 DUP1 MLOAD SWAP1 PUSH1 0x20 ADD SWAP1 PUSH2 0x265 SWAP3 SWAP2 SWAP1 PUSH2 0x6D8 JUMP JUMPDEST POP PUSH1 0x40 DUP3 ADD MLOAD DUP2 PUSH1 0x2 ADD PUSH1 0x0 PUSH2 0x100 EXP DUP2 SLOAD DUP2 PUSH1 0xFF MUL NOT AND SWAP1 DUP4 ISZERO ISZERO MUL OR SWAP1 SSTORE POP PUSH1 0x60 DUP3 ADD MLOAD DUP2 PUSH1 0x3 ADD SWAP1 DUP1 MLOAD SWAP1 PUSH1 0x20 ADD SWAP1 PUSH2 0x2A2 SWAP3 SWAP2 SWAP1 PUSH2 0x6D8 JUMP JUMPDEST POP POP POP PUSH1 0x7 PUSH1 0x0 DUP2 SLOAD DUP1 SWAP3 SWAP2 SWAP1 PUSH2 0x2B8 SWAP1 PUSH2 0xB9A JUMP JUMPDEST SWAP2 SWAP1 POP SSTORE POP POP JUMP JUMPDEST PUSH1 0x60 PUSH1 0x1 DUP1 SLOAD PUSH2 0x2CF SWAP1 PUSH2 0xB37 JUMP JUMPDEST DUP1 PUSH1 0x1F ADD PUSH1 0x20 DUP1 SWAP2 DIV MUL PUSH1 0x20 ADD PUSH1 0x40 MLOAD SWAP1 DUP2 ADD PUSH1 0x40 MSTORE DUP1 SWAP3 SWAP2 SWAP1 DUP2 DUP2 MSTORE PUSH1 0x20 ADD DUP3 DUP1 SLOAD PUSH2 0x2FB SWAP1 PUSH2 0xB37 JUMP JUMPDEST DUP1 ISZERO PUSH2 0x348 JUMPI DUP1 PUSH1 0x1F LT PUSH2 0x31D JUMPI PUSH2 0x100 DUP1 DUP4 SLOAD DIV MUL DUP4 MSTORE SWAP2 PUSH1 0x20 ADD SWAP2 PUSH2 0x348 JUMP JUMPDEST DUP3 ADD SWAP2 SWAP1 PUSH1 0x0 MSTORE PUSH1 0x20 PUSH1 0x0 KECCAK256 SWAP1 JUMPDEST DUP2 SLOAD DUP2 MSTORE SWAP1 PUSH1 0x1 ADD SWAP1 PUSH1 0x20 ADD DUP1 DUP4 GT PUSH2 0x32B JUMPI DUP3 SWAP1 SUB PUSH1 0x1F AND DUP3 ADD SWAP2 JUMPDEST POP POP POP POP POP SWAP1 POP SWAP1 JUMP JUMPDEST PUSH1 0x60 PUSH1 0x0 DUP1 SLOAD PUSH2 0x361 SWAP1 PUSH2 0xB37 JUMP JUMPDEST DUP1 PUSH1 0x1F ADD PUSH1 0x20 DUP1 SWAP2 DIV MUL PUSH1 0x20 ADD PUSH1 0x40 MLOAD SWAP1 DUP2 ADD PUSH1 0x40 MSTORE DUP1 SWAP3 SWAP2 SWAP1 DUP2 DUP2 MSTORE PUSH1 0x20 ADD DUP3 DUP1 SLOAD PUSH2 0x38D SWAP1 PUSH2 0xB37 JUMP JUMPDEST DUP1 ISZERO PUSH2 0x3DA JUMPI DUP1 PUSH1 0x1F LT PUSH2 0x3AF JUMPI PUSH2 0x100 DUP1 DUP4 SLOAD DIV MUL DUP4 MSTORE SWAP2 PUSH1 0x20 ADD SWAP2 PUSH2 0x3DA JUMP JUMPDEST DUP3 ADD SWAP2 SWAP1 PUSH1 0x0 MSTORE PUSH1 0x20 PUSH1 0x0 KECCAK256 SWAP1 JUMPDEST DUP2 SLOAD DUP2 MSTORE SWAP1 PUSH1 0x1 ADD SWAP1 PUSH1 0x20 ADD DUP1 DUP4 GT PUSH2 0x3BD JUMPI DUP3 SWAP1 SUB PUSH1 0x1F AND DUP3 ADD SWAP2 JUMPDEST POP POP POP POP POP SWAP1 POP SWAP1 JUMP JUMPDEST PUSH1 0x60 PUSH1 0x4 DUP1 SLOAD PUSH2 0x3F3 SWAP1 PUSH2 0xB37 JUMP JUMPDEST DUP1 PUSH1 0x1F ADD PUSH1 0x20 DUP1 SWAP2 DIV MUL PUSH1 0x20 ADD PUSH1 0x40 MLOAD SWAP1 DUP2 ADD PUSH1 0x40 MSTORE DUP1 SWAP3 SWAP2 SWAP1 DUP2 DUP2 MSTORE PUSH1 0x20 ADD DUP3 DUP1 SLOAD PUSH2 0x41F SWAP1 PUSH2 0xB37 JUMP JUMPDEST DUP1 ISZERO PUSH2 0x46C JUMPI DUP1 PUSH1 0x1F LT PUSH2 0x441 JUMPI PUSH2 0x100 DUP1 DUP4 SLOAD DIV MUL DUP4 MSTORE SWAP2 PUSH1 0x20 ADD SWAP2 PUSH2 0x46C JUMP JUMPDEST DUP3 ADD SWAP2 SWAP1 PUSH1 0x0 MSTORE PUSH1 0x20 PUSH1 0x0 KECCAK256 SWAP1 JUMPDEST DUP2 SLOAD DUP2 MSTORE SWAP1 PUSH1 0x1 ADD SWAP1 PUSH1 0x20 ADD DUP1 DUP4 GT PUSH2 0x44F JUMPI DUP3 SWAP1 SUB PUSH1 0x1F AND DUP3 ADD SWAP2 JUMPDEST POP POP POP POP POP SWAP1 POP SWAP1 JUMP JUMPDEST PUSH1 0x60 PUSH1 0x0 PUSH1 0x60 PUSH1 0x6 DUP5 DUP2 SLOAD DUP2 LT PUSH2 0x490 JUMPI PUSH2 0x48F PUSH2 0xC70 JUMP JUMPDEST JUMPDEST SWAP1 PUSH1 0x0 MSTORE PUSH1 0x20 PUSH1 0x0 KECCAK256 SWAP1 PUSH1 0x4 MUL ADD PUSH1 0x1 ADD PUSH1 0x6 DUP6 DUP2 SLOAD DUP2 LT PUSH2 0x4B5 JUMPI PUSH2 0x4B4 PUSH2 0xC70 JUMP JUMPDEST JUMPDEST SWAP1 PUSH1 0x0 MSTORE PUSH1 0x20 PUSH1 0x0 KECCAK256 SWAP1 PUSH1 0x4 MUL ADD PUSH1 0x2 ADD PUSH1 0x0 SWAP1 SLOAD SWAP1 PUSH2 0x100 EXP SWAP1 DIV PUSH1 0xFF AND PUSH1 0x6 DUP7 DUP2 SLOAD DUP2 LT PUSH2 0x4E8 JUMPI PUSH2 0x4E7 PUSH2 0xC70 JUMP JUMPDEST JUMPDEST SWAP1 PUSH1 0x0 MSTORE PUSH1 0x20 PUSH1 0x0 KECCAK256 SWAP1 PUSH1 0x4 MUL ADD PUSH1 0x3 ADD DUP3 DUP1 SLOAD PUSH2 0x505 SWAP1 PUSH2 0xB37 JUMP JUMPDEST DUP1 PUSH1 0x1F ADD PUSH1 0x20 DUP1 SWAP2 DIV MUL PUSH1 0x20 ADD PUSH1 0x40 MLOAD SWAP1 DUP2 ADD PUSH1 0x40 MSTORE DUP1 SWAP3 SWAP2 SWAP1 DUP2 DUP2 MSTORE PUSH1 0x20 ADD DUP3 DUP1 SLOAD PUSH2 0x531 SWAP1 PUSH2 0xB37 JUMP JUMPDEST DUP1 ISZERO PUSH2 0x57E JUMPI DUP1 PUSH1 0x1F LT PUSH2 0x553 JUMPI PUSH2 0x100 DUP1 DUP4 SLOAD DIV MUL DUP4 MSTORE SWAP2 PUSH1 0x20 ADD SWAP2 PUSH2 0x57E JUMP JUMPDEST DUP3 ADD SWAP2 SWAP1 PUSH1 0x0 MSTORE PUSH1 0x20 PUSH1 0x0 KECCAK256 SWAP1 JUMPDEST DUP2 SLOAD DUP2 MSTORE SWAP1 PUSH1 0x1 ADD SWAP1 PUSH1 0x20 ADD DUP1 DUP4 GT PUSH2 0x561 JUMPI DUP3 SWAP1 SUB PUSH1 0x1F AND DUP3 ADD SWAP2 JUMPDEST POP POP POP POP POP SWAP3 POP DUP1 DUP1 SLOAD PUSH2 0x591 SWAP1 PUSH2 0xB37 JUMP JUMPDEST DUP1 PUSH1 0x1F ADD PUSH1 0x20 DUP1 SWAP2 DIV MUL PUSH1 0x20 ADD PUSH1 0x40 MLOAD SWAP1 DUP2 ADD PUSH1 0x40 MSTORE DUP1 SWAP3 SWAP2 SWAP1 DUP2 DUP2 MSTORE PUSH1 0x20 ADD DUP3 DUP1 SLOAD PUSH2 0x5BD SWAP1 PUSH2 0xB37 JUMP JUMPDEST DUP1 ISZERO PUSH2 0x60A JUMPI DUP1 PUSH1 0x1F LT PUSH2 0x5DF JUMPI PUSH2 0x100 DUP1 DUP4 SLOAD DIV MUL DUP4 MSTORE SWAP2 PUSH1 0x20 ADD SWAP2 PUSH2 0x60A JUMP JUMPDEST DUP3 ADD SWAP2 SWAP1 PUSH1 0x0 MSTORE PUSH1 0x20 PUSH1 0x0 KECCAK256 SWAP1 JUMPDEST DUP2 SLOAD DUP2 MSTORE SWAP1 PUSH1 0x1 ADD SWAP1 PUSH1 0x20 ADD DUP1 DUP4 GT PUSH2 0x5ED JUMPI DUP3 SWAP1 SUB PUSH1 0x1F AND DUP3 ADD SWAP2 JUMPDEST POP POP POP POP POP SWAP1 POP SWAP3 POP SWAP3 POP SWAP3 POP SWAP2 SWAP4 SWAP1 SWAP3 POP JUMP JUMPDEST DUP5 PUSH1 0x0 SWAP1 DUP1 MLOAD SWAP1 PUSH1 0x20 ADD SWAP1 PUSH2 0x634 SWAP3 SWAP2 SWAP1 PUSH2 0x6D8 JUMP JUMPDEST POP DUP4 PUSH1 0x1 SWAP1 DUP1 MLOAD SWAP1 PUSH1 0x20 ADD SWAP1 PUSH2 0x64B SWAP3 SWAP2 SWAP1 PUSH2 0x6D8 JUMP JUMPDEST POP DUP3 PUSH1 0x2 DUP2 SWAP1 SSTORE POP DUP2 PUSH1 0x3 DUP2 SWAP1 SSTORE POP DUP1 PUSH1 0x4 SWAP1 DUP1 MLOAD SWAP1 PUSH1 0x20 ADD SWAP1 PUSH2 0x670 SWAP3 SWAP2 SWAP1 PUSH2 0x6D8 JUMP JUMPDEST POP PUSH1 0x0 PUSH1 0x5 PUSH1 0x0 PUSH2 0x100 EXP DUP2 SLOAD DUP2 PUSH1 0xFF MUL NOT AND SWAP1 DUP4 PUSH1 0x3 DUP2 GT ISZERO PUSH2 0x697 JUMPI PUSH2 0x696 PUSH2 0xC12 JUMP JUMPDEST JUMPDEST MUL OR SWAP1 SSTORE POP POP POP POP POP POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x2 SLOAD SWAP1 POP SWAP1 JUMP JUMPDEST PUSH1 0x0 PUSH1 0x7 SLOAD SWAP1 POP SWAP1 JUMP JUMPDEST PUSH1 0x0 PUSH1 0x5 PUSH1 0x0 SWAP1 SLOAD SWAP1 PUSH2 0x100 EXP SWAP1 DIV PUSH1 0xFF AND SWAP1 POP SWAP1 JUMP JUMPDEST PUSH1 0x0 PUSH1 0x3 SLOAD SWAP1 POP SWAP1 JUMP JUMPDEST DUP3 DUP1 SLOAD PUSH2 0x6E4 SWAP1 PUSH2 0xB37 JUMP JUMPDEST SWAP1 PUSH1 0x0 MSTORE PUSH1 0x20 PUSH1 0x0 KECCAK256 SWAP1 PUSH1 0x1F ADD PUSH1 0x20 SWAP1 DIV DUP2 ADD SWAP3 DUP3 PUSH2 0x706 JUMPI PUSH1 0x0 DUP6 SSTORE PUSH2 0x74D JUMP JUMPDEST DUP3 PUSH1 0x1F LT PUSH2 0x71F JUMPI DUP1 MLOAD PUSH1 0xFF NOT AND DUP4 DUP1 ADD OR DUP6 SSTORE PUSH2 0x74D JUMP JUMPDEST DUP3 DUP1 ADD PUSH1 0x1 ADD DUP6 SSTORE DUP3 ISZERO PUSH2 0x74D JUMPI SWAP2 DUP3 ADD JUMPDEST DUP3 DUP2 GT ISZERO PUSH2 0x74C JUMPI DUP3 MLOAD DUP3 SSTORE SWAP2 PUSH1 0x20 ADD SWAP2 SWAP1 PUSH1 0x1 ADD SWAP1 PUSH2 0x731 JUMP JUMPDEST JUMPDEST POP SWAP1 POP PUSH2 0x75A SWAP2 SWAP1 PUSH2 0x75E JUMP JUMPDEST POP SWAP1 JUMP JUMPDEST JUMPDEST DUP1 DUP3 GT ISZERO PUSH2 0x777 JUMPI PUSH1 0x0 DUP2 PUSH1 0x0 SWAP1 SSTORE POP PUSH1 0x1 ADD PUSH2 0x75F JUMP JUMPDEST POP SWAP1 JUMP JUMPDEST PUSH1 0x0 PUSH2 0x78E PUSH2 0x789 DUP5 PUSH2 0xA6D JUMP JUMPDEST PUSH2 0xA48 JUMP JUMPDEST SWAP1 POP DUP3 DUP2 MSTORE PUSH1 0x20 DUP2 ADD DUP5 DUP5 DUP5 ADD GT ISZERO PUSH2 0x7AA JUMPI PUSH2 0x7A9 PUSH2 0xCD3 JUMP JUMPDEST JUMPDEST PUSH2 0x7B5 DUP5 DUP3 DUP6 PUSH2 0xAF5 JUMP JUMPDEST POP SWAP4 SWAP3 POP POP POP JUMP JUMPDEST PUSH1 0x0 DUP3 PUSH1 0x1F DUP4 ADD SLT PUSH2 0x7D2 JUMPI PUSH2 0x7D1 PUSH2 0xCCE JUMP JUMPDEST JUMPDEST DUP2 CALLDATALOAD PUSH2 0x7E2 DUP5 DUP3 PUSH1 0x20 DUP7 ADD PUSH2 0x77B JUMP JUMPDEST SWAP2 POP POP SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 DUP2 CALLDATALOAD SWAP1 POP PUSH2 0x7FA DUP2 PUSH2 0xD07 JUMP JUMPDEST SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 DUP5 SUB SLT ISZERO PUSH2 0x816 JUMPI PUSH2 0x815 PUSH2 0xCDD JUMP JUMPDEST JUMPDEST PUSH1 0x0 DUP3 ADD CALLDATALOAD PUSH8 0xFFFFFFFFFFFFFFFF DUP2 GT ISZERO PUSH2 0x834 JUMPI PUSH2 0x833 PUSH2 0xCD8 JUMP JUMPDEST JUMPDEST PUSH2 0x840 DUP5 DUP3 DUP6 ADD PUSH2 0x7BD JUMP JUMPDEST SWAP2 POP POP SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 DUP1 PUSH1 0x0 DUP1 PUSH1 0x0 PUSH1 0xA0 DUP7 DUP9 SUB SLT ISZERO PUSH2 0x865 JUMPI PUSH2 0x864 PUSH2 0xCDD JUMP JUMPDEST JUMPDEST PUSH1 0x0 DUP7 ADD CALLDATALOAD PUSH8 0xFFFFFFFFFFFFFFFF DUP2 GT ISZERO PUSH2 0x883 JUMPI PUSH2 0x882 PUSH2 0xCD8 JUMP JUMPDEST JUMPDEST PUSH2 0x88F DUP9 DUP3 DUP10 ADD PUSH2 0x7BD JUMP JUMPDEST SWAP6 POP POP PUSH1 0x20 DUP7 ADD CALLDATALOAD PUSH8 0xFFFFFFFFFFFFFFFF DUP2 GT ISZERO PUSH2 0x8B0 JUMPI PUSH2 0x8AF PUSH2 0xCD8 JUMP JUMPDEST JUMPDEST PUSH2 0x8BC DUP9 DUP3 DUP10 ADD PUSH2 0x7BD JUMP JUMPDEST SWAP5 POP POP PUSH1 0x40 PUSH2 0x8CD DUP9 DUP3 DUP10 ADD PUSH2 0x7EB JUMP JUMPDEST SWAP4 POP POP PUSH1 0x60 PUSH2 0x8DE DUP9 DUP3 DUP10 ADD PUSH2 0x7EB JUMP JUMPDEST SWAP3 POP POP PUSH1 0x80 DUP7 ADD CALLDATALOAD PUSH8 0xFFFFFFFFFFFFFFFF DUP2 GT ISZERO PUSH2 0x8FF JUMPI PUSH2 0x8FE PUSH2 0xCD8 JUMP JUMPDEST JUMPDEST PUSH2 0x90B DUP9 DUP3 DUP10 ADD PUSH2 0x7BD JUMP JUMPDEST SWAP2 POP POP SWAP3 SWAP6 POP SWAP3 SWAP6 SWAP1 SWAP4 POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 DUP5 SUB SLT ISZERO PUSH2 0x92E JUMPI PUSH2 0x92D PUSH2 0xCDD JUMP JUMPDEST JUMPDEST PUSH1 0x0 PUSH2 0x93C DUP5 DUP3 DUP6 ADD PUSH2 0x7EB JUMP JUMPDEST SWAP2 POP POP SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH2 0x94E DUP2 PUSH2 0xABA JUMP JUMPDEST DUP3 MSTORE POP POP JUMP JUMPDEST PUSH2 0x95D DUP2 PUSH2 0xAE3 JUMP JUMPDEST DUP3 MSTORE POP POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0x96E DUP3 PUSH2 0xA9E JUMP JUMPDEST PUSH2 0x978 DUP2 DUP6 PUSH2 0xAA9 JUMP JUMPDEST SWAP4 POP PUSH2 0x988 DUP2 DUP6 PUSH1 0x20 DUP7 ADD PUSH2 0xB04 JUMP JUMPDEST PUSH2 0x991 DUP2 PUSH2 0xCE2 JUMP JUMPDEST DUP5 ADD SWAP2 POP POP SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH2 0x9A5 DUP2 PUSH2 0xAD9 JUMP JUMPDEST DUP3 MSTORE POP POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 ADD SWAP1 POP PUSH2 0x9C0 PUSH1 0x0 DUP4 ADD DUP5 PUSH2 0x954 JUMP JUMPDEST SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 ADD SWAP1 POP DUP2 DUP2 SUB PUSH1 0x0 DUP4 ADD MSTORE PUSH2 0x9E0 DUP2 DUP5 PUSH2 0x963 JUMP JUMPDEST SWAP1 POP SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x60 DUP3 ADD SWAP1 POP DUP2 DUP2 SUB PUSH1 0x0 DUP4 ADD MSTORE PUSH2 0xA02 DUP2 DUP7 PUSH2 0x963 JUMP JUMPDEST SWAP1 POP PUSH2 0xA11 PUSH1 0x20 DUP4 ADD DUP6 PUSH2 0x945 JUMP JUMPDEST DUP2 DUP2 SUB PUSH1 0x40 DUP4 ADD MSTORE PUSH2 0xA23 DUP2 DUP5 PUSH2 0x963 JUMP JUMPDEST SWAP1 POP SWAP5 SWAP4 POP POP POP POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 ADD SWAP1 POP PUSH2 0xA42 PUSH1 0x0 DUP4 ADD DUP5 PUSH2 0x99C JUMP JUMPDEST SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0xA52 PUSH2 0xA63 JUMP JUMPDEST SWAP1 POP PUSH2 0xA5E DUP3 DUP3 PUSH2 0xB69 JUMP JUMPDEST SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x40 MLOAD SWAP1 POP SWAP1 JUMP JUMPDEST PUSH1 0x0 PUSH8 0xFFFFFFFFFFFFFFFF DUP3 GT ISZERO PUSH2 0xA88 JUMPI PUSH2 0xA87 PUSH2 0xC9F JUMP JUMPDEST JUMPDEST PUSH2 0xA91 DUP3 PUSH2 0xCE2 JUMP JUMPDEST SWAP1 POP PUSH1 0x20 DUP2 ADD SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 DUP2 MLOAD SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 DUP3 DUP3 MSTORE PUSH1 0x20 DUP3 ADD SWAP1 POP SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 DUP2 ISZERO ISZERO SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 DUP2 SWAP1 POP PUSH2 0xAD4 DUP3 PUSH2 0xCF3 JUMP JUMPDEST SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 DUP2 SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0xAEE DUP3 PUSH2 0xAC6 JUMP JUMPDEST SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST DUP3 DUP2 DUP4 CALLDATACOPY PUSH1 0x0 DUP4 DUP4 ADD MSTORE POP POP POP JUMP JUMPDEST PUSH1 0x0 JUMPDEST DUP4 DUP2 LT ISZERO PUSH2 0xB22 JUMPI DUP1 DUP3 ADD MLOAD DUP2 DUP5 ADD MSTORE PUSH1 0x20 DUP2 ADD SWAP1 POP PUSH2 0xB07 JUMP JUMPDEST DUP4 DUP2 GT ISZERO PUSH2 0xB31 JUMPI PUSH1 0x0 DUP5 DUP5 ADD MSTORE JUMPDEST POP POP POP POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x2 DUP3 DIV SWAP1 POP PUSH1 0x1 DUP3 AND DUP1 PUSH2 0xB4F JUMPI PUSH1 0x7F DUP3 AND SWAP2 POP JUMPDEST PUSH1 0x20 DUP3 LT DUP2 EQ ISZERO PUSH2 0xB63 JUMPI PUSH2 0xB62 PUSH2 0xC41 JUMP JUMPDEST JUMPDEST POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH2 0xB72 DUP3 PUSH2 0xCE2 JUMP JUMPDEST DUP2 ADD DUP2 DUP2 LT PUSH8 0xFFFFFFFFFFFFFFFF DUP3 GT OR ISZERO PUSH2 0xB91 JUMPI PUSH2 0xB90 PUSH2 0xC9F JUMP JUMPDEST JUMPDEST DUP1 PUSH1 0x40 MSTORE POP POP POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0xBA5 DUP3 PUSH2 0xAD9 JUMP JUMPDEST SWAP2 POP PUSH32 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF DUP3 EQ ISZERO PUSH2 0xBD8 JUMPI PUSH2 0xBD7 PUSH2 0xBE3 JUMP JUMPDEST JUMPDEST PUSH1 0x1 DUP3 ADD SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH32 0x4E487B7100000000000000000000000000000000000000000000000000000000 PUSH1 0x0 MSTORE PUSH1 0x11 PUSH1 0x4 MSTORE PUSH1 0x24 PUSH1 0x0 REVERT JUMPDEST PUSH32 0x4E487B7100000000000000000000000000000000000000000000000000000000 PUSH1 0x0 MSTORE PUSH1 0x21 PUSH1 0x4 MSTORE PUSH1 0x24 PUSH1 0x0 REVERT JUMPDEST PUSH32 0x4E487B7100000000000000000000000000000000000000000000000000000000 PUSH1 0x0 MSTORE PUSH1 0x22 PUSH1 0x4 MSTORE PUSH1 0x24 PUSH1 0x0 REVERT JUMPDEST PUSH32 0x4E487B7100000000000000000000000000000000000000000000000000000000 PUSH1 0x0 MSTORE PUSH1 0x32 PUSH1 0x4 MSTORE PUSH1 0x24 PUSH1 0x0 REVERT JUMPDEST PUSH32 0x4E487B7100000000000000000000000000000000000000000000000000000000 PUSH1 0x0 MSTORE PUSH1 0x41 PUSH1 0x4 MSTORE PUSH1 0x24 PUSH1 0x0 REVERT JUMPDEST PUSH1 0x0 DUP1 REVERT JUMPDEST PUSH1 0x0 DUP1 REVERT JUMPDEST PUSH1 0x0 DUP1 REVERT JUMPDEST PUSH1 0x0 DUP1 REVERT JUMPDEST PUSH1 0x0 PUSH1 0x1F NOT PUSH1 0x1F DUP4 ADD AND SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x4 DUP2 LT PUSH2 0xD04 JUMPI PUSH2 0xD03 PUSH2 0xC12 JUMP JUMPDEST JUMPDEST POP JUMP JUMPDEST PUSH2 0xD10 DUP2 PUSH2 0xAD9 JUMP JUMPDEST DUP2 EQ PUSH2 0xD1B JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP JUMP INVALID LOG2 PUSH5 0x6970667358 0x22 SLT KECCAK256 EXTCODESIZE PUSH25 0x45405457CC453C873B08B9AA4A24A77E4A59484BCEAE01EA0E 0x4D 0xEB SWAP13 STOP SDIV PUSH5 0x736F6C6343 STOP ADDMOD SMOD STOP CALLER ",
	"sourceMap": "141:1788:0:-:0;;;534:1;510:25;;141:1788;;;;;;;;;;;;;;;;"
};

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
