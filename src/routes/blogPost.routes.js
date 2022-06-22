const Routes = require('express').Router();
const controller = require('../controllers/blogPost.controller');
const jwtTokenMiddleware = require('../middleware/jwtToken.middleware');
const {
  blogPostMiddleware,
  blogPostUpdateMiddleware,
} = require('../middleware/blogPost.middleware');

Routes.get('/', jwtTokenMiddleware, controller.getAll);
Routes.get('/search', jwtTokenMiddleware, controller.search);
Routes.get('/:id', jwtTokenMiddleware, controller.getById);
Routes.post('/', jwtTokenMiddleware, blogPostMiddleware, controller.create);
Routes.put('/:id', jwtTokenMiddleware, blogPostUpdateMiddleware, controller.update);
Routes.delete('/:id', jwtTokenMiddleware, controller.deletePost);

module.exports = Routes;
