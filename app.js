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
app.use(express.static(__dirname + '/public'));

app.get('/', Controller.home)
app.get('/register', Controller.formRegister)
app.post('/register', Controller.handleRegister)
app.get('/login', Controller.formLogin)
app.post('/login', Controller.handleLogin)
app.use(isLogin)
// app.use(`/posts/delete`)
app.get('/index', Controller.index)
app.get('/profile/', Controller.readProfile)
// app.get('/profile/create', Controller.createProfile)
// app.post('/profile/create', Controller.handleCreateProfile)
app.post('/profile/edit', (req, res) => {
    res.send('Hello World Ini halaman handle edit profile!')
})
app.get('/posts/create', Controller.createPost)
app.post('/posts/create', Controller.handleCreatePost)
app.use(isModerator)
app.get('/logout', Controller.logout)


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})