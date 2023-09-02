class ForbiddenError extends Error {
  constructor(message = "nor-found-error") {
    super(message);
    this.statusCode = 403;
  }
}

module.exports = ForbiddenError;
