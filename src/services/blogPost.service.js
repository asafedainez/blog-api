const Sequelize = require('sequelize');
const sequelizeConfig = require('../database/config/config');
const httpStatus = require('../utils/http');
const { BlogPost, PostCategory, User, Category } = require('../database/models');

const sequelize = new Sequelize(sequelizeConfig.development);

const verifyIfCategoryExists = async (categoryIds) => {
  const result = await Promise.all(
    categoryIds.map((categoryId) => (
      Category.findByPk(categoryId)
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

const getAll = async () => {
  const result = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  return result;
};

const getById = async (id) => {
  const result = await BlogPost.findByPk(id, {
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ], 
  });

  if (!result) {
    const error = { status: httpStatus.NOT_FOUND, message: 'Post does not exist' };
    throw error;
  }

  return result;
};

const update = async (data) => {
  const { id, title, content, userId } = data;

  const result = await BlogPost.findByPk(id);
  if (result.userId !== userId) {
    const error = { status: httpStatus.UNAUTHORIZED, message: 'Unauthorized user' };
    throw error;
  }
  
  await BlogPost.update({ title, content }, { where: { id } });

  const postUpdated = await getById(id);
  return postUpdated;
};

const deletePost = async (id, userId) => {
  const result = await BlogPost.findByPk(id);

  if (!result) {
    const error = { status: httpStatus.NOT_FOUND, message: 'Post does not exist' };
    throw error;
  }

  if (result.userId !== userId) {
    const error = { status: httpStatus.UNAUTHORIZED, message: 'Unauthorized user' };
    throw error;
  }

  await BlogPost.destroy({ where: { id } });
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  deletePost,
};