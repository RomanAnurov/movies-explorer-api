const { celebrate, Joi } = require('celebrate');

const urlregExp = /^(https?:\/\/)(www\.)?([\w-._~:/?#[\]@!$&'()*+,;=]+\.)+[\w-._~:/?#[\]@!$&'()*+,;=]+#?$/;

const createUserValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().required().min(2).max(30),
  }),
});

const updateUserInfoValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    name: Joi.string().min(2).max(30).required(),
  }),
});

const loginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const createMovieValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(urlregExp),
    trailerLink: Joi.string().required().pattern(urlregExp),
    thumbnail: Joi.string().required().pattern(urlregExp),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const deleteMoviesByIdValidation = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().length(24).hex().required(),
  }),
});

module.exports = {
  createUserValidation,
  updateUserInfoValidation,
  loginValidation,
  createMovieValidation,
  deleteMoviesByIdValidation,

};
