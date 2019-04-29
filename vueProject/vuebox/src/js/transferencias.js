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

    return new Promise((resolve, reject) => {
      console.log("Valor: ", valor, " - ", typeof(valor))
      console.log("Data: ", data, " - ", typeof(data))
      console.log("Hash: ", hashF, " - ", typeof(hashF))
      self.instance.adicionaFatura(
        valor, 
        data,
        hashF, 
        {from: window.web3.eth.accounts[0], gas: 300000}
      ).then(exists => {
        //console.log("dentro BlockTransfer")
        //console.dir(exists)
        resolve(exists)
      }).catch(err => {
        reject(err)
        console.log('erro: ' + err)
      })
    })

  },  testeS: function(valor,data,hashF){
    let self = this

    return new Promise((resolve, reject) => {
      self.instance.testarS(
        data,valor,hashF,
        {from: window.web3.eth.accounts[0],gas: 900000}
      ).then(exists => {
        resolve(exists)
      }).catch(err => {
        reject(err)
        console.log('erro: ' + err)
      })
    })

  },  isMember: function(hashF){
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

  }

}

export default Transferencias
