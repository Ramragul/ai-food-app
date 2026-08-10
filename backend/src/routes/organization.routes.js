import express from "express";

import {
  createOrganization,getMyOrganizations , inviteEmployee, inviteClient,
   getMyInvitations, acceptInvitation, getOrganizationMembers,assignClient , getOrganizationDashboard, getEmployees,
   getClients , getAssignments, getInvitations, getClientDetails, transferAssignment, removeAssignment, declineInvitation,
   getWorkspaceMembers, leaveWorkspace, getMyOwnedOrganizations, changeOrganizationMemberRole, removeOrganizationMember, getOrganizationSettings,
updateOrganizationSettings, deleteOrganization
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


router.post(
  "/invitations/:token/decline",
  authMiddleware,
  declineInvitation
);

router.get(
    "/workspace/members",
    authMiddleware,
    getWorkspaceMembers
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


/* ORGANIZATION CLIENT DETAILS */

router.get(

  "/client/:memberId",

  authMiddleware,

  getClientDetails

);

/* 🔥 ORGANIZATION ASSIGNMENTS */

router.get(
  "/assignments",
  authMiddleware,
  getAssignments
);

router.put(
  "/assignments/:assignmentId/transfer",
  authMiddleware,
  transferAssignment
);

router.delete(

  "/assignments/:assignmentId",

  authMiddleware,

  removeAssignment

);

/* 🔥 ORGANIZATION INVITATIONS */

router.get(
  "/invitations",
  authMiddleware,
  getInvitations
);

router.post(
  "/workspace/leave",
  authMiddleware,
  leaveWorkspace
);

router.get(
  "/my-owned",
  authMiddleware,
  getMyOwnedOrganizations
);

/* ---------------------------------------------
   CHANGE MEMBER ROLE
---------------------------------------------- */

router.patch(
  "/members/:memberId/role",
  authMiddleware,
  changeOrganizationMemberRole
);


/* ---------------------------------------------
   REMOVE MEMBER
---------------------------------------------- */

router.patch(
  "/members/:memberId/remove",
  authMiddleware,
  removeOrganizationMember
);



router.get(
  "/settings",
  authMiddleware,
  getOrganizationSettings
);

router.put(
  "/settings",
  authMiddleware,
  updateOrganizationSettings
);

router.delete(
  "/settings",
  authMiddleware,
  deleteOrganization
);



export default router;