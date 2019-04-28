pragma solidity ^0.5.0;

contract Transferencias {

    address[] public equipas;
    address[] public bancos;
    address[] public federacao;
    address public ownerAcc;
    string public owner;
    bytes32 public owner2;

    struct Fatura{
        uint valorTotal;
        bytes32 data;
        uint estadoVenda;
    }

    bytes32[] KeysFaturas;
    mapping (bytes32 => Fatura) transacoes;
    
    //eventos teste 
    event nextStage(
       bytes32 id,
       uint estadoFatura
    );

    event addEquipa(
       address equipa
    );

    event addBanco(
       address banco
    );
    
    /// The smart contract's constructor
    constructor() public {
        owner = "primeiro";
        owner2 = calculateHash("primeiro");
        ownerAcc = 0x24BF0ffC4daf52B0df27640882E202b0AAd98B11;
        
        //adicionar os participantes
        equipas.push(0x1Fb4C08AeA29A6642D8C963F1ca01c15C63385bc);
        equipas.push(0xdB254AFdcaCEa500C4f7449c4b9F9DA3e1224F81);

    }

    function adicionaFatura(uint valor, bytes32 emitData, bytes32 hash) public {
        require(isMember(msg.sender) == true,"Sender not authorized.");
        
        Fatura memory myStruct = Fatura({valorTotal:valor, data:emitData, estadoVenda:1});
        KeysFaturas.push(hash);
        transacoes[hash] = myStruct;
        emit nextStage(hash,1);
    }

    function recebeFatura(bytes32 hash) public{
        require(isMember(msg.sender) == true,"Sender not authorized.");
        require(transacoes[hash].estadoVenda == 1, "Operation not available");
            
        transacoes[hash].estadoVenda = 2;  
        emit nextStage(hash,2);      
    }

    function validaFatura(bytes32 hash, bool aceitar) public{
        require(isMember(msg.sender) == true,"Sender not authorized.");
        require(transacoes[hash].estadoVenda == 2, "Operation not available");
        
        if(aceitar)
            transacoes[hash].estadoVenda = 3; 
        else
            transacoes[hash].estadoVenda = 0; 
        emit nextStage(hash,3);
    }

    function pagaFatura(bytes32 hash) public{
        require(isMember(msg.sender) == true,"Sender not authorized.");
        require(transacoes[hash].estadoVenda == 3, "Operation not available");
        
        transacoes[hash].estadoVenda = 4;  
        emit nextStage(hash,4);
    }


    function validaPagamento(bytes32 hash) public{
        require(isMember(msg.sender) == true,"Sender not authorized.");
        require(transacoes[hash].estadoVenda == 4, "Operation not available");
            
        transacoes[hash].estadoVenda = 5;  
        emit nextStage(hash,5);
    }


    function pagaPercentagem(bytes32 hash) public{
        require(isMember(msg.sender) == true,"Sender not authorized.");    
        require(transacoes[hash].estadoVenda == 5, "Operation not available");

        transacoes[hash].estadoVenda = 6;  
        emit nextStage(hash,6);
    }


    function getEstado(bytes32 hash) public view returns (uint estado) {
        require(isMember(msg.sender) == true,"Sender not authorized.");
        Fatura memory fatura = transacoes[hash];
        return fatura.estadoVenda;
    }

    function adicionarEquipa(address add) public{
        require(msg.sender == ownerAcc, "Sender not authorized.");
        require(!isMember(add), "Account already in use");
        equipas.push(add);
        emit addEquipa(add); 
    }

    function adicionarBanco(address add) public{
        require(msg.sender == ownerAcc, "Sender not authorized.");
        require(!isMember(add), "Account already in use");
        bancos.push(add);
        emit addBanco(add); 
    }

    function getTeamsLength() public view returns (uint count) {
        require(isMember(msg.sender) == true,"Sender not authorized.");
        return equipas.length;
    }

    function getBanksLength() public view returns (uint count) {
        require(isMember(msg.sender) == true,"Sender not authorized.");
        return bancos.length;
    }

    function getFederationsLength() public view returns (uint count) {
        require(isMember(msg.sender) == true,"Sender not authorized.");
        return bancos.length;
    }

    function calculateHash(string memory s ) internal pure returns (bytes32 res) {
        return keccak256(abi.encodePacked(s));
    }

    function isTeam(address add) private view returns (bool res) {
        res=false;
        for (uint i=0; i<equipas.length; i++) {
            if (equipas[i] == add) {
                res=true;
                break;
            }
        }
        return res;
    }

    function isBank(address add) private view returns (bool res) {
        res=false;
        for (uint i=0; i<bancos.length; i++) {
            if (bancos[i] == add) {
                res=true;
                break;
            }
        }
        return res;
    }

    function isFederation(address add) private view returns (bool res) {
        res=false;
        for (uint i=0; i<federacao.length; i++) {
            if (equipas[i] == add) {
                res=true;
                break;
            }
        }
        return res;
    }

    function isMember(address add) private view returns (bool res) {
        return (isTeam(add) || isBank(add) || isFederation(add) || add == ownerAcc);
    }

}
