const httpStatus = require('../utils/http');
const service = require('../services/login.service');

const newLogin = async (req, res) => {
  const { email, password } = req.body;
  const token = await service.authentication(email, password);
  res.status(httpStatus.OK).json({ token });
};

module.exports = { newLogin };
