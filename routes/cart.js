const express = require('express');
const router = express.Router();
const{isLoggedIn}= require('../middleware');
const Product = require('../models/product');
const User = require('../models/user');



router.get('/user/:userId/cart',async (req, res) => {

    try{
        const user =await User.findById(req.params.userId).populate('cart');
        
        res.render('cart/showCart',{userCart: user.cart});
        
    }catch{

        req.flash('error',"Something went wrong")
        res.render('error')
        
    }
})


router.post('/user/:id/cart',isLoggedIn,async(req,res)=>{

               try{

                const product =await Product.findById(req.params.id);
                const user = req.user;
                user.cart.push(product);
                await user.save();
                req.flash('success',"Add to the cart Successfully");
                res.redirect(`/user/${req.user._id}/cart`)

               }catch{

                req.flash('error',"Unable to add it to the cart")
                req.render('error')
               }


})

// for deleting the product

router.delete('/user/:userid/cart/:id', async(req, res) => {
    
    try{
        const{userid,id}= req.params;
        await  User.findByIdAndUpdate(userid,{$pull:{cart: id}});
        res.redirect(`/user/${req.user._id}/cart`)
    }
    catch(e){
        console.log(e.message)
    }
})







 module.exports = router;
