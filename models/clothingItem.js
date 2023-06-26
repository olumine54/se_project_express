const mongoose = require("mongoose");
const validator = require("validator");

const clothingItem = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  weather: {
    type: String,
    required: true,
    enum: ["hot", "warm", "cold"],
  },
  imageURL: {
    type: String,
    required: true,
    validator: {
      validator: (v) => validator.isURL(v),
      message: "Link is not valid",
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
  },
  likes: {
    type: Array,
    required: true,
    ref: "User",
  },
  createdAt: {
    type: Date,
    value: Date.now,
  },
});
module.exports = mongoose.model("clothingItem", clothingItem);
