const express = require('express');
const router = express.Router();
const user = require('../models/user');

function token(length = 32) {
	let str = '';
	const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

	for (let i = 0; i < length; i++) {
		str += chars[Math.floor(Math.random() * chars.length)];
	}

	return str;
}

async function auth(req, res) {
  if (req.query.login && req.query.password) {
    const results = await user.find({ login: req.query.login });

    if (results.length == 0) res.json({ error: 'Пользователь с таким логином не найден.' });
    else {
      const targetUser = results[0];
      if (targetUser.password != req.query.password) res.json({ error: 'Указан неверный пароль.' });
      else {
        const userToken = token();
        user.updateOne({ login: req.query.login }, { $set: { token: userToken }}, errors => {
          if (errors) res.json({ errors });
          else res.json({ status: "Авторизация прошла успешно.", token: userToken });
        });
      }
    }
  }
  else res.send('Для авторизации необходимо указать логин и пароль пользователя.');
}

router.get('/', auth);

module.exports = router;
