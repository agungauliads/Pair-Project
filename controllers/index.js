const { User, Profile, Post } = require("../models/index")
const bcryptjs = require('bcryptjs')

class Controller {
    static home(req, res) {
        res.render('home')
    }

    static formRegister(req, res) {
        res.render('formRegister')
    }

    static handleRegister(req, res) {
        const { username, email, password, role } = req.body
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

    static formLogin(req, res) {
        const { error } = req.query
        res.render('formLogin', {error})
    }

    static handleLogin(req, res) {
        const { username, password } = req.body
        User.findOne({
            where: {
                username
            }
        })
            .then(data => {
                // console.log(data);
                if (data) {
                    const isValidPassword = bcryptjs.compareSync(password, data.password)
                    if (isValidPassword) {
                        req.session.user = {id: data.id, role: data.role}
                        // req.session.role = data.role
                        return res.redirect('/')
                    } else {
                        const error = "invalid username / password"
                        return res.redirect(`/login?error=${error}`)
                    }
                } else {
                    const error = "invalid username / password"
                    return res.redirect(`/login?error=${error}`)
                }
            })
            .catch(err => {
                // console.log(err);
                res.send(err)
            })
    }

    static logout(req, res){
        req.session.destroy((err) => {
            if(err){
                res.send(err);
            }else{
                res.redirect('/login')
            }
        })
    }

    static index(req, res){
        res.render('index')
    }
}

module.exports = Controller