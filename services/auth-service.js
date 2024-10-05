const supabase = require("../config/supabase");
const { ERROR_TYPES, HTTP_STATUS_CODES } = require("../utils/constants");
const CustomError = require("../utils/CustomError");
const { DATA_MESSAGES } = require("../utils/message/common-message");
const { Transfer, SuccessResult, ErrorResult } = require("../utils/Result");

const createUser = async (data) => {
  try {
    const { error } = await supabase.from("users").insert([
      {
        nickname: data?.nickname,
        email: data?.email,
        country: data?.country,
        password: data?.password,
      },
    ]);

    if (error)
      return Transfer(
        new CustomError(ERROR_TYPES.SUPABASE, error),
        HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
      );

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

const loginUser = async (data) => {
  try {
    console.log("data", data);
    const { data: userData, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", data?.email)
      .single();

    console.log("userData", userData);

    if (error)
      return Transfer(
        new CustomError(ERROR_TYPES.SUPABASE, error),
        HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
      );

    if (data?.password != userData?.password)
      return Transfer(
        new ErrorResult("Wrong password"),
        HTTP_STATUS_CODES.BAD_REQUEST
      );

    return Transfer(new SuccessResult("Auth success"), HTTP_STATUS_CODES.OK);
  } catch (err) {
    return Transfer(
      new CustomError(ERROR_TYPES.SUPABASE, err),
      HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
    );
  }
};

module.exports = {
  createUser,
  loginUser,
};
