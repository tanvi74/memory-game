const dotenv = require('dotenv');

// if synchronous code is having error
process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION! Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./app');

// port is declared
const port = process.env.PORT || 8000;

//Server starts running
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});


// if asynchronous code is having error
process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});