var mysql = require('mysql');
var db = mysql.createConnection({
  host     : '192.168.1.214',
  user     : 'root',
  password : 'jj123',
  database : 'opentutorials'
});
db.connect();
module.exports = db;
