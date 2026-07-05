import express from "express";

import {
  createOrganization,getMyOrganizations , inviteEmployee, inviteClient,
   getMyInvitations, acceptInvitation, getOrganizationMembers,assignClient , getOrganizationDashboard
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

/* 🔥 MY INVITATIONS */
router.get(
  "/invitations/me",
  authMiddleware,
  getMyInvitations
);

/* 🔥 ACCEPT INVITATION */
router.post(
  "/invitations/:token/accept",
  authMiddleware,
  acceptInvitation
);

/* 🔥 GET ORGANIZATION MEMBERS */
router.get(
  "/:organizationId/members",
  authMiddleware,
  getOrganizationMembers
);

/* 🔥 ASSIGN CLIENT */

router.post(
  "/assign-client",
  authMiddleware,
  assignClient
);

/* 🔥 ORGANIZATION DASHBOARD */

router.get(
  "/dashboard",
  authMiddleware,
  getOrganizationDashboard
);


export default router;