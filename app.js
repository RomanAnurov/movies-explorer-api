require('dotenv').config();
const express = require('express');

const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { limiter } = require('./middlewares/limiter');
const routes = require('./routes');
const cors = require('./middlewares/cors');
const errorsHandler = require('./middlewares/errors');

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
app.use(helmet());
app.use(cors);

const { PORT = 3000 } = process.env;

app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(errorsHandler);
app.listen(3000, () => {
  console.log(`Listing on port ${PORT}`);
});
