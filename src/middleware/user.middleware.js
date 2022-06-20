const Joi = require('joi');
const httpStatus = require('../utils/http');

const userSchema = Joi.object().keys({
  displayName: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  image: Joi.string().allow('').required(),
});

const userMiddleware = async (req, res, next) => {
  const { error } = userSchema.validate(req.body);

  if (error) {
    return res.status(httpStatus.BAD_REQUEST).json({
      status: httpStatus.BAD_REQUEST,
      message: error.details[0].message,
    });
  }

  next();
};

module.exports = userMiddleware;