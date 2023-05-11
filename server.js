const express = require('express')
const app = express()
const port = 3000

const connection = require('./database/database')
const DBModel = require('./database/Questions')
const Question = require('./database/Questions')

connection
.authenticate()
.then(() => {console.log('Deu certo');})
.catch(err => console.log(`Opa, aconteceu um ${err}`))


app.set('view engine', 'EJS')

app.use(express.static('public'))

app.use(express.urlencoded({extended:false}))

app.get('/', (req, res) => {
    DBModel.findAll({raw:true}).then(perguntas => { 
        res.render("index", { pergunta:perguntas})
    })
})
app.get('/perguntar', (req, res) =>{
    res.render("questions")
})

app.post('/questionsDBRoute', (req, res) => { 
    let title = req.body.title
    let description = req.body.description

    DBModel.create({
        title: title,
        descripiton: description
    }).then(() => { res.redirect('/')})
})  


app.listen(port)