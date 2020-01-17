const post = require('../models/post');

function create(req, res) {
  const timestamp = new Date().toISOString();
  req.body.timestamp = timestamp;

  post.create(req.body, errors => {
    if (errors) res.json({ errors });
    else res.json({ status: "Запись создана." });
  });
}

function update(req, res) {
  const timestamp = new Date().toISOString();
  req.body.timestamp = timestamp;

  post.updateOne({ _id: req.body._id }, { $set: req.body }, errors => {
    if (errors) res.json({ errors });
    else res.json({ status: "Данные записи обновлены." });
  });
}

function deleteOne(req, res) {
  post.deleteOne(req.body, errors => {
    if (errors) res.json({ errors });
    else res.json({ status: "Запись удалена." });
  });
}

function read(req, res) {
  post.find(req.query, (errors, data) => {
    if (errors) res.json({ errors });
    else res.json(data);
  });
}

module.exports = {
  create,
  update,
  delete: deleteOne,
  read
};
