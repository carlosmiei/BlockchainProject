var Transferencias = artifacts.require("./contracts/Transferencias.sol");
module.exports = function (callback) {
  var transf;
  Transferencias.deployed().then(function(deployed){
    transf = deployed;
    transf.adicionarEquipa("0x42C5c23F5068bf3d635857EeEBf2b4105ce35112");
    transf.adicionarEquipa("0xdbBbfC83B5Dd0e505a6dc12D7c5F993e6c23FD46");
    transf.adicionarEquipa("0xE0b303c8158BA5b545CbCE21Aa11FC2B62bF73E3");
    transf.adicionarEquipa("0x335a9E8ad25Fb0d576fF5F1405CE5775370a0b4F");
    transf.adicionarBanco("0x50C944f45603314164662310295993902121fBee");
    transf.adicionarBanco("0xC2eF946de5Fa4CF029f0Cd6437048cdbaed8869C");
    //transf.adicionarFederacao("0xC2eF946de5Fa4CF029f0Cd6437048cdbaed8869C");
  });
}