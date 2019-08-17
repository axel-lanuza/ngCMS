var mysqlObj = require('mysql');
// connection configurations
var mysql = mysqlObj.createConnection({
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: 'admin123',
    database: 'manage_acl'
});
// connect to database
mysql.connect(); 

module.exports = mysql