// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

/**
 * @title Storage
 * @dev Store & retrieve value in a variable
 */
contract Evento {

    struct Biglietto{
        uint256 ticketId;
        bytes32 validateHash;
        bool isValid;
        address ownerAddress;
    }

    address payable eventManager;
    address buyer;
    address reseller;
    address validator;

    enum status {inVendita, sospeso, soldout, cancellato, terminato}

    string nomeEvento;
    string dataEvento;
    uint256 numPosti;
    uint256 postiDisponibili;
    uint256 prezzoBiglietto;
    string luogo;
    status stato;
    Biglietto[] listaBiglietti;
    uint256 ticketCounter;
    bool initialization = true;


    //INITIALIZATION
    function setup(address payable _eventManager, address _buyer, address _reseller, address _validator) public {
        if(initialization){
            eventManager = _eventManager;
            buyer = _buyer;
            reseller = _reseller;
            validator = _validator;
            initialization = false;
        }
    }

    function creaEvento(string memory _nomeEvento, string memory _dataEvento, uint256 _numPosti, uint256 _prezzoBiglietto, string memory _luogo) public {
      if(msg.sender == eventManager){
        nomeEvento = _nomeEvento;
        dataEvento = _dataEvento;
        numPosti = _numPosti;
        postiDisponibili = _numPosti;
        prezzoBiglietto = _prezzoBiglietto;
        luogo = _luogo;
        stato = status.inVendita;
        ticketCounter = 0;
      }
    }

    //GETTER
    function getAddresses() public view returns(address, address, address, address){
      return (eventManager, buyer, reseller, validator);
    }


    function getBiglietto(uint256 ticketId) public view returns (bytes32, bool, address){
          return (listaBiglietti[ticketId].validateHash, listaBiglietti[ticketId].isValid, listaBiglietti[ticketId].ownerAddress);
    }

    /*function send() public payable {
      if(msg.sender == eventManager){
        uint256 tot = prezzoBiglietto*(numPosti - postiDisponibili);
        uint256 toEvMan = (tot/100)*70;
        uint256 toRes = (tot/100)*30;
        eventManager.transfer(toEvMan);
        eventManager.transfer(toRes);
      }
    }*/

    function getTicketCounter() public view returns (uint256){
      if(msg.sender = eventManager){
        return ticketCounter;
      }
    }

    function getAddressChiamante() public view returns (address) {
      return msg.sender;
    }

    function getNomeEvento() public view returns (string memory){
        return nomeEvento;
    }

    function getDataEvento() public view returns (string memory){
        return dataEvento;
    }

    function getNumPosti() public view returns (uint256){
        return numPosti;
    }

    function getPostiDisponibili() public view returns (uint256){
        return postiDisponibili;
    }

    function getPrezzoBiglietto() public view returns (uint256){
        return prezzoBiglietto;
    }

    function getLuogo() public view returns (string memory){
        return luogo;
    }

    function getStato() public view returns (status){
        return stato;
    }

    function getListaBiglietti() public view returns (Biglietto[]){
      return listaBiglietti;
    }

    //SETTER
    function setNomeEvento(string memory _newNomeEvento) public {
      if(msg.sender = eventManager){
        nomeEvento = _newNomeEvento;
      }
    }

    function setNomeEvento(string memory _newDataEvento) public {
      if(msg.sender = eventManager){
        dataEvento = _newDataEvento;
      }
    }

    function setNumPosti(string memory _newNumPosti) public {
      if(msg.sender = eventManager){
        numPosti = _newNumPosti;
      }
    }

    function setPostiDisponibili(string memory _newPostiDisponibili) public {
      if(msg.sender = eventManager){
        postiDisponibili = _newPostiDisponibili;
      }
    }

    function setPrezzoBiglietto(string memory _newPrezzoBiglietto) public {
      if(msg.sender = eventManager){
        prezzoBiglietto = _newPrezzoBiglietto;
      }
    }

    function setLuogo(string memory _newLuogo public {
      if(msg.sender = eventManager){
        luogo+ = _newLuogo;
      }
    }

    function setStatoInVendita() public {
      if(msg.sender = eventManager){
        stato = status.inVendita;
      }
    }

    function setStatoSospeso() public {
      if(msg.sender = eventManager){
        stato = status.sospeso;
      }
    }

    function setStatoSoldout() public  {
      if(msg.sender = eventManager){
        stato = status.soldout;
      }
    }

    function setStatoCancellato() public {
      if(msg.sender = eventManager){
        stato = status.cancellato;
      }
    }

    //SERVICES
    function isOnSale() public view returns (bool){
        if(stato == status.inVendita)
          return true;
        else
          return false;
    }

    function venditaBiglietto(address ticketBuyer) public {
      if((postiDisponibili > 0) && (confermaPagamento()) && (stato == status.inVendita)){
        bytes32 sigillo = sigillaBiglietto(ticketCounter, ticketBuyer);
        listaBiglietti.push(Biglietto(ticketCounter, sigillo, true, ticketBuyer));
        ticketCounter = ticketCounter + 1;
        postiDisponibili = postiDisponibili - 1;
        if (postiDisponibili == 0){
          stato = status.soldout;
        }
      }
    }

    function confermaPagamento() private pure returns (bool) {
      return true;
    }

    function sigillaBiglietto(uint256 _ticketCounter, address ownerAddress) private view returns(bytes32){
      return keccak256(abi.encodePacked(_ticketCounter, ownerAddress, address(this)));
    }

}
