const Routes = require('express').Router();
const userMiddleware = require('../middleware/user.middleware');
const controller = require('../controllers/user.controller');

Routes.post('/', userMiddleware, controller.insertUser);

module.exports = Routes;
