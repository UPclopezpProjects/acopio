'use strict'
var axios = require('axios');
var Acopio = require('../models/Acopios');

function dataTransaction(req, res){
  var acopio = new Acopio();
  acopio.fid = req.body.fid;
  acopio.ubication = req.body.ubication;
  acopio.name = req.body.name;
  acopio.previousStage = req.body.previousStage;
  acopio.currentStage = req.body.currentStage;
  acopio.save((err, acopioStored) => {
    if(err) {
      console.log(err);
      res.status(500).send({ message: 'Error al guardar los datos' });
    }else{
      if(!acopioStored) {
        res.status(404).send({ message: 'El dato no ha sido guardado' });
      }else{
        serviceInit(acopioStored, function(data, err) {
          res.status(200).send({ message: data.message, addData: data.addData });
        });
      }
    }
  });
}

function serviceInit(acopioStored, next) {
    var url = 'http://'+host+':'+port.traceability+''+path.traceability+'';
    axios.post(url, {
      id: acopioStored._id,
      fid: acopioStored.fid,
      ubication: acopioStored.ubication,
      name: acopioStored.name,
      previousStage: acopioStored.previousStage,
      currentStage: acopioStored.currentStage
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
  Acopio.find((err, acopioStored) => {
    if(err){
      res.status(500).send({message: 'Error en la petición'});
    }else{
      if(!acopioStored){
        res.status(200).send({message: null});
      }else{
        res.status(200).send({message: acopioStored});
      }
    }
  });
}

module.exports = {
	dataTransaction,
  getData
};
