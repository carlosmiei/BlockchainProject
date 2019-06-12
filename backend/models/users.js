var mongoose = require('mongoose')
var Schema = mongoose.Schema


var UserSchema = new Schema({
    _id: {type: String, required:true},
    papel: {type: String, required:true},
    nome: {type: String, required:false},
    pais: {type: String, required:false},
    liga: {type: String, required:false},
    bancos: [{type: String, required:false}]
})

module.exports = mongoose.model('User',UserSchema,'users')
