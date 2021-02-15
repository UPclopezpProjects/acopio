'use stric'
//
global.host = 'host.docker.internal'; //host.docker.internal
global.port = {
  audit: '3000',
};
global.path = {
  audit: '',
};
//
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

//New
var logger = require('morgan');
//New


var app = express();

//Cargar rutas
//var user_routes = require('./routes/user');
var acopio_routes = require('./routes/acopio');

app.use(bodyParser.urlencoded({extended:false}));
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
