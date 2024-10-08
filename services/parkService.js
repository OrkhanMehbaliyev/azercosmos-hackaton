const {
  MEDIA_MESSAGES,
  DATA_MESSAGES,
} = require("../utils/message/common-message");
const supabase = require("../config/supabase");
const CustomError = require("../utils/CustomError");
const publicMediaFiles = require("./internal/publicMediaFiles");
const { HTTP_STATUS_CODES, ERROR_TYPES } = require("../utils/constants");
const { Transfer, ErrorResult, SuccessResult } = require("../utils/Result");
const { generateId, flySearch } = require("../utils/general-functions");

const createPark = async (data) => {
  try {
    const mediaToPublicUrl = await publicMediaFiles(data?.image);
    const { response, statusCode } = mediaToPublicUrl;

    if (mediaToPublicUrl?.response instanceof CustomError)
      return mediaToPublicUrl;

    if (!response.success) {
      return Transfer(new ErrorResult(MEDIA_MESSAGES.UPLOAD_ERROR), statusCode);
    }

    const { data: mediaFileData } = response;
    const { name, description, location } = data;

    const { error } = await supabase.from("parks").insert([
      {
        id: generateId(),
        name,
        description,
        image_url: mediaFileData?.imageUrl,
        location: `POINT(${location[0]} ${location[1]})`,
      },
    ]);

    if (error) {
      return Transfer(
        new CustomError(ERROR_TYPES.SUPABASE, error),
        HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
      );
    }

    return Transfer(
      new SuccessResult(DATA_MESSAGES.POST_SUCCESS),
      HTTP_STATUS_CODES.OK
    );
  } catch (err) {
    return Transfer(
      new CustomError(ERROR_TYPES.SUPABASE, err),
      HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
    );
  }
};

const getAllParks = async (query = null) => {
  try {
    const { data, error } = await supabase.rpc("get_parks_with_coordinates");

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

const getParkById = async (id) => {
  try {
    const { data, error } = await supabase
      .rpc("get_parks_with_coordinates")
      .eq("id", id)
      .single();

    if (error)
      return Transfer(
        new CustomError(ERROR_TYPES.SUPABASE, error),
        HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
      );

    return Transfer(
      new SuccessResult(DATA_MESSAGES.GET_SUCCESS, data),
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
  createPark,
  getAllParks,
  getParkById,
};
