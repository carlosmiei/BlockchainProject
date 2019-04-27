var BlockTransfer = artifacts.require("./BlockTransfer.sol");


module.exports = function(deployer) {
  deployer.deploy(BlockTransfer);
};
