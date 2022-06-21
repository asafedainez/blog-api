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

const getById = async (req, res) => {
  const { id } = req.params;
  const post = await service.getById(id);
  return res.status(httpStatus.OK).json(post);
};

const update = async (req, res) => {
  const { title, content } = req.body;
  const { id } = req.params;
  const jwtToken = req.headers.authorization;
  const userData = verifyToken(jwtToken).data;

  const postUpdated = await service.update({ id, title, content, userId: userData.id });
  return res.status(httpStatus.OK).json(postUpdated);
};

module.exports = { 
  create, 
  getAll,
  getById,
  update,
};