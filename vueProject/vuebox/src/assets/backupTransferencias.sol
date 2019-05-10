pragma solidity ^0.5.0;

contract Transferencias {

    string[] public equipas;
    string[] public bancos;
    string[] public federacao;
    string  public ownerAcc;
    string public owner;
    bytes32 public owner2;

    struct Fatura{
        uint valorTotal;
        string data;
        uint estadoVenda;
        string from;
        string to;
    }

    string[] KeysFaturas;
    mapping (string => Fatura) transacoes;
    
    //eventos teste 
    event nextStage(
       string id,
       uint estadoFatura
    );

    event addEquipa(
       string equipa
    );

    event addBanco(
       string banco
    );
    
    /// The smart contract's constructor
    constructor() public {
        owner = "primeiro";
        owner2 = calculateHash("primeiro");
        ownerAcc ="0x24BF0ffC4daf52B0df27640882E202b0AAd98B11";
        
        //adicionar os participantes
        equipas.push("0x1Fb4C08AeA29A6642D8C963F1ca01c15C63385bc");
        equipas.push("0xdB254AFdcaCEa500C4f7449c4b9F9DA3e1224F81");

    }

    function adicionaFatura(uint valor, string memory emitData, string memory hash, uint estado,string memory from, string memory to) public {
       // require(isMember(msg.sender) == true,"Sender not authorized.");
        
        Fatura memory myStruct = Fatura({valorTotal:valor, data:emitData, estadoVenda:estado,from:from,to:to});
        KeysFaturas.push(hash);
        transacoes[hash] = myStruct;
        emit nextStage(hash,1);
    }

    function testarS(string memory teste, bytes32 valor, string memory hash)public {
        emit nextStage("0x24BF0ffC402b0AAd98B11",1);
        
    }

    function recebeFatura(string memory hash) public{

        require(isMember(msg.sender) == true,"Sender not authorized.");
        require(transacoes[hash].estadoVenda == 1, "Operation not available");
            
        transacoes[hash].estadoVenda = 2;  
        emit nextStage(hash,2);      
    }

    function validaFatura(string memory hash, bool aceitar) public{
        require(isMember(msg.sender) == true,"Sender not authorized.");
        require(transacoes[hash].estadoVenda == 2, "Operation not available");
        
        if(aceitar)
            transacoes[hash].estadoVenda = 3; 
        else
            transacoes[hash].estadoVenda = 0; 
        emit nextStage(hash,3);
    }

    function pagaFatura(string memory hash) public{
        require(isMember(msg.sender) == true,"Sender not authorized.");
        require(transacoes[hash].estadoVenda == 3, "Operation not available");
        
        transacoes[hash].estadoVenda = 4;  
        emit nextStage(hash,4);
    }


    function validaPagamento(string memory hash) public{
        require(isMember(msg.sender) == true,"Sender not authorized.");
        require(transacoes[hash].estadoVenda == 4, "Operation not available");
            
        transacoes[hash].estadoVenda = 5;  
        emit nextStage(hash,5);
    }


    function pagaPercentagem(string memory hash) public{
        require(isMember(msg.sender) == true,"Sender not authorized.");    
        require(transacoes[hash].estadoVenda == 5, "Operation not available");

        transacoes[hash].estadoVenda = 6;  
        emit nextStage(hash,6);
    }


    function getEstado(string memory hash) public view returns (uint estado) {
        require(isMember(msg.sender) == true,"Sender not authorized.");
        Fatura memory fatura = transacoes[hash];
        return fatura.estadoVenda;
    }

    function adicionarEquipa(string memory add) public{
        require(msg.sender == ownerAcc, "Sender not authorized.");
        require(!isMember(add), "Account already in use");
        equipas.push(add);
        emit addEquipa(add); 
    }

    function adicionarBanco(string memory add) public{
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

    function isTeam(string memory add) private view returns (bool res) {
        res=false;
        for (uint i=0; i<equipas.length; i++) {
            if (equipas[i] == add) {
                res=true;
                break;
            }
        }
        return res;
    }

    function isBank(string memory add) private view returns (bool res) {
        res=false;
        for (uint i=0; i<bancos.length; i++) {
            if (bancos[i] == add) {
                res=true;
                break;
            }
        }
        return res;
    }

    function isFederation(string memory add) private view returns (bool res) {
        res=false;
        for (uint i=0; i<federacao.length; i++) {
            if (equipas[i] == add) {
                res=true;
                break;
            }
        }
        return res;
    }

    function isMember(address add) public view returns (bool res) {
        address x = add;
        bytes memory y = toBytes(x);
        bytes32 z = bytesToBytes32(y,0);
        string memory w = toAsciiString(z);
        return (isTeam(w) || isBank(w) || isFederation(w) /*|| w == ownerAcc*/);
    }

    function toAsciiString(bytes32 data) public pure returns (string memory x) {
        bytes memory s = new bytes(40);
        for (uint i = 0; i < 20; i++) {
            byte b = byte(uint8(uint(data) / (2**(8*(19 - i)))));
            byte hi = byte(uint8(b) / 16);
            byte lo = byte(uint8(b) - 16 * uint8(hi));
            s[2*i] = char(hi);
            s[2*i+1] = char(lo);            
        }
        return string(s);
}

    function char(byte b) internal pure returns (byte c) {
        if (uint8(b) < 10) return byte(uint8(b) + 0x30);
        else return byte(uint8(b) + 0x57);
    }

    function toBytes(address a) public pure returns (bytes memory) {
    return abi.encodePacked(a);
    }

    function bytesToBytes32(bytes memory b, uint offset) private  returns (bytes32) {
        bytes32 out;

        for (uint i = 0; i < 32; i++) {
          out |= bytes32(b[offset + i] & 0xFF) >> (i * 8);
        }
        return out;
    }

    function addressToString(address _addr) public pure returns(string memory) {
    bytes32 value = bytes32(uint256(_addr));
    bytes memory alphabet = "0123456789abcdef";

    bytes memory str = new bytes(51);
    str[0] = '0';
    str[1] = 'x';
    for (uint i = 0; i < 20; i++) {
        str[2+i*2] = alphabet[uint(value[i + 12] >> uint(4))];
        str[3+i*2] = alphabet[uint(value[i + 12] & 0x0f)];
    }
    return string(str);
}

}
