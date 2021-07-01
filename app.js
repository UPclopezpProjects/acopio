'use stric'
//
global.host = '172.18.1.10'; //host.docker.internal
global.port = {
  traceability: '3006',
};
global.path = {
  traceability: '/addData',
};
//
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var multer = require('multer');
var path = require('path');
var uuid = require('uuid');

//New
var logger = require('morgan');
//New

var app = express();

// Static files
app.use(express.static(path.join(__dirname, 'public')));

//Cargar rutas
//var user_routes = require('./routes/user');
var acopio_routes = require('./routes/acopio');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//New
app.use(logger('dev'));
//New

//Configurar cabeceras HTTP y cors
app.use(cors());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//Carga de rutas base
//app.use('/api', user_routes);
app.use('/', acopio_routes);

module.exports = app;
