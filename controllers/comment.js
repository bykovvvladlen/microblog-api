const comment = require('../models/comment');

function create(req, res) {
  const timestamp = new Date().toISOString();
  req.body.timestamp = timestamp;

  comment.create(req.body, errors => {
    if (errors) res.json({ errors });
    else res.json({ status: "Комментарий создан." });
  });
}

function update(req, res) {
  const timestamp = new Date().toISOString();
  req.body.timestamp = timestamp;

  comment.updateOne({ _id: req.body._id }, { $set: req.body }, errors => {
    if (errors) res.json({ errors });
    else res.json({ status: "Данные комментария обновлены." });
  });
}

function deleteOne(req, res) {
  comment.deleteOne(req.body, errors => {
    if (errors) res.json({ errors });
    else res.json({ status: "Комментарий удален." });
  });
}

function read(req, res) {
  comment.find(req.query, (errors, data) => {
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
