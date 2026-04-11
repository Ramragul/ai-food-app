import express from "express";
import {
  createOrder,
  getUserOrders,
  updateOrderStatus,
  getOrderById,
} from "../controllers/order.controller.js";

const router = express.Router();

// 🍳 Create order
router.post("/", createOrder);

// 📦 Get user orders
router.get("/user/:userId", getUserOrders);

// 🔍 Get single order
router.get("/:orderId", getOrderById);

// 🔄 Update status
router.patch("/:orderId/status", updateOrderStatus);

export default router;