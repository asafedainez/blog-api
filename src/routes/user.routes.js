const Routes = require('express').Router();
const userMiddleware = require('../middleware/user.middleware');
const jwtTokenMiddleware = require('../middleware/jwtToken.middleware');
const controller = require('../controllers/user.controller');

Routes.get('/:id', jwtTokenMiddleware, controller.getUser);
Routes.get('/', jwtTokenMiddleware, controller.getAll);
Routes.post('/', userMiddleware, controller.insertUser);
Routes.delete('/me', jwtTokenMiddleware, controller.deleteUser);

module.exports = Routes;
