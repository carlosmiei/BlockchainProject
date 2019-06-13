const axios = require('axios');
const fs = require('fs');
var obj;

var cont  = fs.readFileSync('braga.json')

obj = JSON.parse(cont);
var i =0
obj.forEach(function(element) {
    var enviar ={}
    enviar['jogador'] = element
    enviar['_id'] = '0x685d6296b4fd9d0f00d8cc2f634a2160b2a183a8' //ID EQUIPA
    axios.post('http://localhost:4000/users/addJogador/',enviar)
    
    .then(response => {
        console.log('Correu tudo bem' + response)    
    
    }).catch(e => {
        console.log('ERRO: ' + e)
    })
//

  });
