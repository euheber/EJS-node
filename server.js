const express = require('express')
const app = express()
const port = 3000

const connection = require('./database/database')
const DBModel = require('./database/Questions')
const AnswerModel = require('./database/Answers')

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

app.get('/pergunta/:id', (req, res) => { 
    let id = req.params.id

    DBModel.findOne({where:{id: id}})
    .then(pergunta => { 
        if(pergunta != undefined){ 
            AnswerModel.findAll({
                where:{AnswerTo: pergunta.id}
            }).then(respostas => { 
                res.render("question", {pergunta:pergunta, resposta: respostas})
            })
        } else { 
            res.redirect("/")
        }
    })
})

app.post('/questionsDBRoute', (req, res) => { 
    let title = req.body.title
    let description = req.body.description
    
    DBModel.create({
        title: title,
        descripiton: description
    }).then(() => { res.redirect('/')})
})  

app.post("/answer", (req, res) => { 
        let body = req.body.bodyAnswer
        let answerID = req.body.pergunta

        AnswerModel.create({ 
            body: body,
            AnswerTo: answerID
        }).then(() => { 
            res.redirect(`/pergunta/${answerID}`)
        })
})


app.listen(port)