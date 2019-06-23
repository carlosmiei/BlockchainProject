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

equipasMeta = JSON.parse(equipasMeta)
bancosMeta = JSON.parse(bancosMeta)
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

    //Adicionar os bancos
    for (var b in bancosRank) {
        var banco = bancosMeta[b]
        banco['_id'] =  accounts[bancosRank[b]].toLowerCase()
        axios.post('http://localhost:4000/users/',bancos)
        .then(response => {
            console.log('Correu tudo bem' + response)    
  
        })
        .catch(e => {
            console.log('ERRO: ' + e)
         })
    }
    bancos = [accounts[bancosRank[0]].toLowerCase(),accounts[bancosRank[1]].toLowerCase()]
    //Adicionar as equipas
    for (var eq in equipasRank) {
        var equipa = equipasMeta[eq]
        equipa['_id'] =  accounts[equipasRank[b]].toLowerCase()
        equipa['bancos'] = bancos
        axios.post('http://localhost:4000/users/',equipa)
        .then(response => {
            console.log('Correu tudo bem' + response)    
        })
        .catch(e => {
            console.log('ERRO: ' + e)
         })
    }

    // Adicionar os jogadores
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

        console.dir(enviar)
        return


        });
        

    }
});
