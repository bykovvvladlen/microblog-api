const mongoose = require("mongoose");

const blog = new mongoose.Schema({
  owner_id: String,
  title: String,
  description: String,
  image: String
});

module.exports = mongoose.model('blog', blog);
