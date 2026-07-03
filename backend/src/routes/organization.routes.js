import express from "express";

import {
  createOrganization,getMyOrganizations
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

/* 🔥 MY ORGANIZATIONS */
router.get(
  "/my",
  authMiddleware,
  getMyOrganizations
);

export default router;