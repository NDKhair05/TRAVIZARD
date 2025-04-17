const mysql = require('mysql2')

//test connection 
//create the connection to database 
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3307,
    user: 'root',
    password: '123456',
    database: 'travizard'
})

module.exports = connection