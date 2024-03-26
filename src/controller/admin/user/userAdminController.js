const mongoose = require('mongoose');
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


const postAddUser = (req, res) => {
    // Lấy dữ liệu từ request body
    // const {address,email,name,phone,pass,role} = req.body;
    let address = req.body.address;
    let email = req.body.email;
    let name = req.body.name;
    let phone = req.body.phone;
    let pass = req.body.pass;
    let role = req.body.role;

    const newUser = new Users({
        customer_address: address,
        customer_email: email,
        customer_name: name,
        customer_phone_number: phone,
        password: pass,
        role_id: role
    });
    // Lưu dữ liệu vào cơ sở dữ liệu
    newUser.save()
        .then(savedData => {
            res.render('../views/admin/users/adminAddUser.ejs');
        })
        .catch(error => {
            res.status(500).send('Đã xảy ra lỗi khi lưu dữ liệu vào cơ sở dữ liệu.');
        });
}


const getUpdateUser = async (req, res) =>{
    try {
        const users = await Users.findOne({_id: req.params.id});
        res.render('../views/admin/users/adminUpdateUser.ejs',{users});
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    } 
};


const postUpdateUser = async (req, res) => {
    try {
        const users = await Users.findById(req.params.id);
        if (!users) {
            return res.status(404).send('User not found');
        }

        const newUpdateUser = {
            customer_address: req.body.address || users.customer_address,
            customer_email: req.body.email || users.customer_email,
            customer_name: req.body.name || users.customer_name,
            customer_phone_number: req.body.phone || users.customer_phone_number,
            role_id: req.body.role || users.role_id
        };

        const updatedUser = await Users.findOneAndUpdate({ _id: req.params.id }, newUpdateUser, { new: true });

        res.render('../views/admin/users/adminUpdateUser.ejs', { users: updatedUser }); // Chuyển hướng sau khi cập nhật thành công
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
};

const deleteUserById = async (req, res) => {
    try {
        await Users.deleteOne({ _id:req.params.id });
        const users = await Users.find({});
        res.render('../views/admin/users/adminUser.ejs',{users:users});
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
};




//=================================================
module.exports = {
    getAdminUser,
    getAddUser,
    postAddUser,
    getUpdateUser,
    postUpdateUser,
    deleteUserById
};