const mongoose = require('mongoose');
const Product = require('../../../model/product');
const Category = require('../../../model/category');
const Users = require('../../../model/users');

//================================================
const getAdminPage = (req,res,next) => {
    res.render('../views/admin/adminPage.ejs');
};




//=================================================
module.exports = {
    getAdminPage
};