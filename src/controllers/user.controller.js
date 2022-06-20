const httpStatus = require('../utils/http');
const service = require('../services/user.service');

const insertUser = async (req, res) => {
  const { displayName, email, password, image } = req.body;

  const token = await service.create({
    displayName,
    email,
    password,
    image,
  });

  return res.status(httpStatus.CREATED).json({ token });
};

const getAll = async (req, res) => {
  const users = await service.getAll();

  return res.status(httpStatus.OK).json(users);
};

module.exports = {
  insertUser,
  getAll,
};
