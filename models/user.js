const mongoose = require("mongoose");

const user = new mongoose.Schema({
  login: String,
  username: String,
  password: String,
  email: String,
  token: String
});

module.exports = mongoose.model('user', user);
