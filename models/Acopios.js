var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AcopioSchema = new Schema({
    map: {type: String, required: true, max: 100},
    id: {type: String, required: true, max: 100},
    fId: {type: String, required: true, max: 100},
    date: {type: String, required: true, max: 100},
    image: {type: String, required: true, max: 100},
    description: {type: String, required: true, max: 100},
    type: {type: String, required: true, max: 100},
    permitions: {type: String, required: true, max: 100},

});

//Example about models
//http://micaminomaster.com.co/herramientas-desarrollo/nodejs-projecto-esqueleto-mvc-crud/
module.exports = mongoose.model('Acopio', AcopioSchema);
