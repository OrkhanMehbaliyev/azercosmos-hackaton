const CustomError = require("../utils/CustomError");
const parkService = require("../services/parkService");
const { HTTP_STATUS_CODES, ERROR_TYPES } = require("../utils/constants");

const createPark = async (req, res) => {
  try {
    const { response, statusCode } = await parkService.createPark(req?.body);
    res.status(statusCode).json(response);
  } catch (err) {
    res
      .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json(new CustomError(ERROR_TYPES.CONTROLLER_LEVEL, err));
  }
};

const getAllParks = async (req, res) => {
  try {
    const parkName = req.query?.name;

    const { response, statusCode } = await parkService.getAllParks(parkName);
    res.status(statusCode).json(response);
  } catch (err) {
    res
      .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json(new CustomError(ERROR_TYPES.CONTROLLER_LEVEL, err));
  }
};

const getParkById = async (req, res) => {
  try {
    const { id } = req.params;
    const { response, statusCode } = await parkService.getParkById(id);
    res.status(statusCode).json(response);
  } catch (err) {
    res
      .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json(new CustomError(ERROR_TYPES.CONTROLLER_LEVEL, err));
  }
};

module.exports = {
  createPark,
  getAllParks,
  getParkById,
};
