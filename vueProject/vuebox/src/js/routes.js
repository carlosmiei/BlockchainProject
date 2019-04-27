var express = require('express')
var router = express.Router()
var querystring = require('querystring')

var Users = require("./controllers")

router.get('/user',(req, res) =>{
    if(req.query.eid){
        Users.consultarUser(req.query.eid)
            .then(user => res.jsonp(user))
            .catch(erro => res.status(500).send("ERRO AO CONSULTAR UTILIZADOR " + req.query.eid + "\n" + erro))
    }
    else
        res.status(500).send("É NECESSÁRIO UM ID PARA REALIZAR ESTA CONSULTA")
        
})

router.get('/user/compras',(req, res) =>{
    if(req.query.eid){
        Users.consultarComprasHash(req.query.eid)
            .then(compras => res.jsonp(compras))
            .catch(erro => res.status(500).send("ERRO AO CONSULTAR COMPRAS DO UTILIZADOR " + req.query.eid + "\n" + erro))
    }
    else
        res.status(500).send("É NECESSÁRIO UM ID PARA REALIZAR ESTA CONSULTA")
})

router.get('/user/compras/:id',(req, res) =>{
    
})

router.get('',(req, res) =>{
    
})

router.get('',(req, res) =>{
    
})