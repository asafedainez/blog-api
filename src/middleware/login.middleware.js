const Joi = require('joi');
const httpStatus = require('../utils/http');

const loginSchema = Joi.object()
  .keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  })
  .required();

const loginMiddleware = async (req, res, next) => {
  const { error } = loginSchema.validate(req.body);
  if (error) {
    return res.status(httpStatus.BAD_REQUEST).json({
      message: 'Some required fields are missing',
    });
  }
  next();
};

module.exports = loginMiddleware;
