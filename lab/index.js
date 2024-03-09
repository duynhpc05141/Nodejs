const express = require("express");
var bodyParser = require("body-parser");
const app = express();
const path = require("path");
const port = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "img")));
const inventors = [
  { id: 1, first: "Albert", last: "Einstein", year: 1879, passed: 1955 },
  { id: 2, first: "Isaac", last: "Newton", year: 1643, passed: 1727 },
  { id: 3, first: "Galileo", last: "Galilei", year: 1564, passed: 1642 },
  { id: 4, first: "Marie", last: "Curie", year: 1867, passed: 1934 },
  { id: 5, first: "Johannes", last: "Kepler", year: 1571, passed: 1630 },
  { id: 6, first: "Nicolaus", last: "Copernicus", year: 1473, passed: 1543 },
];

const product = [
  {
    id: 1,
    name: "kem",
    img: "R.jpg",
    price: 2000,
    description: "day la sp1",
    detail: "san pham ngon1",
    comment: [],
  },
  {
    id: 2,
    name: "kem2",
    img: "R.jpg",
    price: 2000,
    description: "day la sp2",
    detail: "san pham ngon2",
    comment: [],
  },
  {
    id: 3,
    name: "kem3",
    img: "R.jpg",
    price: 2000,
    description: "day la sp3",
    detail: "san pham ngon3",
    comment: [],
  },
  {
    id: 4,
    name: "kem4",
    img: "R.jpg",
    price: 2000,
    description: "day la sp4",
    detail: "san pham ngon4",
    comment: [],
  },
  {
    id: 5,
    name: "kem5",
    img: "R.jpg",
    price: 2000,
    description: "day la sp5",
    detail: "san pham ngon5",
    comment: [],
  },
  {
    id: 6,
    name: "kem6",
    img: "R.jpg",
    price: 2000,
    description: "day la sp6",
    detail: "san pham ngon6",
    comment: [],
  },
];

app.get("/", (req, res) => {
  res.send("<h1>Đây là trang chủ</h1>");
});
app.get("/inventors", (req, res) => {
  let list = "<h2>Danh sách nhà khoa học<ul>";
  inventors.forEach((e) => {
    list += `<li><a style="text-decoration:none;color:green;" href="/inventors/${e.id}">${e.last}</a></li>`;
  });
  list += "</ul></h2><a href='/add-inventors'>Them </a>";
  res.send(list);
});
app.get("/inventors/:id", (req, res) => {
  let id = req.params.id;
  inventor = inventors.find((e) => e.id == id);
  info = `<h2>Thông tin chi tiết nhà khoa học:Full name: ${inventor.first} ${inventor.last}, Year: ${inventor.year}, Passed: ${inventor.passed}</h2>`;
  res.json({
    data: [inventors],
    html: info,
  });
  // res.send(info);
});
app.get("/add-inventors", (req, res) => {
  res.send(`<form action="/inventors" method="post" enctype="application/x-www-form-urlencoded">
  <h2>ADD</h2>
  <input type="text" placeholder="fist name" id="first" name="first"> <br>
  <input type="text" placeholder="last name" id="last" name="last"><br>
  <input type="number" placeholder="year" id="year" name="year"><br>
  <input type="number" placeholder="pass" id="passed" name="passed"><br>
  <button type="submit" id="add">Thêm</button>
</form>`);
});
app.post("/inventors", (req, res) => {
  let list = req.body;
  const newInventor = {
    id: inventors.length + 1,
    first: list.first,
    last: list.last,
    year: list.year,
    passed: list.passed,
  };

  inventors.push(newInventor);
  res.redirect("/inventors");
});

app.get("/product", (req, res) => {
  let list = "<h2>Danh sách product<ul>";
  product.forEach((e) => {
    list += `<li><a style="text-decoration:none;color:green;" href="/product/${e.id}"><img src='/${e.img}' height='50px'>${e.name} </a></li>`;
  });
  list += "</ul></h2>";
  res.send(list);
});
app.get("/product/:id", (req, res) => {
  let id = req.params.id;
  productItem = product.find((e) => e.id == id);
  info = `<h2>Thông tin chi tiết Sản phẩm: name: ${productItem.name} <br><img src='/${productItem.img} ' height='50px'> <br> price: ${productItem.price}<br> 
  description: ${productItem.description} <br> detail: ${productItem.detail} <br> 
  comment: <ul> <li>${productItem.comment}</li></ul> <br>
  <form action="/product/${id}/comment" method="post" enctype="application/x-www-form-urlencoded">
        <h2>Comment</h2>
        <textarea name="comment" id="comment" cols="30" rows="10"></textarea><br>
        <button type="submit" id="add">Thêm</button>
    </form></h2>`;
  res.send(info);
});

app.post("/product/:id/comment", (req, res) => {
  let id = req.params.id;
  let commentForm = req.body.comment;
  let productItem = product.find((e) => e.id == id);
  productItem.comment.push(commentForm);
  res.redirect(`/product/${id}`);
});


app.listen(port, () => {
  console.log(`Example app listening on port localhost:${port}`);
});

/// bài 1
//chạy server Lúc này truy cập tới server thông qua http thì chưa có phản hồi
// do chưa có câu lệnh get dẫn đến trang thêm hàm app.get("/", (req, res) => {res.send("<h1>Đây là trang chủ</h1>");});

//bài 2
//nhấn nút addproduct hiện lỗi do chưa có hàm POST, thêm hàm app.post để sửa lỗi
