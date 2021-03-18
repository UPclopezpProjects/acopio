'use strict'
var axios = require('axios');
var Acopio = require('../models/Acopios');

function dataTransaction(req, res){
  //console.log(req.body);
  //console.log(req.file);
	/*serviceInit(req, function(data, err) {
        if (err) {
            res.status(500).send({ message: 'Error en la petición' });
        }else {
        	var res = data;
        }
    });*/
    var acopio = new Acopio();
    acopio.map = req.body.map
    acopio.id = req.body.id;
    acopio.fId = req.body.fId;
    acopio.date = req.body.date;
    acopio.image = req.file.filename;
    acopio.description = req.body.description;
    acopio.type = req.body.type;
    acopio.permitions = req.body.permitions;
    acopio.save((err, acopioStored) => {
      if(err) {
        res.status(500).send({ message: 'Error al guardar los datos' });
      }else{
        if(!acopioStored) {
          res.status(404).send({ message: 'El dato no ha sido guardado' });
        }else{
          res.status(200).send({ message: true });
        }
      }
    });
}

function serviceInit(req, next) {
    var map = req.body.map; //Latitud y longitud de dos puntos (origen y destino)
    var id = req.body.id;
    var fId = req.body.fId;
    var date = req.body.date;
    var image = req.body.image;
    var description = req.body.description;
    var type = req.body.type;
    var permitions = req.body.permitions;
    var url = 'http://'+host+':'+port.audit+''+path.audit+'';
    axios.post(url, {
        map: map,
        id: id,
        fId: fId,
        date: date,
        image: image,
        description: description,
        type: type,
        permitions: permitions
    })
    .then(response => {
        //console.log(response.data);
        next(response.data, null);
    })
    .catch(error => {
        console.log(error);
        next(null, error);
    });
}

function getData(req, res) {
  var code = req.body.code;
  console.log(code);
  var query = { id: code };
  Acopio.findOne(query, (err, data) => {
    if(err){
      res.status(500).send({message: 'Error en la petición'});
    }else{
      if(!data){
        res.status(200).send({message: null});
      }else{
        res.status(200).send({message: JSON.stringify(data)});
      }
    }
  });
}

module.exports = {
	dataTransaction,
  getData
};
