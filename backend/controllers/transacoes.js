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

module.exports.listarEntreDatas = (data1, data2) => {
    console.log(data1)
    console.log(data2)
    return Transacao
        .find({ dataP: {$gte: data1, $lte: data2}})
        .exec()
}

module.exports.listarPorBanco = b => {
    return Transacao
        .find({ banco: b })
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

module.exports.consultarValorTotalVendas = (uid, data1, data2)  => {
    return Transacao
        .aggregate(
            [
                { $match: {
                    $and: [
                        { from: uid },
                        { dataE: { $gte: data1, $lte: data2 } },
                        { $or: [
                            { estado: "Pago" },
                            { estado: "Completa" }
                        ]}                
                    ]
                } },
                { $group: { _id : null, total : { $sum: { $add : ["$valorT","$valorI"] } } } },
            ])
}


module.exports.consultarValorTotalCompras = (uid, data1, data2)  => {
    return Transacao
        .aggregate(
            [
                { $match: {
                    $and: [
                        { to: uid },
                        { dataE: { $gte: data1, $lte: data2 } },
                        { $or: [
                            { estado: "Em pagamento" },
                            { estado: "Pago" },
                            { estado: "Completa" }
                        ]}                
                    ]
                } },
                { $group: { _id : null, total : { $sum: { $add : ["$valorT","$valorI"] } } } },
            ])
}

module.exports.consultarTotalVendas = (uid, data1, data2)  => {
    return Transacao
        .find(
            { $and: [ 
                { from: uid }, 
                { dataP: {$gte: data1, $lte: data2} },
                { estado: "Completa" }
            ]})
        .countDocuments()
        .exec()
}

module.exports.consultarTotalCompras = (uid, data1, data2)  => {
    return Transacao
        .find(
            { $and: [ 
                { to: uid }, 
                { dataP: {$gte: data1, $lte: data2} } ,
                { estado: "Completa" }
            ]})
        .countDocuments()
        .exec()
}


module.exports.consultarTotalCompras = (uid, data1, data2)  => {
    return Transacao
        .find(
            { $and: [ 
                { to: uid }, 
                { dataP: {$gte: data1, $lte: data2} } ,
                { estado: "Completa" }
            ]})
        .countDocuments()
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



module.exports.alteraDataAceite = (tid, data) => {
    return Transacao
        .findOneAndUpdate(
            {_id : tid}, 
            {$set: {'data.Aceite': data}},
            {new : true})
        .exec()
}

module.exports.alteraDataRejeitada = (tid, data) => {
    return Transacao
        .findOneAndUpdate(
            {_id : tid}, 
            {$set: {'data.Rejeitada': data}},
            {new : true})
        .exec()
}

module.exports.alteraDataEmPagamento = (tid, data) => {
    return Transacao
        .findOneAndUpdate(
            {_id : tid}, 
            {$set: {'data.EmPagamento': data}},
            {new : true})
        .exec()
}

module.exports.alteraDataPagamento = (tid, data) => {
    return Transacao
        .findOneAndUpdate(
            {_id : tid}, 
            {$set: {'data.Pago': data}},
            {new : true})
        .exec()
}

module.exports.alteraDataCompleto = (tid, data) => {
    return Transacao
        .findOneAndUpdate(
            {_id : tid}, 
            {$set: {'data.Completo': data}},
            {new : true})
        .exec()
}

module.exports.inserir = transacao => {
    return Transacao.create(transacao)
}

