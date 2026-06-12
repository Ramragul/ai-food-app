import express
from "express";

import {
  categories,
  guides,
  guideDetail
}
from "../controllers/fitness.controller.js";

const router =
  express.Router();

router.get(
  "/categories",
  categories
);

router.get(
  "/guides",
  guides
);

router.get(
  "/guides/:id",
  guideDetail
);

export default router;