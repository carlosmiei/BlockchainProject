pragma solidity ^0.5.0;

contract Transferencias {

    address[] public equipas;
    address[] public bancos;
    address[] public federacao;
    address public admin;
    address public admin;

    struct Fatura{
        uint valorTotal;
        string data;
        uint estadoVenda;
    }

    address[] KeysFaturas;
    mapping (address => Fatura) transacoes;
    uint public transacoesCount;
    
    //eventos teste 
    event nextStage(
       address id,
       uint estadoFatura
    );

    event addEquipa(
       address equipa
    );

    event addBanco(
       address banco
    );
    event addFederacao(
       address fed
    );
    
    /// The smart contract's constructor
    constructor() public {

    }

    function adicionaFatura(uint valor, string memory emitData, address  hash) public  {
        require(isMember(msg.sender) == true,"Sender not authorized.");
        
        Fatura memory myStruct = Fatura({valorTotal:valor, data:emitData, estadoVenda:1});
        KeysFaturas.push(hash);
        transacoes[hash] = myStruct;
        transacoesCount++;
        emit nextStage(hash,1);
    }


    function recebeFatura(address hash) public{
        require(isMember(msg.sender) == true,"Sender not authorized.");
        require(transacoes[hash].estadoVenda == 1, "Operation not available");
            
        transacoes[hash].estadoVenda = 2;  
        emit nextStage(hash,2);      
    }

    function validaFatura(address hash, bool aceitar) public{
        require(isMember(msg.sender) == true,"Sender not authorized.");
        require(transacoes[hash].estadoVenda == 2, "Operation not available");
        
        if(aceitar)
            transacoes[hash].estadoVenda = 3; 
        else
            transacoes[hash].estadoVenda = 0; 
        emit nextStage(hash,3);
    }

    function pagaFatura(address hash) public{
        require(isMember(msg.sender) == true,"Sender not authorized.");
        require(transacoes[hash].estadoVenda == 3, "Operation not available");
        
        transacoes[hash].estadoVenda = 4;  
        emit nextStage(hash,4);
    }


    function validaPagamento(address hash) public{
        require(isMember(msg.sender) == true,"Sender not authorized.");
        require(transacoes[hash].estadoVenda == 4, "Operation not available");
            
        transacoes[hash].estadoVenda = 5;  
        emit nextStage(hash,5);
    }


    function pagaPercentagem(address hash) public{
        require(isMember(msg.sender) == true,"Sender not authorized.");    
        require(transacoes[hash].estadoVenda == 5, "Operation not available");

        transacoes[hash].estadoVenda = 6;  
        emit nextStage(hash,6);
    }


    function getEstado(address hash) public view returns (uint estado) {
        require(isMember(msg.sender) == true,"Sender not authorized.");
        Fatura memory fatura = transacoes[hash];
        return fatura.estadoVenda;
    }

    function adicionarEquipa(address add) public{
        require(msg.sender == admin, "Sender not authorized.");
        require(!isMemberCreate(add), "Account already in use");
        equipas.push(add);
        emit addEquipa(add); 
    }

    function adicionarBanco(address add) public{
        require(msg.sender == admin, "Sender not authorized.");
        require(!isMemberCreate(add), "Account already in use");
        bancos.push(add);
        emit addBanco(add); 
    }
    function adicionarFederacao(address add) public{
        require(msg.sender == admin, "Sender not authorized.");
        require(!isMemberCreate(add), "Account already in use");
        federacao.push(add);
        emit addFederacao(add); 
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
        return federacao.length;
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
            if (federacao[i] == add) {
                res=true;
                break;
            }
        }
        return res;
    }

    function isMember(address add) public view returns (bool res) {
        return (isTeam(add) || isBank(add) || isFederation(add) ||  add == admin) ;
    }
    function isMemberCreate(address add) public view returns (bool res) {
        return (isTeam(add) || isBank(add) || isFederation(add)) ;
    }
        
    function typeA(address add) public view returns (uint res) {
        uint val = 0;

        if(isTeam(add)){
            val = 1;
        }
        if(isBank(add)){
            val = 2;
        }
        if(isFederation(add)){
            val = 3;
        }
        return val;
    }


}
