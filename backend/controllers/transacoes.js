var Transacao = require('../models/transacoes')



//Devolve a lista de Transacoes
module.exports.listar = () => {
    return Transacao
        .find()
        .sort({id:-1})
        .exec()
}

//Consultar uma Transacao

module.exports.consultar = tid => {
    return Transacao
        .findOne({_id: tid})
        .exec()
}

module.exports.listarPorUtilizador = user => {
    return Transacao
        .find({ $or: [ {from: user}, {to: user} ] })
        .exec()
}

module.exports.listarFromUser = user => {
    return Transacao
        .find({from: user})
        .exec()
}

module.exports.listarToUser = user => {
    return Transacao
        .find({to: user})
        .exec()
}


module.exports.alteraEstado = (tid, e) => {
    return Transacao
        .findOneAndUpdate(
            {_id : tid}, 
            {$set: {estado: e}},
            {new : true})
        .exec()
}

module.exports.inserir = transacao => {
    return Transacao.create(transacao)
}