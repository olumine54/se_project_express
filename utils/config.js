const jwtSecret = process.env.JWT_SECRET || "dev-secret";

module.exports = {
  jwtSecret,
};
