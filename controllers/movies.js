const Movie = require('../models/movie');

const IncorrectDataError = require('../errors/IncorrectDataError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

const getMovies = (req, res, next) => {
  const owner = req.user._id;

  Movie.find({ owner })
    .then((movies) => {
      if (movies.length === 0) {
        next(new NotFoundError('У пользователя нет сохранённых фильмов'));
      } else {
        res.send(movies);
      }
    })
    .catch(next);
};

const createMovies = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  const owner = req.user._id;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner,
  })
    .then((movies) => res.send(movies))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new IncorrectDataError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

const deleteMoviesById = (req, res, next) => {
  const { _id } = req.params;
  const owner = req.user._id;
  Movie.findById(_id)
    .orFail()
    .then((movie) => {
      if (movie.owner.toString() === owner) {
        Movie.findByIdAndDelete(_id)
          .then((user) => {
            res.send(user);
          })
          .catch(next);
      } else {
        next(new ForbiddenError('У вас нет прав на удаление этого фильма'));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new IncorrectDataError('Введены не корректные данные'));
      } else if (err.name === 'DocumentNotFoundError') {
        next(new NotFoundError('Фильм с указанным _id не найден'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getMovies,
  createMovies,
  deleteMoviesById,
};
