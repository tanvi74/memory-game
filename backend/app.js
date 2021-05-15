const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

// Router for start game and give score
const gameRouter = require('./routes/game');

// Router for analyzing the stack 1 and stack 2
const playRouter = require('./routes/play');

const app = express();


// 1) GLOBAL MIDDLEWARES

// Set security HTTP headers
app.use(helmet());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}


// 3) ROUTES
app.use('/api', gameRouter);
app.use('/api/play', playRouter)

module.exports = app;