const axios = require('axios');
const fs = require('fs');
var obj;

var porto  = fs.readFileSync('porto.json')
var guimaraes  = fs.readFileSync('guimaraes.json')
var nacional  = fs.readFileSync('nacional.json')

obj = JSON.parse(porto);
obj.forEach(function(element) {
    var enviar ={}
    enviar['jogador'] = element
    enviar['_id'] = '0x42c5c23f5068bf3d635857eeebf2b4105ce35112' //ID EQUIPA
    axios.post('http://localhost:4000/users/addJogador/',enviar)
    
    .then(response => {
        console.log('Correu tudo bem' + response)    
    
    }).catch(e => {
        console.log('ERRO: ' + e)
    })
});


obj = JSON.parse(guimaraes);
obj.forEach(function(element) {
    var enviar ={}
    enviar['jogador'] = element
    enviar['_id'] = '0xdbbbfc83b5dd0e505a6dc12d7c5f993e6c23fd46' //ID EQUIPA
    axios.post('http://localhost:4000/users/addJogador/',enviar)
    
    .then(response => {
        console.log('Correu tudo bem' + response)    
    
    }).catch(e => {
        console.log('ERRO: ' + e)
    })
});
    

obj = JSON.parse(nacional);
obj.forEach(function(element) {
    var enviar ={}
    enviar['jogador'] = element
    enviar['_id'] = '0xe0b303c8158ba5b545cbce21aa11fc2b62bf73e3' //ID EQUIPA
    axios.post('http://localhost:4000/users/addJogador/',enviar)
    
    .then(response => {
        console.log('Correu tudo bem' + response)    
    
    }).catch(e => {
        console.log('ERRO: ' + e)
    })

});
