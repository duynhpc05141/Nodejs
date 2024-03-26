const express = require("express");
var bodyParser = require("body-parser");
const app = express();
const viewsEngine = require("./config/viewsEngine");
const port = 8080;
const webRouter = require('./routers/web');
const adminRouter = require('./routers/admin');
const { connect } = require('./config/database');

// config 
connect();
viewsEngine(app);

// router
app.use('/', webRouter);
app.use('/admin', adminRouter);


//==========================================



app.listen(port, () => {
    console.log(`Example app listening on port localhost:${port}`);
  });