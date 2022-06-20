const Joi = require('joi');
const httpStatus = require('../utils/http');

const categoriesSchema = Joi.object().keys({
  name: Joi.string().required(),
});

const categoriesMiddleware = async (req, res, next) => {
  const { error } = categoriesSchema.validate(req.body);
  if (error) {
    return res.status(httpStatus.BAD_REQUEST).json({
      message: error.details[0].message,
    });
  }
  next();
};

module.exports = categoriesMiddleware;