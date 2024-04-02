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

// const getAdminCate = async (req, res) => {
//     try {
//         const categories = await Category.find({});
//         res.status(200).json({ categories: categories });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// };


const getAddCate = (req,res) => {
    res.render('../views/admin/categories/adminAddCategory.ejs');
};


const postAddCate = async (req, res) => {
    let name = req.body.name;
    const categoriesCount = await Category.countDocuments();
    let id = categoriesCount + 1;
    const newCate = new Category({
        category_name: name,
        id: id
    });
    // Lưu dữ liệu vào cơ sở dữ liệu
    newCate.save()
        .then(savedData => {
            res.render('../views/admin/categories/adminAddCategory.ejs');
        })
        .catch(error => {
            res.status(500).send('Đã xảy ra lỗi khi lưu dữ liệu vào cơ sở dữ liệu.');
        });
}


const getUpdateCate = async (req, res) =>{
    try {
        const category = await Category.findOne({_id: req.params.id});
        res.render('../views/admin/categories/adminUpdateCategory.ejs',{category:category});
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    } 
};


const postUpdateCate = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).send(' not found');
        }

        const newUpdateCate = {
            category_name: req.body.name || category.category_name,
        };

        const updatedCate = await Category.findOneAndUpdate({ _id: req.params.id }, newUpdateCate, { new: true });

        res.render('../views/admin/categories/adminUpdateCategory.ejs',{category:updatedCate}); // Chuyển hướng sau khi cập nhật thành công
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
};


const deleteCate = async (req, res) => {
    try {
        await Category.findByIdAndDelete({ _id: req.params.id });
        const categories = await Category.find({});
        res.render('../views/admin/categories/adminCategory.ejs',{categories:categories});
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
};

//=================================================
module.exports = {
    getAdminCate,
    getAddCate,
    postAddCate,
    deleteCate,
    getUpdateCate,
    postUpdateCate
};