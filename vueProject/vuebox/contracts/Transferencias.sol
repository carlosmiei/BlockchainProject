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
        string data;
        uint estadoVenda;
    }

    bytes32[] KeysFaturas;
    mapping (bytes32 => Fatura) transacoes;
    
    //eventos teste 
    event Exemplo(
       string name,
       uint age
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

    function adicionaFatura(uint valor, string memory emitData, bytes32 hash) public {
        require(isMember(msg.sender) == true,"Sender not authorized.");
        
        Fatura memory myStruct = Fatura({valorTotal:valor, data:emitData, estadoVenda:1});
        KeysFaturas.push(hash);
        transacoes[hash] = myStruct;
        emit Exemplo("teste",22);
    }

    function recebeFatura(bytes32 hash) public{
        require(isMember(msg.sender) == true,"Sender not authorized.");
        require(transacoes[hash].estadoVenda == 1, "Operação não disponível");
            
        transacoes[hash].estadoVenda = 2;        
    }

    function validaFatura(bytes32 hash, bool aceitar) public{
        require(isMember(msg.sender) == true,"Sender not authorized.");
        require(transacoes[hash].estadoVenda == 2, "Operação não disponível");
        
        if(aceitar)
            transacoes[hash].estadoVenda = 3; 
        else
            transacoes[hash].estadoVenda = 0; 
    }

    function pagaFatura(bytes32 hash) public{
        require(isMember(msg.sender) == true,"Sender not authorized.");
        require(transacoes[hash].estadoVenda == 3, "Operação não disponível");
        
        transacoes[hash].estadoVenda = 4; 
    }


    function validaPagamento(bytes32 hash) public{
        require(isMember(msg.sender) == true,"Sender not authorized.");
        require(transacoes[hash].estadoVenda == 4, "Operação não disponível");
            
        transacoes[hash].estadoVenda = 5; 
    }


    function pagaPercentagem(bytes32 hash) public{
        require(isMember(msg.sender) == true,"Sender not authorized.");    
        require(transacoes[hash].estadoVenda == 5, "Operação não disponível");

        transacoes[hash].estadoVenda = 6; 
    }


    function getEstado(bytes32 hash) public view returns (uint estado) {
        require(isMember(msg.sender) == true,"Sender not authorized.");
        Fatura memory fatura = transacoes[hash];
        return fatura.estadoVenda;
    }

    function adicionarEquipa(address add) public{
        require(msg.sender == ownerAcc, "Sender not authorized.");
        equipas.push(add);
        emit Exemplo("ola",123); 
    }

    function adicionarBanco(address add) public{
        require(msg.sender == ownerAcc, "Sender not authorized.");
        bancos.push(add);
        emit Exemplo("ola",123); 
    }

    function getTeamsLength() public view returns (uint count) {
        require(isMember(msg.sender) == true,"Sender not authorized.");
        return equipas.length;
    }

    function getBanksLength() public view returns (uint count) {
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
