//  Version 1

// import {
//   getMuscleGroupsService,
//   getWorkoutTrainingGoalsService,
//   getEquipmentService,
//   getExercisesService,
//   getExerciseByIdService,
//   createExerciseService,
//   updateExerciseService,
//   getWorkoutTemplatesService,
//   getWorkoutTemplateByIdService,
//   createWorkoutTemplateService,
//   updateWorkoutTemplateService,
//   deleteWorkoutTemplateService,
//   addWorkoutTemplateExerciseService,
//   updateWorkoutTemplateExerciseService,
//   deleteWorkoutTemplateExerciseService,
//   reorderWorkoutTemplateExercisesService,
//   createWorkoutAssignmentService,
//   getMyWorkoutAssignmentsService,
//   getWorkoutAssignmentByIdService
// // getMyWorkoutAssignmentsService,
// // createWorkoutAssignmentService
// } from "../services/workout.service.js";


// /* ======================================================
//    MUSCLE GROUPS
// ====================================================== */

// export const getMuscleGroups = async (req, res) => {
//   try {
//     const data = await getMuscleGroupsService();
//     return res.json({ success: true, data });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ success: false, error: err.message });
//   }
// };


// /* ======================================================
//    EQUIPMENT
// ====================================================== */

// export const getWorkoutTrainingGoals = async (req, res) => {
//   try {
//     const data = await getWorkoutTrainingGoalsService();
//     return res.json({ success: true, data });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ success: false, error: err.message });
//   }
// };


// export const getEquipment = async (req, res) => {
//   try {
//     const data = await getEquipmentService();
//     return res.json({ success: true, data });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ success: false, error: err.message });
//   }
// };


// /* ======================================================
//    EXERCISES
// ====================================================== */

// export const getExercises = async (req, res) => {
//   try {
//     const data = await getExercisesService({
//       muscleGroupId: req.query.muscleGroupId,
//       equipmentId: req.query.equipmentId,
//       environment: req.query.environment,
//       trackingType: req.query.trackingType,
//       difficulty: req.query.difficulty,
//       search: req.query.search
//     });

//     return res.json({ success: true, data });
//   } catch (err) {
//     console.error(err);
//     return res.status(400).json({ success: false, error: err.message });
//   }
// };


// /* ======================================================
//    EXERCISE DETAIL
// ====================================================== */

// export const getExerciseById = async (req, res) => {
//   try {
//     const data = await getExerciseByIdService(Number(req.params.id));
//     return res.json({ success: true, data });
//   } catch (err) {
//     console.error(err);
//     return res.status(404).json({ success: false, error: err.message });
//   }
// };


// /* ======================================================
//    CREATE EXERCISE
// ====================================================== */

// export const createExercise = async (req, res) => {
//   try {
//     const data = await createExerciseService(req.body);
//     return res.status(201).json({
//       success: true,
//       message: "Exercise created successfully.",
//       data
//     });
//   } catch (err) {
//     console.error(err);
//     return res.status(400).json({ success: false, error: err.message });
//   }
// };


// /* ======================================================
//    UPDATE EXERCISE
// ====================================================== */

// export const updateExercise = async (req, res) => {
//   try {
//     const data = await updateExerciseService(
//       Number(req.params.id),
//       req.body
//     );

//     return res.json({
//       success: true,
//       message: "Exercise updated successfully.",
//       data
//     });
//   } catch (err) {
//     console.error(err);
//     return res.status(400).json({ success: false, error: err.message });
//   }
// };


// /* ======================================================
//    WORKOUT TEMPLATES
// ====================================================== */

// export const getWorkoutTemplates = async (req, res) => {
//   try {
//     const organizationId = Number(req.query.organizationId);

//     if (!Number.isInteger(organizationId) || organizationId <= 0) {
//       return res.status(400).json({
//         success: false,
//         error: "organizationId is required."
//       });
//     }

//     const data = await getWorkoutTemplatesService(
//       req.user.id,
//       organizationId
//     );

//     return res.json({ success: true, data });
//   } catch (err) {
//     console.error(err);
//     return res.status(403).json({ success: false, error: err.message });
//   }
// };


