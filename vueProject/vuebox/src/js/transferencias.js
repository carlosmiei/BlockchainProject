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
      self.instance.adicionaFatura(
        'valor',valor,
        'emitData',data,
        'hash',hashF,
        {from: window.web3.eth.accounts[0]}
      ).then(exists => {
        //console.log("dentro BlockTransfer")
        //console.dir(exists)
        resolve(exists)
      }).catch(err => {
        reject(err)
        console.log('erro: ' + err)
      })
    })

  }

}

export default Transferencias
