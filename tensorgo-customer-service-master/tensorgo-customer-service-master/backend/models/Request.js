const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  userEmail: String,
  category: String,
  comment: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Request', requestSchema);
