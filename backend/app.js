require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const { errors } = require('celebrate');
const corsOptions = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const router = require('./routes');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // Return rate limit info in the `RateLimit-*` headers
  max: 100, // можно совершить максимум 100 запросов с одного IP
});

const { PORT = 3000 } = process.env;
const app = express();

app.use(corsOptions);

app.use(requestLogger);
app.use(limiter);
app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(errorLogger);
app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500
      ? 'Ошибка на сервере'
      : message,
  });
  next();
});

async function server() {
  await mongoose.connect('mongodb://localhost:27017/mestodb', {
    useNewUrlParser: true,
  }).then(() => console.log('Connected to mongodb'));

  await app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);
  });
}

server();
