const router = require("express").Router();

const {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  disLikeItem,
} = require("../controllers/clothingItems");

//Create
router.post("/", createItem);

// Read
router.get("/", getItems);

// Update
//router.put("/:itemId", updateItem);

// Delete
router.delete("/:itemId", deleteItem);
//like
router.put("/:itemId/likes", likeItem);
//dislike
router.delete("/:itemId/likes", disLikeItem);

module.exports = router;
