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
	else if(req.query.papel){
		Users.listarPorPapel(req.query.papel)
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


router.post('/', (req, res) => {
	Users.inserir(req.body)
	.then(dados => res.jsonp(dados))
	.catch(erro => res.status(500).send('Erro ao adicionar utilizador: ' + erro))
});


module.exports = router;
