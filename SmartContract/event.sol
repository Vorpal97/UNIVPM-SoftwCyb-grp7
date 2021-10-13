// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

/**
 * @title Storage
 * @dev Store & retrieve value in a variable
 */
contract Evento {

    enum status { onsale, suspended, soldout, deleted }

    string nome;
    string data;
    uint256 numPosti;
    uint256 prezzoBiglietto;
    string luogo;
    status stato;


    function creaEvento(string memory _nome, string memory _data, uint256 _numPosti, uint256 _prezzoBiglietto, string memory _luogo) public {
        nome = _nome;
        data = _data;
        numPosti = _numPosti;
        prezzoBiglietto = _prezzoBiglietto;
        luogo = _luogo;
        stato = status.onsale;
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

}
