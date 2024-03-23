const mongoose = require('mongoose');
const cateSchema = new mongoose.Schema({
    id: {
        type: Number
    },
    category_name: {
        type: String
    }
});
const Category = mongoose.model('categories', cateSchema);

module.exports =  Category ;