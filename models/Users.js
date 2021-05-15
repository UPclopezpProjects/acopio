var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  email: {type: String, required: true, max: 100},
  nameOfCompany: {type: String, required: true, max: 100}
});

module.exports = mongoose.model('User', UserSchema);
