const { User } = require('../database/models');
const { generateToken } = require('../utils/jwt');
const httpStatus = require('../utils/http');

const create = async (data) => {
  const userFound = await User.findOne({ where: { email: data.email } });

  if (userFound) {
    const error = {
      status: httpStatus.CONFLICT,
      message: 'User already registered',
    };
  throw error;
  }
  
  const user = await User.create(data);
  const { id, email } = user;
  return generateToken({ id, email });
};

const getAll = async () => {
  const users = await User.findAll({ attributes: { exclude: ['password'] } });
  return users;
};

module.exports = {
  create,
  getAll,
};
