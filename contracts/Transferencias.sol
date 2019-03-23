pragma solidity ^0.5.0;

contract Transferencias {

    address[] public participantes;
    string public owner;
    bytes32 public owner2;

    struct Jogador{
        uint id;
        string nome;
        uint idade;
        string nascimento;
    }

    struct Venda {
        uint contribuinteOri;
        uint contribuinteDest;
        uint valorTotal;
        uint valorIva;
        Jogador jogador;
        uint data;  
    }

    struct Fatura{
        uint hashVenda;
        Venda venda;
        uint estadoVenda;
    }

    uint[] KeysJogadores;
    mapping (address => Fatura) transacoes;
    mapping (uint => Jogador) jogadores;
    
    //eventos teste 
    event Exemplo(
       string name,
       uint age
    );


    
    /// The smart contract's constructor
    constructor() public {
        owner = "primeiro";
        owner2= calculateHash("primeiro");

        //adicionar um jogador
        adicionaJogador(1,20,"Carlos Gonçalves","02/01/1997");
        adicionaJogador(2,20,"Ricardo Peixoto","01/11/1977");
    
    }

    function adicionarParticipante() public{
        participantes.push(msg.sender);
        emit Exemplo("ola",123); 

    }

    function adicionaJogador(uint id, uint idade, string memory nome, string  memory nascimento) private{
            //fazer isto porque nao da para ter o tamanho dos maps aqui
            KeysJogadores.push(id);
            jogadores[id] = Jogador({id:id,nome:nome,idade:idade,nascimento:nascimento});
   
    }

    function getLength() public view returns (uint count) {
        return participantes.length;
    }

    function getJogador(uint id) public view returns (string memory count) {
        return jogadores[id].nome;
    }
    
    function getLengthJogadores() public view returns (uint num){
        return KeysJogadores.length;
    }

    function calculateHash(string memory s )  private  returns (bytes32 res) 
    {
        return keccak256(abi.encodePacked(s));
    }

}

