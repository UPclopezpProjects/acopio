'user strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3004;
var mongoDB = 'mongodb://172.17.0.1:27017/acopios';


mongoose.connect(mongoDB, {useFindAndModify: false, useUnifiedTopology: true, useNewUrlParser: true}, (err, res) => {
	if(err){
		throw err;
	}else{
		console.log("Conexión exitosa (Base de datos)...");
		app.listen(port, function(){
			console.log("Microservicio 'Acopio' escuchando en -> http://localhost:"+port);
		});
	}
});