// const httpStatus = require('../utils/http');
const { Category } = require('../database/models');

const create = async (name) => {
  const categoryFound = await Category.findOne({ where: { name } });
  if (categoryFound) {
    return categoryFound;
  }

  const newCategory = await Category.create({ name });
  return newCategory;
};

const getAll = () => Category.findAll();

module.exports = { create, getAll };