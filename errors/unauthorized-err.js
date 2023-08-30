class UnauthorizedError extends Error {
  constructor(message = "nor-found-error") {
    super(message);
    this.statusCode = 404;
  }
}

module.exports = UnauthorizedError;
