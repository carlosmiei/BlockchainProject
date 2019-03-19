pragma solidity ^0.5.0;

contract Transferencias {

    address[10] public participantes;
    string public owner;
    
      /// The smart contract's constructor
    constructor() public {
        owner = "primeiro";
    
    }

    function mudar() public{
        owner = "segundo";
    }



}

