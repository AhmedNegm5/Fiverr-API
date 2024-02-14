const express = require("express");
const {
  deleteUser,
  getUser,
  updateUser,
  changePassword,
} = require("../controllers/userController");
const { verifyToken } = require("../middleware/jwt");

const router = express.Router();

router.delete("/:id", verifyToken, deleteUser);
router.get("/:id", verifyToken, getUser);
router.patch("/:id", verifyToken, updateUser);
router.patch("/:id/changePassword", verifyToken, changePassword);

module.exports = router;
