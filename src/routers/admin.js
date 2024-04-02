const express = require("express");
var multer = require("multer");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const {getAdminPage} = require('../controller/admin/home/adminController');
const {getAdminUser, getAddUser,postAddUser,getUpdateUser,postUpdateUser,deleteUserById} = require('../controller/admin/user/userAdminController');
const {getAdminCate, getAddCate, postAddCate, deleteCate, getUpdateCate, postUpdateCate} = require('../controller/admin/category/categoryAdminController');
const {getAdminProduct,getAddProduct, getProductDetail, postAddproduct, 
    deleteProductById, getUpdateProduct,postUpdateProduct} = require('../controller/admin/product/productAdminContronller');


//==========================================
//****** Home admin ******/
router.get('/', getAdminPage);

//******** User **************/
router.get('/user',getAdminUser);
router.get('/addUser',getAddUser);
router.post('/addUser',postAddUser);
router.get('/updateUser/:id',getUpdateUser);
router.put('/updateUser/:id',postUpdateUser);
router.delete('/deleteUser/:id',deleteUserById);

//************ product ************* */
router.get('/product', getAdminProduct);
router.get('/productDetail/:id', getProductDetail);
router.get('/addProduct', getAddProduct);
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../public/img/product/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });
router.post('/addProduct', upload.single("img"), postAddproduct);
router.get('/updateProduct/:id',  getUpdateProduct);
router.put('/updateProduct/:id',  postUpdateProduct);
router.delete('/produceDelete/:id', deleteProductById);



//************ Category ************* */
router.get('/category', getAdminCate);
router.get('/addCate', getAddCate);
router.post('/addCate', postAddCate);
router.get('/updateCate/:id', getUpdateCate);
router.put('/updateCate/:id', postUpdateCate);
router.delete('/deleteCate/:id', deleteCate);

//======================================
module.exports = router;