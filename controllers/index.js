const {User, Profile, Post} = require("../models/index")
const bcryptjs = require('bcryptjs')

class Controller{
    static home(req, res){
        res.render('home')
    }

    static formRegister(req, res){
        res.render('formRegister')
    }

    static handleRegister(req, res){
        const {username, email, password, role} = req.body
        User.create({
            username,
            email,
            password,
            role
        })
        .then(data => {
            res.redirect('/login')
        })
        .catch(err => {
            res.send(err)
        })
    }

    static formLogin(req, res){
        res.render('formLogin')
    }

    static handleLogin(req, res){
        const { username, password } = req.body
        User.findByPk({
            where: {
                username
            }
        })
        .then(data => {
            if(data){
                const isValidPassword = bcryptjs.compareSync(password, data.password)
                if(isValidPassword){
                    return res.redirect('/')
                }else{
                    const error = "invalid username/password"
                    return res.redirect(`/login?error=${error}`)
                }   
            }else{
                const error = "invalid username/password"
                    return res.redirect(`/login?error=${error}`)
            }
        })
        .catch(err => {
            res.send(err)
        })
    }
}

module.exports = Controller