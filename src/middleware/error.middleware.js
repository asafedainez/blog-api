const httpStatus = require('../utils/http');

const errorMiddleware = (err, _req, res, _next) => {
  res
    .status(err.status || httpStatus.INTERNAL_SERVER_ERROR)
    .json({ message: err.message });
};

module.exports = errorMiddleware;
