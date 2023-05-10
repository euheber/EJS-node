const express = require('express')
const app = express()

const port = 3000

app.set('view engine', 'EJS')

app.use(express.static('public'))

app.use(express.urlencoded({extended:false}))

app.get('/', (req, res) => {res.render("index")})
app.get('/perguntar', (req, res) =>{
    res.render("questions")
})

app.post('/questionsDBRoute', (req, res) => { 
    let title = req.body.title
    let description = req.body.description

    res.send(`${title} e ${description}`)
})  

app.listen(port)