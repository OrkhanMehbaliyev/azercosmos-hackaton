const CustomError = require("../utils/CustomError");
const galleryService = require("../services/galleryService");
const { HTTP_STATUS_CODES, ERROR_TYPES } = require("../utils/constants");

const uploadPhotoToGallery = async (req, res) => {
  try {
    const { response, statusCode } = await galleryService.uploadPhotoToGallery(
      req?.body
    );
    res.status(statusCode).json(response);
  } catch (err) {
    res
      .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json(new CustomError(ERROR_TYPES.CONTROLLER_LEVEL, err));
  }
};

const getAllPhotosFromGallery = async (req, res) => {
  try {
    const { response, statusCode } =
      await galleryService.getAllPhotosFromGallery();
    res.status(statusCode).json(response);
  } catch (err) {
    res
      .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json(new CustomError(ERROR_TYPES.CONTROLLER_LEVEL, err));
  }
};

const photosGetByIdFromGallery = async (req, res) => {
  try {
    const { id } = req.params;
    const { response, statusCode } =
      await galleryService.photosGetByIdFromGallery(id);
    res.status(statusCode).json(response);
  } catch (err) {
    res
      .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json(new CustomError(ERROR_TYPES.CONTROLLER_LEVEL, err));
  }
};

module.exports = {
  uploadPhotoToGallery,
  getAllPhotosFromGallery,
  photosGetByIdFromGallery,
};
