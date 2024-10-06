const plantService = require("../services/plantService");
const { HTTP_STATUS_CODES, ERROR_TYPES } = require("../utils/constants");
const CustomError = require("../utils/CustomError");

const createPlant = async (req, res) => {
  try {
    const { response, statusCode } = await plantService.createPlant(req?.body);

    console.log("response", response);

    res.status(statusCode).json(response);
  } catch (err) {
    res
      .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json(new CustomError(ERROR_TYPES.CONTROLLER_LEVEL, err));
  }
};

const getPlantByFile = async (req, res) => {
  try {
    const { response, statusCode } = await plantService.getPlantByFile(
      req?.body
    );

    res.status(statusCode).json(response);
  } catch (err) {
    res
      .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json(new CustomError(ERROR_TYPES.CONTROLLER_LEVEL, err));
  }
};

const getAllPlants = async (req, res) => {
  try {
    const plantName = req.query?.name;
    const { response, statusCode } = await plantService.getAllPlants(plantName);

    res.status(statusCode).json(response);
  } catch (err) {
    res
      .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json(new CustomError(ERROR_TYPES.CONTROLLER_LEVEL, err));
  }
};

const getPlantById = async (req, res) => {
  try {
    const { id } = req.params;
    const { response, statusCode } = await plantService.getPlantById(id);

    res.status(statusCode).json(response);
  } catch (err) {
    res
      .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json(new CustomError(ERROR_TYPES.CONTROLLER_LEVEL, err));
  }
};

module.exports = {
  createPlant,
  getAllPlants,
  getPlantById,
  getPlantByFile,
};
