const mongoose = require('mongoose');
const Product = require('../../../model/product');

//================================================
const getAdminProduct = async (req,res) => {
    try {
        const products = await Product.find({});
        res.render('../views/admin/products/adminProduct.ejs',{products:products});
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};


const getAddProduct = (req,res) => {
    res.render('../views/admin/products/adminAddProduct.ejs');
};



//=================================================
module.exports = {
    getAdminProduct,
    getAddProduct
};