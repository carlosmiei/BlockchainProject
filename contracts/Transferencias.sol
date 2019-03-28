pragma solidity ^0.5.0;

contract Transferencias {

    address[] public participantes;
    string public owner;
    bytes32 public owner2;

    struct Fatura{
        uint hashVenda;
        uint estadoVenda;
    }

    uint[] KeysFaturas;
    mapping (address => Fatura) transacoes;
    
    //eventos teste 
    event Exemplo(
       string name,
       uint age
    );
    
    /// The smart contract's constructor
    constructor() public {
        owner = "primeiro";
        owner2= calculateHash("primeiro");
        

        //adicionar os participantes
        participantes.push(0x1Fb4C08AeA29A6642D8C963F1ca01c15C63385bc);
        participantes.push(0xdB254AFdcaCEa500C4f7449c4b9F9DA3e1224F81);

    }

    function adicionarParticipante() public{
        participantes.push(msg.sender);
        emit Exemplo("ola",123); 

    }

    function getLength() public  view returns (uint count) {

        require(isMember(msg.sender) == true,"Sender not authorized.");
        return participantes.length;
    }


    function calculateHash(string memory s )  private  returns (bytes32 res) 
    {
        return keccak256(abi.encodePacked(s));
    }

    function isMember(address add) private view returns (bool res) {
        res=false;
        for (uint i=0; i<participantes.length; i++) {
            if (participantes[i] == msg.sender) {
                res=true;
                break;
            }
        }
        return res;
    }

}

