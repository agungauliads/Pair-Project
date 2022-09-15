const { User, Profile, Post } = require("../models/index")
const bcryptjs = require('bcryptjs')
const GetLocation = require('location-by-ip');
const SPOTT_API_KEY = 'c061bd9c51msh227937cd442427bp1be0a6jsn905df7c9cdd3';
const getLocation = new GetLocation(SPOTT_API_KEY);
// console.log(getLocation.byMyIp, "<======");

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
                        const error = "invalid username / password"
                        return res.redirect(`/login?error=${error}`)
                    }
                } else {
                    const error = "invalid username / password"
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
        let user;
        Post.findAll({
            include: {
                model: User,
                include: [Profile]
            }
        })
            .then((users) => {
                user = users
                return User.findOne({
                    where: { id: req.session.user.id }
                })
            })
            .then((profile) => {
                // res.send(user)
                res.render('index', { user, profile })
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
                res.render('profile', { result })
            }).catch((err) => {
                // console.log(err, "====");
                res.send(err)
            });
    }

    static editProfile(req, res) {
        // Profile.findOne({
        //     include: User,
        //     where: {
        //         UserId: req.session.user.id
        //     }
        // })
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
        // res.send('hello world')
        console.log(req.body);
        console.log(req.session);
        /*
        Session {
        cookie: {
            path: '/',
            _expires: null,
            originalMaxAge: null,
            httpOnly: true,
            secure: false,
            sameSite: true
        },
        user: { id: 5, role: 'Moderator' }
        }
        */
        let { fullname, address, bio, photo } = req.body
        Profile.update({fullname, address, bio, photo}, {
            where : {
                id : req.session.user.id
            }
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
                res.send(err)
            })
    }
}

module.exports = Controller