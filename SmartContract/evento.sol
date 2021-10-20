// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

/**
 * @title Storage
 * @dev Store & retrieve value in a variable
 */
contract Evento {

    struct Biglietto{
        uint256 ticketId;
        string validateHash;
        bool isValid;
        string owenerAddress;
    }

    string eventManager;
    string buyer;
    string reseller;
    string validator

    enum status { onsale, suspended, soldout, deleted }

    string nome;
    string data;
    uint256 numPosti;
    uint256 prezzoBiglietto;
    string luogo;
    status stato;
    Biglietto[] listaBiglietti;
    uint256 ticketCounter = 0;

    function setup(string memory _eventManager, string memory _buyer, string memory _reseller, string memory _validator) public {
        eventManager = _eventManager;
        buyer = _buyer;
        reseller = _reseller;
        validator = _validator;
    }

    function creaEvento(string memory _nome, string memory _data, uint256 _numPosti, uint256 _prezzoBiglietto, string memory _luogo) public {
        nome = _nome;
        data = _data;
        numPosti = _numPosti;
        prezzoBiglietto = _prezzoBiglietto;
        luogo = _luogo;
        stato = status.onsale;
    }

    function venditaBiglietto(string memory owenerAddress) public {
        listaBiglietti.push(Biglietto(ticketCounter, "", true, owenerAddress));
        ticketCounter++;
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

    function getPrezzoBiglietto() public view returns (uint256){
        return prezzoBiglietto;
    }

    function getLuogo() public view returns (string memory){
        return luogo;
    }

    function getStato() public view returns (status){
        return stato;
    }

    function getNumeroBiglietti() public view returns (uint256){
        return ticketCounter;
    }

    function getBiglietto(uint256 ticketId) public view returns (string memory, bool, string memory){
        return (listaBiglietti[ticketId].validateHash, listaBiglietti[ticketId].isValid, listaBiglietti[ticketId].owenerAddress);
    }


}
