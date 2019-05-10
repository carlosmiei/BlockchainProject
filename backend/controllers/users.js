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

module.exports.listarPorPapel = papel => {
    return User
        .find({ papel: papel })
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

module.exports.inserir = user => {
    return User.create(user)
}