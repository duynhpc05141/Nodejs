const Users = require('../../model/users');
const Product = require('../../model/product');
const session = require('express-session');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'ABC';

const loginForm = async (req, res) =>{
    res.render('../views/client/login.ejs')
};

const registerForm = async (req, res) =>{
    res.render('../views/client/register.ejs')
};


const postRegister = async (req, res) => {
    try {
        let {name, phone, email , address , pass } = req.body;
        // Kiểm tra xem người dùng đã tồn tại chưa  
        const existingUser = await Users.findOne({ customer_email: email });
        if (existingUser) {
            // Nếu người dùng đã tồn tại, trả về một phản hồi lỗi
            return res.status(400).send('Email already exists');
        }

        // Băm mật khẩu
        const hashedPassword = await bcrypt.hash(pass);
        // Tạo người dùng mới
        const userNew = new Users({
            customer_address: address,
            customer_email: email,
            customer_name: name,
            customer_phone_number: phone,
            password: hashedPassword,
            role_id: 2
        });
        await userNew.save();
        res.render('../views/client/login.ejs');
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).send('error');
    }
};


const loggin = async (req, res) => {
    const email = req.body.email;
    const pass = req.body.password;

    try {
        const user = await Users.findOne({ customer_email: email });
        // Kiểm tra xem người dùng tồn tại hay không
        if (user) {
            // So sánh mật khẩu
            const passwordMatch = await bcrypt.compare(pass, user.password);
            
            if (passwordMatch) {
                // Tạo JWT
                const accessToken = jwt.sign({ customer_email: user.customer_email }, JWT_SECRET, { expiresIn: '1h' });
                res.status(200).json({  success: true, accessToken, user });
            } else {
                res.status(401).send('Invalid password.');
            }
        } else {
            res.status(404).send('User not found.');
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error: Internal Server Error');
    }
};

const profile = (req, res) => {
    res.sendFile( '../views/client/headerClient.ejs');
};

const logOut = (req, res) => {
    localStorage.removeItem('accessToken');
    res.redirect('/');
};

//=====================================================
module.exports = {
    loginForm,
    registerForm,
    postRegister,
    loggin,
    profile,
    logOut
};