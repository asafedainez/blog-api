const jwt = require('../utils/jwt');
const { User } = require('../database/models');
const httpStatus = require('../utils/http');

const error = {
  status: httpStatus.BAD_REQUEST,
  message: 'Invalid fields',
};

const authentication = async (user, password) => {
  const userFound = await User.findOne({ where: { email: user, password } });

  if (!userFound) {
    throw error;
  }

  const { id, email } = userFound;
  return jwt.generateToken({ id, email });
};

module.exports = { authentication };
