const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const IncorrectDataError = require('../errors/IncorrectDataError');
const EmailRepeatError = require('../errors/EmailRepeatError');
const User = require('../models/user');

const {
  NODE_ENV,
  JWT_SECRET,
} = process.env;

// Получить пользователя по роуту users/me

const getUser = (req, res, next) => {
  const userId = req.user._id;
  User.findById(userId)

    .then((user) => {
      res.send(user);
    })
    .catch(next);
};

// Создать пользователя

const createUser = (req, res, next) => {
  const {
    email,
    password,
    name,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
    }))
    .then((user) => res.send({
      email: user.email,
      name: user.name,
    }))
    .catch((err) => {
      if (err.code === 11000) {
        next(new EmailRepeatError('Такой email уже существует'));
      } else if (err.name === 'ValidationError') {
        next(new IncorrectDataError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

// Обновить информацию о пользователе

const updateUserInfo = (req, res, next) => {
  const userId = req.user._id;
  const {
    email,
    name,
  } = req.body;

  User.findByIdAndUpdate(userId, {
    email,
    name,
  }, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new IncorrectDataError('Переданы некорректные данные'));
      } else if (err.code === 11000) {
        next(new EmailRepeatError('Такой email уже существует'));
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const {
    email,
    password,
  } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      // создадим токен
      const token = jwt.sign({
        _id: user._id,
      }, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key-dev', {
        expiresIn: '7d',
      });

      // вернём токен
      res.send({
        token,
      });
    })
    .catch(next);
};

module.exports = {
  getUser, updateUserInfo, createUser, login,
};
