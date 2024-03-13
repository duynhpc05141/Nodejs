const express = require("express");
const router = express.Router();


// =============== CLINET======================
router.get('/',(req,res) => {
    res.render('homePages.ejs');
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