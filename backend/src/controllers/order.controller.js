import {
    createOrderService,
    getOrdersByUserService,
    updateOrderStatusService,
    getOrderByIdService,
  } from "../services/order.service.js";
  
  // 🍳 Create Order
  export const createOrder = async (req, res) => {
    try {
      const { userId, recipe } = req.body;
  
      if (!userId || !recipe) {
        return res.status(400).json({ error: "Missing data" });
      }
  
      const order = await createOrderService({ userId, recipe });
  
      res.status(201).json({
        message: "Order placed successfully 🍳",
        order,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to create order" });
    }
  };
  
  // 📦 Get User Orders
  export const getUserOrders = async (req, res) => {
    try {
      const { userId } = req.params;
  
      const orders = await getOrdersByUserService(userId);
  
      res.json({ orders });
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch orders" });
    }
  };
  
  // 🔄 Update Status
  export const updateOrderStatus = async (req, res) => {
    try {
      const { orderId } = req.params;
      const { status } = req.body;
  
      await updateOrderStatusService(orderId, status);
  
      res.json({ message: "Status updated 🚀" });
    } catch (err) {
      res.status(500).json({ error: "Failed to update status" });
    }
  };
  
  // 🔍 Get Single Order
  export const getOrderById = async (req, res) => {
    try {
      const { orderId } = req.params;
  
      const order = await getOrderByIdService(orderId);
  
      res.json({ order });
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch order" });
    }
  };