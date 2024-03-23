const express = require("express");
const { MongoClient} = require('mongodb');
const mongoose = require('mongoose');
const router = express.Router();
const Product = require('../model/product');
const Category = require('../model/category');
const Users = require('../model/users');
const {getAdminPage} = require('../controller/admin/home/adminController');
const {getAdminUser, getAddUser} = require('../controller/admin/user/userAdminController');
const {getAdminCate, getAddCate} = require('../controller/admin/category/categoryAdminController');
const {getAdminProduct,getAddProduct} = require('../controller/admin/product/productAdminContronller');


//==========================================
//****** Home admin ***** */
router.get('/', getAdminPage);

//******** User ************* */
router.get('/user',getAdminUser);
router.get('/addUser',getAddUser);

//************ product ************* */
router.get('/product', getAdminProduct);
router.get('/addProduct', getAddProduct);

//************ Category ************* */
router.get('/category', getAdminCate);
router.get('/addCate', getAddCate);


//======================================
module.exports = router;