import express from "express";

import {
  getMyConsents,
  grantConsent,
  revokeConsent,

} from "../controllers/consent.controller.js";

import {
  authMiddleware
} from "../middlewares/auth.middleware.js";

const router = express.Router();

/* GET MY CONSENTS */

router.get(
  "/",
  authMiddleware,
  getMyConsents
);

/* GRANT */

router.post(
  "/grant",
  authMiddleware,
  grantConsent
);

/* REVOKE */

router.post(
  "/revoke",
  authMiddleware,
  revokeConsent
);




export default router;