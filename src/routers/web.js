const express = require("express");
const router = express.Router();
const {
    getAllProduct, 
    getListProduct, 
    getProductById, 
    getProductByCate,
    getAboutPage,} = require('../controller/client/productController');

const {loginForm ,registerForm, postRegister,loggin,profile,logOut} = require('../controller/client/login');
const authenticateToken = require('../middleware/authenticateToken');
// =============== CLINET======================

router.get('/', getAllProduct);
router.get('/login', loginForm);
router.post('/login', loggin);
router.get('/logOut', logOut);
router.get('/profile', authenticateToken,profile );
router.get('/register', registerForm);
router.post('/register', postRegister);
router.get('/shop', getListProduct);
router.get('/productDetail/:id', getProductById);
router.get('/productByCate/:id', getProductByCate);
router.get('/about', getAboutPage);


//======================================
module.exports = router;