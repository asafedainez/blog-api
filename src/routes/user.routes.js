const Routes = require('express').Router();
const userMiddleware = require('../middleware/user.middleware');
const jwtTokenMiddleware = require('../middleware/jwtToken.middleware');
const controller = require('../controllers/user.controller');

Routes.get('/', jwtTokenMiddleware, controller.getAll);
Routes.post('/', userMiddleware, controller.insertUser);

module.exports = Routes;
