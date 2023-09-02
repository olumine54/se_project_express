const router = require("express").Router();
const auth = require("../middlewear/auth");
const { validateCardItem, validateId } = require("../middlewear/validation");

const {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  disLikeItem,
} = require("../controllers/clothingItems");

// Create
router.post("/", auth, validateCardItem, createItem);

// Read
router.get("/", getItems);

// Delete
router.delete("/:itemId", auth, validateId, deleteItem);
// like
router.put("/:itemId/likes", auth, validateId, likeItem);
// dislike
router.delete("/:itemId/likes", auth, validateId, disLikeItem);

module.exports = router;
