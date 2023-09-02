const router = require("express").Router();
const clothingItem = require("./clothingItems");
const User = require("./users");
const NotFoundError = require("../errors/not-found-err");

router.use("/items", clothingItem);
router.use("/users", User);
router.use(() => {
  throw new NotFoundError("NotFoundError");
});
module.exports = router;
