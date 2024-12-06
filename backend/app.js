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
const allowedOrigins = ['http://127.0.0.1:8020', 'http://localhost:8020', 'http://127.0.0.1:9000', 'http://localhost:9000', "https://playmemorycards.netlify.app", "*"];
 
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
       res.setHeader('Access-Control-Allow-Origin', origin);
  }
  //res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:8020');
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', true);
  return next();
});


app.use(cors({ credentials: true, origin: allowedOrigins }));

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}


// 3) ROUTES
app.use('/api', gameRouter);
app.use('/api/play', playRouter)

module.exports = app;