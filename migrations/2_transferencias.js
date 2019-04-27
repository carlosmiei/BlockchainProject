const Migrations = artifacts.require("./Transferencias.sol");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
};