// export const getWorkoutTemplateById = async (req, res) => {
//   try {
//     const organizationId = Number(req.query.organizationId);
//     const templateId = Number(req.params.id);

//     if (!Number.isInteger(organizationId) || organizationId <= 0) {
//       return res.status(400).json({ success: false, error: "organizationId is required." });
//     }

//     const data = await getWorkoutTemplateByIdService(
//       req.user.id,
//       organizationId,
//       templateId
//     );

//     return res.json({ success: true, data });
//   } catch (err) {
//     console.error(err);
//     return res.status(404).json({ success: false, error: err.message });
//   }
// };


// export const createWorkoutTemplate = async (req, res) => {
//   try {
//     const data = await createWorkoutTemplateService(
//       req.user.id,
//       req.body
//     );

//     return res.status(201).json({
//       success: true,
//       message: "Workout template created successfully.",
//       data
//     });
//   } catch (err) {
//     console.error(err);
//     return res.status(400).json({ success: false, error: err.message });
//   }
// };


// export const updateWorkoutTemplate = async (req, res) => {
//   try {
//     const organizationId = Number(req.body.organizationId);

//     if (!Number.isInteger(organizationId) || organizationId <= 0) {
//       return res.status(400).json({ success: false, error: "organizationId is required." });
//     }

//     const data = await updateWorkoutTemplateService(
//       req.user.id,
//       organizationId,
//       Number(req.params.id),
//       req.body
//     );

//     return res.json({
//       success: true,
//       message: "Workout template updated successfully.",
//       data
//     });
//   } catch (err) {
//     console.error(err);
//     return res.status(400).json({ success: false, error: err.message });
//   }
// };


// export const deleteWorkoutTemplate = async (req, res) => {
//   try {
//     const organizationId = Number(req.body.organizationId ?? req.query.organizationId);

//     if (!Number.isInteger(organizationId) || organizationId <= 0) {
//       return res.status(400).json({ success: false, error: "organizationId is required." });
//     }

//     const data = await deleteWorkoutTemplateService(
//       req.user.id,
//       organizationId,
//       Number(req.params.id)
//     );

//     return res.json({
//       success: true,
//       message: "Workout template deleted successfully.",
//       data
//     });
//   } catch (err) {
//     console.error(err);
//     return res.status(400).json({ success: false, error: err.message });
//   }
// };


// /* ======================================================
//    TEMPLATE EXERCISES
// ====================================================== */

// export const addWorkoutTemplateExercise = async (req, res) => {
//   try {
//     const organizationId = Number(req.body.organizationId);

//     if (!Number.isInteger(organizationId) || organizationId <= 0) {
//       return res.status(400).json({ success: false, error: "organizationId is required." });
//     }

//     const data = await addWorkoutTemplateExerciseService(
//       req.user.id,
//       organizationId,
//       Number(req.params.id),
//       req.body
//     );

//     return res.status(201).json({
//       success: true,
//       message: "Exercise added to workout template.",
//       data
//     });
//   } catch (err) {
//     console.error(err);
//     return res.status(400).json({ success: false, error: err.message });
//   }
// };


// export const updateWorkoutTemplateExercise = async (req, res) => {
//   try {
//     const organizationId = Number(req.body.organizationId);

//     if (!Number.isInteger(organizationId) || organizationId <= 0) {
//       return res.status(400).json({ success: false, error: "organizationId is required." });
//     }

//     const data = await updateWorkoutTemplateExerciseService(
//       req.user.id,
//       organizationId,
//       Number(req.params.id),
//       Number(req.params.exerciseId),
//       req.body
//     );

//     return res.json({
//       success: true,
//       message: "Workout template exercise updated successfully.",
//       data
//     });
//   } catch (err) {
//     console.error(err);
//     return res.status(400).json({ success: false, error: err.message });
//   }
// };


// export const deleteWorkoutTemplateExercise = async (req, res) => {
//   try {
//     const organizationId = Number(req.body.organizationId ?? req.query.organizationId);

//     if (!Number.isInteger(organizationId) || organizationId <= 0) {
//       return res.status(400).json({ success: false, error: "organizationId is required." });
//     }

//     const data = await deleteWorkoutTemplateExerciseService(
//       req.user.id,
//       organizationId,
//       Number(req.params.id),
//       Number(req.params.exerciseId)
//     );

