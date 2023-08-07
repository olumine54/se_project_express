const jwt = require("jsonwebtoken");
const errors = require("../utils/errors");
const { jwtSecret } = require("../utils/config");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res
      .status(errors.UNAUTHORIZED)
      .send({ message: "Authorization Required" });
  }

  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    console.log(jwtSecret);
    payload = jwt.verify(token, jwtSecret);
  } catch (err) {
    return res
      .status(errors.UNAUTHORIZED)
      .send({ message: "Authorization Required" });
  }

  req.user = payload;

  return next();
};
