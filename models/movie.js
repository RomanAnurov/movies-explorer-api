const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,

  },

  director: {
    type: String,
    required: true,

  },

  duration: {
    type: Number,
    required: true,

  },

  year: {
    type: String,
    required: true,

  },

  description: {
    type: String,
    required: true,

  },

  image: {
    type: String,
    required: true,

    validate: {
      validator: (value) => validator.isURL(value),
      message: 'Некорректная ссылка',
    },
  },

  trailerLink: {
    type: String,
    required: true,

    validate: {
      validator: (value) => validator.isURL(value),
      message: 'Некорректная ссылка',
    },
  },

  thumbnail: {
    type: String,
    required: true,

    validate: {
      validator: (value) => validator.isURL(value),
      message: 'Некорректная ссылка',
    },
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,

  },

  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,

  },
});

module.exports = mongoose.model('movie', movieSchema);
