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
    let name = req.body.name | null;
    let price = req.body.price | null;
    let description = req.body.description | null;
    let status = req.body.status | null;
    let sale = req.body.sale | null;
    let view = req.body.view | null;
    let cate = req.body.cate | null;
    let img = req.body.filename | null;
    console.log(req.body);
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


const getUpdateProduct = async (req, res) =>{
    try {
        const products = await Product.findOne({_id: req.params.id});
        res.render('../views/admin/products/adminUpdateProduct.ejs',{products:products});
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    } 
};

const postUpdateProduct = async (req, res) => {
    try {
        const products = await Product.findById(req.params.id);
        if (!products) {
            return res.status(404).send('User not found');
        }
        let productImage = products.product_image;
        if (req.file) {
            productImage = req.file.filename;
        }
        const newUpdateProduct = {
            cate_id: req.body.cate || products.cate_id,
            product_description: req.body.description || products.product_description,
            product_image: productImage,
            product_name: req.body.name || products.product_name,
            product_price: req.body.price || products.product_price,
            product_status: req.body.status || products.product_status,
            sale: req.body.sale || products.sale,
            view: req.body.view || products.view
        };

        await Users.findOneAndUpdate({ _id: req.params.id }, newUpdateProduct, { new: true });

        const product = await Product.find({});
        res.render('../views/admin/products/adminProduct.ejs',{products:product}); // Chuyển hướng sau khi cập nhật thành công
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
};


const deleteProductById = async (req, res) => {
    try {
        await Product.findByIdAndDelete({ _id:req.params.id });
        const products = await Product.find({});
        res.render('../views/admin/products/adminProduct.ejs',{products:products});
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
};


//=================================================
module.exports = {
    getAdminProduct,
    getAddProduct,
    getProductDetail,
    postAddproduct,
    deleteProductById,
    getUpdateProduct,
    postUpdateProduct
};