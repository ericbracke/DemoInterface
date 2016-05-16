//server.js
process.env.NODE_PATH = __dirname;
require('module').Module._initPaths();

var express = require('express');
var bodyParser = require('body-parser');
var config = require('./config/config');

var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/css', express.static(__dirname + '/css'));
app.use('/images', express.static(__dirname + '/images'));
app.use('/lib', express.static(__dirname + '/lib'));



var port = config.port || 3102;

var routes = require('./routes/router');

//Register routes
//all routes will be prefixed with api
app.use('/',routes);

//Start the server
app.listen(port);
console.log('Magic is happening on port ' + port);
