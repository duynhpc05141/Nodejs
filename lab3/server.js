//khai báo sử dụng multer
const express = require("express");
var bodyParser = require("body-parser");
var app = express();
const mysql = require("mysql");
const port = 3020;
var multer = require("multer");
const db = require('./config/configData');
app.use(bodyParser.urlencoded());
//khai bao sử dụng template ejs
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("public"));

//router
app.get("/", (req, res) => {
    // Truy vấn để lấy tất cả sản phẩm
    let productQuery = `SELECT * FROM products`;
    // Truy vấn để lấy tất cả danh mục
    let categoryQuery = `SELECT * FROM category`;
    db.query(productQuery, (err, products) => {
        if (err) {
            console.error('Error fetching product data from MySQL database:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        db.query(categoryQuery, (err, categories) => {
            if (err) {
                console.error('Error fetching category data from MySQL database:', err);
                res.status(500).send('Internal Server Error');
                return;
            }

            // Render trang chính và truyền dữ liệu sản phẩm và danh mục vào template
            res.render('home.ejs', { products: products, category: categories });
        });
    });
});



app.get("/shop/:cateId", (req, res) => {
    let cateId = req.params.cateId;
    
    // Truy vấn để lấy tất cả sản phẩm
    let productQuery = `SELECT * FROM products WHERE id_Category= ${cateId}`;
    // Truy vấn để lấy tất cả danh mục
    let categoryQuery = `SELECT * FROM category`;
    db.query(productQuery, (err, products) => {
        if (err) {
            console.error('Error fetching product data from MySQL database:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        db.query(categoryQuery, (err, categories) => {
            if (err) {
                console.error('Error fetching category data from MySQL database:', err);
                res.status(500).send('Internal Server Error');
                return;
            }
            res.render('home.ejs', { products: products, category: categories });
        });
    });
});


app.get("/addnew", (req, res) => {
  res.render("./add.ejs");
});
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
var upload = multer({ storage: storage });
app.post("/addnew", upload.single("productImage"), (req, res) => {
  //lấy dữ liệu từ form sau khi upload anh
  const file = req.file;
  let nameProduct = req.body.productName;
  let price = req.body.price;
  let description = req.body.description;
  let id_Category = req.body.id_Category;
  let images = file.filename;
  //Thêm vào mảng json 1 cuối sách mới
    products = {
    nameProduct: nameProduct,
    price: price,
    description: description,
    images: images,
    id_Category: id_Category
  };
  db.query('insert into products SET ?',products, function(err,data){
    if (err) throw err;
    res.redirect('/addnew');
  })
});

app.get('/admin', (req, res) => {
    let productQuery = `SELECT * FROM products`;
    db.query(productQuery, (err, products) => {
      if (err) {
          console.error('Error fetching product data from MySQL database:', err);
          res.status(500).send('Internal Server Error');
          return;
      }
      res.render('admin.ejs', { products: products});
    });
});
app.get('/admin/update/:id', (req, res) => {
  const productId = req.params.id;
    let productQuery = `SELECT * FROM products WHERE id = ${productId}`;
    db.query(productQuery, (err, products) => {
      if (err) {
          console.error('Error fetching product data from MySQL database:', err);
          res.status(500).send('Internal Server Error');
          return;
      }
      res.render('admin/update.ejs', { products: products});
    });
});
app.delete('/delete/:id', (req, res) => {
  const productId = req.params.id;
  // Thực hiện truy vấn xóa sản phẩm từ cơ sở dữ liệu
  let sql = `DELETE FROM products WHERE id = ${productId}`;
  db.query(sql, (error, results) => {
      if (error) {
          console.error('Error deleting product: ' + error.stack);
          res.status(500).send('Error deleting product');
          return;
      }
      res.redirect('/admin.ejs'); // Chuyển hướng người dùng sau khi xóa sản phẩm
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port localhost:${port}`);
});
