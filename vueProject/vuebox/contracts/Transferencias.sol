pragma solidity ^0.5.0;

contract Transferencias {

    address[] public participantes;
    string public owner;
    bytes32 public owner2;

    struct Fatura{
        bytes32 hashVenda;
        uint estadoVenda;
        uint valorTotal;
    }

    bytes32[] KeysFaturas;
    mapping (bytes32 => Fatura) transacoes;
    
    //eventos teste 
    event PagamentoEfetuado(
       bytes32 hash
    );
    
    /// The smart contract's constructor
    constructor() public {
        owner = "BlockTransferCompany";
        owner2= calculateHash("primeiro");
        
        //adicionar os participantes
        participantes.push(0x1Fb4C08AeA29A6642D8C963F1ca01c15C63385bc);
        participantes.push(0xdB254AFdcaCEa500C4f7449c4b9F9DA3e1224F81);

    }

    function adicionarFatura(bytes32 _hash2) public  {
        //require(isMember(msg.sender) == true,"Sender not authorized.");
        
        Fatura  memory myStruct = Fatura({hashVenda:_hash2, estadoVenda:1,valorTotal:50});
        KeysFaturas.push(_hash2);
        transacoes[_hash2]=myStruct;
        emit PagamentoEfetuado(_hash2);
    }

    function alterarEstadoFatura(bytes32 hash2, uint estado) public{

            require(isMember(msg.sender) == true,"Sender not a  uthorized.");
            transacoes[hash2].estadoVenda=estado;
            emit PagamentoEfetuado(hash2);
            //emitir aqui qqr coisa dependentemente disto        
    }

    function getEstado(bytes32 hash2) public view returns (uint estado) {
            require(isMember(msg.sender) == true,"Sender not authorized.");
            Fatura memory fatura = transacoes[hash2];
            return fatura.estadoVenda;
    }

    function getOwner() public view returns (string  memory owne) {
        return  owner;
    }

    function adicionarParticipante() public{
        require(isMember(msg.sender) == true,"Sender not authorized.");
        participantes.push(msg.sender);
        //emit PagamentoEfetuado(bytes32(111)); 

    }

    function getLength() public  view returns (uint count) {
        //require(isMember(msg.sender) == true,"Sender not authorized.");
        return participantes.length;
    }


    function calculateHash(string memory s )  private  returns (bytes32 res) {
        return keccak256(abi.encodePacked(s));
    }

    function isMember(address add) private view returns (bool res) {
        res=false;
        for (uint i=0; i<participantes.length; i++) {
            if (participantes[i] == add) {
                res=true;
                break;
            }
        }
        return res;
    }

}
