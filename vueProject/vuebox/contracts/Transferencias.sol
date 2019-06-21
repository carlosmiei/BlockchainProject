pragma solidity ^0.5.0;

contract Transferencias {

    address[] public equipas;
    address[] public bancos;
    address[] public federacao;
    address public tester;
    address public ownerAcc;
    string public owner;
    bytes32 public owner2;

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
    
    /// The smart contract's constructor
    constructor() public {
        owner = "primeiro";
        owner2 = calculateHash("primeiro");
        ownerAcc = 0x24BF0ffC4daf52B0df27640882E202b0AAd98B11;

        //address do endereço que corre os testes
        tester= 0xe82f3f7C5dc295aa96e9c3b96e53998F240D426F;

        
        //adicionar os participantes

        //Porto Peixoto
        equipas.push(0x42C5c23F5068bf3d635857EeEBf2b4105ce35112);
        //Vitória Peixoto
        equipas.push(0xdbBbfC83B5Dd0e505a6dc12D7c5F993e6c23FD46);
        //Nacional Peixoto
        equipas.push(0xE0b303c8158BA5b545CbCE21Aa11FC2B62bF73E3);

        //Braga Carlos
        equipas.push(0x685D6296B4Fd9D0F00d8CC2F634a2160B2a183A8);

        //Porto Carlos
        equipas.push(0xD7E6fAB8AcFe5aa3692fDE1846b8e07E5A071eF8);
        
        //Bancos Peixoto
        bancos.push(0x79e96Ee1465e7fa18A60d4B60F06226b4Ef6Ba5F);
        bancos.push(0xF486B1d966a7ADEbA1C2a293BC2B0B384E7834d9);
        //Bancos Carlos
        bancos.push(0x973A5B3360bc1d5AfAFA88585eFb55F8db972Be2);
        bancos.push(0xE2381C29Ca01ef3179fAd7d55A5C9e4fD9325461);

        //Federação carlos
        federacao.push(0x38e99B1Aa82E2310065A49fC805CC4E071CA3a79);
        //Federação Peixoto
        federacao.push(0xaD066d98aAe87d8d70699e3B8167fCbded72CB6F);

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
        ////require(isMember(msg.sender) == true,"Sender not authorized.");
        ////require(transacoes[hash].estadoVenda == 3, "Operation not available");
        
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
        return (isTeam(add) || isBank(add) || isFederation(add) || add == ownerAcc || add == tester) ;
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
