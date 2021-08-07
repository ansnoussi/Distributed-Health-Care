
const { assert } = require("chai");
const OMS = artifacts.require("./OMS.sol");
const LocalAuthority = artifacts.require("./LocalAuthority.sol");

contract("OMS", () => {
  it("Should deploy smart contract properly", async () => {
    const oMS = await OMS.deployed();
    assert(oMS.adress !== "");
  });

  it("Should add Prohibited Drug", async () => {
    const oMS = await OMS.deployed();
    let medicament = {
      nom: "nametest",
      dosage: "dosagetest",
      forme: "formetest",
      presentation: "presentationtest",
      conditionnement: "conditionnementtest",
      specification: "specificationtest",
      dci: "dcitest",
      classement_VEIC: "classement_VEICtest",
      classe_therapeutic: "classe_therapeutictest",
      sous_classe: "sous_classetest",
      tableau: "tableautest",
      duree_conservation: "duree_conservationtest",
      generique: "generiquetest",
    };

    await oMS.addOrUpdateProhibitedDrug(medicament);
    const result = await oMS.checkProhibitedDrug("dcitest");
    assert(result === true);
  });

  it("Should add LocalAuthority", async () => {
    const oMS = await OMS.deployed();
    const localAuthority = await LocalAuthority.deployed();
    const result = await oMS.addOrUpdateLocalAuthority(
      "TUN",
      localAuthority.address
    );

    //console.log(result);
    assert(
      result.from !== '',
      "Failed when adding local authority"
    );

    assert(result.to !== '', "Failed when adding local authority");

  });
});
