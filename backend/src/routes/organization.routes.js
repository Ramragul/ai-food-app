import express from "express";

import {
  createOrganization,getMyOrganizations , inviteEmployee, inviteClient,
   getMyInvitations, acceptInvitation, getOrganizationMembers,assignClient , getOrganizationDashboard, getEmployees,
   getClients , getAssignments, getInvitations
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

/* 🔥 ORGANIZATION EMPLOYEES */

router.get(
  "/employees",
  authMiddleware,
  getEmployees
);

/* 🔥 ORGANIZATION CLIENTS */

router.get(
  "/clients",
  authMiddleware,
  getClients
);

/* 🔥 ORGANIZATION ASSIGNMENTS */

router.get(
  "/assignments",
  authMiddleware,
  getAssignments
);

/* 🔥 ORGANIZATION INVITATIONS */

router.get(
  "/invitations",
  authMiddleware,
  getInvitations
);

export default router;