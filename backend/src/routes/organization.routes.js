import express from "express";

import {
  createOrganization,getMyOrganizations , inviteEmployee, inviteClient
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

/* 🔥 INVITE MEMBER */
/* 🔥 INVITE EMPLOYEE */
router.post(
  "/invite-employee",
  authMiddleware,
  inviteEmployee
);

/* 🔥 INVITE CLIENT */
router.post(
  "/invite-client",
  authMiddleware,
  inviteClient
);

export default router;