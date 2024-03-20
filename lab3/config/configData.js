const mysql = require('mysql');
const db = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: 'mysql',
    database: 'lab3'
});

module.exports = db;