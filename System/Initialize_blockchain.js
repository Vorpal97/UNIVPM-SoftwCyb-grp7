const Web3 = require("web3");

var numOfNodes = 4;

//uno().then(due());
//setTimeout(uno, 3000);
//setTimeout(due, 3000);

const fs = require('fs');

// delete a file
fs.unlink('accounts.txt', (err) => {
    if (err) {
      console.log("creo file");
    }
});

for(i = 0; i < numOfNodes; i++){

  let web3 = new Web3('http://localhost:2200' + i);

  const Contract = require("./contract.js");
  const cont = new Contract();

  var abi = cont.abi;

  web3.eth.getAccounts().then((value)=> {
    console.log("Accounts: " + value[0]);
    fs.appendFileSync('accounts.txt', value[0] + "\n");
  });
}
