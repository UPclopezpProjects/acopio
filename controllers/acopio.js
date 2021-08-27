'use strict'
var axios = require('axios');
var Acopio = require('../models/Acopios');
var User = require('../models/Users');

function dataTransaction(req, res){
  var acopio = new Acopio();
  acopio.fid = req.body.fid;
  acopio.code = req.body.code;
  acopio.ubication = req.body.ubication;
  acopio.name = req.body.name;
  acopio.previousStage = req.body.previousStage;
  acopio.currentStage = req.body.currentStage;
  acopio.nameOfCompany = req.body.nameOfCompany;
  acopio.image = req.body.image;
  acopio.description = req.body.description;
  acopio.arrivalDate = req.body.arrivalDate;
  //acopio.departureDate = req.body.departureDate;
  acopio.clasification = req.body.clasification;
  acopio.quantity = req.body.quantity;
  acopio.measure = req.body.measure;
  acopio.whoReceives = req.body.whoReceives;
  //acopio.whoDelivers = req.body.whoDelivers;
  acopio.save((err, acopioStored) => {
    if(err) {
      //console.log(err);
      res.status(500).send({ message: 'Error al guardar los datos' });
    }else{
      if(!acopioStored) {
        res.status(404).send({ message: 'El dato no ha sido guardado' });
      }else{
        serviceInit(acopioStored, function(data, err) {
          res.status(200).send({ message: data.message, addData: data.addData, info: data.info });
        });
      }
    }
  });
}

function updateTransaction(req, res) {
  Acopio.findOne({_id: req.body.id}, (err, dataStored) => {
    if(err){
      res.status(500).send({ message: 'Error en la petición' });
    }else{
      if(!dataStored){
        res.status(200).send({ message: 'El dato no existe'});
      }else{
        var newQuantity = dataStored.quantity - req.body.quantity;
        //console.log(Math.sign(newQuantity));
        if (Math.sign(newQuantity) == -1) {
          //console.log("falseeeeeeeeeeeeeeeeeee");
          res.status(200).send({ message: false });
          return;
        }
        Acopio.findOneAndUpdate({ _id: dataStored._id }, {quantity: newQuantity}, (err, transactionUpdate) => {
          if(err){
            res.status(500).send({ message: 'Error al actualizar los datos' });
          }else{
            if(!transactionUpdate){
              res.status(404).send({ message: 'El dato no existe y no ha sido actualizado' });
            }else{
              res.status(200).send({ message: true });
            }
          }
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
      code: acopioStored.code,
      ubication: acopioStored.ubication,
      name: acopioStored.name,
      previousStage: acopioStored.previousStage,
      currentStage: acopioStored.currentStage,
      image: acopioStored.image,
      description: acopioStored.description
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

function dataOfCompany(req, res) {
  var user = new User();
  user.email = req.body.email;
  user.nameOfCompany = req.body.nameOfCompany;
  user.save((err, userStored) => {
    if(err) {
      res.status(500).send({ message: 'Error al guardar los datos para el usuario' });
    }else{
      if(!userStored) {
        res.status(404).send({ message: 'El dato no ha sido guardado para el usuario' });
      }else{
        res.status(200).send({ message: true, user: userStored });
      }
    }
  });
}

function getCompany(req, res) {
  User.findOne({email: req.body.email}, (err, userStored) => {
    if(err){
      res.status(500).send({message: 'Error en la petición'});
    }else{
      if(!userStored){
        res.status(200).send({message: null});
      }else{
        res.status(200).send({message: userStored});
      }
    }
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

function getHistory(req, res) {
  var history = [];
  var query = { nameOfCompany: req.query.nameOfCompany.replace(/[$]+/g, ' ') };
  Acopio.find(query, (err, dataStored) => {
    if(err){
      res.status(500).send({ message: 'Error en la petición' });
    }else{
      if(!dataStored){
        res.status(200).send({ history: null });
      }else{
        for(var data of dataStored){
          history.push(data);
        }
        res.status(200).send({ history: history });
      }
    }
  });
}

module.exports = {
	dataTransaction,
  updateTransaction,
  dataOfCompany,
  getCompany,
  getData,
  getHistory
};