//     return res.json({
//       success: true,
//       message: "Exercise removed from workout template.",
//       data
//     });
//   } catch (err) {
//     console.error(err);
//     return res.status(400).json({ success: false, error: err.message });
//   }
// };


// export const reorderWorkoutTemplateExercises = async (req, res) => {
//   try {
//     const organizationId = Number(req.body.organizationId);

//     if (!Number.isInteger(organizationId) || organizationId <= 0) {
//       return res.status(400).json({ success: false, error: "organizationId is required." });
//     }

//     const data = await reorderWorkoutTemplateExercisesService(
//       req.user.id,
//       organizationId,
//       Number(req.params.id),
//       req.body.exerciseIds
//     );

//     return res.json({
//       success: true,
//       message: "Workout exercises reordered successfully.",
//       data
//     });
//   } catch (err) {
//     console.error(err);
//     return res.status(400).json({ success: false, error: err.message });
//   }
// };


// /* ======================================================
//    WORKOUT ASSIGNMENTS
// ====================================================== */

// export const createWorkoutAssignment = async (
//   req,
//   res
// ) => {

//   try {

//     const organizationId =
//       Number(req.body.organizationId);


//     if (
//       !Number.isInteger(organizationId) ||
//       organizationId <= 0
//     ) {

//       return res.status(400).json({
//         success: false,
//         error: "organizationId is required."
//       });

//     }


//     const data =
//       await createWorkoutAssignmentService(
//         req.user.id,
//         organizationId,
//         req.body
//       );


//     return res.status(201).json({

//       success: true,

//       message:
//         "Workout assigned successfully.",

//       data

//     });

//   } catch (err) {

//     console.error(err);

//     return res.status(400).json({

//       success: false,

//       error: err.message

//     });

//   }

// };


// /* ======================================================
//    GET MY WORKOUT ASSIGNMENTS
// ====================================================== */

// export const getMyWorkoutAssignments = async (
//   req,
//   res
// ) => {

//   try {

//     const organizationId =
//       Number(req.query.organizationId);


//     if (
//       !Number.isInteger(organizationId) ||
//       organizationId <= 0
//     ) {

//       return res.status(400).json({

//         success: false,

//         error:
//           "organizationId is required."

//       });

//     }


//     const data =
//       await getMyWorkoutAssignmentsService(
//         req.user.id,
//         organizationId
//       );


//     return res.json({

//       success: true,

//       data

//     });

//   } catch (err) {

//     console.error(err);

//     return res.status(400).json({

//       success: false,

//       error: err.message

//     });

//   }

// };


// /* ======================================================
//    WORKOUT ASSIGNMENTS
// ====================================================== */

// export const getWorkoutAssignmentById = async (req, res) => {
//   try {
//     const organizationId = Number(req.query.organizationId);
//     const assignmentId = Number(req.params.id);

//     if (!Number.isInteger(organizationId) || organizationId <= 0) {
//       return res.status(400).json({
//         success: false,
//         error: "organizationId is required."
//       });
//     }

//     if (!Number.isInteger(assignmentId) || assignmentId <= 0) {
//       return res.status(400).json({
//         success: false,
//         error: "Invalid workout assignment id."
//       });
//     }

//     const data = await getWorkoutAssignmentByIdService(
//       req.user.id,
//       organizationId,
//       assignmentId
//     );

//     return res.json({
//       success: true,
//       data
//     });

//   } catch (err) {
//     console.error(err);

//     return res.status(404).json({
//       success: false,
//       error: err.message
//     });
//   }
// };


// Version 2 

import {
  getMuscleGroupsService,
  getWorkoutTrainingGoalsService,
  getEquipmentService,
  getExercisesService,
  getExerciseByIdService,
  createExerciseService,
  updateExerciseService,
  getWorkoutTemplatesService,
  getWorkoutTemplateByIdService,
  createWorkoutTemplateService,
  updateWorkoutTemplateService,
  deleteWorkoutTemplateService,
  addWorkoutTemplateExerciseService,
  updateWorkoutTemplateExerciseService,
  deleteWorkoutTemplateExerciseService,
  reorderWorkoutTemplateExercisesService,
  createWorkoutAssignmentService,
  getMyWorkoutAssignmentsService,
  getWorkoutAssignmentByIdService,
  updateWorkoutAssignmentService,
  deleteWorkoutAssignmentService,
  deleteClientWorkoutAssignmentsService
// getMyWorkoutAssignmentsService,
// createWorkoutAssignmentService
} from "../services/workout.service.js";


