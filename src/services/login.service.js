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

  return jwt.generateToken({
    data: { id: userFound.id, email: userFound.email },
  });
};

module.exports = { authentication };
