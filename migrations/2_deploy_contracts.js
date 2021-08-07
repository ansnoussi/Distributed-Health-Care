var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var Ownable = artifacts.require("./Ownable.sol");
var OMS = artifacts.require("./OMS.sol");
var LocalAuthority = artifacts.require("./LocalAuthority.sol");

module.exports = function (deployer) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(Ownable);
  deployer.deploy(OMS);
  deployer.deploy(LocalAuthority);
};
