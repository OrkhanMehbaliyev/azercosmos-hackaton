const ERROR_TYPES = {
  PG: "Postgres",
  MONGO: "MongoDB",
  SERVICE_LEVEL: "Service Level",
  CONTROLLER_LEVEL: "Controller Level",
  CLOUDINARY: "Cloudinary",
  SUPABASE: "supabase",
};

const HTTP_STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
};

const DEFAULT_CLOUDINARY_URL_OPTIONS = {
  transformation: [
    {
      quality: "auto",
      fetch_format: "auto",
    },
  ],
};

module.exports = {
  ERROR_TYPES,
  HTTP_STATUS_CODES,
  DEFAULT_CLOUDINARY_URL_OPTIONS,
};
