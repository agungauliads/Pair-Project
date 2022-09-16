const { User, Profile, Post } = require("../models/index")
const Op = require('sequelize')
const convertDate = require('../helpers/convertDate')
const userVerified = require('../helpers/userVerified')
const bcryptjs = require('bcryptjs')
const upload = require('express-fileupload')

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
                return User.findOne({
                    where: {
                        username: username
                    }
                })
            })
            .then(dataFindOne => {
                return Profile.create({
                    UserId: dataFindOne.id
                })
            })
            .then(() => {
                res.redirect('/login')
            })
            .catch(err => {
                res.send(err)
            })
    }

    static formLogin(req, res) {
        const { error } = req.query
        res.render('formLogin', { error })
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
                        req.session.user = { id: data.id, role: data.role }
                        // req.session.role = data.role
                        return res.redirect('/index')
                    } else {
                        const error = "Invalid username / password"
                        return res.redirect(`/login?error=${error}`)
                    }
                } else {
                    const error = "Invalid username / password"
                    return res.redirect(`/login?error=${error}`)
                }
            })
            .catch(err => {
                console.log(err);
                res.send(err)
            })
    }

    static logout(req, res) {
        req.session.destroy((err) => {
            if (err) {
                res.send(err);
            } else {
                res.redirect('/login')
            }
        })
    }

    static index(req, res) {
        // console.log(req.session)
        const { search } = req.query
        let option = {
            include: {
                model: User,
                include: {
                    model: Profile
                }
            }
        }
        if (search) {
            option.include = {
                ...option.include,
                title: {
                    [Op.iLike]: `%${search}%`
                }
            }
        }
        let user;
        Post.findAll(option)
            .then((users) => {
                // console.log(users)
                user = users
                return User.findOne({
                    where: { id: req.session.user.id }
                })
            })
            .then((profile) => {
                // res.send(user)
                res.render('index', { user, profile, userVerified })
            })
            .catch((err) => {
                res.send(err)
            });
    }

    static readProfile(req, res) {
        const id = req.session.user.id // 5
        // console.log(req.session.user.id);
        Profile.findOne({
            where: { UserId: id }
        })
            .then((result) => {
                // res.send(result)
                res.render('profile', { result, convertDate })
            }).catch((err) => {
                // console.log(err, "====");
                res.send(err)
            });
    }

    static editProfile(req, res) {
        const id = req.session.user.id
        Profile.findOne({
            include: User,
            where: { UserId: id }
        })
            .then((result) => {
                // console.log(data)
                // res.send(result)
                res.render('formEditProfile', { result })
            })
            .catch((err) => {
                res.send(err)
            })
    }

    static handleEditProfile(req, res) {
        console.log(req.body);
        console.log(req.session);
        const id = req.session.user.id
        let { fullname, address, bio, photo } = req.body
        Profile.update({ fullname, address, bio, photo }, {
            where: { UserId: id }
        })
            .then((data) => {
                res.redirect('/profile')
            })
            .catch((err) => {
                res.send(err)
            })
    }

    static createPost(req, res) {
        res.render('formPost')
    }

    static handleCreatePost(req, res) {
        // console.log(req.body);
        const id = req.session.user.id
        const { title, url, description } = req.body
        Post.create({ title, url, description, UserId: id })
            .then((result) => {
                // res.send(result)
                res.redirect(`/index`)
            })
            .catch(err => {
                // console.log(err.name);
                if (err.name === "SequelizeValidationError") {
                    let errors = err.errors.map((el) => {
                        return el.message
                    })
                    res.send(errors)
                } else {
                    res.send(err)
                }
            })
    }

    static delete(req, res) {
        let id = req.params.id
        Post.destroy({
            where: {
                id: id
            }
        })
            .then(() => {
                res.redirect('/index')
            })
            .catch((err) => {
                res.send(err)
            })
    }

}

module.exports = Controller