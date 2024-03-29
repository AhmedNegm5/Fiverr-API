const express = require("express");
const {
  createReview,
  getReviews,
  deleteReview,
  updateReview,
} = require("../controllers/reviewController");
const { verifyToken } = require("../middleware/jwt");

const router = express.Router();

router.post("/", verifyToken, createReview);
router.get("/:gigId", getReviews);
router.delete("/:id", deleteReview);
router.patch("/:id", verifyToken, updateReview);

module.exports = router;
