const mongoose = require('mongoose');
const usersSchema = new mongoose.Schema({
    id: {
        type: Number
    },
    customer_address: {
        type: String
    },
    customer_email: {
        type: String
    },
    customer_name: {
        type: String
    },
    customer_phone_number: {
        type: String
    },
    password: {
        type: Number
    },
    role_id: {
        type: Number
    }
});

const Users = mongoose.model('users', usersSchema);

module.exports =  Users ;