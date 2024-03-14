const express = require("express");
const { MongoClient } = require('mongodb');
const router = express.Router();
const { connectToMongoDB } = require('../config/database');
connectToMongoDB();
const uri = 'mongodb://localhost:27017/dybook';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// =============== CLINET======================
router.get('/',(req,res) => {
    async function fetchProductData() {
        try {
            await client.connect();
            const database = client.db(); // Get the database
            const collection = database.collection('product');
            const cursor = collection.find({});
        
            // // Convert cursor to array of products
            const product = await cursor.toArray();
    
            console.log('Products:', product);
            
            // return product;
            res.render('homePages.ejs', {product});
        } catch (error) {
            console.error('Error fetching product data from MongoDB:', error);
        } 
        
    }
    fetchProductData();
    
})
router.get('/shop',(req,res) => {
    res.render('shopClient.ejs');
})
router.get('/about',(req,res) => {
    res.render('aboutClient.ejs');
})


//================ ADMIN=======================

router.get('/admin',(req,res) => {
    res.render('adminPage.ejs');
})

//**********USER********** */
router.get('/user',(req,res) => {
    res.render('adminUser.ejs');
})
router.get('/addUser',(req,res) => {
    res.render('adminAddUser.ejs');
})


//**********PRODUCT********** */
router.get('/product',(req,res) => {
    res.render('adminProduct.ejs');
})
router.get('/addProduct',(req,res) => {
    res.render('adminAddProduct.ejs');
})


//**********CATEGORY********** */
router.get('/category',(req,res) => {
    res.render('adminCategory.ejs');
})
router.get('/addCategory',(req,res) => {
    res.render('adminAddCategory.ejs');
})


//**********ORDER********** */
router.get('/order',(req,res) => {
    res.render('adminOrder.ejs');
})
router.get('/addOrder',(req,res) => {
    res.render('adminAddOrder.ejs');
})
//======================================
module.exports = router;