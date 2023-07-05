const router = require("express").Router();
const auth = require("../middlewear/auth");

const { getCurrentUser, updateItem } = require("../controllers/users");

router.get("/me", auth, getCurrentUser);
router.patch("/me", auth, updateItem);

module.exports = router;
