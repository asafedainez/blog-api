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

const deletePost = async (req, res) => {
  const { id } = req.params;
  const { authorization: jwtToken } = req.headers;
  const userData = verifyToken(jwtToken).data;

  await service.deletePost(id, userData.id);

  res.status(httpStatus.NOT_CONTENT).send();
};

const search = async (req, res) => {
  const { q: searchTerm } = req.query;

  const posts = await service.search(searchTerm);
  return res.status(httpStatus.OK).json(posts);
};

module.exports = { 
  create, 
  getAll,
  getById,
  update,
  deletePost,
  search,
};