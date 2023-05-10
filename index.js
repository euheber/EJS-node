const express = require('express')
const app = express()
const port = 3000

app.set('view engine', 'EJS')
app.use(express.static('public'))

app.get('/', (req, res) => {res.render("index")})
app.get('/perguntar', (req, res) =>{
    res.render("questions")
})

app.listen(port)