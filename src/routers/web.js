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
    async function productList() {
        try {
            await client.connect();
            const database = client.db(); // Get the database
            const collection = database.collection('product');
            const collectionCate = database.collection('category');
            const cursor = collection.find({});
            const categoryList = await collectionCate.find({}).toArray();
        
            // // Convert cursor to array of products
            const productList = await cursor.toArray(); 
            // return product;
            res.render('shopClient.ejs', {productList: productList ,categoryList: categoryList});
        } catch (error) {
            console.error('Error fetching product data from MongoDB:', error);
        } 
        
    }
    productList();
});

router.get('/productDetail/:id', async (req, res) =>{
    try {
        // Kết nối đến cơ sở dữ liệu
        await client.connect();
        const database = client.db();
        const collection = database.collection('product');

        // Lấy ID sản phẩm từ URL và chuyển đổi thành ObjectId
        const productId = ObjectId(req.params.id);
        console.log(productId);
        // Truy vấn sản phẩm từ cơ sở dữ liệu
        const selectedProduct = await collection.findOne({ _id: productId });
        console.log(selectedProduct);
        res.render("productDetail.ejs", { product: selectedProduct });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    } finally {
        // Đóng kết nối đến cơ sở dữ liệu
        await client.close();
    }
});

router.get('/about',(req,res) => {
    res.render('aboutClient.ejs');
});


//================ ADMIN=======================

router.get('/admin',(req,res) => {
    res.render('adminPage.ejs');
})

//**********USER********** */
router.get('/user', async (req,res) => {
    await client.connect();
    const database = client.db(); // Get the database
    const collection = database.collection('users');
    const cursor = collection.find({});

    // // Convert cursor to array of products
    const users = await cursor.toArray();
    res.render('adminUser.ejs',{users:users});
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