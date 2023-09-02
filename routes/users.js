const router = require("express").Router();
const auth = require("../middlewear/auth");
const { getCurrentUser, updateItem } = require("../controllers/users");
const { validateProfileAvatar } = require("../middlewear/validation");

router.get("/me", auth, getCurrentUser);
router.patch("/me", auth, validateProfileAvatar, updateItem);

module.exports = router;
