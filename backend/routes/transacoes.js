var express = require('express');
var router = express.Router();

var Transacoes = require('../controllers/transacoes')


router.get('/', (req, res) => {
    console.log("Entrou no get de /transacoes")

	if(req.query.utilizador && req.query.tipo){
		if(req.query.tipo == 'venda')
			Transacoes.listarFromUser(req.query.utilizador)
			.then(dados => res.jsonp(dados))
			.catch(_ => res.status(500).send('Erro na consulta de transações por tipo do utilizador: ' + req.query.utilizador + ' -> Tipo: ' + req.query.tipo))
		else if(req.query.tipo == 'compra'){
			Transacoes.listarToUser(req.query.utilizador)
			.then(dados => res.jsonp(dados))
			.catch(_ => res.status(500).send('Erro na consulta de transações por tipo do utilizador: ' + req.query.utilizador + ' -> Tipo: ' + req.query.tipo))
		}
		else{
			res.status(500).send('Erro na consulta de transações por tipo do utilizador:' + req.query.utilizador)
		}
	} 
	else if(req.query.utilizador){
        Transacoes.listarPorUtilizador(req.query.utilizador)
        .then(dados => res.jsonp(dados))
        .catch(_ => res.status(500).send('Erro na consulta de transações do utilizador: ' + req.query.utilizador))
	} 
	else if(req.query.id){
		Transacoes.consultar(req.query.id)
		.then(dados => res.jsonp(dados))
		.catch(_ => res.status(500).send('Erro na consulta da transação: ' + req.query.id))
	}
	else{
        Transacoes.listar()
        .then(dados => res.jsonp(dados))
        .catch(_ => res.status(500).send('Erro na consulta de transações: '))
	}
});


router.post("/setEstado", (req, res) => {
	Transacoes.alteraEstado(req.body._id, req.body.estado)
	.then(dados => res.jsonp(dados))
	.catch(erro => res.status(500).send('Erro ao alterar estado da transação: ' + erro))
});


router.post('/', (req, res) => {
	console.dir(req.body)
	
	Transacoes.inserir(req.body)
	.then(dados => res.jsonp(dados))
	.catch(erro => res.status(500).send('Erro ao adicionar transação: ' + erro))
});


module.exports = router;