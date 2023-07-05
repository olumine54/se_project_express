const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../utils/config");
const {
  BAD_REQUEST,
  DocumentNotFoundError,
  SERVER_ERROR,
  UNAUTHORIZED,
  DUPLICATE_ERROR,
} = require("../utils/errors");

const getCurrentUser = (req, res) => {
  const { _id } = req.body;

  User.findById(_id)
    .orFail()
    .then((item) => res.status(200).send({ data: item }))
    .catch((err) => {
      if (err.name === "ValidationError" || err.name === "CastError") {
        res
          .status(BAD_REQUEST)
          .send({ message: "The data provided is invalid" });
      } else if (err.name === "DocumentNotFoundError") {
        res
          .status(DocumentNotFoundError)
          .send({ message: "The id entered was not found" });
      } else {
        res
          .status(SERVER_ERROR)
          .send({ message: "An error has occurred on the server" });
      }
    });
};

const updateItem = (req, res) => {
  const { name, avatar } = req.body;

  clothingItem
    .findByIdAndUpdate(
      req.user._id,
      { name, avatar },
      { new: true, runValidators: true }
    )
    .orFail()
    .then((item) => res.status(200).send({ data: item }))
    .catch((err) => {
      if (err.name === "ValidationError" || err.name === "CastError") {
        res.status(BAD_REQUEST).send({ message: "The id entered is invalid" });
      } else if (err.name === DocumentNotFoundError) {
        res
          .status(DocumentNotFoundError)
          .send({ message: "The id entered was not found" });
      } else {
        res
          .status(SERVER_ERROR)
          .send({ message: "An error has occurred on the server" });
      }
    });
};

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => {
      res.status(SERVER_ERROR).send({ message: "Error from getuser" });
    });
};

const getUser = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .orFail(() => {
      const error = new Error("Item ID not found");
      error.statusCode = DocumentNotFoundError;
      throw error;
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "ValidationError" || err.name === "CastError") {
        res.status(BAD_REQUEST).send({ message: "The id entered is invalid" }); //
      } else if (err.statusCode === DocumentNotFoundError) {
        res
          .status(DocumentNotFoundError)
          .send({ message: "The id entered was not found" });
      } else {
        res
          .status(SERVER_ERROR)
          .send({ message: "An error has occurred on the server" });
      }
    });
};

const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => {
      return User.create({
        name,
        avatar,
        email: req.body.email,
        password: hash, //
      }).then((user) =>
        res.send({ name, avatar, email, password, _id: user._id })
      );
    })

    .then((user) => {
      console.log("test1236");
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.code === 11000) {
        res
          .status(DUPLICATE_ERROR)
          .send({ message: "duplicate error the user already exist" });
      } else {
        res
          .status(SERVER_ERROR)
          .send({ message: "An error has occurred on the server" });
      }
    });
};

const login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, jwtSecret, {
        expiresIn: "7d",
      });

      res.send({ token });
    })
    .catch((err) => {
      res.status(UNAUTHORIZED).send({ message: err.message });
    });
};

module.exports = {
  getUser,
  getUsers,
  createUser,
  login,
  getCurrentUser,
  updateItem,
};
