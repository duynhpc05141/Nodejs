const mongoose = require('mongoose');
const Product = require('../../../model/product');

//================================================
const getAdminProduct = async (req,res) => {
    try {
        const products = await Product.find({});
        res.render('../views/admin/products/adminProduct.ejs',{products:products});
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};


const getAddProduct = (req,res) => {
    res.render('../views/admin/products/adminAddProduct.ejs');
};


const getProductDetail = async (req, res) =>{
    try {
        const productDetail = await Product.findOne({_id: req.params.id});
        // return product;
        res.render("../views/admin/products/adminDetailProduct.ejs", { products: productDetail });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    } 
};


const postAddproduct = (req, res) => {
    let name = req.body.name;
    let price = req.body.price;
    let description = req.body.description;
    let status = req.body.status;
    let sale = req.body.sale;
    let view = req.body.view;
    let cate = req.body.cate;
    let img = req.body.img;

    const newProduct = new Product({
        cate_id: cate,
        product_description: description,
        product_image: img,
        product_name: name,
        product_price: price,
        product_status: status,
        sale: sale,
        view: view

    });
    // Lưu dữ liệu vào cơ sở dữ liệu
    newProduct.save()
        .then(savedData => {
            res.render('../views/admin/products/adminAddProduct.ejs');
        })
        .catch(error => {
            res.status(500).send('Đã xảy ra lỗi khi lưu dữ liệu vào cơ sở dữ liệu.');
        });
}

//=================================================
module.exports = {
    getAdminProduct,
    getAddProduct,
    getProductDetail
};