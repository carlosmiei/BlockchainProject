pragma solidity ^0.5.0;

contract Transferencias {

    address[] public participantes;
    string  owner;

    struct Jogador{
        uint id;
        string nome;
        uint idade;
        string nascimento;
    }

    struct Venda {
        uint contribuinteOri;
        uint contribuinteDest;
        uint valorTotal;
        uint valorIva;
        Jogador jogador;
        uint data;  
    }

    struct Fatura{
        uint hashVenda;
        Venda venda;
        uint estadoVenda;
    }

    
    mapping (address => Fatura) transacoes;
    mapping (uint => Jogador) jogadores;


    
    /// The smart contract's constructor
    constructor() public {
        owner = "primeiro";
    
    }
    event Exemplo(
       string name,
       uint age
    );

    function adicionarParticipante() public{
        participantes.push(msg.sender);
        emit Exemplo("ola",123); 

    }

    function getLength() public view returns (uint count) {
        return participantes.length;
    }
    


}

