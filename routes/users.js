const router = require("express").Router();
const auth = require("../middlewear/auth");

const {
  getCurrentUser,
  updateItem,
  createUser,
} = require("../controllers/users");
router.post("/", createUser);
router.get("/me", auth, getCurrentUser);
router.patch("/me", auth, updateItem);

module.exports = router;
