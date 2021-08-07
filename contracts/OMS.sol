// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.22 <0.9.0;
pragma experimental ABIEncoderV2;

import './Ownable.sol';


struct Medicament{
      string nom;
      string dosage;
      string forme;
      string presentation;
      string conditionnement;
      string specification;
      string dci;
      string classement_VEIC; //change to enum
      string classe_therapeutic;
      string sous_classe;
      string tableau;
      string duree_conservation;
      string generique; //change to enum
}

struct Laboratoire{
      string nom;
      string countryCode;
}




contract OMS is Ownable {

  mapping (string => address) countryToAddress;
  mapping (string => Medicament) DCITomedicamentsInterdis;
  mapping (string => Laboratoire) listLabos;
  

//returns true if prohibited
  function checkProhibitedDrug(string memory dci) view public returns(bool){
        if (keccak256(abi.encodePacked(DCITomedicamentsInterdis[dci].dci)) == keccak256(abi.encodePacked(""))){
              return false;
        }else{
              return true;
        }
  }

  function addOrUpdateProhibitedDrug(Medicament memory medicament) public onlyOwner {
       DCITomedicamentsInterdis[medicament.dci] = medicament;
  }

  function addOrUpdateLocalAuthority(string memory countryCode, address localAuthority) public onlyOwner returns (address) {
        countryToAddress[countryCode] = localAuthority; 
        return countryToAddress[countryCode];
  }

  

  
}