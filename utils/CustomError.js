class CustomError {
  constructor(type, error = null) {
    this.type = type;
    this.error = error;
  }
}

module.exports = CustomError;
