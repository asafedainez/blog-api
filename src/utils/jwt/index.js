const jwt = require('jsonwebtoken');
const httpStatus = require('../http');

const secret = process.env.JWT_SECRET;

const jwtConfig = {
  expiresIn: '6h',
  algorithm: 'HS256',
};

const generateToken = (data) => jwt.sign({ data }, secret, jwtConfig);

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch (e) {
    const error = {
      status: httpStatus.UNAUTHORIZED,
      message: 'Expired or invalid token',
    };
    throw error;
  }
};

module.exports = {
  generateToken,
  verifyToken,
};
