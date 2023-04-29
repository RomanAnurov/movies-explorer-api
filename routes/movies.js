const router = require('express').Router();
const { getMovies, createMovies, deleteMoviesById } = require('../controllers/movies');
const { createMovieValidation, deleteMoviesByIdValidation } = require('../middlewares/celebrate-validate');

router.get('/movies', getMovies);
router.post('/movies', createMovieValidation, createMovies);
router.delete('/movies/:_id', deleteMoviesByIdValidation, deleteMoviesById);

module.exports = router;
