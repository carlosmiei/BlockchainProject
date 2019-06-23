var Transferencias = artifacts.require("./contracts/Transferencias.sol");
module.exports = function (callback) {
  var transf;
  Transferencias.deployed().then(function(instance){
    transf = instance;
    web3.eth.getAccounts().then(accounts => {
	    // transf.adicionarFederacao(accounts[1]);
	    // transf.adicionarBanco(accounts[2]);
	    // transf.adicionarBanco(accounts[3]);
	    // transf.adicionarEquipa(accounts[4]);
	    // transf.adicionarEquipa(accounts[5]);
	    // transf.adicionarEquipa(accounts[6]);
	    // transf.adicionarEquipa(accounts[7]);
    });
  });
}

