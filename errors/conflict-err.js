class ConflictError extends Error {
  constructor(message = "nor-found-error") {
    super(message);
    this.statusCode = 409;
  }
}

module.exports = ConflictError;