/* ======================================================
   MUSCLE GROUPS
====================================================== */

export const getMuscleGroups = async (req, res) => {
  try {
    const data = await getMuscleGroupsService();
    return res.json({ success: true, data });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: err.message });
  }
};


/* ======================================================
   EQUIPMENT
====================================================== */

export const getWorkoutTrainingGoals = async (req, res) => {
  try {
    const data = await getWorkoutTrainingGoalsService();
    return res.json({ success: true, data });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: err.message });
  }
};


export const getEquipment = async (req, res) => {
  try {
    const data = await getEquipmentService();
    return res.json({ success: true, data });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: err.message });
  }
};


/* ======================================================
   EXERCISES
====================================================== */

export const getExercises = async (req, res) => {
  try {
    const data = await getExercisesService({
      muscleGroupId: req.query.muscleGroupId,
      equipmentId: req.query.equipmentId,
      environment: req.query.environment,
      trackingType: req.query.trackingType,
      difficulty: req.query.difficulty,
      search: req.query.search
    });

    return res.json({ success: true, data });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ success: false, error: err.message });
  }
};


/* ======================================================
   EXERCISE DETAIL
====================================================== */

export const getExerciseById = async (req, res) => {
  try {
    const data = await getExerciseByIdService(Number(req.params.id));
    return res.json({ success: true, data });
  } catch (err) {
    console.error(err);
    return res.status(404).json({ success: false, error: err.message });
  }
};


/* ======================================================
   CREATE EXERCISE
====================================================== */

export const createExercise = async (req, res) => {
  try {
    const data = await createExerciseService(req.body);
    return res.status(201).json({
      success: true,
      message: "Exercise created successfully.",
      data
    });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ success: false, error: err.message });
  }
};


/* ======================================================
   UPDATE EXERCISE
====================================================== */

export const updateExercise = async (req, res) => {
  try {
    const data = await updateExerciseService(
      Number(req.params.id),
      req.body
    );

    return res.json({
      success: true,
      message: "Exercise updated successfully.",
      data
    });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ success: false, error: err.message });
  }
};


/* ======================================================
   WORKOUT TEMPLATES
====================================================== */

export const getWorkoutTemplates = async (req, res) => {
  try {
    const organizationId = Number(req.query.organizationId);

    if (!Number.isInteger(organizationId) || organizationId <= 0) {
      return res.status(400).json({
        success: false,
        error: "organizationId is required."
      });
    }

    const data = await getWorkoutTemplatesService(
      req.user.id,
      organizationId
    );

    return res.json({ success: true, data });
  } catch (err) {
    console.error(err);
    return res.status(403).json({ success: false, error: err.message });
  }
};


export const getWorkoutTemplateById = async (req, res) => {
  try {
    const organizationId = Number(req.query.organizationId);
    const templateId = Number(req.params.id);

    if (!Number.isInteger(organizationId) || organizationId <= 0) {
      return res.status(400).json({ success: false, error: "organizationId is required." });
    }

    const data = await getWorkoutTemplateByIdService(
      req.user.id,
      organizationId,
      templateId
    );

    return res.json({ success: true, data });
  } catch (err) {
    console.error(err);
    return res.status(404).json({ success: false, error: err.message });
  }
};


export const createWorkoutTemplate = async (req, res) => {
  try {
    const data = await createWorkoutTemplateService(
      req.user.id,
      req.body
    );

    return res.status(201).json({
      success: true,
      message: "Workout template created successfully.",
      data
    });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ success: false, error: err.message });
  }
};


export const updateWorkoutTemplate = async (req, res) => {
  try {
    const organizationId = Number(req.body.organizationId);

    if (!Number.isInteger(organizationId) || organizationId <= 0) {
      return res.status(400).json({ success: false, error: "organizationId is required." });
    }

    const data = await updateWorkoutTemplateService(
      req.user.id,
      organizationId,
      Number(req.params.id),
      req.body
    );

    return res.json({
      success: true,
      message: "Workout template updated successfully.",
      data
    });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ success: false, error: err.message });
  }
};


