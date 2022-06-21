const Joi = require('joi');
const httpStatus = require('../utils/http');

const blogPostSchema = Joi.object().keys({
  title: Joi.string().required(),
  content: Joi.string().required(),
  categoryIds: Joi.array().items(Joi.number().required()),
});

const blogPostMiddleware = async (req, res, next) => {
  const { error } = blogPostSchema.validate(req.body);
  if (error) {
    const { type, message } = error.details[0];
    const throwMessage = type === 'string.empty' 
      ? 'Some required fields are missing' 
      : message;
    return res.status(httpStatus.BAD_REQUEST).json({ message: throwMessage });
  }
  next();
};

module.exports = blogPostMiddleware;