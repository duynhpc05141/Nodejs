const path = require('path');
const express = require("express");
const viewsEngine = (app) =>{
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(express.static(path.join('./src/', "img")));
    app.set('view engine', 'ejs');
    app.set('views', './src/views');
    app.use(express.static(path.join('./src/', 'public')));
}

module.exports = viewsEngine;