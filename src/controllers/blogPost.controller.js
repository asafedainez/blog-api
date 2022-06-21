const httpStatus = require('../utils/http');
const service = require('../services/blogPost.service');
const { verifyToken } = require('../utils/jwt');

const create = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const jwtToken = req.headers.authorization;
  const userData = verifyToken(jwtToken).data;

  const post = await service.create({ title, content, userId: userData.id, categoryIds });
  return res.status(httpStatus.CREATED).json(post);
};

const getAll = async (req, res) => {
  const posts = await service.getAll();
  return res.status(httpStatus.OK).json(posts);
};

module.exports = { 
  create, 
  getAll,
};