const express = require('express')
const session = require('express-session')
const Controller = require('./controllers/index')
const app = express()
const port = 3000
const {isLogin, isModerator, alreadyLogin} = require('./middlewares/authorize')
const upload = require('express-fileupload')

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

app.get('/', alreadyLogin, Controller.home)
app.get('/register', alreadyLogin, Controller.formRegister)
app.post('/register', alreadyLogin, Controller.handleRegister)
app.get('/login', alreadyLogin, Controller.formLogin)
app.post('/login', alreadyLogin, Controller.handleLogin)
app.use(isLogin)
app.get('/index', Controller.index)
app.get('/profile/', Controller.readProfile)
app.use(upload())
app.get('/profile/edit', Controller.editProfile)
app.post('/profile/edit', Controller.handleEditProfile)
app.get('/posts/create', Controller.createPost)
app.post('/posts/create', Controller.handleCreatePost)
app.get('/logout', Controller.logout)
app.use(isModerator)
app.get('/delete/:id', Controller.delete)


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})