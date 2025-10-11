import express from "express";
import { createOrder, getOrders } from "../controllers/order.controller.js";
import { userProtection } from "../middlewares/user.middleware.js";

const router = express.Router();

router.post("/create", userProtection, createOrder);
router.get("/orders",userProtection, getOrders);

export default router;
