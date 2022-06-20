const Routes = require('express').Router();

Routes.get('/', (req, res) => {
  res.send('Hello World!');
});

module.exports = Routes;
