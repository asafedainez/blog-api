const md5 = require('crypto-js/md5');
const { User } = require('../database/models');
const { generateToken } = require('../utils/jwt');
const httpStatus = require('../utils/http');

const create = async (data) => {
  const { displayName, email, password, image } = data;
  const userFound = await User.findOne({ where: { email } });

  if (userFound) {
    const error = {
      status: httpStatus.CONFLICT,
      message: 'User already registered',
    };
  throw error;
  }

  const passwordHash = md5(password).toString();
  
  const user = await User.create({ displayName, email, password: passwordHash, image });
  const { id } = user;
  return generateToken({ id, email });
};

const getAll = async () => {
  const users = await User.findAll({ attributes: { exclude: ['password'] } });
  return users;
};

const getUser = async (id) => {
  const user = await User.findOne({ where: { id }, attributes: { exclude: ['password'] } });

  if (!user) {
    const error = {
      status: httpStatus.NOT_FOUND,
      message: 'User does not exist',
    };
    throw error;
  }
  return user;
};

const deleteUser = async (id) => {
  await User.destroy({ where: { id } });
};

module.exports = {
  create,
  getAll,
  getUser,
  deleteUser,
};
