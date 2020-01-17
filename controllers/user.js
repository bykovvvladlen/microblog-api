const user = require('../models/user');
const mongoose = require('mongoose');

function create(req, res) {
  user.create(req.body, errors => {
    if (errors) res.json({ errors });
    else res.json({ status: "Пользователь создан." });
  });
}

function update(req, res) {
  user.updateOne({ token: req.body.token }, { $set: req.body }, errors => {
    if (errors) res.json({ errors });
    else res.json({ status: "Данные пользователя обновлены." });
  });
}

function deleteOne(req, res) {
  user.deleteOne(req.body, errors => {
    if (errors) res.json({ errors });
    else res.json({ status: "Пользователь удален." });
  });
}

function read(req, res) {
  let filter = {};
  let one = false;

  if (req.query.username) {
     filter = { username: req.query.username };
     one = true;
  }

  user.find(filter, (errors, data) => {
    if (errors) res.json({ errors });
    else {
      const usernames = data.map(item => item.username);
      res.json(one ? (usernames.length > 0) : usernames);
    }
  });
}

module.exports = {
  create,
  update,
  delete: deleteOne,
  read
};
