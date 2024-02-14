if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const session = require('express-session')
const flash = require('connect-flash')
const methodOverride = require('method-override');
const passport = require('passport')
const LocalStrategy = require('passport-local')
const Admin = require('./models/adminModel')

const ExpressError = require('./utils/ExpressError');

const showerRouter = require('./routes/showerRouter')
const adminRouter = require('./routes/adminRouter')

const dbUrl = process.env.DB_URL;
const dbLocal = 'mongodb://127.0.0.1:27017/yoelProject';


mongoose.connect(dbUrl);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log('DataBase connected')
})

const app = express();
app.engine('ejs', ejsMate);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname, 'public')))
// app.use(express.json()); // Parse JSON request body

const sessionConfig = {
    secret : "yoelShowers", 
    resave : false,
    saveUninitialized : true,
    cookie : {
        httpOnly: true,
        expire : Date.now() + 1000*60*60*24*7, 
        maxAge : 1000*60*60*24*7, 
    }
}

app.use(session(sessionConfig))
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(Admin.authenticate()));

passport.serializeUser(Admin.serializeUser())
passport.deserializeUser(Admin.deserializeUser())


app.use( (req, res, next) => {
    res.locals.admin = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
 })



app.use('/' , showerRouter)
app.use('/admin' , adminRouter)


app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
})
app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Something went wrong'
    res.status(statusCode).render('error', { err })

})


app.listen(80, () => {
    console.log('Serving on port 80')
})

