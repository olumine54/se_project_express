class UnauthorizedError extends Error {
  constructor(message = "nor-found-error") {
    super(message);
    this.statusCode = 401;
  }
}

module.exports = UnauthorizedError;
