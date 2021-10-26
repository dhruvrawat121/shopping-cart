const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');


// Get the sign Up form

router.get('/register',(req, res) => {

res.render('auth/signup')
})


router.post('/register',async(req, res) => {

  try{

    const user = new User({username: req.body.username, email: req.body.email});
    const newUser = await User.register(user, req.body.password);
    req.flash('success',"Registerred Successfully");
    res.redirect('/products')
  }catch(e){

   
    req.flash('error',e.message);
    res.redirect('/register')
    
  }
})



// for login page

router.get('/login', (req,res)=>{

    res.render('auth/login')
})
module.exports = router;

router.post('/login', 
      passport.authenticate('local',
      
      {
        failureRedirect: '/login',
        failureFlash: true
      }),(req, res)=>{
        const user = req.user.username;
        req.flash('success',`logIn Successful Welcome back ${user}`)
                
        res.redirect('products')
  })


//   for Log out 
router.get('/logout', (req, res)=>{

    req.logout();
    req.flash('success',"Logged Out Successfully!")
    
    res.redirect('/login');
})