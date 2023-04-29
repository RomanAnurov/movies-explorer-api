const router = require('express').Router();
const movieRouter = require('./movies');
const userRouter = require('./users');

const { login, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { createUserValidation, loginValidation } = require('../middlewares/celebrate-validate');
const NotFoundError = require('../errors/NotFoundError');

router.post('/signin', loginValidation, login);
router.post('/signup', createUserValidation, createUser);
router.use(auth);
router.use('/users', userRouter);
router.use(movieRouter);
router.use((req, res, next) => {
  next(new NotFoundError('Запрашиваемая страница не найдена'));
});

module.exports = router;
