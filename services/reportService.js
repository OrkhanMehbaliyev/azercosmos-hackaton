const supabase = require("../config/supabase");
const { ERROR_TYPES, HTTP_STATUS_CODES } = require("../utils/constants");
const CustomError = require("../utils/CustomError");
const { generateId, flySearch } = require("../utils/general-functions");
const {
  MEDIA_MESSAGES,
  DATA_MESSAGES,
} = require("../utils/message/common-message");
const { Transfer, ErrorResult, SuccessResult } = require("../utils/Result");
const fireAIModel = require("./internal/fireAIModel");
const publicMediaFiles = require("./internal/publicMediaFiles");

const createReport = async (data) => {
  try {
    const mediaToPublicUrl = await publicMediaFiles(data?.image);
    const { response, statusCode } = mediaToPublicUrl;

    if (mediaToPublicUrl?.response instanceof CustomError)
      return mediaToPublicUrl;

    if (!response.success) {
      return Transfer(new ErrorResult(MEDIA_MESSAGES.UPLOAD_ERROR), statusCode);
    }

    const { data: mediaFileData } = response;

    // AI validation
    const { response: responseFireAIModel, statusCode: statusCodeFireAIModel } =
      await fireAIModel(mediaFileData?.imageUrl);

    if (!(responseFireAIModel instanceof SuccessResult))
      return Transfer(responseFireAIModel, statusCodeFireAIModel);

    // console.log("responseFireAIModel", responseFireAIModel);
    // DB operation
    const { error } = await supabase.from("reports").insert([
      {
        id: generateId(),
        user_id: data?.user_id,
        problem_type_id: data?.problem_type_id,
        description: data?.description,
        image_url: responseFireAIModel?.data?.drawed_image_url,
        location: `POINT(${data?.location[0]} ${data?.location[1]})`,
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

const getAllReports = async (query) => {
  try {
    const { data, error } = query
      ? await supabase
          .rpc("get_reports_with_coordinates")
          .eq("problem_type_id", query)
      : await supabase.rpc("get_reports_with_coordinates");

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

const getReportById = async (id) => {
  try {
    const { data, error } = await supabase
      .rpc("get_reports_with_coordinates")
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

const getReportTypes = async () => {
  try {
    const { data, error } = await supabase.from("problem_types").select("*");

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

const deleteReportById = async (id) => {
  try {
    const { error } = await supabase.from("reports").delete().eq("id", id);

    if (error)
      return Transfer(
        new CustomError(ERROR_TYPES.SUPABASE, error),
        HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
      );

    return Transfer(
      new SuccessResult(DATA_MESSAGES.DELETE_SUCCESS),
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
  createReport,
  getAllReports,
  getReportById,
  getReportTypes,
  deleteReportById,
};
