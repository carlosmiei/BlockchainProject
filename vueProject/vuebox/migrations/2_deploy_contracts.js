var Users = artifacts.require("./Users.sol");
var Transferencias = artifacts.require("./Transferencias.sol");


module.exports = function(deployer) {
  deployer.deploy(Users);
  deployer.deploy(Transferencias);
};