export const deleteWorkoutTemplate = async (req, res) => {
  try {
    const organizationId = Number(req.body.organizationId ?? req.query.organizationId);

    if (!Number.isInteger(organizationId) || organizationId <= 0) {
      return res.status(400).json({ success: false, error: "organizationId is required." });
    }

    const data = await deleteWorkoutTemplateService(
      req.user.id,
      organizationId,
      Number(req.params.id)
    );

    return res.json({
      success: true,
      message: "Workout template deleted successfully.",
      data
    });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ success: false, error: err.message });
  }
};


/* ======================================================
   TEMPLATE EXERCISES
====================================================== */

export const addWorkoutTemplateExercise = async (req, res) => {
  try {
    const organizationId = Number(req.body.organizationId);

    if (!Number.isInteger(organizationId) || organizationId <= 0) {
      return res.status(400).json({ success: false, error: "organizationId is required." });
    }

    const data = await addWorkoutTemplateExerciseService(
      req.user.id,
      organizationId,
      Number(req.params.id),
      req.body
    );

    return res.status(201).json({
      success: true,
      message: "Exercise added to workout template.",
      data
    });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ success: false, error: err.message });
  }
};


export const updateWorkoutTemplateExercise = async (req, res) => {
  try {
    const organizationId = Number(req.body.organizationId);

    if (!Number.isInteger(organizationId) || organizationId <= 0) {
      return res.status(400).json({ success: false, error: "organizationId is required." });
    }

    const data = await updateWorkoutTemplateExerciseService(
      req.user.id,
      organizationId,
      Number(req.params.id),
      Number(req.params.exerciseId),
      req.body
    );

    return res.json({
      success: true,
      message: "Workout template exercise updated successfully.",
      data
    });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ success: false, error: err.message });
  }
};


export const deleteWorkoutTemplateExercise = async (req, res) => {
  try {
    const organizationId = Number(req.body.organizationId ?? req.query.organizationId);

    if (!Number.isInteger(organizationId) || organizationId <= 0) {
      return res.status(400).json({ success: false, error: "organizationId is required." });
    }

    const data = await deleteWorkoutTemplateExerciseService(
      req.user.id,
      organizationId,
      Number(req.params.id),
      Number(req.params.exerciseId)
    );

    return res.json({
      success: true,
      message: "Exercise removed from workout template.",
      data
    });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ success: false, error: err.message });
  }
};


export const reorderWorkoutTemplateExercises = async (req, res) => {
  try {
    const organizationId = Number(req.body.organizationId);

    if (!Number.isInteger(organizationId) || organizationId <= 0) {
      return res.status(400).json({ success: false, error: "organizationId is required." });
    }

    const data = await reorderWorkoutTemplateExercisesService(
      req.user.id,
      organizationId,
      Number(req.params.id),
      req.body.exerciseIds
    );

    return res.json({
      success: true,
      message: "Workout exercises reordered successfully.",
      data
    });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ success: false, error: err.message });
  }
};


/* ======================================================
   WORKOUT ASSIGNMENTS
====================================================== */

export const createWorkoutAssignment = async (
  req,
  res
) => {

  try {

    const organizationId =
      Number(req.body.organizationId);


    if (
      !Number.isInteger(organizationId) ||
      organizationId <= 0
    ) {

      return res.status(400).json({
        success: false,
        error: "organizationId is required."
      });

    }


    const data =
      await createWorkoutAssignmentService(
        req.user.id,
        organizationId,
        req.body
      );


    return res.status(201).json({

      success: true,

      message:
        "Workout assigned successfully.",

      data

    });

  } catch (err) {

    console.error(err);

    return res.status(400).json({

      success: false,

      error: err.message

    });

  }

};


/* ======================================================
   UPDATE WORKOUT ASSIGNMENT
====================================================== */

