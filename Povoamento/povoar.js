const axios = require('axios');
const fs = require('fs');
var obj;
Web3 = require('web3')
var web3;

var braga  = fs.readFileSync('braga.json')
var porto  = fs.readFileSync('porto.json')
var nacional  = fs.readFileSync('nacional.json')
var guimaraes  = fs.readFileSync('guimaraes.json')
var bancosMeta  = fs.readFileSync('bancosMeta.json')
var equipasMeta  = fs.readFileSync('equipasMeta.json')
var federacaoMeta  = fs.readFileSync('federacaoMeta.json')

federacaoMeta = JSON.parse(federacaoMeta)
console.log(1)
equipasMeta = JSON.parse(equipasMeta)
console.log(2)
bancosMeta = JSON.parse(bancosMeta)
console.log(3)
bancosRank = [2,3]

var equipasObjeto = [JSON.parse(braga),JSON.parse(porto),JSON.parse(nacional),JSON.parse(guimaraes)]
var equipasNome = ['braga','porto','nacional','guimaraes']
var equipasRank = [4,5,6,7]


if (typeof web3 !== 'undefined') {
    console.log('Web3 injected browser: OK.')
    Web3.providers.HttpProvider.prototype.sendAsync = Web3.providers.HttpProvider.prototype.send;

    web3 = new Web3(web3.currentProvider)
  } else {
    console.log('Web3 injected browser: Fail. You should consider trying MetaMask.')
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    Web3.providers.HttpProvider.prototype.sendAsync = Web3.providers.HttpProvider.prototype.send;
    
    web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
  }

web3.eth.getAccounts().then(accounts => {

    //adicionar federacao
    for (fed in federacaoMeta) {
        var fedr = federacaoMeta[fed]
        fedr['_id'] = accounts[1].toLowerCase()
        //console.dir(fedr)
         axios.post('http://localhost:4000/users/',fedr)
         .then(response => {
             console.log('Aidcionei Federacao' + response)    
         })
         .catch(e => {
             console.log('ERRO: ' + e)
          })
    

    }

    
    //Adicionar os bancos
    for (var b in bancosRank) {
        var banco = bancosMeta[b]
        banco['_id'] =  accounts[bancosRank[b]].toLowerCase()
        //console.dir(banco)
         axios.post('http://localhost:4000/users/',banco)
         .then(response => {
             console.log('Adicionei Banco ' +  banco.nome + response)    
         })
         .catch(e => {
             console.log('ERRO: ' + e)
          })
    } 
    var bancosL = [accounts[bancosRank[0]].toLowerCase(),accounts[bancosRank[1]].toLowerCase()]
    //Adicionar as equipas
    for (var eq in equipasRank) {
        var equipa = equipasMeta[eq]
        equipa['_id'] =  accounts[equipasRank[eq]].toLowerCase()
        equipa['bancos'] = bancosL
        //console.dir(equipa)
        axios.post('http://localhost:4000/users/',equipa)
        .then(response => {
            console.log('Adicionei equipa' + equipa.nome + response)    
        })
        .catch(e => {
            console.log('ERRO: ' + e)
         })
    }

    // // Adicionar os jogadores
     for (var i in equipasNome) {
         equipa = equipasObjeto[i];

         equipa.forEach(function(element) {
             var enviar ={}
             enviar['jogador'] = element
             enviar['_id'] = accounts[equipasRank[i]].toLowerCase() //ID EQUIPA
             axios.post('http://localhost:4000/users/addJogador/',enviar)

             .then(response => {
                 console.log('Correu tudo bem' + response)    
             })
             .catch(e => {
                 console.log('ERRO: ' + e)
              })

         });


     }
});