const express = require("express");
var bodyParser = require("body-parser");
const app = express();
const path = require("path");
const viewsEngine = require("./config/viewsEngine");
const port = 8080;
const webRouter = require('./routers/web');
const router = require("./routers/web");
// config views engine
viewsEngine(app);

// router
app.use('/', webRouter);
//
app.listen(port, () => {
    console.log(`Example app listening on port localhost:${port}`);
  });