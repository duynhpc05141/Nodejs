const path = require('path');
const express = require("express");
const methodOverride = require('method-override');
const viewsEngine = (app) =>{
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(express.static(path.join('./src/public/', "img")));
    app.set('view engine', 'ejs');
    app.set('views', './src/views');
    app.use(express.static(path.join('./src/', 'public')));
    app.use(methodOverride('_method'));
}

module.exports = viewsEngine;