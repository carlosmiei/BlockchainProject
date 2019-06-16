var express = require('express');
var router = express.Router();


var Users = require('../controllers/users')


router.get('/', (req, res) => {
  	console.log("Entrou no get de /users")

	if(req.query.utilizador){
		Users.consultar(req.query.utilizador)
		.then(dados => res.jsonp(dados))
		.catch(_ => res.status(500).send('Erro na consulta do utilizador: ' + req.query.utilizador))
	} 
	else if(req.query.tipo){
		Users.listarPorTipo(req.query.tipo)
		.then(dados => res.jsonp(dados))
		.catch(_ => res.status(500).send('Erro na consulta de utilizadores por papel'))
	} 
	else if(req.query.pais){
		Users.listarPorPais(req.query.pais)
		.then(dados => res.jsonp(dados))
		.catch(_ => res.status(500).send('Erro na consulta de utilizadores por pais'))
	} 
	else if(req.query.liga){
		Users.listarPorLiga(req.query.liga)
		.then(dados => res.jsonp(dados))
		.catch(_ => res.status(500).send('Erro na consulta de utilizadores por liga'))
	} 
	else{
		Users.listar()
		.then(dados => res.jsonp(dados))
		.catch(_ => res.status(500).send('Erro na consulta de utilizadores: '))
	}
});


router.post("/alteraNome", (req, res) => {
	Users.alteraNome(req.body._id, req.body.nome)
	.then(dados => res.jsonp(dados))
	.catch(erro => res.status(500).send('Erro ao alterar nome do utilizador: ' + erro))
});

router.post("/alteraDesc", (req, res) => {
	Users.alteraDesc(req.body._id, req.body.desc)
	.then(dados => res.jsonp(dados))
	.catch(erro => res.status(500).send('Erro ao alterar descrição do utilizador: ' + erro))
});

router.post("/alteraFoto", (req, res) => {
	Users.alteraFoto(req.body._id, req.body.foto)
	.then(dados => res.jsonp(dados))
	.catch(erro => res.status(500).send('Erro ao alterar foto do utilizador: ' + erro))
});

router.post("/atualizaPerfil", (req, res) => {
	console.log(req.body)
	Users.atualizaPerfil(req.body._id, req.body.nome, req.body.pais, req.body.cidade, req.body.contribuinte, req.body.site)
	.then(dados => res.jsonp(dados))
	.catch(erro => res.status(500).send('Erro ao alterar descrição do utilizador: ' + erro))
});


router.post("/addJogador", (req, res) => {
	console.dir(req.body.jogador)
	Users.addJogador(req.body._id, req.body.jogador)
	.then(dados => res.jsonp(dados))
	.catch(erro => res.status(500).send('Erro ao adicionar jogador: ' + erro))
});

router.post("/remJogador", (req, res) => {
	console.dir(req.body.jogador)
	Users.remJogador(req.body._id, req.body.jogador)
	.then(dados => res.jsonp(dados))
	.catch(erro => res.status(500).send('Erro ao adicionar jogador: ' + erro))
});


router.post("/transfereJogador", (req, res) => {
	console.dir(req.body)
	Users.remJogador(req.body.origem, req.body.jogador)
	.then(dados => {
		jogadores = dados.jogadores
		jogador = {}
		jogador = jogadores.find(x => x.nome == req.body.jogador)
		jogador.emTransferencia = false
		Users.addJogador(req.body.destino, jogador)
		.then(dados => res.jsonp(dados))
		.catch(erro => res.status(500).send('Erro ao adicionar jogador' + erro))
	})
	.catch(erro => res.status(500).send('Erro ao remover jogador' + erro))
});


router.post("/bloqueiaJogador", (req, res) => {
	console.dir(req.body)
	Users.blockJogador(req.body.equipa, req.body.jogador, true)
	.then(dados => res.jsonp(dados))
	.catch(erro => res.status(500).send('Erro ao adicionar jogador: ' + erro))
});

router.post("/desbloqueiaJogador", (req, res) => {
	console.dir(req.body)
	Users.blockJogador(req.body.equipa, req.body.jogador, false)
	.then(dados => res.jsonp(dados))
	.catch(erro => res.status(500).send('Erro ao adicionar jogador: ' + erro))
});

router.post('/', (req, res) => {
	console.log("Entrei")
	Users.inserir(req.body)
	.then(dados => res.jsonp(dados))
	.catch(erro => res.status(500).send('Erro ao adicionar utilizador: ' + erro))
});


router.delete('/', (req, res) => {
	Users.remover(req.body._id)
	.then(dados => res.jsonp(dados))
	.catch(erro => res.status(500).send('Erro ao remover utilizador: ' + erro))
});

module.exports = router;
