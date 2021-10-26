
if(process.env.NODE_ENV !=='production'){
    require('dotenv').config();
}


const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path= require('path');
const seedDB = require('./seed')
const methodOverride = require('method-override')
const session = require('express-session')
const flash = require('connect-flash');
const passport = require('passport');
const localStrategy = require('passport-local')
const User = require('./models/user');



// Routes
const productRoutes = require('./routes/product')
const authRoutes = require('./routes/auth')
const cartRoutes = require('./routes/cart')

mongoose.connect(process.env.DB_URL)
.then(()=>{
   
    console.log("Db connected");
})
.catch((err)=>{


    console.log(err);
    console.log("There is something wrong")
})

// setting the EJS

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '/public')));
app.use(methodOverride('_method'));



app.use(session({

    secret: "NothingMoreAndNothingLess",
    resave: false,
    saveUninitialized: true


}))
// TO flash the Messages
app.use(flash());
 

//  seedDB();



// Initializing the passport and Session for storing the User info
app.use(passport.initialize());
app.use(passport.session());


// confing the passport
passport.use(new localStrategy(User.authenticate()));



passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());






// TO show the flash msgs on all the templates


app.use((req,res,next)=>{

    res.locals.success=req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.currentUser = req.user;
    next();
});



app.use(productRoutes);
app.use(authRoutes);
app.use(cartRoutes);



app.get('/', (req, res) => {
    
    res.send("LANDING PAGE");
})




app.listen(process.env.PORT||3000, () => {
    console.log("Server Started AT PORT 3000");
})