'use strict'

var express = require('express');
var AcopioController = require('../controllers/acopio');
var router = express.Router();
//var md_auth = require('../middlewares/authenticated');

//router.get('/harvestView/:id', md_auth.ensureAuth, HarvestController.getHarvest);
//router.get('/harvestsView/:page?', md_auth.ensureAuth, HarvestController.getHarvests);
//router.post('/harvestCreate', md_auth.ensureAuth, HarvestController.saveHarvest);
//router.put('/harvestUpdate/:id', md_auth.ensureAuth, HarvestController.updateHarvest);
//router.delete('/harvestDelete/:id', md_auth.ensureAuth, HarvestController.deleteHarvest);

router.post('/acopiosData', AcopioController.dataTransaction);

module.exports = router;