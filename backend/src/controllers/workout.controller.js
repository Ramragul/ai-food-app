import {
  getMuscleGroupsService,
  getEquipmentService,
  getExercisesService,
  getExerciseByIdService,
  createExerciseService,
  updateExerciseService
} from "../services/workout.service.js";


/* ======================================================
   MUSCLE GROUPS
====================================================== */

export const getMuscleGroups =
async (req, res) => {

  try {

    const data =
      await getMuscleGroupsService();

    return res.json({
      success: true,
      data
    });

  }

  catch (err) {

    console.error(err);

    return res.status(500).json({
      success: false,
      error: err.message
    });

  }

};


/* ======================================================
   EQUIPMENT
====================================================== */

export const getEquipment =
async (req, res) => {

  try {

    const data =
      await getEquipmentService();

    return res.json({
      success: true,
      data
    });

  }

  catch (err) {

    console.error(err);

    return res.status(500).json({
      success: false,
      error: err.message
    });

  }

};


/* ======================================================
   EXERCISES
====================================================== */

export const getExercises =
async (req, res) => {

  try {

    const data =
      await getExercisesService({
        muscleGroupId:
          req.query.muscleGroupId,

        equipmentId:
          req.query.equipmentId,

        environment:
          req.query.environment,

        trackingType:
          req.query.trackingType,

        difficulty:
          req.query.difficulty,

        search:
          req.query.search
      });


    return res.json({
      success: true,
      data
    });

  }

  catch (err) {

    console.error(err);

    return res.status(400).json({
      success: false,
      error: err.message
    });

  }

};


/* ======================================================
   EXERCISE DETAIL
====================================================== */

export const getExerciseById =
async (req, res) => {

  try {

    const data =
      await getExerciseByIdService(
        Number(req.params.id)
      );

    return res.json({
      success: true,
      data
    });

  }

  catch (err) {

    console.error(err);

    return res.status(404).json({
      success: false,
      error: err.message
    });

  }

};


/* ======================================================
   CREATE EXERCISE
====================================================== */

export const createExercise =
async (req, res) => {

  try {

    const data =
      await createExerciseService(
        req.body
      );

    return res.status(201).json({
      success: true,
      message:
        "Exercise created successfully.",
      data
    });

  }

  catch (err) {

    console.error(err);

    return res.status(400).json({
      success: false,
      error: err.message
    });

  }

};


/* ======================================================
   UPDATE EXERCISE
====================================================== */

export const updateExercise =
async (req, res) => {

  try {

    const data =
      await updateExerciseService(
        Number(req.params.id),
        req.body
      );

    return res.json({
      success: true,
      message:
        "Exercise updated successfully.",
      data
    });

  }

  catch (err) {

    console.error(err);

    return res.status(400).json({
      success: false,
      error: err.message
    });

  }

};