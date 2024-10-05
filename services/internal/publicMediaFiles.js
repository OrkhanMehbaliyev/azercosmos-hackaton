const cloudinary = require("../../config/cloudinary");
const CustomError = require("../../utils/CustomError");
const {
  DATA_MESSAGES,
  MEDIA_MESSAGES,
} = require("../../utils/message/common-message");
const {
  HTTP_STATUS_CODES,
  ERROR_TYPES,
  DEFAULT_CLOUDINARY_URL_OPTIONS,
} = require("../../utils/constants");
const { Transfer, ErrorResult, SuccessResult } = require("../../utils/Result");

const publicMediaFiles = async (
  file,
  options = DEFAULT_CLOUDINARY_URL_OPTIONS
) => {
  try {
    if (!file) {
      return Transfer(
        new ErrorResult(MEDIA_MESSAGES.NO_MEDIA),
        HTTP_STATUS_CODES.BAD_REQUEST
      );
    }

    const result = await cloudinary.uploader.upload(
      `data:image/jpeg;base64,${file}`
    );
    const url = cloudinary.url(result.public_id, options);

    return Transfer(
      new SuccessResult(
        MEDIA_MESSAGES.MEDIA_UPLOAD_SUCCESS,
        {
          imageUrl: url,
        },
        HTTP_STATUS_CODES.OK
      )
    );
  } catch (err) {
    return Transfer(
      new CustomError(ERROR_TYPES.CLOUDINARY, err),
      HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
    );
  }
};

module.exports = publicMediaFiles;
