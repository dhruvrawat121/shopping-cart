const mongoose = require('mongoose');
const Product = require('./models/product');

const products =[
    
    {

    name: 'I phone',
    img: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
    price: 3000,
    desc: "The iPhone is a smartphone made by Apple that combines a computer, iPod, digital camera and cellular phone into one device with a touchscreen interface. The iPhone runs the iOS operating system, and in 2020 when the iPhone 12 was introduced, it offered up to 256 GB of storage and a 12-megapixel camera."
    }, 
    {
    name: "Watch",
    img: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=388&q=80",
    price: 4000,
    desc:"Walk into the cosmos of fashion with TITAN, a one stop online fashion destination. Our exhaustive collection Is inspired by international fashion and latest trend style. Over the years, TITAN has been tremendously successful in making online shopping much convenient and enjoyable with wide product range starting from watches, wall clocks to wallets, belts and straps. With a user-friendly shopping experience, TITAN aims to fulfil your wishes and deliver your products in fastest time possible. Experience the best in class online shopping with services such as Cash on Delivery, free shipping and seamless return/exchange policies."


    },
    {
    name: "Laptop",
    img:"https://images.unsplash.com/photo-1593642532454-e138e28a63f4?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1169&q=80",
    price: 50000,
    desc:"Whether it is a checking email, posting on social media or streaming music & movies, Inspiron keeps you connected to what matters most to you | Buy Directly from Dell"
            
    },{

        name: "shoes",
        img:"https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1964&q=80",
        price:"5000",
        desc:"With its futuristic look, accentuated heel and mixed-material upper, the Nike Air Max Infinity 2 brings you a textured, fashion-forward look you can wear day in and day out.The wavy design lines add an organic element to balance the modern aesthetic while the Max Air cushioning adds comfort to your day"
    },{

        name: "Shirt",
        img:"https://images.unsplash.com/photo-1603320410149-db26b12d5c2b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
        price:500,
        desc:"The Jordan Dri-FIT Air Top is an everyday essential made from blended knit fabric with sweat-wicking technology. Wear it casually or to play or work out in"
    }]


const seedDB = async () =>{

    Product.insertMany(products);
    console.log("DB seeded")
}

module.exports = seedDB;
