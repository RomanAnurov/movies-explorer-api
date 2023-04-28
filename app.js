require('dotenv').config();
const express = require('express');

const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { limiter } = require('./middlewares/limiter');
const routes = require('./routes');
const cors = require('./middlewares/cors');

mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb', {
})
  .then(() => {
    console.log('Connected');
  })
  .catch((error) => {
    console.log(`Error during connection ${error}`);
  });

app.use(bodyParser.json());
app.use(requestLogger);
app.use(limiter);
app.use(cors);

const { PORT = 3000 } = process.env;

app.listen(3000, () => {
  console.log(`Listing on port ${PORT}`);
});
app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  const message = statusCode === 500 ? 'На сервере произошла ошибка' : err.message;
  res.status(statusCode).send({ message });
  next();
});
