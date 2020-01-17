var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const mongoose = require('mongoose');
const userRouter = require('./routes/user.js');
const blogRouter = require('./routes/blog.js');
const postRouter = require('./routes/post.js');
const commentRouter = require('./routes/comment.js');
const authRouter = require('./routes/auth.js');

var indexRouter = require('./routes/index');

var app = express();

mongoose.connect('mongodb://api:api2020pwd@localhost:27017/mbdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', userRouter);
app.use('/blogs', blogRouter);
app.use('/posts', postRouter);
app.use('/comments', commentRouter);
app.use('/auth', authRouter);

module.exports = app;
