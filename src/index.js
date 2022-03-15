const express = require('express')
const app = express()
const morgan = require('morgan')
const path = require('path')
const engine = require('ejs-mate')
const IndexRoutes = require('./routes/index')
require('./database')
const passport = require('passport')
require('./passport/local-auth')
const session = require('express-session')
const flash = require('connect-flash')

//settings
app.set('port', process.env.PORT || 3000)
app.engine('ejs',engine)
app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))
//static files 
app.use(express.static(path.join(__dirname,'public')))
//middlewares
app.use(morgan('dev'))
app.use(express.urlencoded({extended:false}))
app.use(session({
    secret:"mysecretsession",
    resave: false,
    saveUninitialized: false
}))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())

app.use((req,res,next)=>{
    app.locals.signupMessage = req.flash('signupMessage')
    app.locals.signinMessage = req.flash('signinMessage')
    app.locals.user = req.user
    next()
})
//routes
app.use(IndexRoutes)
//starting the server
app.listen(app.get('port'),()=>{
    console.log(`server on http://localhost:${app.get('port')}`)
})
