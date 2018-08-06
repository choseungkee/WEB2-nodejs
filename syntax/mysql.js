var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : '192.168.1.214',
  user     : 'root',
  password : 'jj123',
  database : 'opentutorials'
});

connection.connect();
 connection.query('SELECT * FROM topic', function (error, results, fields) {
  if (error){
    console.log(error);
  };
  console.log(results);
});

connection.end();
