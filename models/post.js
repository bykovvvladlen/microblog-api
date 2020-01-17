const mongoose = require("mongoose");

const post = new mongoose.Schema({
  blog_id: String,
  title: String,
  timestamp: Date,
  body: String
});

module.exports = mongoose.model('post', post);
