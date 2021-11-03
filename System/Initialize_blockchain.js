async function main(){
  const Web3 = require("web3");

  var numOfNodes = 4;

  const fs = require('fs');

  // delete a file
  // fs.unlink('accounts.txt', (err) => {
  //     if (err) {
  //       console.log("creo file");
  //     }
  // });
  //
  // fs.unlink('contracts.json', (err) => {
  //     if (err) {
  //       console.log("inizializzo i contratti");
  //     }
  // });

  fs.writeFileSync("accounts.txt","");
  fs.writeFileSync("contracts.json","");

  for(let i = 0; i < numOfNodes; i++){
    let web3 = new Web3('http://localhost:2200' + i);
    const Contract = require("./contract.js");
    const cont = new Contract();
    var abi = cont.abi;
    await web3.eth.getAccounts().then((value)=> {
      console.log("Accounts[" + i + "]" + value[0]);
      fs.writeFileSync("accounts.txt", value[0] + "\n", {
      encoding: "utf8",
      flag: "a+",
      mode: 0o666
    });
      // fs.writeFile('accounts.txt', value[0] + "\n", { flag: 'w' }, err => {
      //   if (err) {
      //     console.error(err)
      //     return
      //   }
      // });
    }).catch(() => {
      console.log("Si è verificato un errore!")
    });
  }
}

main();
