import contract from 'truffle-contract'
import UsersContract from '@contracts/Transferencias.json'

const Transferencias = {

  contract: null,
  instance: null,

  init: function () {
    let self = this

    return new Promise(function (resolve, reject) {
      self.contract = contract(UsersContract)
      self.contract.setProvider(window.web3.currentProvider)

      self.contract.deployed().then(instance => {
        self.instance = instance

        self.instance.nextStage({}, {
          fromBlock: 0,
          toBlock: 'latest'
        }).watch((error, event) => {
          if(!error) console.log("Evento-Stage: " + JSON.stringify(event))
          else console.log("Evento-Stage: ERRO")
        });
  
        self.instance.addEquipa({}, {
          fromBlock: 0,
          toBlock: 'latest'
        }).watch((error, event) => {
          if(!error) console.log("Evento-Equipa: " + JSON.stringify(event))
          else console.log("Evento-Equipa: ERRO")
        });
  
        self.instance.addBanco({}, {
          fromBlock: 0,
          toBlock: 'latest'
        }).watch((error, event) => {
          if(!error) console.log("Evento-Banco: " + JSON.stringify(event))
          else console.log("Evento-Banco: ERRO")
        });
        
        resolve()

      }).catch(err => {
        reject(err)
      })

    })
  },

  owner: function () {
    let self = this

    return new Promise((resolve, reject) => {
      self.instance.getOwner.call(
        {from: window.web3.eth.accounts[0]}
      ).then(exists => {
        resolve(exists)
      }).catch(err => {
        reject(err)
        console.log('erro: ' + err)
      })
    })
  },
  adicionaFatura: function(valor,data,hashF){
    let self = this
    // Tem de ter isto para ser um adress
    //hashF = '0x' + hashF
    return new Promise((resolve, reject) => {
      

      self.instance.adicionaFatura(
        valor, 
        data,
        hashF,
        //window.web3.toAscii(hashF), 
        {from: window.web3.eth.accounts[0], gas: 300000}
      ).then(exists => {
        resolve(exists)
      }).catch(err => {
        reject(err)
        console.log('erro: ' + err)
      })
    })

  }, testParams: function(hashF){
    let self = this
    var res= "0xcbfad02f9ed2a8d1e08d8f74f5303e9eb93637d47f82ab6f1c15871cf8dd0481"
    return new Promise((resolve, reject) => {
      self.instance.testParams(
        res,res,res,res,1,1,
        {from: window.web3.eth.accounts[0],gas: 300000}
      ).then(exists => {
        resolve(exists)
      }).catch(err => {
        reject(err)
        console.log('erro: ' + err)
      })
    })

  },emPagamento: function(fatura){
    let self = this

    return new Promise((resolve, reject) => {
      self.instance.pagaFatura(
        fatura,
        {from: window.web3.eth.accounts[0],gas: 300000}
      ).then(exists => {
        resolve(exists)
      }).catch(err => {
        reject(err)
        console.log('erro: ' + err)
      })
    })

  },recebeFatura: function(fatura){
    let self = this

    return new Promise((resolve, reject) => {
      self.instance.recebeFatura(
        fatura,
        {from: window.web3.eth.accounts[0],gas: 300000}
      ).then(exists => {
        resolve(exists)
      }).catch(err => {
        reject(err)
        console.log('erro: ' + err)
      })
    })

  },validaFatura: function(fatura,aceitar){
    let self = this
    return new Promise((resolve, reject) => {
      self.instance.validaFatura(
        fatura,aceitar,
        {from: window.web3.eth.accounts[0],gas: 300000}
      ).then(exists => {
        resolve(exists)
      }).catch(err => {
        reject(err)
        console.log('erro: ' + err)
      })
    })

  },isMember: function(hashF){
    let self = this

    return new Promise((resolve, reject) => {
        self.instance.isMember.call(
        hashF,
        {from: window.web3.eth.accounts[0],gas: 900000}
      ).then(exists => {
        resolve(exists)
      }).catch(err => {
        reject(err)
        console.log('erro: ' + err)
      })
    })

  },typeA: function(hashF){
    let self = this
    console.log(window.web3.eth.accounts[0])
    return new Promise((resolve, reject) => {
      self.instance.typeA.call(
        hashF,
        {from: window.web3.eth.accounts[0],gas: 900000}
      ).then(exists => {
        resolve(exists)
      }).catch(err => {
        reject(err)
        console.log('erro: ' + err)
      })
    })

  },adicionarBanco: function(hashF){
    let self = this
    console.log(window.web3.eth.accounts[0])
    return new Promise((resolve, reject) => {
      self.instance.adicionarBanco(
        hashF,
        {from: window.web3.eth.accounts[0],gas: 900000}
      ).then(exists => {
        resolve(exists)
      }).catch(err => {
        reject(err)
        console.log('erro: ' + err)
      })
    })

  },adicionarEquipa: function(hashF){
    let self = this
    console.log(window.web3.eth.accounts[0])
    return new Promise((resolve, reject) => {
      self.instance.adicionarEquipa(
        hashF,
        {from: window.web3.eth.accounts[0],gas: 900000}
      ).then(exists => {
        resolve(exists)
      }).catch(err => {
        reject(err)
        console.log('erro: ' + err)
      })
    })

  }

}

export default Transferencias
