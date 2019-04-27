var mongoose = require('mongoose')
var Schema = mongoose.Schema

var TransfSchema = new Schema({
    hash: {type: String, required: true}
})

var EntidadeSchema = new Schema({
    id: {type: String, required:true},
    type: {type: String, required:true},
    transf: [{type: TransfSchema}]
})

var UsersSchema = new Schema({
    Users: [{type: EntidadeSchema}]
})

module.exports = mongoose.model('Users', UsersSchema, 'users')