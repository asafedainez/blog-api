const Routes = require('express').Router();
const jwtTokenMiddleware = require('../middleware/jwtToken.middleware');
const controller = require('../controllers/categories.controller');
const categoriesMiddleware = require('../middleware/categories.middleware');

Routes.get('/', jwtTokenMiddleware, controller.getAll);
Routes.post('/', jwtTokenMiddleware, categoriesMiddleware, controller.create);

module.exports = Routes;
