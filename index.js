// criando o servidor
const express = require('express')
const path = require('path')
const app = express()
const port = process.env.PORT || 3000
// importando midlewares
const bodyParser = require('body-parser')
const pessoas = require('./routes/pessoas')
// conexao mysql
//importanto o mysql
const mysql = require('mysql')
// criando a conexao com o Mysql
const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'admin',
    database: 'cadastro'
})
// injecao de dependencia
const dependencies = {
    connection
}

// declarando midlewares
// declarando body-parser para conveter os dados do back-end para o front-end
app.use(bodyParser.urlencoded( { extended : false } ))
// declarando o caminho estatico que tem o template-html e o CSS
app.use(express.static('public'))
//midleware views
app.set('views', path.join(__dirname, 'views'))
//midleware view engine
app.set('view engine', 'ejs')
// declarando o caminho para renderizar o pagina
app.get('/', (req, res)=> res.render('home'))
// declarando o caminho para pessoas e injecao de depedencias
app.use('/pessoas', pessoas(dependencies))
//  conexao integrada entre o servido e a conexao com o BD
connection.connect(()=>{
    // o app.listen tem a funcao de escutar a conexao com o BD e conecta na porta 3000
    app.listen(port, () => console.log('Listering on port:'+port))
})
