const {Router} = require('express')
const router = Router()
const passport = require('passport')

router.get('/',(req,res)=>{
    res.render('index')
})
router.get('/signup',(req,res,next)=>{
    res.render('signup')
})
router.post('/signup',passport.authenticate('local-signup',{
    successRedirect:'/profile',
    failureRedirect:'/signup',
    passReqToCallback: true
}))
router.get('/signin',(req,res,next)=>{
    res.render('signin')
})
router.post('/signin',passport.authenticate('local-signin',{
    successRedirect:'/profile',
    failureRedirect:'/signin',
    passReqToCallback: true
}))
router.get('/logout',(req,res,next)=>{
    req.logout()
    res.redirect('/')
})

router.use((req,res,next)=>{
    isAuthenticated(req,res,next)
    next()
})//para poder acceder a las dos rutas de abajo hay que autenticarse
router.get('/profile',(req,res,next)=>{
    const {email} = req.user
    res.render('profile',{email})
    console.log(req.user)
})
router.get('/only-root',(req,res,next)=>{
    res.render('profile',{})
})

function isAuthenticated(req,res,next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect('/')
}

module.exports = router