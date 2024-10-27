const supabase = require("../config/supabase");
const { ERROR_TYPES, HTTP_STATUS_CODES } = require("../utils/constants");
const CustomError = require("../utils/CustomError");
const { generateId, flySearch } = require("../utils/general-functions");
const {
  MEDIA_MESSAGES,
  DATA_MESSAGES,
} = require("../utils/message/common-message");
const { Transfer, ErrorResult, SuccessResult } = require("../utils/Result");

const createReview = async (data) => {
  try {
    const { error } = await supabase.from("reviews").insert([
      {
        user_id: data?.user_id,
        park_id: data?.park_id,
        description: data?.description,
        rating: data?.rating,
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

const getAllReviews = async (query) => {
  try {
    const { data, error } = query
      ? await supabase.from("reviews").select("*").eq("park_id", query)
      : await supabase.from("reviews").select("*");

    if (error) {
      return Transfer(
        new CustomError(ERROR_TYPES.SUPABASE, error),
        HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
      );
    }

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
  createReview,
  getAllReviews,
};
