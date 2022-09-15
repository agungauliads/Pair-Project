const express = require('express')
const session = require('express-session')
const Controller = require('./controllers/index')
const app = express()
const port = 3000
const {isLogin, isModerator} = require('./middlewares/authorize')

app.use(
    session({
        secret: "secret",
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: false,
            sameSite: true
        }
    })
);
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));


app.get('/', Controller.home)
app.get('/register', Controller.formRegister)
app.post('/register', Controller.handleRegister)
app.get('/login', Controller.formLogin)
app.post('/login', Controller.handleLogin)
app.get('/logout', Controller.logout)
app.use(isLogin)
app.use(isModerator)
app.get('/index', Controller.index)

app.listen(port, () => {
    console.log(`Pengguna Pinterin sebanyak ${port} User`)
})