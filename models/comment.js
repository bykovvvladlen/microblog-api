const mongoose = require("mongoose");

const comment = new mongoose.Schema({
  blog_id: String,
  user_id: String,
  timestamp: Date,
  body: String
});

module.exports = mongoose.model('comment', comment);
