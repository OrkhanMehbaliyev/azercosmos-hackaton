const authService = require("../services/auth-service");

const createUser = async (req, res) => {
  try {
    const { response, statusCode } = await authService.createUser(req?.body);

    res.status(statusCode).json(response);
  } catch (err) {
    res
      .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json(new CustomError(ERROR_TYPES.CONTROLLER_LEVEL, err));
  }
};

const loginUser = async (req, res) => {
  try {
    const { response, statusCode } = await authService.loginUser(req?.body);

    res.status(statusCode).json(response);
  } catch (err) {
    res
      .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json(new CustomError(ERROR_TYPES.CONTROLLER_LEVEL, err));
  }
};

module.exports = {
  createUser,
  loginUser,
};
