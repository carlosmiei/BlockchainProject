var mongoose = require('mongoose')
var Schema = mongoose.Schema



var TransacaoSchema = new Schema({
    _id: {type: String, required:true},
    from: {type:String,required:true},
    to: {type:String,required:true},
    valorTotal: {type: String, required:true},
    valorIVA: {type: String, required:true},
    numFatura: {type:String, required:true},
    data: {type: String, required:true},
    nomeJogador: {type: String, required:true},
    estado: {type: String, required:true}
})

module.exports = mongoose.model('Transacao',TransacaoSchema,'transacoes')
