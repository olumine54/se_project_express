const user = require("../models/user");
const {
  BAD_REQUEST,
  DocumentNotFoundError,
  SERVER_ERROR,
} = require("../utils/errors");

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

const createUser = (req, res) => {
  const { name, avatar } = req.body;

  user
    .create({ name, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "ValidationError" || err.name === "CastError") {
        res
          .status(BAD_REQUEST)
          .send({ message: "The data entered is invalid" });
      } else {
        res
          .status(SERVER_ERROR)
          .send({ message: "An error has occurred on the server" });
      }
    });
};
module.exports = { getUser, getUsers, createUser };
