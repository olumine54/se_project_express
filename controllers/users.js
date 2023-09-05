const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../utils/config");
const User = require("../models/user");
const BadRequestError = require("../errors/bad-request-err");
const NotFoundError = require("../errors/not-found-err");
const ConflictError = require("../errors/conflict-err");
const UnauthorizedError = require("../errors/unauthorized-err");

const getCurrentUser = (req, res, next) => {
  const { _id } = req.user;

  User.findById(_id)
    .orFail()
    .then((item) => res.status(200).send({ data: item }))
    .catch((err) => {
      if (err.name === "ValidationError" || err.name === "CastError") {
        next(new BadRequestError("The data provided is invalid"));
      } else if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError("The id entered was not found"));
      } else {
        next(err);
      }
    });
};

const updateItem = (req, res, next) => {
  const { name, avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .orFail()
    .then((item) => res.status(200).send({ data: item }))
    .catch((err) => {
      if (err.name === "ValidationError" || err.name === "CastError") {
        next(new BadRequestError("The data provided is invalid"));
      } else if (err.name === NotFoundError) {
        next(new NotFoundError("The id entered was not found"));
      } else {
        next(err);
      }
    });
};

const createUser = (req, res, next) => {
  const { name, avatar, email, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) =>
      User.create({
        name,
        avatar,
        email: req.body.email,
        password: hash,
      }).then((user) => res.send({ name, avatar, email, _id: user._id }))
    )
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError("The data provided is invalid"));
      } else if (err.code === 11000) {
        next(new ConflictError("Email already exists in database"));
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, jwtSecret, {
        expiresIn: "7d",
      });

      res.send({ token });
    })
    .catch((err) => {
      if (err.message === "Incorrect email or password") {
        next(new UnauthorizedError("Email or Password not found"));
      } else {
        next(err);
      }
    });
};

module.exports = {
  createUser,
  login,
  getCurrentUser,
  updateItem,
};
