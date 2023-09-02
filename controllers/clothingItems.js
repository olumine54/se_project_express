const clothingItem = require("../models/clothingItem");
const BadRequestError = require("../errors/bad-request-err");
const NotFoundError = require("../errors/not-found-err");
const ForBiddenError = require("../errors/forbidden-err");

const createItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  clothingItem
    .create({ name, weather, imageUrl, owner })
    .then((item) => {
      res.send({ data: item });
    })
    .catch((err) => {
      if (err.name === "ValidationError" || err.name === "CastError") {
        next(new BadRequestError("The data provided is invalid"));
      } else {
        next(err);
      }
    });
};
const getItems = (req, res, next) => {
  clothingItem
    .find({})
    .then((items) => res.status(200).send(items))
    .catch((err) => {
      next(err);
    });
};
// <---
const deleteItem = (req, res, next) => {
  const { itemId } = req.params;
  clothingItem
    .findById(itemId)
    .orFail()

    .then((item) => {
      if (String(item.owner) !== req.user._id) {
        return next(
          next(
            new ForBiddenError(
              "You do not have the appropriate permissions to delete this item"
            )
          )
        );
      }
      return item.deleteOne().then(() => res.send({ data: item }));
    })
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
const likeItem = (req, res, next) => {
  clothingItem
    .findByIdAndUpdate(
      req.params.itemId,
      { $addToSet: { likes: req.user._id } },
      { new: true }
    )
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

const disLikeItem = (req, res, next) => {
  clothingItem
    .findByIdAndUpdate(
      req.params.itemId,
      { $pull: { likes: req.user._id } },
      { new: true }
    )
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

module.exports = {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  disLikeItem,
};
