var mongoose = require('mongoose')
var Schema = mongoose.Schema



var TransacaoSchema = new Schema({
    _id: {type: String, required:true},
    from: {type:String,required:true},
    to: {type:String,required:true},
    valorT: {type: Number, required:true},
    valorI: {type: Number, required:true},
    numFatura: {type:String, required:true},
    dataE: {type: String, required:true},
    dataP: {type: String, required:false},
    nomeJogador: {type: String, required:true},
    estado: {type: String, required:true},
    contribuinteD: {type: String, required:true},
    hashTrans: {type: String, required:true},
    numBloco: {type: String, required:true},
    gas: {type: String, required:true},
    banco: {type: String, required:false},
    
})

module.exports = mongoose.model('Transacao',TransacaoSchema,'transacoes')
