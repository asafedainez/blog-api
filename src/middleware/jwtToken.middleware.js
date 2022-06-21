const jwt = require('../utils/jwt');
const httpStatus = require('../utils/http');

  const tokenMiddleware = async (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(httpStatus.UNAUTHORIZED).json({
        status: httpStatus.UNAUTHORIZED,
        message: 'Token not found',
      });
    }

    jwt.verifyToken(token);

    next();
  };

  module.exports = tokenMiddleware;