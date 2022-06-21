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

module.exports = { 
  create, 
};