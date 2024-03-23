const express = require("express");
const router = express.Router();
const {
    getAllProduct, 
    getListProduct, 
    getProductById, 
    getProductByCate,
    getAboutPage} = require('../controller/client/productController');
// =============== CLINET======================

router.get('/', getAllProduct);
router.get('/shop', getListProduct);
router.get('/productDetail/:id', getProductById);
router.get('/productByCate/:id', getProductByCate);
router.get('/about', getAboutPage);


//======================================
module.exports = router;