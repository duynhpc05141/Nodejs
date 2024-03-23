const mongoose = require('mongoose');
const Category = require('../../../model/category');

//================================================
const getAdminCate = async (req,res) => {
    try {
        const categories = await Category.find({});
        res.render('../views/admin/categories/adminCategory.ejs',{categories:categories});
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};


const getAddCate = (req,res) => {
    res.render('../views/admin/categories/adminAddCategory.ejs');
};



//=================================================
module.exports = {
    getAdminCate,
    getAddCate
};