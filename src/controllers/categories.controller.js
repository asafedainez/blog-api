const httpStatus = require('../utils/http');
const service = require('../services/categories.service');

const create = async (req, res) => {
  const { name } = req.body;
  const category = await service.create(name);
  return res.status(httpStatus.CREATED).json(category);
};

const getAll = async (req, res) => {
  const categories = await service.getAll();
  return res.status(httpStatus.OK).json(categories);
};

module.exports = { create, getAll };