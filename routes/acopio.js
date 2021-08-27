'use strict'

var express = require('express');
var router = express.Router();
var AcopioController = require('../controllers/acopio');
//var md_auth = require('../middlewares/authenticated');

router.post('/acopiosDataIn', AcopioController.dataTransaction);
router.put('/acopiosDataUpdate', AcopioController.updateTransaction);
router.post('/dataOfCompany', AcopioController.dataOfCompany);
router.get('/getData', AcopioController.getData);
router.post('/getCompany', AcopioController.getCompany);
router.get('/getHistory', AcopioController.getHistory);

module.exports = router;
