const mongoose = require('mongoose');
const Product = require('../../../model/product');
const Category = require('../../../model/category');
const Users = require('../../../model/users');

//================================================
const getAdminUser = async (req,res) => {
    try {
        const users = await Users.find({});
        res.render('../views/admin/users/adminUser.ejs',{users:users});
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};


const getAddUser = (req,res) => {
    res.render('../views/admin/users/adminAddUser.ejs');
};



//=================================================
module.exports = {
    getAdminUser,
    getAddUser
};