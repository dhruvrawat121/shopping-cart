const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const Review = require('../models/review');
const{isLoggedIn} = require('../middleware')




// Display all the products
router.get('/products',async (req,res) => {

  try{

    const products = await Product.find({})

    res.render('products/index',{products});
  }catch(e){

        console.log("Something went wrong");
        req.flash('error',"Cannot find Products")
        res.redirect('/error')
  }
})

// Get the form for new product
router.get('/products/new', isLoggedIn,(req,res) => {

    res.render('products/new');
})

// Creating a new products

router.post('/products',isLoggedIn,async (req,res) => {

try{

  await Product.create(req.body.product);
  req.flash('success',"Product created successfully")
  res.redirect('/products')
}catch(e){

  console.log(e.message);
  req.flash('error','Oops! Something bad happened')
  res.render('error')
}

})
// show particular product

router.get('/products/:id', async (req,res) => {

 try{

    const product = await Product.findById(req.params.id).populate('reviews');
    res.render('products/show',{product});
 }catch(e){
    console.log(e.message);
    req.flash('error',"Oops! 404 error")
    res.render('error')

 }
})

// for the edit form

router.get('/products/:id/edit' ,isLoggedIn, async (req,res) => {

const item= await Product.findById(req.params.id);
    res.render('products/edit' ,{item});
    console.log(item)
})

//  to Edit the Item
router.patch('/products/:id',isLoggedIn,async(req,res)=>{

 try{

  const item =  await Product.findByIdAndUpdate(req.params.id, req.body.product);
  req.flash('success',"Product Updated successfully.");
  res.redirect(`/products/${req.params.id}`)
 
 }catch(e) {
   console.log(e.message);
   req.flash('error','Product Not Updated Something went wrong')
   res.render('error')


 }
})

// To remove a Product

router.delete('/products/:id',isLoggedIn, async (req, res) => {

  try{

    await Product.findByIdAndDelete(req.params.id);
    req.flash('success',"Product deleted successfully")
    res.redirect('/products');
  }catch(e){

    console.log(e.message);
    req.flash('error',"Something went wrong")
    res.render('error')
  }
})



//  Creating  a new Comment of the products

router.post('/products/:id/review',isLoggedIn,async(req, res) => {

        const product = await Product.findById(req.params.id);
        const review = new Review(
          
                    {
                      user:req.user.username,
                      ...req.body

                  });
        product.reviews.push(review);
        await review.save();
        await product.save();
        req.flash('success',"Review Added Successfully");
        res.redirect(`/products/${req.params.id}`)
})



router.get('/error',(req,res) =>
{

    res.status(500).render('error')
}
)




module.exports = router; 