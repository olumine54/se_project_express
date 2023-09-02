class BadRequestError extends Error {
  constructor(message = "nor-found-error") {
    super(message);
    this.statusCode = 400;
  }
}

module.exports = BadRequestError;
