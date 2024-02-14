const express = require("express");
const { verifyToken } = require("../middleware/jwt");
const {
  getOrders,
  intent,
  confirm,
} = require("../controllers/orderController");

const router = express.Router();

router.get("/", verifyToken, getOrders);
router.post("/create-payment-intent/:id", verifyToken, intent);
router.put("/", verifyToken, confirm);

module.exports = router;
