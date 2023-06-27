const errors = require("../utils/errors");

module.exports = (err, req, res, next) => {
  if (err) {
    let serverStatus = errors.SERVER_ERROR;
    let message = "An error has occurred on the server.";

    if (err.name === "ValidationError" || err.name === "CastError") {
      serverStatus = errors.BAD_REQUEST;
      message = "Invalid data";
    } else if (err.name === "NotFound") {
      serverStatus = errors.DocumentNotFoundError;
      message = err.message || "Resource not found";
    }

    return res.status(serverStatus).json({ message });
  }

  return next();
};
