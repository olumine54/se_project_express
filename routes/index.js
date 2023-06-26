const router = require("express").Router();
const clothingItem = require("./clothingItems");

router.use("/items", clothingItem);
router.use((res, req) => {
  res.status(500).send({ message: "Router not found" });
});
module.exports = router;
