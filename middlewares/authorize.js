const isLogin = (function (req,res,next){
    // console.log(req.session);
    if(!req.session.user){
        const error = "Please login first!"
        res.redirect(`/login?error=${error}`)
    }else{
        next()
    }
})
const isModerator = (function (req,res,next){
    // console.log(req.session);
    if(req.session.user && req.session.user.role !== "Moderator"){
        const error = "Your role cannot access this session!"
        res.redirect(`/login?error=${error}`)
    }else{
        next()
    }
})

const alreadyLogin = (function (req,res,next){
    // console.log(req.session);
    if(req.session.user){
        res.redirect(`/index`)
    }else{
        next()
    }
})

module.exports = {isLogin, isModerator, alreadyLogin}