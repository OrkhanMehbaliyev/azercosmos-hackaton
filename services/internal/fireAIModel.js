const axios = require("axios");
const { Transfer, SuccessResult, ErrorResult } = require("../../utils/Result");
const { HTTP_STATUS_CODES } = require("../../utils/constants");
const CustomError = require("../../utils/CustomError");
const borderDrawer = require("../../utils/borderDrawer");
const publicMediaFiles = require("./publicMediaFiles");

const fireAIModel = async (image_url) => {
  try {
    const response = await axios({
      method: "POST",
      url: "https://detect.roboflow.com/fire-detection-iufpz-cuugg/1",
      params: {
        api_key: "CQYJl8hX1B4Ag564rp61",
        image: image_url,
      },
    });

    if (response.status === 200 && response.data) {
      if (response.data?.predictions?.length > 0) {
        const drawedImage = await borderDrawer(
          image_url,
          response.data?.predictions
        );

        console.log("drawedImage", drawedImage);

        //Link conversion
        const mediaToPublicUrl = await publicMediaFiles(drawedImage);

        const {
          response: responseMediaPublicUrl,
          statusCode: statusCodeMediaPublicUrl,
        } = mediaToPublicUrl;

        if (responseMediaPublicUrl instanceof CustomError)
          return mediaToPublicUrl;

        if (!responseMediaPublicUrl.success) {
          return Transfer(
            new ErrorResult(MEDIA_MESSAGES.UPLOAD_ERROR),
            statusCodeMediaPublicUrl
          );
        }
        console.log("drawedddImage", responseMediaPublicUrl?.data?.imageUrl);

        // console.log(
        //   "responseMediaPublicUrl in fireAIModel",
        //   responseMediaPublicUrl
        // );

        // console.log("predictionresponse", response);

        //Data return
        return Transfer(
          new SuccessResult("Fire detected!", {
            drawed_image_url: responseMediaPublicUrl?.data?.imageUrl,
            predictions: response.data?.predictions,
          }),
          HTTP_STATUS_CODES.OK
        );
      } else {
        return Transfer(
          new ErrorResult("Fire detection failed!"),
          HTTP_STATUS_CODES.BAD_REQUEST
        );
      }
    }
  } catch (err) {
    return Transfer(
      new CustomError("FireAI", err),
      HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
    );
  }
};

module.exports = fireAIModel;
