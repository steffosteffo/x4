// models/Aname.js
const mongoose = require('mongoose');

const anameSchema = new mongoose.Schema({
  steffoname: String,
  alosen: String,
  antal: Number,
});

module.exports = mongoose.model('Aname', anameSchema);
