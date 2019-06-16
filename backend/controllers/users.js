var User = require('../models/users')



//Devolve a lista de Users
module.exports.listar = () => {
    return User
        .find()
        .sort({id:-1})
        .exec()
}

//Consultar um User

module.exports.consultar = uid => {
    return User
        .findOne({ _id: uid })
        .exec()
}

module.exports.listarPorTipo = tipo => {
    return User
        .find({ tipo: tipo })
        .exec()
}

module.exports.listarPorPais = pais => {
    return User
        .find({ pais: pais })
        .exec()
}

module.exports.listarPorLiga = liga => {
    return User
        .find({ liga: liga})
        .exec()
}

module.exports.alteraNome = (uid, n) => {
    return User
        .findOneAndUpdate(
            {_id : uid}, 
            {$set: {nome: n}},
            {new : true})
        .exec()
}

module.exports.alteraDesc = (uid, desc) => {
    return User
        .findOneAndUpdate(
            {_id : uid}, 
            {$set: {descricao: desc}},
            {new : true})
        .exec()
}

module.exports.alteraFoto = (uid, foto) => {
    return User
        .findOneAndUpdate(
            {_id : uid}, 
            {$set: {foto: foto}},
            {new : true})
        .exec()
}

module.exports.atualizaPerfil = (uid, nome, pais, cidade, contribuinte, site) => {
    return User
        .findOneAndUpdate(
            {_id : uid}, 
            {$set: {nome: nome, 
                    pais: pais, 
                    cidade: cidade, 
                    contribuinte: contribuinte, 
                    site: site}
            },
            {new : true})
        .exec()
}

module.exports.addJogador = (uid, jogador) => {
    return User.updateOne(
        {_id: uid},
        {$push: { jogadores: jogador }}
    )
}

module.exports.remJogador = (uid, jogador) => {
    return User.findOneAndUpdate(
        {_id: uid},
        { $pull: { jogadores: { nome: jogador} }},
        { projection: {"jogadores": true} }
    )
}

module.exports.blockJogador = (uid, jogador, bool) => {
    return User.findOneAndUpdate(
        {_id: uid, "jogadores.nome": jogador },
        { $set: { "jogadores.$.emTransferencia": bool }}
    )
}

module.exports.inserir = user => {
    return User.create(user)
}

module.exports.remover = uid => {
    return User.deleteOne( { _id: uid } )
}