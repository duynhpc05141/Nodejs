const mongoose = require('mongoose');
const Product = require('../../model/product');
const Category = require('../../model/category');
const Users = require('../../model/users');

//==================================================
const getAllProduct = async (req, res) => {
    try {
        const product = await Product.find({});
        console.log(product);
        res.render('../views/client/homePages.ejs', {product: product});
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

const getListProduct = async (req,res) => {
    try {
        const categoryList = await Category.find({});
        const productList = await Product.find({});
        console.log(categoryList);
        // return product;
        res.render('../views/client/shopClient.ejs', {productList: productList ,categoryList: categoryList});
    } catch (error) {
        console.error('Error fetching product data from MongoDB:', error);
    } 
};


const getProductById = async (req, res) =>{
    try {
        const selectedProduct = await Product.findOne({_id: req.params.id});
        // return product;
        res.render("../views/client/productDetail.ejs", { products: selectedProduct });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    } 
};

const getProductByCate = async (req, res) =>{
    try {
        const categoryList = await Category.find({});
        const productByCate = await Product.find({cate_id: req.params.id});
        // // return product;
        res.render("../views/client/productByCate.ejs", { productList: productByCate,categoryList: categoryList });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    } 
};

const getAboutPage = (req,res) => {
    res.render('../views/client/aboutClient.ejs');
};

//=====================================================
module.exports = {
    getAllProduct,
    getListProduct,
    getProductById,
    getProductByCate,
    getAboutPage
};