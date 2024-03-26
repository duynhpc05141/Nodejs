const express = require("express");
const router = express.Router();
const {getAdminPage} = require('../controller/admin/home/adminController');
const {getAdminUser, getAddUser,postAddUser,getUpdateUser,postUpdateUser,deleteUserById} = require('../controller/admin/user/userAdminController');
const {getAdminCate, getAddCate} = require('../controller/admin/category/categoryAdminController');
const {getAdminProduct,getAddProduct, getProductDetail} = require('../controller/admin/product/productAdminContronller');


//==========================================
//****** Home admin ******/
router.get('/', getAdminPage);

//******** User **************/
router.get('/user',getAdminUser);
router.get('/addUser',getAddUser);
router.post('/addUser',postAddUser);
router.get('/updateUser/:id',getUpdateUser);
router.post('/updateUser/:id',postUpdateUser);
router.get('/deleteUser/:id',deleteUserById);

//************ product ************* */
router.get('/product', getAdminProduct);
router.get('/productDetail/:id', getProductDetail);
router.get('/addProduct', getAddProduct);

//************ Category ************* */
router.get('/category', getAdminCate);
router.get('/addCate', getAddCate);


//======================================
module.exports = router;