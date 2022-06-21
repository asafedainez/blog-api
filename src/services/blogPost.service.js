const Sequelize = require('sequelize');
const sequelizeConfig = require('../database/config/config');
const httpStatus = require('../utils/http');
const { BlogPost, PostCategory } = require('../database/models');

const sequelize = new Sequelize(sequelizeConfig.development);

const verifyIfCategoryExists = async (categoryIds) => {
  const result = await Promise.all(
    categoryIds.map((categoryId) => (
      PostCategory.findOne({ where: { categoryId } })
    )),
  );

  const error = { status: httpStatus.BAD_REQUEST, message: '"categoryIds" not found' };
  if (!result.every((category) => category !== null)) {
    throw error;
  }
};

const create = async (postData) => {
  const { title, content, userId, categoryIds } = postData;

  await verifyIfCategoryExists(categoryIds);
  
  try {
    const result = await sequelize.transaction(async (t) => {
      const newPost = await BlogPost.create({ title, content, userId }, { transaction: t });

      await Promise.all(
        categoryIds.map((categoryId) => (
          PostCategory.create({ postId: newPost.id, categoryId }, { transaction: t })
        )),
      );

      return newPost;
    });

    return result;
  } catch (e) {
    const error = { status: httpStatus.INTERNAL_SERVER_ERROR, message: e.message };
    throw error;
  }
};

module.exports = {
  create,
};