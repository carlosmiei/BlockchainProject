pragma solidity ^0.5.0;

contract Users {

  mapping(address => bytes32) public users;

  struct Fatura{
        bytes32 hashVenda;
        uint estadoVenda;
        uint valorTotal;
    }

  bytes32[] KeysFaturas;
  mapping (bytes32 => Fatura) transacoes;

  event PagamentoEfetuado(
       bytes32 hash
    );

  event UserCreated(address indexed _address, bytes32 _pseudo);
  event UserDestroyed(address indexed _address);

  function exists (address _address) public view returns (bool _exists) {
    return (users[_address] != bytes32(0));
  }

  function authenticate () public view returns (bytes32 _pseudo) {
    require(exists(msg.sender));
    return (users[msg.sender]);
  }

  function create (bytes32 _pseudo) public {
    users[msg.sender] = _pseudo ;
    emit UserCreated(msg.sender, _pseudo);
  }

  function destroy () public {
    require(exists(msg.sender));
    delete users[msg.sender];
    emit UserDestroyed(msg.sender);
  }

  function get (address _address) public view returns(bytes32 _pseudo) {
    require(exists(_address));
    return (users[_address]);
  }

  function adicionarFatura(bytes32 _hash2) public  {
        //require(isMember(msg.sender) == true,"Sender not authorized.");
        
        Fatura  memory myStruct = Fatura({hashVenda:_hash2, estadoVenda:1,valorTotal:50});
        KeysFaturas.push(_hash2);
        transacoes[_hash2]=myStruct;
        emit PagamentoEfetuado(_hash2);
    }

}
