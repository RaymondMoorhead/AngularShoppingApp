var express = require('express'),
http = require('http'),
path = require('path'),
app = express(),
mysql  = require('mysql'),
bodyParser=require("body-parser"),
cors=require('cors'),
events=require('./user');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'shopping_app',
  port: 3306
});

connection.connect();

var port = process.env.PORT || 8080;

app.use(cors());
app.options('*', cors()) // include before other routes
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(events(connection));

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});