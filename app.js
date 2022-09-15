const express = require('express')
const Controller = require('./controllers/index')
const app = express()
const port = 3000

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.get('/', Controller.home)
app.get('/register', Controller.formRegister)
app.post('/register', Controller.handleRegister)
app.get('/login', Controller.formLogin)
app.post('/login', Controller.handleLogin)


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})