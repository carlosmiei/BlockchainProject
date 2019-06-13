const axios = require('axios');
const fs = require('fs');
var obj;

var cont  = fs.readFileSync('braga.json')

obj = JSON.parse(cont);

obj.forEach(function(element) {

    element['_id'] = '0x685D6296B4Fd9D0F00d8CC2F634a2160B2a183A8' //ID EQUIPA
    console.dir(element)
    axios.post('http://localhost:4000/users/addJogador/',element)
    .then(response => {
        console.log('Correu tudo bem' + response)    
    
    }).catch(e => {
        console.log('ERRO: ' + e)
    })


  });
