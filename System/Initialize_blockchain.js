async function main(){
  const Web3 = require("web3");

  var numOfNodes = 4;

  const fs = require('fs');

  // delete a file
  fs.unlink('accounts.txt', (err) => {
      if (err) {
        console.log("creo file");
      }
  });

  for(let i = 0; i < numOfNodes; i++){
    let web3 = new Web3('http://localhost:2200' + i);
    const Contract = require("./contract.js");
    const cont = new Contract();
    var abi = cont.abi;
    await web3.eth.getAccounts().then((value)=> {
      console.log("Accounts[" + i + "]" + value[0]);
      fs.writeFile('accounts.txt', value[0] + "\n", { flag: 'a+' }, err => {
        if (err) {
          console.error(err)
          return
        }
      });
    });
  }
}

main();
