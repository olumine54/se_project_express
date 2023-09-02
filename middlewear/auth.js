const jwt = require("jsonwebtoken");
const UnauthorizedError = require("../errors/unauthorized-err");
const ForbiddenError = require("../errors/forbidden-err");
const { jwtSecret } = require("../utils/config");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    throw new UnauthorizedError("Unauthorized");
  }

  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    payload = jwt.verify(token, jwtSecret);
  } catch (err) {
    if (err.name === "JsonWebTokenError") {
      throw new UnauthorizedError("Unauthorized: Token expired");
    }
    if (err.name === "TokenExpiredError") {
      throw new UnauthorizedError("Unauthorized: Token expired");
    }
    throw new ForbiddenError("Forbidden Error");
  }

  req.user = payload;

  return next();
};
