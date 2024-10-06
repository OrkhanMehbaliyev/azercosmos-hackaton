const model = require("../config/generativeAI");
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
const { getParkById } = require("./parkService");

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

const getPlantByFile = async (body) => {
  try {
    const prompt = "Please tell me just plant name. No other words";
    const image = {
      inlineData: {
        data: body?.image,
        mimeType: "image/png",
      },
    };

    const result = await model.generateContent([prompt, image]);
    const plantName = result.response.text();

    console.log("plantName", plantName);

    const { data, error } = await supabase
      .from("plants")
      .select("*")
      .eq("name", plantName.trim());

    console.log("data", data);

    if (error)
      return Transfer(
        new CustomError(ERROR_TYPES.SUPABASE, error),
        HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
      );

    if (body?.isInPlace && body?.park_id && body?.location) {
      const { error: errorUploadedPlants } = supabase
        .from("uploaded_plants")
        .insert([
          {
            park_id: body?.park_id,
            plant_id: data?.id,
            location: `POINT(${body?.location[0]} ${body?.location[1]})`,
          },
        ]);

      if (errorUploadedPlants)
        return Transfer(
          new CustomError(ERROR_TYPES.SUPABASE, err),
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

const getPlantById = async (id) => {
  try {
    const { data: dataPlant, error: errorPlant } = await supabase
      .from("plants")
      .select("*")
      .eq("id", id)
      .single();

    if (errorPlant)
      return Transfer(
        new CustomError(ERROR_TYPES.SUPABASE, errorPlant),
        HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
      );

    const { data: dataUploadedPlant, error: errorUploadedPlant } =
      await supabase
        .rpc("get_plants_by_plant", { input_plant_id: dataPlant?.id })
        .select("*");

    if (errorUploadedPlant)
      return Transfer(
        new CustomError(ERROR_TYPES.SUPABASE, errorUploadedPlant),
        HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
      );

    const parkIds = [];

    dataUploadedPlant.forEach((uploadedPlant) => {
      if (!parkIds.includes(uploadedPlant?.park_id)) {
        parkIds.push(String(uploadedPlant?.park_id));
      }
    });

    const { data: parks, error: errorParks } = await supabase
      .rpc("get_parks_with_coordinates")
      .select("*")
      .in("id", parkIds);

    if (errorParks)
      return Transfer(
        new CustomError(ERROR_TYPES.SUPABASE, errorParks),
        HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
      );

    const locations = dataUploadedPlant.map((uploadedPlant) => ({
      latitude: uploadedPlant?.latitude,
      longitude: uploadedPlant?.longitude,
    }));

    const finalData = { ...dataPlant, parks, locations };
    return Transfer(
      new SuccessResult(DATA_MESSAGES.GET_SUCCESS, finalData),
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
  getPlantById,
  getPlantByFile,
};
