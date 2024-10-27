const CustomError = require("../utils/CustomError");
const reportService = require("../services/reportService");
const { HTTP_STATUS_CODES, ERROR_TYPES } = require("../utils/constants");

const createReport = async (req, res) => {
  try {
    const { response, statusCode } = await reportService.createReport(
      req?.body
    );

    res.status(statusCode).json(response);
  } catch (err) {
    res
      .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json(new CustomError(ERROR_TYPES.CONTROLLER_LEVEL, err));
  }
};

const getAllReports = async (req, res) => {
  try {
    const reportType = req.query?.typeId;

    const { response, statusCode } = await reportService.getAllReports(
      reportType
    );
    res.status(statusCode).json(response);
  } catch (err) {
    res
      .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json(new CustomError(ERROR_TYPES.CONTROLLER_LEVEL, err));
  }
};

const getReportById = async (req, res) => {
  try {
    const { id } = req.params;
    const { response, statusCode } = await reportService.getReportById(id);
    res.status(statusCode).json(response);
  } catch (err) {
    res
      .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json(new CustomError(ERROR_TYPES.CONTROLLER_LEVEL, err));
  }
};

const getReportTypes = async (req, res) => {
  try {
    const { response, statusCode } = await reportService.getReportTypes();
    res.status(statusCode).json(response);
  } catch (err) {
    res
      .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json(new CustomError(ERROR_TYPES.CONTROLLER_LEVEL, err));
  }
};

const deleteReportById = async (req, res) => {
  try {
    const { id } = req?.params;
    const { response, statusCode } = await reportService.deleteReportById(id);
    res.status(statusCode).json(response);
  } catch (err) {
    res
      .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json(new CustomError(ERROR_TYPES.CONTROLLER_LEVEL, err));
  }
};

module.exports = {
  createReport,
  getAllReports,
  getReportById,
  getReportTypes,
  deleteReportById,
};
