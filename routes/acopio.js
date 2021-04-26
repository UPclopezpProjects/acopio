'use strict'

var express = require('express');
var AcopioController = require('../controllers/acopio');
var router = express.Router();
//var md_auth = require('../middlewares/authenticated');

router.post('/acopiosData', AcopioController.dataTransaction);
router.get('/getData', AcopioController.getData);

module.exports = router;
