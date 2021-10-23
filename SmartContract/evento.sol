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

    string nome;
    string data;
    uint256 numPosti;
    uint256 postiDisponibili;
    uint256 prezzoBiglietto;
    string luogo;
    status stato;
    Biglietto[] listaBiglietti;
    uint256 ticketCounter;

/*
    function setup(address payable _eventManager, address _buyer, address _reseller, address _validator) public {
        eventManager = _eventManager;
        buyer = _buyer;
        reseller = _reseller;
        validator = _validator;
    }
*/
    function creaEvento(string memory _nome, string memory _data, uint256 _numPosti, uint256 _prezzoBiglietto, string memory _luogo, uint256 _ticketCounter) public {
        nome = _nome;
        data = _data;
        numPosti = _numPosti;
        postiDisponibili = _numPosti;
        prezzoBiglietto = _prezzoBiglietto;
        luogo = _luogo;
        stato = status.inVendita;
        ticketCounter = _ticketCounter;
    }

    function send() public payable {
        uint256 tot = prezzoBiglietto*(numPosti - postiDisponibili);
        uint256 toEvMan = (tot/100)*70;
        uint256 toRes = (tot/100)*30;
        eventManager.transfer(toEvMan);
        eventManager.transfer(toRes);
      }

    function getNome() public view returns (string memory){
        return nome;
    }

    function getData() public view returns (string memory){
        return data;
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

    function onSale() public view returns (bool){
        if(stato == status.inVendita)
          return true;
        else
          return false;
    }

    function setStatoInVendita() public {
      stato = status.inVendita;
    }

    function setStatoSospeso() public {
      stato = status.sospeso;
    }

    function setStatoSoldout() public  {
      stato = status.soldout;
    }

    function setStatoCancellato() public {
      stato = status.cancellato;
    }

    function getNumeroBiglietti() public view returns (uint256){
        return ticketCounter;
    }

    function getBiglietto(uint256 ticketId) public view returns (bytes32, bool, address){
        return (listaBiglietti[ticketId].validateHash, listaBiglietti[ticketId].isValid, listaBiglietti[ticketId].ownerAddress);
    }

    function sigillaBiglietto(uint256 _ticketCounter, address ownerAddress) private view returns(bytes32){
      return keccak256(abi.encodePacked(_ticketCounter, ownerAddress, address(this)));
    }

    function confermaPagamento() private pure returns (bool) {
      return true;
    }

    function getAddressChiamante() public view returns (address) {
      return msg.sender;
    }

    function venditaBiglietto(address ticketBuyer) public {
      //buyer = msg.sender;  NON FUNZIONA
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

}
