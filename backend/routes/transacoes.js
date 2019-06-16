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
	else if(req.query.data1 && req.query.data2){
		Transacoes.listarEntreDatas(req.query.data1, req.query.data2)
		.then(dados => res.jsonp(dados))
		.catch(_ => res.status(500).send('Erro na consulta de transações por tipo do utilizador: ' + req.query.utilizador + ' -> Tipo: ' + req.query.tipo))
	}
	else if(req.query.data1){
		Transacoes.listarEntreDatas(req.query.data1, new Date())
		.then(dados => res.jsonp(dados))
		.catch(_ => res.status(500).send('Erro na consulta de transações por tipo do utilizador: ' + req.query.utilizador + ' -> Tipo: ' + req.query.tipo))
	}
	else if(req.query.data2){
		Transacoes.listarEntreDatas("2000-01-01", req.query.data2)
		.then(dados => res.jsonp(dados))
		.catch(_ => res.status(500).send('Erro na consulta de transações por tipo do utilizador: ' + req.query.utilizador + ' -> Tipo: ' + req.query.tipo))
	}
	else if(req.query.utilizador){
        Transacoes.listarPorUtilizador(req.query.utilizador)
        .then(dados => res.jsonp(dados))
        .catch(_ => res.status(500).send('Erro na consulta de transações do utilizador: ' + req.query.utilizador))
	} 
	else if(req.query.banco){
		Transacoes.listarPorBanco(req.query.banco)
		.then(dados => res.jsonp(dados))
		.catch(_ => res.status(500).send('Erro na consulta da transação do banco: ' + req.query.banco))
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


router.get('/valorTotal', (req, res) => {
	req.query.data1 ? (data1 = req.query.data1) : (data1 = "2000-01-01")
	req.query.data2 ? (data2 = req.query.data2) : (data2 = (new Date()).toISOString().slice(0,10))

	if(req.query.utilizador && req.query.tipo){
		if(req.query.tipo == 'vendas'){
			Transacoes.consultarValorTotalVendas(req.query.utilizador, data1, data2)
			.then(dados => res.jsonp(trataTotal(dados)))
			.catch(_ => res.status(500).send('Erro na consulta do valor total de compras do utilizador: ' + req.query.utilizador + ' -> Tipo: ' + req.query.tipo))
		}
		else if(req.query.tipo == 'compras'){
			Transacoes.consultarValorTotalCompras(req.query.utilizador, data1, data2)
			.then(dados => res.jsonp(trataTotal(dados)))
			.catch(_ => res.status(500).send('Erro na consulta do valor total de vendas do utilizador: ' + req.query.utilizador + ' -> Tipo: ' + req.query.tipo))
		}
		else{
			res.status(500).send('Erro na consulta do valor total de transações do utilizador:' + req.query.utilizador)
		}
	} 	
	else if(req.query.tipo == "vendas"){
		Transacoes.consultarValorTotalVendas(null, data1, data2)
		.then(dados => res.jsonp(trataTotal(dados)))
		.catch(_ => res.status(500).send('Erro na consulta do valor total de vendas'))
	}
	else if(req.query.tipo == 'compras'){
		Transacoes.consultarValorTotalCompras(null, data1, data2)
		.then(dados => res.jsonp(trataTotal(dados)))
		.catch(_ => res.status(500).send('Erro na consulta do valor total de compras'))
	}
	else{
		res.status(500).send('Erro na consulta do valor total de transações')
	}
});

router.get('/total', (req, res) => {	
	req.query.data1 ? (data1 = req.query.data1) : (data1 = "2000-01-01")
	req.query.data2 ? (data2 = req.query.data2) : (data2 = (new Date()).toISOString().slice(0,10))

	if(req.query.utilizador && req.query.tipo){
		if(req.query.tipo == 'vendas'){
			Transacoes.consultarTotalVendas(req.query.utilizador, data1, data2)
			.then(dados => res.jsonp(trataTotal(dados)))
			.catch(_ => res.status(500).send('Erro na consulta do total de compras do utilizador: ' + req.query.utilizador + ' -> Tipo: ' + req.query.tipo))
		}
		else if(req.query.tipo == 'compras'){
			Transacoes.consultarTotalCompras(req.query.utilizador, data1, data2)
			.then(dados => res.jsonp(trataTotal(dados)))
			.catch(_ => res.status(500).send('Erro na consulta do total de vendas do utilizador: ' + req.query.utilizador + ' -> Tipo: ' + req.query.tipo))
		}
		else{
			res.status(500).send('Erro na consulta do total de transações do utilizador:' + req.query.utilizador)
		}
	} 	
	else if(req.query.tipo == "vendas"){
		Transacoes.consultarTotalVendas(null, data1, data2)
		.then(dados => res.jsonp(trataTotal(dados)))
		.catch(_ => res.status(500).send('Erro na consulta do total de vendas'))
	}
	else if(req.query.tipo == 'compras'){
		Transacoes.consultarTotalCompras(null, data1, data2)
		.then(dados => res.jsonp(trataTotal(dados)))
		.catch(_ => res.status(500).send('Erro na consulta do total de compras'))
	}
	else{
		res.status(500).send('Erro na consulta do total de transações')
	}
});

router.post("/setEstado", (req, res) => {
	console.log("Entrou no /setEstado")
	console.dir(req.body)
	Transacoes.alteraEstado(req.body._id, req.body.estado)
	.then(dados => res.jsonp(dados))
	.catch(erro => res.status(500).send('Erro ao alterar estado da transação: ' + erro))
});



// Data Aceite
router.post("/setDataAceite", (req, res) => {
	console.dir(req.body)
	Transacoes.alteraDataAceite(req.body._id, req.body.data)
	.then(dados => res.jsonp(dados))
	.catch(erro => res.status(500).send('Erro ao alterar estado da transação: ' + erro))
});

//Rejeitada
router.post("/setDataRejeitada", (req, res) => {
	console.dir(req.body)
	Transacoes.alteraDataRejeitada(req.body._id, req.body.data)
	.then(dados => res.jsonp(dados))
	.catch(erro => res.status(500).send('Erro ao alterar estado da transação: ' + erro))
});

//EmPagamento
router.post("/setDataEmPagamento", (req, res) => {
	console.dir(req.body)
	Transacoes.alteraDataEmPagamento(req.body._id, req.body.data)
	.then(dados => res.jsonp(dados))
	.catch(erro => res.status(500).send('Erro ao alterar estado da transação: ' + erro))
});

//Pago

router.post("/setDataPagamento", (req, res) => {
	console.dir(req.body)
	Transacoes.alteraDataPagamento(req.body._id, req.body.data)
	.then(dados => res.jsonp(dados))
	.catch(erro => res.status(500).send('Erro ao alterar estado da transação: ' + erro))
});

//	Completo
router.post("/setDataCompleto", (req, res) => {
	console.dir(req.body)
	Transacoes.alteraDataCompleto(req.body._id, req.body.data)
	.then(dados => res.jsonp(dados))
	.catch(erro => res.status(500).send('Erro ao alterar estado da transação: ' + erro))
});





router.post('/', (req, res) => {
	console.dir(req.body)
	
	Transacoes.inserir(req.body)
	.then(dados => res.jsonp(dados))
	.catch(erro => res.status(500).send('Erro ao adicionar transação: ' + erro))
});



function trataTotal(dados) {
	obj = {}
	dados.length == 0 ? obj['total'] = 0 : obj['total'] = dados[0].total

	return obj
}


module.exports = router;