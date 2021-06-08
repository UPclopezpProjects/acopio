'use stric'
//
//global.host = 'host.docker.internal'; //host.docker.internal
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

/*const storage = multer.memoryStorage({
    destination: function(req, file, callback) {
        callback(null, '')
    }
});*/

/*var storage = multer.diskStorage({
  //destination: path.join(__dirname, 'public/uploads'),
  filename: (req, file, cb) => {
    cb(null, uuid.v4() + path.extname(file.originalname).toLowerCase());
  }
});*/

//app.use(multer({storage}).single('image'));
/*
app.use(multer({
  storage,
  //dest: path.join(__dirname, 'public/uploads'),
  limits: {filseSize: 1000000},
  fileFilter: function (req, file, cb) {
    var filetypes = /jpeg|jpg|png|gif/;
    var mimetype = filetypes.test(file.mimetype);
    var extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb("Error: File upload only supports the following filetypes - " + filetypes);
  }
}).single('image'));
*/
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
