var mongoose = require('mongoose')
var Schema = mongoose.Schema


var JogadorSchema = new Schema({
    nome: {type: String, required:true},
    pais: {type: String, required:true},
    nascimento: {type: String, required:true},
    foto: {type: String, required:false},
    posicoes: [{type: String, required:false}]
})

var UserSchema = new Schema({
    _id: {type: String, required:true},
    papel: {type: String, required:true},
    nome: {type: String, required:false},
    pais: {type: String, required:false},
    liga: {type: String, required:false},
    jogadores: [JogadorSchema],
    bancos: [{type: String, required:false}]
})

module.exports = mongoose.model('User',UserSchema,'users')
