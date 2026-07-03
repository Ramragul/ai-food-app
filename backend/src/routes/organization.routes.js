import express from "express";

import {
  createOrganization
} from "../controllers/organization.controller.js";

import {
  authMiddleware
} from "../middlewares/auth.middleware.js";

const router = express.Router();

/* 🔥 CREATE ORGANIZATION */
router.post(
  "/",
  authMiddleware,
  createOrganization
);

export default router;