const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    cate_id: {
        type: Number
    },
    product_description: {
        type: String
    },
    product_image: {
        type: String
    },
    product_name: {
        type: String
    },
    product_price: {
        type: Number
    },
    product_status: {
        type: String
    },
    sale: {
        type: Number
    },
    view: {
        type: Number
    }
});

const Product = mongoose.model('products', productSchema);

module.exports =  Product ;
