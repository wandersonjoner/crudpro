// importando o pessoas.js da pasta models
const pessoas = require('../models/pessoas')
// abrindo conexao com mysql e renderizando o dados na página index.ejs
const index = async(connection, req, res)=>{
    const results = await pessoas.findAll(connection)
    res.render('pessoas/index', { pessoas : results })
}


const deleteOne = async(connection, req, res)=>{
    await pessoas.deleteOne(connection, req.params.id)
    res.redirect('/pessoas')
}

const createForm = (req, res)=>{
    res.render('pessoas/create')
}

const createProcess = async(connection, req, res)=>{
    await pessoas.create(connection, req.body)
    res.redirect('/pessoas')
}


const updateForm = async(connection, req, res)=>{
    const pessoa = await pessoas.findById(connection, req.params.id)
    res.render('pessoas/update', { pessoa })
}

const updateProcess = async(connection, req, res)=>{
    await pessoas.update(connection, req.params.id, req.body)
    res.redirect('/pessoas')
}

//  importando modulos
module.exports = {
    index,
    deleteOne,
    createForm,
    createProcess,
    updateForm,
    updateProcess
}