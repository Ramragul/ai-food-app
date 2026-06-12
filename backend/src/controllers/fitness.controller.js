import {
  getCategories,
  getGuides,
  getGuideById
}
from "../services/fitness/fitness.service.js";

export const categories =
async (req,res) => {

  const data =
    await getCategories();

  res.json(data);
};

export const guides =
async (req,res) => {

  const data =
    await getGuides(
      req.query.category
    );

  res.json(data);
};

export const guideDetail =
async (req,res) => {

  const data =
    await getGuideById(
      req.params.id
    );

  res.json(data);
};