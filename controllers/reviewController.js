const CustomError = require("../utils/CustomError");
const reviewService = require("../services/reviewService");
const { HTTP_STATUS_CODES, ERROR_TYPES } = require("../utils/constants");

const createReview = async (req, res) => {
  try {
    const { response, statusCode } = await reviewService.createReview(
      req?.body
    );
    res.status(statusCode).json(response);
  } catch (err) {
    res
      .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json(new CustomError(ERROR_TYPES.CONTROLLER_LEVEL, err));
  }
};

const getAllReviews = async (req, res) => {
  try {
    const parkId = req.query?.parkId;
    const { response, statusCode } = await reviewService.getAllReviews(parkId);
    res.status(statusCode).json(response);
  } catch (err) {
    res
      .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json(new CustomError(ERROR_TYPES.CONTROLLER_LEVEL, err));
  }
};

module.exports = {
  createReview,
  getAllReviews,
};
