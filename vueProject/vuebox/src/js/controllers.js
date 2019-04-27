var Users = require('./models')
var mongoose = require ('mongoose')

//Lista de Users
module.exports.listar = () => {
    return Users
        .find({})
        .exec()
}

//Devolve a informacao de uma entidade
module.exports.consultarUser = eid => {
    return Users
        .findOne({'Users.id': eid}, {'Users.id': true, 'Users.type': true, 'Users.transf': false})
        .exec()
}

module.exports.consultarComprasHash = (eid) => {
    return Users
        .findOne({'Users.id':eid},{'Users.transf': true})
        .exec()
}

//Lista de blocos de uma determinada conta
// module.exports.consultarCompra = (eid, hash) => {
//     return Users
//         .findOne({'Users.id':eid, 'Users.transf.hash': hash})
//         .exec()
// }

module.exports.inserirUser = user => {
    return Users.create(user)
}

// module.exports.addBlock = (eid, hash, block) =>{
//     return Users
//         .findOneAndUpdate(
//             {'Users.id': eid, 'Users.transf.hash': hash},
//             {$push: {'Users.transf.blocos': block}},
//             {new: true})
//         .exec()
// }

module.exports.addTransf = (eid, hash, block) =>{
    return Users
        .findOneAndUpdate(
            {'Users.id': eid},
            {$push: {'Users.transf.blocos': block}, $set :{'Users.transf.hash': hash}},
            {new: true})
        .exec()
}

