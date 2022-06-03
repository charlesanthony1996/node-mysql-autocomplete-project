var mysql = require('mysql');
var conn = mysql.createConnection({
host: 'localhost', // Replace with your host name
user: 'root',      // Replace with your database username
password: '',      // Replace with your database password
database: 'node-data',
port: 3306,  // // Replace with your database Name
}); 


conn.connect(function(err) {
    if (err) throw err;
    console.log('Database is connected successfully !');
    });


var createError = require('http-errors');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();
// view engine setup
app.set("views", path.join(__dirname, "/views"));
app.set('view engine', 'ejs');
app.get('/', function(req, res) {
res.render('index');
});
app.get('/search', function(req, res) {
conn.query('SELECT country_name FROM countries WHERE country_name LIKE "%' + req.query.term  + '%"',
function(err, rows, fields) {
if (err) throw err;
var data = [];
for (i = 0; i < rows.length; i++) {
data.push(rows[i].country_name);
}

res.end(JSON.stringify(data));

});
});
// port must be set to 8080 because incoming http requests are routed from port 80 to port 8080
app.listen(3000, function() {
console.log('Node app is running on port 3001');
});

module.exports = app;