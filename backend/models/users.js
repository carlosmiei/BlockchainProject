var mongoose = require('mongoose')
var Schema = mongoose.Schema


var JogadorSchema = new Schema({
    nome: {type: String, required:true},
    contribuinte:{type: String, required:true},
    pais: {type: String, required:true},
    nascimento: {type: String, required:true},
    foto: {type: String, required:false, default:"https://cdn1.imggmi.com/uploads/2019/6/15/23ef57b240d714582dc01cd90cf96a1a-full.jpg"},
    posicoes: [{type: String, required:false}],
    emTransferencia: {type: Boolean, required:true, default:false}
})

var UserSchema = new Schema({
    _id: {type: String, required:true},
    tipo: {type: String, required:true},
    nome: {type: String, required:false},
    pais: {type: String, required:false},
    liga: {type: String, required:false},
    jogadores: [JogadorSchema],
    bancos: [{type: String, required:false}],
    foto: {type: String, required:false, default:"https://cdn1.imggmi.com/uploads/2019/6/15/260fbb08c141857e061d1f6252ecfcfa-full.png"},
    descricao: {type: String, required:false},
    site: {type: String, required:false},
    contribuinte:{type: String, required:true},
    cidade:{type: String, required:false}
})

module.exports = mongoose.model('User',UserSchema,'users')