export const updateWorkoutAssignment = async (req, res) => {
  try {
    const organizationId = Number(req.body.organizationId);
    const assignmentId = Number(req.params.id);

    if (!Number.isInteger(organizationId) || organizationId <= 0) {
      return res.status(400).json({
        success: false,
        error: "organizationId is required."
      });
    }

    if (!Number.isInteger(assignmentId) || assignmentId <= 0) {
      return res.status(400).json({
        success: false,
        error: "Invalid workout assignment id."
      });
    }

    const data = await updateWorkoutAssignmentService(
      req.user.id,
      organizationId,
      assignmentId,
      req.body
    );

    return res.json({
      success: true,
      message: "Workout assignment updated successfully.",
      data
    });
  } catch (err) {
    console.error(err);
    return res.status(400).json({
      success: false,
      error: err.message
    });
  }
};


/* ======================================================
   DELETE ONE WORKOUT ASSIGNMENT
====================================================== */

export const deleteWorkoutAssignment = async (req, res) => {
  try {
    const organizationId = Number(
      req.query.organizationId ?? req.body.organizationId
    );
    const assignmentId = Number(req.params.id);

    if (!Number.isInteger(organizationId) || organizationId <= 0) {
      return res.status(400).json({
        success: false,
        error: "organizationId is required."
      });
    }

    if (!Number.isInteger(assignmentId) || assignmentId <= 0) {
      return res.status(400).json({
        success: false,
        error: "Invalid workout assignment id."
      });
    }

    const data = await deleteWorkoutAssignmentService(
      req.user.id,
      organizationId,
      assignmentId
    );

    return res.json({
      success: true,
      message: "Workout assignment removed successfully.",
      data
    });
  } catch (err) {
    console.error(err);
    return res.status(400).json({
      success: false,
      error: err.message
    });
  }
};


/* ======================================================
   DELETE ALL ACTIVE WORKOUT ASSIGNMENTS FOR A CLIENT
====================================================== */

export const deleteClientWorkoutAssignments = async (req, res) => {
  try {
    const organizationId = Number(req.query.organizationId);
    const clientMemberId = Number(req.params.clientMemberId);

    if (!Number.isInteger(organizationId) || organizationId <= 0) {
      return res.status(400).json({
        success: false,
        error: "organizationId is required."
      });
    }

    if (!Number.isInteger(clientMemberId) || clientMemberId <= 0) {
      return res.status(400).json({
        success: false,
        error: "Invalid client member id."
      });
    }

    const data = await deleteClientWorkoutAssignmentsService(
      req.user.id,
      organizationId,
      clientMemberId
    );

    return res.json({
      success: true,
      message: "All active workout assignments removed successfully.",
      data
    });
  } catch (err) {
    console.error(err);
    return res.status(400).json({
      success: false,
      error: err.message
    });
  }
};


/* ======================================================
   GET MY WORKOUT ASSIGNMENTS
====================================================== */

export const getMyWorkoutAssignments = async (
  req,
  res
) => {

  try {

    const organizationId =
      Number(req.query.organizationId);


    if (
      !Number.isInteger(organizationId) ||
      organizationId <= 0
    ) {

      return res.status(400).json({

        success: false,

        error:
          "organizationId is required."

      });

    }


    const data =
      await getMyWorkoutAssignmentsService(
        req.user.id,
        organizationId
      );


    return res.json({

      success: true,

      data

    });

  } catch (err) {

    console.error(err);

    return res.status(400).json({

      success: false,

      error: err.message

    });

  }

};


/* ======================================================
   WORKOUT ASSIGNMENTS
====================================================== */

export const getWorkoutAssignmentById = async (req, res) => {
  try {
    const organizationId = Number(req.query.organizationId);
    const assignmentId = Number(req.params.id);

    if (!Number.isInteger(organizationId) || organizationId <= 0) {
      return res.status(400).json({
        success: false,
        error: "organizationId is required."
      });
    }

    if (!Number.isInteger(assignmentId) || assignmentId <= 0) {
      return res.status(400).json({
        success: false,
        error: "Invalid workout assignment id."
      });
    }

    const data = await getWorkoutAssignmentByIdService(
      req.user.id,
      organizationId,
      assignmentId
    );

    return res.json({
      success: true,
      data
    });

  } catch (err) {
    console.error(err);

    return res.status(404).json({
      success: false,
      error: err.message
    });
  }
};


