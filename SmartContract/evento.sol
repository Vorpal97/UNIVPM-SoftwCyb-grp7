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
        bool endorsed;
        address ownerAddress;
    }

    address eventManager;
    address buyer;
    address validator;

    enum status {inVendita, inCorso, sospeso, soldout, cancellato, terminato}

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
    bool pagato = false;


    //INITIALIZATION
    function setup(address payable _eventManager, address _buyer, address _validator) public {
        if(initialization){
            eventManager = _eventManager;
            buyer = _buyer;
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

    function getEventManager() public view returns (address) {
      return eventManager;
    }

    function getBuyer() public view returns (address) {
      return buyer;
    }

    function getValidator() public view returns (address) {
      return validator;
    }

    function getBiglietto(uint256 ticketId) public view returns (bool, uint256, bytes32, bool, bool, address){
      if(ticketId < ticketCounter){
          return (true, listaBiglietti[ticketId].ticketId, listaBiglietti[ticketId].validateHash, listaBiglietti[ticketId].isValid, listaBiglietti[ticketId].endorsed, listaBiglietti[ticketId].ownerAddress);
      }else{
        return (false, 0, 0, false, false,address(0));
      }
    }

    function getBigliettoByAddress() public view returns (string memory) {
      string memory tickets;
      for (uint256 i=0; i < ticketCounter; i++){
        if (listaBiglietti[i].ownerAddress == msg.sender){
          tickets = append(tickets, uint2str(listaBiglietti[i].ticketId), ";");
        }
      }
      return tickets;
    }

    function isBigliettoVidimato(uint256 ticketId) public view returns (bool){
      if(ticketId < ticketCounter && listaBiglietti[ticketId].endorsed == true){
        return true;
      } else{
        return false;
      }
    }

    function isTerminato() public view returns (bool){
      if(stato == status.terminato){
        return true;
      } else{
        return false;
      }
    }

    function getTicketCounter() public view returns (uint256){
        return ticketCounter;
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

    function getPagato() public view returns (bool) {
        return pagato;
    }

    //SETTER
    function setNomeEvento(string memory _newNomeEvento) public {
      if(msg.sender == eventManager){
        nomeEvento = _newNomeEvento;
      }
    }

    function setNumPosti(uint256 _newNumPosti) public {
      if(msg.sender == eventManager){
        numPosti = _newNumPosti;
      }
    }

  function setPostiDisponibili(uint256 _newPostiDisponibili) public {
    if(msg.sender == eventManager){
      postiDisponibili = _newPostiDisponibili;
    }
  }

    function setData(string memory _dataEvento) public {
      if(msg.sender == eventManager){
        dataEvento = _dataEvento;
      }
    }

    function setPrezzoBiglietto(uint256 _newPrezzoBiglietto) public {
      if(msg.sender == eventManager){
        prezzoBiglietto = _newPrezzoBiglietto;
      }
    }

    function setLuogo(string memory _newLuogo) public {
      if(msg.sender == eventManager){
        luogo = _newLuogo;
      }
    }

    function setStatoInVendita() public {
      if(msg.sender == eventManager){
        stato = status.inVendita;
      }
    }

    function setStatoInCorso() public {
      if(msg.sender == eventManager){
        stato = status.inCorso;
      }
    }

    function setStatoSospeso() public {
      if(msg.sender == eventManager){
        stato = status.sospeso;
      }
    }

    function setStatoSoldout() public  {
      if(msg.sender == eventManager){
        stato = status.soldout;
      }
    }

    function setStatoCancellato() public {
      if(msg.sender == eventManager){
        stato = status.cancellato;
      }
    }

    function setStatoTerminato() public {
      if(msg.sender == eventManager){
        stato = status.terminato;
      }
    }

    function setPagato() public {
      if(msg.sender == eventManager){
        pagato = true;
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
        listaBiglietti.push(Biglietto(ticketCounter, sigillo, true, false, ticketBuyer));
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

    function vidimaBiglietto(uint256 ticketId) public {
      if(msg.sender == validator && ticketId < ticketCounter){
        if(listaBiglietti[ticketId].isValid==true && listaBiglietti[ticketId].endorsed == false){
          listaBiglietti[ticketId].endorsed = true;
        }
      }
    }

    function redistribuisciIncassi() public view returns(int256){
      if(msg.sender == eventManager && pagato == false){
          int256 t = int256((ticketCounter * prezzoBiglietto) / 2);
          return t;
      }
      return -1;
    }

    function append(string memory a, string memory b, string memory c) internal pure returns (string memory) {
      return string(abi.encodePacked(a, b, c));
  }

  function uint2str(uint _i) internal pure returns (string memory _uintAsString) {
          if (_i == 0) {
              return "0";
          }
          uint j = _i;
          uint len;
          while (j != 0) {
              len++;
              j /= 10;
          }
          bytes memory bstr = new bytes(len);
          uint k = len;
          while (_i != 0) {
              k = k-1;
              uint8 temp = (48 + uint8(_i - _i / 10 * 10));
              bytes1 b1 = bytes1(temp);
              bstr[k] = b1;
              _i /= 10;
          }
          return string(bstr);
      }
}
