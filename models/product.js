const mongoose = require('mongoose');
const Review = require('./review');






const productSchema = new mongoose.Schema(
    
    {

    name:{

        type: 'string',
    
    },
    img:{

        type: 'string'
    },
    price: {

        type: 'number',
        min: 0,
    },
    desc:{

        type: 'string',
    },
    reviews:[
        {

         type: mongoose.Schema.Types.ObjectId,
         ref:'Review',
            
        }
    ]
}
);

const product =  mongoose.model('Product',productSchema);

module.exports = product;