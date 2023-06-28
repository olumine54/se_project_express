const router = require("express").Router();
const clothingItem = require("./clothingItems");
const User = require("./users");

router.use("/items", clothingItem);
router.use("/users", User);
router.use((req, res) => {
  res.status(DocumentNotFoundError).send({ message: "Router not found" });
});
module.exports = router;
