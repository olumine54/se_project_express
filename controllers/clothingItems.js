const clothingItem = require("../models/clothingItem");
const {
  BAD_REQUEST,
  DocumentNotFoundError,
  SERVER_ERROR,
} = require("../utils/errors");

const createItem = (req, res) => {
  const { name, weather, imageURL } = req.body;
  // const { owner } = req.userId;

  clothingItem
    .create({ name, weather, imageURL })
    .then((item) => {
      console.log(item);
      res.send({ data: item });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError" || err.name === "CastError") {
        res
          .status(BAD_REQUEST)
          .send({ message: "The data provided is invalid" });
      } else {
        res
          .status(SERVER_ERROR)
          .send({ message: "An error has occurred on the server" });
      }
    });
};
const getItems = (req, res) => {
  clothingItem
    .find({})
    .then((items) => res.status(200).send(items))
    .catch(() => {
      res
        .status(SERVER_ERROR)
        .send({ message: "An error has occurred on the server" });
    });
};

// const updateItem = (req, res) => {
//   const { itemId } = req.params;
//   const { imageURL } = req.body;

//   clothingItem
//     .findByIdAndUpdate(itemId, { $set: { imageURL } })
//     .orFail()
//     .then((item) => res.status(200).send({ data: item }))
//     .catch((err) => {
//       if (err.name === "ValidationError" || err.name === "CastError") {
//         res.status(BAD_REQUEST).send({ message: "The id entered is invalid" });
//       } else if (err.name === DocumentNotFoundError) {
//         res.status(DocumentNotFoundError).send({ message: "The id entered was not found" });
//       } else {
//         res
//           .status(SERVER_ERROR)
//           .send({ message: "An error has occurred on the server" });
//       }
//     });
// };

const deleteItem = (req, res) => {
  const { itemId } = req.params;
  console.log(itemId);
  clothingItem
    .findByIdAndDelete(itemId)
    .orFail()
    .then((item) => res.status(204).send({ item }))
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
const likeItem = (req, res, next) => {
  clothingItem
    .findByIdAndUpdate(
      res.params.itemId,
      { $addToSet: { likes: req.user._id } },
      { new: true }
    )
    .orFail()
    .then((item) => res.status(200).send({ data: item }))
    .catch((e) => {
      if (err.name === "ValidationError" || err.name === "CastError") {
        res
          .status(BAD_REQUEST)
          .send({ message: "The data provided is invalid" });
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

const disLikeItem = (req, res, next) => {
  clothingItem
    .findByIdAndUpdate(
      res.params.itemId,
      { $pull: { likes: req.user._id } },
      { new: true }
    )
    .orFail()
    .then((item) => res.status(200).send({ data: item }))
    .catch((err) => {
      if (err.name === "ValidationError" || err.name === "CastError") {
        res
          .status(BAD_REQUEST)
          .send({ message: "The data provided is invalid" });
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

module.exports = {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  disLikeItem,
};
