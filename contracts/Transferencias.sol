pragma solidity ^0.5.0;

contract Transferencias {

    address[] public participantes;
    string public owner;



    
    /// The smart contract's constructor
    constructor() public {
        owner = "primeiro";
    
    }
    event Instructor(
       string name,
       uint age
    );

    function adicionarParticipante() public{
        participantes.push(msg.sender);
        emit Instructor("ola",123); 

    }

    function getLength() public view returns (uint count) {
        return participantes.length;
    }
    


}

