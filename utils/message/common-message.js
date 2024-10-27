const DATA_MESSAGES = {
  GET_SUCCESS: "Data retrieved successfully",
  POST_SUCCESS: "Data sent successfully",
  DELETE_SUCCESS: "Data deleted successfully",
  ERROR: "",
};

const DB_ERROR_MESSAGES = {
  MONGO_DB_GET: "Data could not be gotten from MongoDB",
  MONGO_DB_POST: "Data could not be sent to MongoDB",
  MONGO_DB_UPDATE: "Data could not be updated in MongoDB",
  MONGO_DB_DELETE: "Data could not be deleted in MongoDB",
};

const MEDIA_MESSAGES = {
  NO_MEDIA: "No media file uploaded",
  MEDIA_UPLOAD_SUCCESS: "Media file uploaded successfully",
  UPLOAD_ERROR: "File could not be uploaded",
};

const TOKEN_MESSAGES = {
  EXPIRED: "Token has been expired",
  VERIFICATION_ERROR: "Token verification failed",
};

module.exports = {
  DATA_MESSAGES,
  MEDIA_MESSAGES,
  TOKEN_MESSAGES,
  DB_ERROR_MESSAGES,
};
