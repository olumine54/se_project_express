const crypto = require("crypto");

const jwtSecret = crypto.randomBytes(32).toString("hex");

module.exports = {
  jwtSecret,
};
