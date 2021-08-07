const { assert } = require("chai");

const LocalAuthority = artifacts.require("LocalAuthority.sol");

contract("LocalAuthority", () => {
  let localAuthority = null;
  let medicament = null;
  let lab = null;

  before(async () => {
    medicament = {
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

    lab = { nom: "labtest", countryCode: "1451245" };

    localAuthority = await LocalAuthority.deployed();

    reclamation = {
      sender: localAuthority.address,
      image: "imagetest",
      longitude: "longitudetest",
      latitude: "latitude",
      nom: "nomtest",
      dosage: "dosagetest",
      forme: "formetest",
      presentation: "presentationtest",
    };
  });

  it("Should deploy smart contract properly", async () => {
    assert(localAuthority.adress !== "");
  });

  it("Should add AMM", async () => {
    const result = await localAuthority.addAMM(medicament, 0, "datetest", lab);
    const resultMed = result.logs[0].args.amm.medicament;
    const resultLab = result.logs[0].args.amm.lab;

    assert(resultMed.nom === medicament.nom);
    assert(resultMed.dosage === medicament.dosage);
    assert(resultMed.forme === medicament.forme);
    assert(resultMed.presentation === medicament.presentation);
    assert(resultMed.conditionnement === medicament.conditionnement);
    assert(resultMed.specification === medicament.specification);
    assert(resultMed.dci === medicament.dci);
    assert(resultMed.classement_VEIC === medicament.classement_VEIC);
    assert(resultMed.classe_therapeutic === medicament.classe_therapeutic);
    assert(resultMed.sous_classe === medicament.sous_classe);
    assert(resultMed.tableau === medicament.tableau);
    assert(resultMed.duree_conservation === medicament.duree_conservation);
    assert(resultMed.generique === medicament.generique);

    assert(resultLab.nom === lab.nom);
    assert(resultLab.countryCode === lab.countryCode);

    assert(result.logs[0].args.amm.dateAMM === "datetest");
  });

  it("Should check drug veracity", async () => {
    const result = await localAuthority.checkDrugVeracity(
      "nametest",
      "dosagetest",
      "formetest",
      "presentationtest"
    );
    assert(result === true);
  });

  it("Should display drug details", async () => {
    const resultMed = await localAuthority.displayDrugDetails(
      "nametest",
      "dosagetest",
      "formetest",
      "presentationtest"
    );

    assert(resultMed.nom === medicament.nom);
    assert(resultMed.dosage === medicament.dosage);
    assert(resultMed.forme === medicament.forme);
    assert(resultMed.presentation === medicament.presentation);
    assert(resultMed.conditionnement === medicament.conditionnement);
    assert(resultMed.specification === medicament.specification);
    assert(resultMed.dci === medicament.dci);
    assert(resultMed.classement_VEIC === medicament.classement_VEIC);
    assert(resultMed.classe_therapeutic === medicament.classe_therapeutic);
    assert(resultMed.sous_classe === medicament.sous_classe);
    assert(resultMed.tableau === medicament.tableau);
    assert(resultMed.duree_conservation === medicament.duree_conservation);
    assert(resultMed.generique === medicament.generique);
  });

  it("Should update AMM", async () => {
    const result = await localAuthority.updateAMM(
      medicament,
      0,
      "datetest2",
      lab,
      1
    );
    const checkVeracity = await localAuthority.checkDrugVeracity(
      "nametest",
      "dosagetest",
      "formetest",
      "presentationtest"
    );

    status = result.logs[0].args.amm.status;
    const resultMed = result.logs[0].args.amm.medicament;
    const resultLab = result.logs[0].args.amm.lab;

    assert(resultMed.nom === medicament.nom);
    assert(resultMed.dosage === medicament.dosage);
    assert(resultMed.forme === medicament.forme);
    assert(resultMed.presentation === medicament.presentation);
    assert(resultMed.conditionnement === medicament.conditionnement);
    assert(resultMed.specification === medicament.specification);
    assert(resultMed.dci === medicament.dci);
    assert(resultMed.classement_VEIC === medicament.classement_VEIC);
    assert(resultMed.classe_therapeutic === medicament.classe_therapeutic);
    assert(resultMed.sous_classe === medicament.sous_classe);
    assert(resultMed.tableau === medicament.tableau);
    assert(resultMed.duree_conservation === medicament.duree_conservation);
    assert(resultMed.generique === medicament.generique);

    assert(resultLab.nom === lab.nom);
    assert(resultLab.countryCode === lab.countryCode);

    assert(result.logs[0].args.amm.dateAMM === "datetest2");
    assert(status == 1);
  });

  it("Send Reclammation", async () => {
    const result = await localAuthority.sendReclamation(reclamation);
    reclamationReceived = result.logs[0].args.reclamation;

    assert(reclamationReceived.sender !== "");
    assert(reclamationReceived.image === reclamation.image);
    assert(reclamationReceived.longitude === reclamation.longitude);
    assert(reclamationReceived.latitude === reclamation.latitude);
    assert(reclamationReceived.nom === reclamation.nom);
    assert(reclamationReceived.dosage === reclamation.dosage);
    assert(reclamationReceived.forme === reclamation.forme);
    assert(reclamationReceived.presentation === reclamation.presentation);
  });
});