const router = require("express").Router();
const auth = require("../middlewear/auth");

const {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  disLikeItem,
} = require("../controllers/clothingItems");

// Create
router.post("/", auth, createItem);

// Read
router.get("/", auth, getItems);

// Delete
router.delete("/:itemId", auth, deleteItem);
// like
router.put("/:itemId/likes", auth, likeItem);
// dislike
router.delete("/:itemId/likes", auth, disLikeItem);

module.exports = router;
