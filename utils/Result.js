class Result {
  constructor(success, data = null, message = null) {
    this.success = success;
    this.data = data;
    this.message = message;
  }
}

class ErrorResult extends Result {
  /**
   *
   * @param {string} message
   * @param {any} data
   */
  constructor(message = null, data = null) {
    super(false, data, message);
  }
}

class SuccessResult extends Result {
  /**
   *
   * @param {string} message
   * @param {any} data
   */
  constructor(message = null, data = null) {
    super(true, data, message);
  }
}

class TransferResult {
  /**
   *
   * @param {Result} response
   * @param {number} statusCode
   */
  constructor(response, statusCode) {
    this.response = response;
    this.statusCode = statusCode;
  }
}

/**
 *
 * @param {Result} response
 * @param {number} statusCode
 */
const Transfer = (response, statusCode) =>
  new TransferResult(response, statusCode);

module.exports = {
  Transfer,
  ErrorResult,
  SuccessResult,
};
