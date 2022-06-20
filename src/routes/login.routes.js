const Routes = require('express').Router();
const controller = require('../controllers/login.controller');
const loginMiddleware = require('../middleware/login.middleware');

Routes.post('/', loginMiddleware, controller.newLogin);

module.exports = Routes;
