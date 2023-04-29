const router = require('express').Router();
const { getMovies, createMovies, deleteMoviesById } = require('../controllers/movies');
const { createMovieValidation, deleteMoviesByIdValidation } = require('../middlewares/celebrate-validate');

router.get('/', getMovies);
router.post('/', createMovieValidation, createMovies);
router.delete('/:_id', deleteMoviesByIdValidation, deleteMoviesById);

module.exports = router;
