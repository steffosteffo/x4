// models/Customer.js
const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: String,
  phone: String,
  adress: String,
  email: String,
  webadress: String,
});

module.exports = mongoose.model('Customer', customerSchema);
