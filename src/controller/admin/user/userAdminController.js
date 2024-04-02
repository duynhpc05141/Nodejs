const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
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


const postAddUser = async (req, res) => {
    try {
        let {name, phone, email , address , pass, role } = req.body;
        // Kiểm tra xem người dùng đã tồn tại chưa  
        const existingUser = await Users.findOne({ customer_email: email });
        if (existingUser) {
            // Nếu người dùng đã tồn tại, trả về một phản hồi lỗi
            return res.status(400).send('Email already exists');
        }
        // Băm mật khẩu
        const hashedPassword = await bcrypt.hash(pass, 10);
        // Tạo người dùng mới
        const userNew = new Users({
            customer_address: address,
            customer_email: email,
            customer_name: name,
            customer_phone_number: phone,
            password: hashedPassword,
            role_id: role
        });
        await userNew.save();
        const users = await Users.find({});
        res.render('../views/admin/users/adminUser.ejs',{users:users});
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).send(error);
    }
};


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
        await Users.findByIdAndDelete({ _id:req.params.id });
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