const Users = require('../../model/users');
const Product = require('../../model/product');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
        const hashedPassword = await bcrypt.hash(pass, 10);
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
    try {
        const user = await Users.findOne({ customer_email: req.body.email });
        if (!user) {
            return res.status(401).json({ error: 'Wrong email' });
        }
        
        const checkPass = await bcrypt.compare(req.body.pass, user.password);
        if (!checkPass) {
            return res.status(401).json({ error: 'Wrong email or password' });
        }
        const token = jwt.sign({ _id: user._id },'@', { expiresIn: '1h' });
        // Gửi phản hồi thành công cùng với dữ liệu người dùng 
        res.status(200).send(user);
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

//=====================================================
module.exports = {
    loginForm,
    registerForm,
    postRegister,
    loggin
};