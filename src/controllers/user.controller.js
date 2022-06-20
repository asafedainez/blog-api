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

module.exports = {
  insertUser,
};
