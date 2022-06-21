const Routes = require('express').Router();
const controller = require('../controllers/blogPost.controller');
const jwtTokenMiddleware = require('../middleware/jwtToken.middleware');
const blogPostMiddleware = require('../middleware/blogPost.middleware');

Routes.get('/', jwtTokenMiddleware, controller.getAll);
Routes.post('/', jwtTokenMiddleware, blogPostMiddleware, controller.create);

module.exports = Routes;
