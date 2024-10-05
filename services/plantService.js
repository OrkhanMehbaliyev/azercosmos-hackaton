const supabase = require("../config/supabase");
const { ERROR_TYPES, HTTP_STATUS_CODES } = require("../utils/constants");
const CustomError = require("../utils/CustomError");
const { generateId, flySearch } = require("../utils/general-functions");
const {
  MEDIA_MESSAGES,
  DATA_MESSAGES,
} = require("../utils/message/common-message");
const { Transfer, ErrorResult, SuccessResult } = require("../utils/Result");
const publicMediaFiles = require("./internal/publicMediaFiles");

const createPlant = async (data) => {
  try {
    const mediaToPublicUrl = await publicMediaFiles(data?.image);
    const { response, statusCode } = mediaToPublicUrl;

    if (mediaToPublicUrl?.response instanceof CustomError)
      return mediaToPublicUrl;

    if (!response.success) {
      return Transfer(new ErrorResult(MEDIA_MESSAGES.UPLOAD_ERROR), statusCode);
    }

    const { data: mediaFileData } = response;
    const { name, description } = data;

    const { error } = await supabase.from("plants").insert([
      {
        id: generateId(),
        name,
        description,
        image_url: mediaFileData?.imageUrl,
      },
    ]);

    if (error)
      return Transfer(
        new CustomError(ERROR_TYPES.SUPABASE, error),
        HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
      );

    return Transfer(
      new SuccessResult(DATA_MESSAGES.GET_SUCCESS),
      HTTP_STATUS_CODES.OK
    );
  } catch (err) {
    return Transfer(
      new CustomError(ERROR_TYPES.SUPABASE, err),
      HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
    );
  }
};

const getAllPlants = async (query = null) => {
  try {
    const { data, error } = await supabase.from("plants").select("*");

    if (error)
      return Transfer(
        new CustomError(ERROR_TYPES.SUPABASE, error),
        HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
      );

    return Transfer(
      new SuccessResult(
        DATA_MESSAGES.GET_SUCCESS,
        query ? flySearch(data, query) : data
      ),
      HTTP_STATUS_CODES.OK
    );
  } catch (err) {
    return Transfer(
      new CustomError(ERROR_TYPES.SUPABASE, err),
      HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
    );
  }
};

module.exports = {
  createPlant,
  getAllPlants,
};
