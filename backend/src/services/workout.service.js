// Version 1


// import pool from "../db/connection.js";



// /* ======================================================
//    MUSCLE GROUPS
// ====================================================== */

// export const getMuscleGroupsService = async () => {

//   const result = await pool.query(`
//     SELECT
//       id,
//       name,
//       description,
//       display_order
//     FROM workout_muscle_groups
//     WHERE is_active = true
//     ORDER BY display_order ASC, name ASC
//   `);

//   return result.rows;
// };


// /* ======================================================
//    EQUIPMENT
// ====================================================== */

// export const getEquipmentService = async () => {

//   const result = await pool.query(`
//     SELECT
//       id,
//       name,
//       description
//     FROM workout_equipment
//     WHERE is_active = true
//     ORDER BY name ASC
//   `);

//   return result.rows;
// };


// /* ======================================================
//    EXERCISES
// ====================================================== */

// export const getExercisesService = async (filters = {}) => {

//   const {
//     muscleGroupId,
//     equipmentId,
//     environment,
//     trackingType,
//     difficulty,
//     search
//   } = filters;


//   const values = [];

//   const conditions = [
//     "e.is_active = true"
//   ];


//   /* ---------------------------------------------
//      MUSCLE GROUP
//   ---------------------------------------------- */

//   if (muscleGroupId) {

//     values.push(Number(muscleGroupId));

//     conditions.push(`
//       EXISTS (
//         SELECT 1
//         FROM exercise_muscles em_filter
//         WHERE em_filter.exercise_id = e.id
//           AND em_filter.muscle_group_id = $${values.length}
//       )
//     `);

//   }


//   /* ---------------------------------------------
//      EQUIPMENT
//   ---------------------------------------------- */

//   if (equipmentId) {

//     values.push(Number(equipmentId));

//     conditions.push(`
//       EXISTS (
//         SELECT 1
//         FROM exercise_equipment ee_filter
//         WHERE ee_filter.exercise_id = e.id
//           AND ee_filter.equipment_id = $${values.length}
//       )
//     `);

//   }


//   /* ---------------------------------------------
//      ENVIRONMENT
//   ---------------------------------------------- */

//   if (environment) {

//     const normalizedEnvironment =
//       String(environment).toUpperCase();

//     if (
//       !["HOME", "GYM", "BOTH"].includes(
//         normalizedEnvironment
//       )
//     ) {
//       throw new Error(
//         "Invalid environment."
//       );
//     }

//     values.push(normalizedEnvironment);

//     conditions.push(`
//       e.environment = $${values.length}
//     `);

//   }


//   /* ---------------------------------------------
//      TRACKING TYPE
//   ---------------------------------------------- */

//   if (trackingType) {

//     const normalizedTrackingType =
//       String(trackingType).toUpperCase();

//     const allowedTrackingTypes = [
//       "REPS_WEIGHT",
//       "REPS_ONLY",
//       "DURATION",
//       "DISTANCE",
//       "REPS_DURATION"
//     ];

//     if (
//       !allowedTrackingTypes.includes(
//         normalizedTrackingType
//       )
//     ) {
//       throw new Error(
//         "Invalid tracking type."
//       );
//     }

//     values.push(normalizedTrackingType);

//     conditions.push(`
//       e.tracking_type = $${values.length}
//     `);

//   }


//   /* ---------------------------------------------
//      DIFFICULTY
//   ---------------------------------------------- */

//   if (difficulty) {

//     values.push(
//       String(difficulty).toUpperCase()
//     );

//     conditions.push(`
//       UPPER(COALESCE(e.difficulty, '')) =
//       $${values.length}
//     `);

//   }


//   /* ---------------------------------------------
//      SEARCH
//   ---------------------------------------------- */

//   if (search?.trim()) {

//     values.push(
//       `%${search.trim()}%`
//     );

//     conditions.push(`
//       (
//         e.name ILIKE $${values.length}
//         OR e.description ILIKE $${values.length}
//       )
//     `);

//   }


//   const query = `

//     SELECT

//       e.id,
//       e.name,
//       e.description,

//       e.primary_muscle_group_id,

//       mg.name AS primary_muscle_group,

//       e.movement_pattern,
//       e.tracking_type,
//       e.difficulty,
//       e.instructions,

//       e.image_url,
//       e.video_url,

//       e.environment,

//       e.is_active,

//       e.created_at,
//       e.updated_at

//     FROM exercises e

//     LEFT JOIN workout_muscle_groups mg
//       ON mg.id = e.primary_muscle_group_id

//     WHERE
//       ${conditions.join(" AND ")}

//     ORDER BY
//       mg.display_order ASC NULLS LAST,
//       e.name ASC

//   `;


//   const result =
//     await pool.query(
//       query,
//       values
//     );


//   return result.rows;

// };


// /* ======================================================
//    EXERCISE DETAIL
// ====================================================== */

// export const getExerciseByIdService = async (
//   exerciseId
// ) => {

//   const exerciseResult =
//     await pool.query(
//       `
//       SELECT

//         e.id,
//         e.name,
//         e.description,

//         e.primary_muscle_group_id,

//         mg.name AS primary_muscle_group,

//         e.movement_pattern,
//         e.tracking_type,
//         e.difficulty,
//         e.instructions,

//         e.image_url,
//         e.video_url,

//         e.environment,

//         e.is_active,

//         e.created_at,
//         e.updated_at

//       FROM exercises e

//       LEFT JOIN workout_muscle_groups mg
//         ON mg.id = e.primary_muscle_group_id

//       WHERE
//         e.id = $1
//         AND e.is_active = true

//       LIMIT 1
//       `,
//       [exerciseId]
//     );


//   if (!exerciseResult.rows.length) {

//     throw new Error(
//       "Exercise not found."
//     );

//   }


//   const exercise =
//     exerciseResult.rows[0];


//   /* ---------------------------------------------
//      MUSCLES
//   ---------------------------------------------- */

//   const musclesResult =
//     await pool.query(
//       `
//       SELECT

//         em.muscle_group_id,
//         mg.name,
//         em.role

//       FROM exercise_muscles em

//       INNER JOIN workout_muscle_groups mg
//         ON mg.id = em.muscle_group_id

//       WHERE
//         em.exercise_id = $1

//       ORDER BY
//         CASE
//           WHEN em.role = 'PRIMARY'
//           THEN 1
//           ELSE 2
//         END,
//         mg.display_order ASC
//       `,
//       [exerciseId]
//     );


//   /* ---------------------------------------------
//      EQUIPMENT
//   ---------------------------------------------- */

//   const equipmentResult =
//     await pool.query(
//       `
//       SELECT

//         ee.equipment_id,
//         eq.name,
//         ee.is_required

//       FROM exercise_equipment ee

//       INNER JOIN workout_equipment eq
//         ON eq.id = ee.equipment_id

//       WHERE
//         ee.exercise_id = $1

//       ORDER BY
//         eq.name ASC
//       `,
//       [exerciseId]
//     );


//   /* ---------------------------------------------
//      MEDIA
//   ---------------------------------------------- */

//   const mediaResult =
//     await pool.query(
//       `
//       SELECT

//         id,
//         media_type,
//         media_url,
//         title,
//         display_order

//       FROM exercise_media

//       WHERE
//         exercise_id = $1
//         AND is_active = true

//       ORDER BY
//         display_order ASC,
//         id ASC
//       `,
//       [exerciseId]
//     );


//   return {

//     ...exercise,

//     muscles:
//       musclesResult.rows,

//     equipment:
//       equipmentResult.rows,

//     media:
//       mediaResult.rows

//   };

// };


// /* ======================================================
//    CREATE EXERCISE
// ====================================================== */

// export const createExerciseService = async (
//   data
// ) => {

//   const client =
//     await pool.connect();


//   try {

//     await client.query("BEGIN");


//     const {
//       name,
//       description,
//       primaryMuscleGroupId,
//       secondaryMuscleGroupIds = [],
//       equipmentIds = [],
//       movementPattern,
//       trackingType,
//       difficulty,
//       instructions,
//       imageUrl,
//       videoUrl,
//       environment = "BOTH"
//     } = data;


//     if (!name?.trim()) {

//       throw new Error(
//         "Exercise name is required."
//       );

//     }


//     if (!trackingType) {

//       throw new Error(
//         "Tracking type is required."
//       );

//     }


//     const allowedTrackingTypes = [
//       "REPS_WEIGHT",
//       "REPS_ONLY",
//       "DURATION",
//       "DISTANCE",
//       "REPS_DURATION"
//     ];


//     if (
//       !allowedTrackingTypes.includes(
//         trackingType
//       )
//     ) {

//       throw new Error(
//         "Invalid tracking type."
//       );

//     }


//     const allowedEnvironments = [
//       "HOME",
//       "GYM",
//       "BOTH"
//     ];


//     if (
//       !allowedEnvironments.includes(
//         environment
//       )
//     ) {

//       throw new Error(
//         "Invalid environment."
//       );

//     }


//     /* ---------------------------------------------
//        CREATE EXERCISE
//     ---------------------------------------------- */

//     const exerciseResult =
//       await client.query(
//         `
//         INSERT INTO exercises (

//           name,
//           description,
//           primary_muscle_group_id,
//           movement_pattern,
//           tracking_type,
//           difficulty,
//           instructions,
//           image_url,
//           video_url,
//           environment

//         )
//         VALUES (
//           $1,$2,$3,$4,$5,$6,$7,$8,$9,$10
//         )
//         RETURNING *
//         `,
//         [
//           name.trim(),
//           description || null,
//           primaryMuscleGroupId || null,
//           movementPattern || null,
//           trackingType,
//           difficulty || null,
//           instructions || null,
//           imageUrl || null,
//           videoUrl || null,
//           environment
//         ]
//       );


//     const exercise =
//       exerciseResult.rows[0];


//     /* ---------------------------------------------
//        PRIMARY MUSCLE
//     ---------------------------------------------- */

//     if (primaryMuscleGroupId) {

//       await client.query(
//         `
//         INSERT INTO exercise_muscles (
//           exercise_id,
//           muscle_group_id,
//           role
//         )
//         VALUES ($1,$2,'PRIMARY')
//         ON CONFLICT DO NOTHING
//         `,
//         [
//           exercise.id,
//           primaryMuscleGroupId
//         ]
//       );

//     }


//     /* ---------------------------------------------
//        SECONDARY MUSCLES
//     ---------------------------------------------- */

//     for (
//       const muscleGroupId
//       of secondaryMuscleGroupIds
//     ) {

//       if (
//         Number(muscleGroupId) ===
//         Number(primaryMuscleGroupId)
//       ) {
//         continue;
//       }

//       await client.query(
//         `
//         INSERT INTO exercise_muscles (
//           exercise_id,
//           muscle_group_id,
//           role
//         )
//         VALUES ($1,$2,'SECONDARY')
//         ON CONFLICT DO NOTHING
//         `,
//         [
//           exercise.id,
//           muscleGroupId
//         ]
//       );

//     }


//     /* ---------------------------------------------
//        EQUIPMENT
//     ---------------------------------------------- */

//     for (
//       const equipmentId
//       of equipmentIds
//     ) {

//       await client.query(
//         `
//         INSERT INTO exercise_equipment (
//           exercise_id,
//           equipment_id,
//           is_required
//         )
//         VALUES ($1,$2,true)
//         ON CONFLICT DO NOTHING
//         `,
//         [
//           exercise.id,
//           equipmentId
//         ]
//       );

//     }


//     await client.query("COMMIT");


//     return getExerciseByIdService(
//       exercise.id
//     );

//   }

//   catch (err) {

//     await client.query(
//       "ROLLBACK"
//     );

//     throw err;

//   }

//   finally {

//     client.release();

//   }

// };


// /* ======================================================
//    UPDATE EXERCISE
// ====================================================== */

// export const updateExerciseService = async (
//   exerciseId,
//   data
// ) => {

//   const client =
//     await pool.connect();


//   try {

//     await client.query("BEGIN");


//     const {
//       name,
//       description,
//       primaryMuscleGroupId,
//       secondaryMuscleGroupIds,
//       equipmentIds,
//       movementPattern,
//       trackingType,
//       difficulty,
//       instructions,
//       imageUrl,
//       videoUrl,
//       environment
//     } = data;


//     const existing =
//       await client.query(
//         `
//         SELECT id
//         FROM exercises
//         WHERE id = $1
//         LIMIT 1
//         `,
//         [exerciseId]
//       );


//     if (!existing.rows.length) {

//       throw new Error(
//         "Exercise not found."
//       );

//     }


//     const allowedTrackingTypes = [
//       "REPS_WEIGHT",
//       "REPS_ONLY",
//       "DURATION",
//       "DISTANCE",
//       "REPS_DURATION"
//     ];


//     if (
//       trackingType &&
//       !allowedTrackingTypes.includes(
//         trackingType
//       )
//     ) {

//       throw new Error(
//         "Invalid tracking type."
//       );

//     }


//     if (
//       environment &&
//       !["HOME", "GYM", "BOTH"].includes(
//         environment
//       )
//     ) {

//       throw new Error(
//         "Invalid environment."
//       );

//     }


//     await client.query(
//       `
//       UPDATE exercises

//       SET

//         name =
//           COALESCE($1, name),

//         description =
//           COALESCE($2, description),

//         primary_muscle_group_id =
//           COALESCE($3, primary_muscle_group_id),

//         movement_pattern =
//           COALESCE($4, movement_pattern),

//         tracking_type =
//           COALESCE($5, tracking_type),

//         difficulty =
//           COALESCE($6, difficulty),

//         instructions =
//           COALESCE($7, instructions),

//         image_url =
//           COALESCE($8, image_url),

//         video_url =
//           COALESCE($9, video_url),

//         environment =
//           COALESCE($10, environment),

//         updated_at = NOW()

//       WHERE
//         id = $11
//       `,
//       [
//         name,
//         description,
//         primaryMuscleGroupId,
//         movementPattern,
//         trackingType,
//         difficulty,
//         instructions,
//         imageUrl,
//         videoUrl,
//         environment,
//         exerciseId
//       ]
//     );


//     /* ---------------------------------------------
//        REBUILD MUSCLE MAPPING
//     ---------------------------------------------- */

//     if (
//       primaryMuscleGroupId !== undefined ||
//       secondaryMuscleGroupIds !== undefined
//     ) {

//       await client.query(
//         `
//         DELETE FROM exercise_muscles
//         WHERE exercise_id = $1
//         `,
//         [exerciseId]
//       );


//       if (primaryMuscleGroupId) {

//         await client.query(
//           `
//           INSERT INTO exercise_muscles (
//             exercise_id,
//             muscle_group_id,
//             role
//           )
//           VALUES ($1,$2,'PRIMARY')
//           `,
//           [
//             exerciseId,
//             primaryMuscleGroupId
//           ]
//         );

//       }


//       for (
//         const muscleGroupId
//         of secondaryMuscleGroupIds || []
//       ) {

//         if (
//           Number(muscleGroupId) ===
//           Number(primaryMuscleGroupId)
//         ) {
//           continue;
//         }

//         await client.query(
//           `
//           INSERT INTO exercise_muscles (
//             exercise_id,
//             muscle_group_id,
//             role
//           )
//           VALUES ($1,$2,'SECONDARY')
//           ON CONFLICT DO NOTHING
//           `,
//           [
//             exerciseId,
//             muscleGroupId
//           ]
//         );

//       }

//     }


//     /* ---------------------------------------------
//        REBUILD EQUIPMENT
//     ---------------------------------------------- */

//     if (
//       equipmentIds !== undefined
//     ) {

//       await client.query(
//         `
//         DELETE FROM exercise_equipment
//         WHERE exercise_id = $1
//         `,
//         [exerciseId]
//       );


//       for (
//         const equipmentId
//         of equipmentIds
//       ) {

//         await client.query(
//           `
//           INSERT INTO exercise_equipment (
//             exercise_id,
//             equipment_id,
//             is_required
//           )
//           VALUES ($1,$2,true)
//           ON CONFLICT DO NOTHING
//           `,
//           [
//             exerciseId,
//             equipmentId
//           ]
//         );

//       }

//     }


//     await client.query("COMMIT");


//     return getExerciseByIdService(
//       exerciseId
//     );

//   }

//   catch (err) {

//     await client.query(
//       "ROLLBACK"
//     );

//     throw err;

//   }

//   finally {

//     client.release();

//   }

// };



// Version 2

import pool from "../db/connection.js";



/* ======================================================
   MUSCLE GROUPS
====================================================== */

export const getMuscleGroupsService = async () => {

  const result = await pool.query(`
    SELECT
      id,
      name,
      description,
      display_order
    FROM workout_muscle_groups
    WHERE is_active = true
    ORDER BY display_order ASC, name ASC
  `);

  return result.rows;
};


/* ======================================================
   EQUIPMENT
====================================================== */

export const getEquipmentService = async () => {

  const result = await pool.query(`
    SELECT
      id,
      name,
      description
    FROM workout_equipment
    WHERE is_active = true
    ORDER BY name ASC
  `);

  return result.rows;
};


/* ======================================================
   TRAINING GOALS
====================================================== */

export const getWorkoutTrainingGoalsService = async () => {

  const result = await pool.query(`
    SELECT
      id,
      goal_key,
      name,
      description,
      display_order
    FROM workout_training_goals
    WHERE is_active = true
    ORDER BY display_order ASC, name ASC
  `);

  return result.rows;
};


/* ======================================================
   EXERCISES
====================================================== */

export const getExercisesService = async (filters = {}) => {

  const {
    muscleGroupId,
    equipmentId,
    environment,
    trackingType,
    difficulty,
    search
  } = filters;


  const values = [];

  const conditions = [
    "e.is_active = true"
  ];


  /* ---------------------------------------------
     MUSCLE GROUP
  ---------------------------------------------- */

  if (muscleGroupId) {

    values.push(Number(muscleGroupId));

    conditions.push(`
      EXISTS (
        SELECT 1
        FROM exercise_muscles em_filter
        WHERE em_filter.exercise_id = e.id
          AND em_filter.muscle_group_id = $${values.length}
      )
    `);

  }


  /* ---------------------------------------------
     EQUIPMENT
  ---------------------------------------------- */

  if (equipmentId) {

    values.push(Number(equipmentId));

    conditions.push(`
      EXISTS (
        SELECT 1
        FROM exercise_equipment ee_filter
        WHERE ee_filter.exercise_id = e.id
          AND ee_filter.equipment_id = $${values.length}
      )
    `);

  }


  /* ---------------------------------------------
     ENVIRONMENT
  ---------------------------------------------- */

  if (environment) {

    const normalizedEnvironment =
      String(environment).toUpperCase();

    if (
      !["HOME", "GYM", "BOTH"].includes(
        normalizedEnvironment
      )
    ) {
      throw new Error(
        "Invalid environment."
      );
    }

    values.push(normalizedEnvironment);

    conditions.push(`
      e.environment = $${values.length}
    `);

  }


  /* ---------------------------------------------
     TRACKING TYPE
  ---------------------------------------------- */

  if (trackingType) {

    const normalizedTrackingType =
      String(trackingType).toUpperCase();

    const allowedTrackingTypes = [
      "REPS_WEIGHT",
      "REPS_ONLY",
      "DURATION",
      "DISTANCE",
      "REPS_DURATION"
    ];

    if (
      !allowedTrackingTypes.includes(
        normalizedTrackingType
      )
    ) {
      throw new Error(
        "Invalid tracking type."
      );
    }

    values.push(normalizedTrackingType);

    conditions.push(`
      e.tracking_type = $${values.length}
    `);

  }


  /* ---------------------------------------------
     DIFFICULTY
  ---------------------------------------------- */

  if (difficulty) {

    values.push(
      String(difficulty).toUpperCase()
    );

    conditions.push(`
      UPPER(COALESCE(e.difficulty, '')) =
      $${values.length}
    `);

  }


  /* ---------------------------------------------
     SEARCH
  ---------------------------------------------- */

  if (search?.trim()) {

    values.push(
      `%${search.trim()}%`
    );

    conditions.push(`
      (
        e.name ILIKE $${values.length}
        OR e.description ILIKE $${values.length}
      )
    `);

  }


  const query = `

    SELECT

      e.id,
      e.name,
      e.description,

      e.primary_muscle_group_id,

      mg.name AS primary_muscle_group,

      e.movement_pattern,
      e.tracking_type,
      e.difficulty,
      e.instructions,

      e.image_url,
      e.video_url,

      e.environment,

      e.is_active,

      e.created_at,
      e.updated_at

    FROM exercises e

    LEFT JOIN workout_muscle_groups mg
      ON mg.id = e.primary_muscle_group_id

    WHERE
      ${conditions.join(" AND ")}

    ORDER BY
      mg.display_order ASC NULLS LAST,
      e.name ASC

  `;


  const result =
    await pool.query(
      query,
      values
    );


  return result.rows;

};


/* ======================================================
   EXERCISE DETAIL
====================================================== */

export const getExerciseByIdService = async (
  exerciseId
) => {

  const exerciseResult =
    await pool.query(
      `
      SELECT

        e.id,
        e.name,
        e.description,

        e.primary_muscle_group_id,

        mg.name AS primary_muscle_group,

        e.movement_pattern,
        e.tracking_type,
        e.difficulty,
        e.instructions,

        e.image_url,
        e.video_url,

        e.environment,

        e.is_active,

        e.created_at,
        e.updated_at

      FROM exercises e

      LEFT JOIN workout_muscle_groups mg
        ON mg.id = e.primary_muscle_group_id

      WHERE
        e.id = $1
        AND e.is_active = true

      LIMIT 1
      `,
      [exerciseId]
    );


  if (!exerciseResult.rows.length) {

    throw new Error(
      "Exercise not found."
    );

  }


  const exercise =
    exerciseResult.rows[0];


  /* ---------------------------------------------
     MUSCLES
  ---------------------------------------------- */

  const musclesResult =
    await pool.query(
      `
      SELECT

        em.muscle_group_id,
        mg.name,
        em.role

      FROM exercise_muscles em

      INNER JOIN workout_muscle_groups mg
        ON mg.id = em.muscle_group_id

      WHERE
        em.exercise_id = $1

      ORDER BY
        CASE
          WHEN em.role = 'PRIMARY'
          THEN 1
          ELSE 2
        END,
        mg.display_order ASC
      `,
      [exerciseId]
    );


  /* ---------------------------------------------
     EQUIPMENT
  ---------------------------------------------- */

  const equipmentResult =
    await pool.query(
      `
      SELECT

        ee.equipment_id,
        eq.name,
        ee.is_required

      FROM exercise_equipment ee

      INNER JOIN workout_equipment eq
        ON eq.id = ee.equipment_id

      WHERE
        ee.exercise_id = $1

      ORDER BY
        eq.name ASC
      `,
      [exerciseId]
    );


  /* ---------------------------------------------
     MEDIA
  ---------------------------------------------- */

  const mediaResult =
    await pool.query(
      `
      SELECT

        id,
        media_type,
        media_url,
        title,
        display_order

      FROM exercise_media

      WHERE
        exercise_id = $1
        AND is_active = true

      ORDER BY
        display_order ASC,
        id ASC
      `,
      [exerciseId]
    );


  return {

    ...exercise,

    muscles:
      musclesResult.rows,

    equipment:
      equipmentResult.rows,

    media:
      mediaResult.rows

  };

};


/* ======================================================
   CREATE EXERCISE
====================================================== */

export const createExerciseService = async (
  data
) => {

  const client =
    await pool.connect();


  try {

    await client.query("BEGIN");


    const {
      name,
      description,
      primaryMuscleGroupId,
      secondaryMuscleGroupIds = [],
      equipmentIds = [],
      movementPattern,
      trackingType,
      difficulty,
      instructions,
      imageUrl,
      videoUrl,
      environment = "BOTH"
    } = data;


    if (!name?.trim()) {

      throw new Error(
        "Exercise name is required."
      );

    }


    if (!trackingType) {

      throw new Error(
        "Tracking type is required."
      );

    }


    const allowedTrackingTypes = [
      "REPS_WEIGHT",
      "REPS_ONLY",
      "DURATION",
      "DISTANCE",
      "REPS_DURATION"
    ];


    if (
      !allowedTrackingTypes.includes(
        trackingType
      )
    ) {

      throw new Error(
        "Invalid tracking type."
      );

    }


    const allowedEnvironments = [
      "HOME",
      "GYM",
      "BOTH"
    ];


    if (
      !allowedEnvironments.includes(
        environment
      )
    ) {

      throw new Error(
        "Invalid environment."
      );

    }


    /* ---------------------------------------------
       CREATE EXERCISE
    ---------------------------------------------- */

    const exerciseResult =
      await client.query(
        `
        INSERT INTO exercises (

          name,
          description,
          primary_muscle_group_id,
          movement_pattern,
          tracking_type,
          difficulty,
          instructions,
          image_url,
          video_url,
          environment

        )
        VALUES (
          $1,$2,$3,$4,$5,$6,$7,$8,$9,$10
        )
        RETURNING *
        `,
        [
          name.trim(),
          description || null,
          primaryMuscleGroupId || null,
          movementPattern || null,
          trackingType,
          difficulty || null,
          instructions || null,
          imageUrl || null,
          videoUrl || null,
          environment
        ]
      );


    const exercise =
      exerciseResult.rows[0];


    /* ---------------------------------------------
       PRIMARY MUSCLE
    ---------------------------------------------- */

    if (primaryMuscleGroupId) {

      await client.query(
        `
        INSERT INTO exercise_muscles (
          exercise_id,
          muscle_group_id,
          role
        )
        VALUES ($1,$2,'PRIMARY')
        ON CONFLICT DO NOTHING
        `,
        [
          exercise.id,
          primaryMuscleGroupId
        ]
      );

    }


    /* ---------------------------------------------
       SECONDARY MUSCLES
    ---------------------------------------------- */

    for (
      const muscleGroupId
      of secondaryMuscleGroupIds
    ) {

      if (
        Number(muscleGroupId) ===
        Number(primaryMuscleGroupId)
      ) {
        continue;
      }

      await client.query(
        `
        INSERT INTO exercise_muscles (
          exercise_id,
          muscle_group_id,
          role
        )
        VALUES ($1,$2,'SECONDARY')
        ON CONFLICT DO NOTHING
        `,
        [
          exercise.id,
          muscleGroupId
        ]
      );

    }


    /* ---------------------------------------------
       EQUIPMENT
    ---------------------------------------------- */

    for (
      const equipmentId
      of equipmentIds
    ) {

      await client.query(
        `
        INSERT INTO exercise_equipment (
          exercise_id,
          equipment_id,
          is_required
        )
        VALUES ($1,$2,true)
        ON CONFLICT DO NOTHING
        `,
        [
          exercise.id,
          equipmentId
        ]
      );

    }


    await client.query("COMMIT");


    return getExerciseByIdService(
      exercise.id
    );

  }

  catch (err) {

    await client.query(
      "ROLLBACK"
    );

    throw err;

  }

  finally {

    client.release();

  }

};


/* ======================================================
   UPDATE EXERCISE
====================================================== */

export const updateExerciseService = async (
  exerciseId,
  data
) => {

  const client =
    await pool.connect();


  try {

    await client.query("BEGIN");


    const {
      name,
      description,
      primaryMuscleGroupId,
      secondaryMuscleGroupIds,
      equipmentIds,
      movementPattern,
      trackingType,
      difficulty,
      instructions,
      imageUrl,
      videoUrl,
      environment
    } = data;


    const existing =
      await client.query(
        `
        SELECT id
        FROM exercises
        WHERE id = $1
        LIMIT 1
        `,
        [exerciseId]
      );


    if (!existing.rows.length) {

      throw new Error(
        "Exercise not found."
      );

    }


    const allowedTrackingTypes = [
      "REPS_WEIGHT",
      "REPS_ONLY",
      "DURATION",
      "DISTANCE",
      "REPS_DURATION"
    ];


    if (
      trackingType &&
      !allowedTrackingTypes.includes(
        trackingType
      )
    ) {

      throw new Error(
        "Invalid tracking type."
      );

    }


    if (
      environment &&
      !["HOME", "GYM", "BOTH"].includes(
        environment
      )
    ) {

      throw new Error(
        "Invalid environment."
      );

    }


    await client.query(
      `
      UPDATE exercises

      SET

        name =
          COALESCE($1, name),

        description =
          COALESCE($2, description),

        primary_muscle_group_id =
          COALESCE($3, primary_muscle_group_id),

        movement_pattern =
          COALESCE($4, movement_pattern),

        tracking_type =
          COALESCE($5, tracking_type),

        difficulty =
          COALESCE($6, difficulty),

        instructions =
          COALESCE($7, instructions),

        image_url =
          COALESCE($8, image_url),

        video_url =
          COALESCE($9, video_url),

        environment =
          COALESCE($10, environment),

        updated_at = NOW()

      WHERE
        id = $11
      `,
      [
        name,
        description,
        primaryMuscleGroupId,
        movementPattern,
        trackingType,
        difficulty,
        instructions,
        imageUrl,
        videoUrl,
        environment,
        exerciseId
      ]
    );


    /* ---------------------------------------------
       REBUILD MUSCLE MAPPING
    ---------------------------------------------- */

    if (
      primaryMuscleGroupId !== undefined ||
      secondaryMuscleGroupIds !== undefined
    ) {

      await client.query(
        `
        DELETE FROM exercise_muscles
        WHERE exercise_id = $1
        `,
        [exerciseId]
      );


      if (primaryMuscleGroupId) {

        await client.query(
          `
          INSERT INTO exercise_muscles (
            exercise_id,
            muscle_group_id,
            role
          )
          VALUES ($1,$2,'PRIMARY')
          `,
          [
            exerciseId,
            primaryMuscleGroupId
          ]
        );

      }


      for (
        const muscleGroupId
        of secondaryMuscleGroupIds || []
      ) {

        if (
          Number(muscleGroupId) ===
          Number(primaryMuscleGroupId)
        ) {
          continue;
        }

        await client.query(
          `
          INSERT INTO exercise_muscles (
            exercise_id,
            muscle_group_id,
            role
          )
          VALUES ($1,$2,'SECONDARY')
          ON CONFLICT DO NOTHING
          `,
          [
            exerciseId,
            muscleGroupId
          ]
        );

      }

    }


    /* ---------------------------------------------
       REBUILD EQUIPMENT
    ---------------------------------------------- */

    if (
      equipmentIds !== undefined
    ) {

      await client.query(
        `
        DELETE FROM exercise_equipment
        WHERE exercise_id = $1
        `,
        [exerciseId]
      );


      for (
        const equipmentId
        of equipmentIds
      ) {

        await client.query(
          `
          INSERT INTO exercise_equipment (
            exercise_id,
            equipment_id,
            is_required
          )
          VALUES ($1,$2,true)
          ON CONFLICT DO NOTHING
          `,
          [
            exerciseId,
            equipmentId
          ]
        );

      }

    }


    await client.query("COMMIT");


    return getExerciseByIdService(
      exerciseId
    );

  }

  catch (err) {

    await client.query(
      "ROLLBACK"
    );

    throw err;

  }

  finally {

    client.release();

  }

};

/* ======================================================
   WORKOUT TEMPLATES
====================================================== */

const getWorkoutMembership = async (
  userId,
  organizationId,
  permissionKey = "VIEW_WORKOUT"
) => {

  const result = await pool.query(
    `
    SELECT
      om.id AS member_id,
      om.organization_id,
      r.name AS role_name
    FROM organization_members om
    INNER JOIN organization_roles r
      ON r.id = om.role_id
    INNER JOIN organization_role_permissions orp
      ON orp.role_id = r.id
    INNER JOIN organization_permissions op
      ON op.id = orp.permission_id
    WHERE
      om.user_id = $1
      AND om.organization_id = $2
      AND om.status = 'ACTIVE'
      AND op.permission_key = $3
    LIMIT 1
    `,
    [userId, organizationId, permissionKey]
  );

  if (!result.rows.length) {
    throw new Error("You do not have permission for this workout workspace.");
  }

  return result.rows[0];
};


const validateTemplateData = (data = {}) => {

  const {
    name,
    goalType,
    environment,
    estimatedDurationMinutes,
    trainingGoalId,
    primaryMuscleGroupId
  } = data;

  if (!name?.trim()) {
    throw new Error("Workout template name is required.");
  }

  if (environment && !["HOME", "GYM", "BOTH"].includes(String(environment).toUpperCase())) {
    throw new Error("Invalid workout environment.");
  }

  if (
    estimatedDurationMinutes !== undefined &&
    estimatedDurationMinutes !== null &&
    (!Number.isFinite(Number(estimatedDurationMinutes)) || Number(estimatedDurationMinutes) < 0)
  ) {
    throw new Error("Estimated duration must be a non-negative number.");
  }

  return {
    name: name.trim(),
    goalType: goalType || null,
    environment: environment ? String(environment).toUpperCase() : null,
    trainingGoalId:
      trainingGoalId === undefined || trainingGoalId === null || trainingGoalId === ""
        ? null
        : Number(trainingGoalId),
    primaryMuscleGroupId:
      primaryMuscleGroupId === undefined || primaryMuscleGroupId === null || primaryMuscleGroupId === ""
        ? null
        : Number(primaryMuscleGroupId),
    estimatedDurationMinutes:
      estimatedDurationMinutes === undefined || estimatedDurationMinutes === null
        ? null
        : Number(estimatedDurationMinutes)
  };
};


const validateTemplateExercise = (data = {}) => {

  const exerciseId = Number(data.exerciseId);

  if (!Number.isInteger(exerciseId) || exerciseId <= 0) {
    throw new Error("A valid exerciseId is required.");
  }

  const numericFields = [
    ["targetSets", data.targetSets],
    ["targetReps", data.targetReps],
    ["targetWeight", data.targetWeight],
    ["targetDurationSeconds", data.targetDurationSeconds],
    ["targetDistance", data.targetDistance],
    ["restSeconds", data.restSeconds]
  ];

  for (const [field, value] of numericFields) {
    if (
      value !== undefined &&
      value !== null &&
      (!Number.isFinite(Number(value)) || Number(value) < 0)
    ) {
      throw new Error(`${field} must be a non-negative number.`);
    }
  }

  return {
    exerciseId,
    displayOrder:
      data.displayOrder === undefined || data.displayOrder === null
        ? null
        : Number(data.displayOrder),
    targetSets:
      data.targetSets === undefined || data.targetSets === null ? null : Number(data.targetSets),
    targetReps:
      data.targetReps === undefined || data.targetReps === null ? null : Number(data.targetReps),
    targetWeight:
      data.targetWeight === undefined || data.targetWeight === null ? null : Number(data.targetWeight),
    targetDurationSeconds:
      data.targetDurationSeconds === undefined || data.targetDurationSeconds === null
        ? null
        : Number(data.targetDurationSeconds),
    targetDistance:
      data.targetDistance === undefined || data.targetDistance === null
        ? null
        : Number(data.targetDistance),
    restSeconds:
      data.restSeconds === undefined || data.restSeconds === null ? 90 : Number(data.restSeconds),
    notes: data.notes?.trim() || null
  };
};


const getTemplateExercises = async (client, templateId) => {

  const result = await client.query(
    `
    SELECT
      wte.id,
      wte.workout_template_id,
      wte.exercise_id,
      wte.display_order,
      wte.target_sets,
      wte.target_reps,
      wte.target_weight,
      wte.target_duration_seconds,
      wte.target_distance,
      wte.rest_seconds,
      wte.notes,
      e.name AS exercise_name,
      e.tracking_type,
      e.environment,
      e.image_url,
      e.video_url,
      e.primary_muscle_group_id,
      mg.name AS primary_muscle_group
    FROM workout_template_exercises wte
    INNER JOIN exercises e
      ON e.id = wte.exercise_id
    LEFT JOIN workout_muscle_groups mg
      ON mg.id = e.primary_muscle_group_id
    WHERE
      wte.workout_template_id = $1
    ORDER BY
      wte.display_order ASC,
      wte.id ASC
    `,
    [templateId]
  );

  return result.rows;
};


export const getWorkoutTemplatesService = async (
  userId,
  organizationId
) => {

  await getWorkoutMembership(
    userId,
    Number(organizationId),
    "VIEW_WORKOUT"
  );

  const result = await pool.query(
    `
    SELECT
      wt.id,
      wt.organization_id,
      wt.created_by_member_id,
      wt.name,
      wt.description,
      wt.goal_type,
      wt.training_goal_id,
      tg.name AS training_goal_name,
      wt.primary_muscle_group_id,
      pmg.name AS primary_muscle_group,
      wt.environment,
      wt.estimated_duration_minutes,
      wt.is_active,
      wt.created_at,
      wt.updated_at,
      COUNT(wte.id)::int AS exercise_count
    FROM workout_templates wt
    LEFT JOIN workout_template_exercises wte
      ON wte.workout_template_id = wt.id
    LEFT JOIN workout_training_goals tg
      ON tg.id = wt.training_goal_id
    LEFT JOIN workout_muscle_groups pmg
      ON pmg.id = wt.primary_muscle_group_id
    WHERE
      wt.organization_id = $1
      AND wt.is_active = true
    GROUP BY wt.id , tg.name, pmg.name
    ORDER BY wt.updated_at DESC, wt.id DESC
    `,
    [organizationId]
  );
// Change done at group by 
  return result.rows;
};


export const getWorkoutTemplateByIdService = async (
  userId,
  organizationId,
  templateId
) => {

  await getWorkoutMembership(
    userId,
    Number(organizationId),
    "VIEW_WORKOUT"
  );

  const client = await pool.connect();

  try {

    const result = await client.query(
      `
      SELECT
        wt.id,
        wt.organization_id,
        wt.created_by_member_id,
        wt.name,
        wt.description,
        wt.goal_type,
        wt.training_goal_id,
        tg.name AS training_goal_name,
        wt.primary_muscle_group_id,
        pmg.name AS primary_muscle_group,
        wt.environment,
        wt.estimated_duration_minutes,
        wt.is_active,
        wt.created_at,
        wt.updated_at
      FROM workout_templates wt
      LEFT JOIN workout_training_goals tg
        ON tg.id = wt.training_goal_id
      LEFT JOIN workout_muscle_groups pmg
        ON pmg.id = wt.primary_muscle_group_id
      WHERE
        wt.id = $1
        AND wt.organization_id = $2
        AND wt.is_active = true
      LIMIT 1
      `,
      [templateId, organizationId]
    );

    if (!result.rows.length) {
      throw new Error("Workout template not found.");
    }

    return {
      ...result.rows[0],
      exercises: await getTemplateExercises(client, templateId)
    };

  } finally {
    client.release();
  }
};


export const createWorkoutTemplateService = async (
  userId,
  data
) => {

  const organizationId = Number(data.organizationId);

  if (!Number.isInteger(organizationId) || organizationId <= 0) {
    throw new Error("organizationId is required.");
  }

  const membership = await getWorkoutMembership(
    userId,
    organizationId,
    "CREATE_WORKOUT"
  );

  const template = validateTemplateData(data);
  const exercises = Array.isArray(data.exercises) ? data.exercises : [];

  const client = await pool.connect();

  try {

    await client.query("BEGIN");

    const templateResult = await client.query(
      `
      INSERT INTO workout_templates (
        organization_id,
        created_by_member_id,
        name,
        description,
        goal_type,
        training_goal_id,
        primary_muscle_group_id,
        environment,
        estimated_duration_minutes,
        is_active
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,true)
      RETURNING *
      `,
      [
        organizationId,
        membership.member_id,
        template.name,
        data.description?.trim() || null,
        template.goalType,
        template.trainingGoalId,
        template.primaryMuscleGroupId,
        template.environment,
        template.estimatedDurationMinutes
      ]
    );

    const createdTemplate = templateResult.rows[0];

    for (let index = 0; index < exercises.length; index += 1) {

      const item = validateTemplateExercise(exercises[index]);
      const displayOrder = item.displayOrder ?? index + 1;

      const exerciseResult = await client.query(
        `
        SELECT id, tracking_type
        FROM exercises
        WHERE id = $1 AND is_active = true
        LIMIT 1
        `,
        [item.exerciseId]
      );

      if (!exerciseResult.rows.length) {
        throw new Error(`Exercise ${item.exerciseId} not found.`);
      }

      await client.query(
        `
        INSERT INTO workout_template_exercises (
          workout_template_id,
          exercise_id,
          display_order,
          target_sets,
          target_reps,
          target_weight,
          target_duration_seconds,
          target_distance,
          rest_seconds,
          notes
        )
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
        `,
        [
          createdTemplate.id,
          item.exerciseId,
          displayOrder,
          item.targetSets,
          item.targetReps,
          item.targetWeight,
          item.targetDurationSeconds,
          item.targetDistance,
          item.restSeconds,
          item.notes
        ]
      );
    }

    await client.query("COMMIT");

    return getWorkoutTemplateByIdService(
      userId,
      organizationId,
      createdTemplate.id
    );

  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
};


export const updateWorkoutTemplateService = async (
  userId,
  organizationId,
  templateId,
  data
) => {

  await getWorkoutMembership(
    userId,
    Number(organizationId),
    "EDIT_WORKOUT"
  );

  const existing = await pool.query(
    `
    SELECT id
    FROM workout_templates
    WHERE id = $1 AND organization_id = $2 AND is_active = true
    LIMIT 1
    `,
    [templateId, organizationId]
  );

  if (!existing.rows.length) {
    throw new Error("Workout template not found.");
  }

  const template = validateTemplateData({
    name: data.name,
    goalType: data.goalType,
    environment: data.environment,
    estimatedDurationMinutes: data.estimatedDurationMinutes,
    trainingGoalId: data.trainingGoalId,
    primaryMuscleGroupId: data.primaryMuscleGroupId
  });

  const result = await pool.query(
    `
    UPDATE workout_templates
    SET
      name = $1,
      description = $2,
      goal_type = $3,
      training_goal_id = $4,
      primary_muscle_group_id = $5,
      environment = $6,
      estimated_duration_minutes = $7,
      updated_at = NOW()
    WHERE id = $8 AND organization_id = $9
    RETURNING *
    `,
    [
      template.name,
      data.description?.trim() || null,
      template.goalType,
      template.trainingGoalId,
      template.primaryMuscleGroupId,
      template.environment,
      template.estimatedDurationMinutes,
      templateId,
      organizationId
    ]
  );

  return getWorkoutTemplateByIdService(
    userId,
    organizationId,
    result.rows[0].id
  );
};


export const deleteWorkoutTemplateService = async (
  userId,
  organizationId,
  templateId
) => {

  await getWorkoutMembership(
    userId,
    Number(organizationId),
    "EDIT_WORKOUT"
  );

  const result = await pool.query(
    `
    UPDATE workout_templates
    SET
      is_active = false,
      updated_at = NOW()
    WHERE
      id = $1
      AND organization_id = $2
      AND is_active = true
    RETURNING id
    `,
    [templateId, organizationId]
  );

  if (!result.rows.length) {
    throw new Error("Workout template not found.");
  }

  return {
    template_id: result.rows[0].id
  };
};


/* ======================================================
   TEMPLATE EXERCISES
====================================================== */

export const addWorkoutTemplateExerciseService = async (
  userId,
  organizationId,
  templateId,
  data
) => {

  await getWorkoutMembership(
    userId,
    Number(organizationId),
    "EDIT_WORKOUT"
  );

  const item = validateTemplateExercise(data);

  const client = await pool.connect();

  try {

    await client.query("BEGIN");

    const templateResult = await client.query(
      `
      SELECT id
      FROM workout_templates
      WHERE id = $1 AND organization_id = $2 AND is_active = true
      LIMIT 1
      `,
      [templateId, organizationId]
    );

    if (!templateResult.rows.length) {
      throw new Error("Workout template not found.");
    }

    const exerciseResult = await client.query(
      `
      SELECT id
      FROM exercises
      WHERE id = $1 AND is_active = true
      LIMIT 1
      `,
      [item.exerciseId]
    );

    if (!exerciseResult.rows.length) {
      throw new Error("Exercise not found.");
    }

    const duplicateResult = await client.query(
      `
      SELECT id
      FROM workout_template_exercises
      WHERE workout_template_id = $1 AND exercise_id = $2
      LIMIT 1
      `,
      [templateId, item.exerciseId]
    );

    if (duplicateResult.rows.length) {
      throw new Error("Exercise is already part of this workout template.");
    }

    let displayOrder = item.displayOrder;

    if (displayOrder === null) {
      const orderResult = await client.query(
        `
        SELECT COALESCE(MAX(display_order), 0) + 1 AS next_order
        FROM workout_template_exercises
        WHERE workout_template_id = $1
        `,
        [templateId]
      );

      displayOrder = Number(orderResult.rows[0].next_order);
    }

    const result = await client.query(
      `
      INSERT INTO workout_template_exercises (
        workout_template_id,
        exercise_id,
        display_order,
        target_sets,
        target_reps,
        target_weight,
        target_duration_seconds,
        target_distance,
        rest_seconds,
        notes
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
      RETURNING *
      `,
      [
        templateId,
        item.exerciseId,
        displayOrder,
        item.targetSets,
        item.targetReps,
        item.targetWeight,
        item.targetDurationSeconds,
        item.targetDistance,
        item.restSeconds,
        item.notes
      ]
    );

    await client.query(
      `
      UPDATE workout_templates
      SET updated_at = NOW()
      WHERE id = $1
      `,
      [templateId]
    );

    await client.query("COMMIT");

    return result.rows[0];

  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
};





export const updateWorkoutTemplateExerciseService = async (
  userId,
  organizationId,
  templateId,
  templateExerciseId,
  data
) => {

  await getWorkoutMembership(
    userId,
    Number(organizationId),
    "EDIT_WORKOUT"
  );

  // First get the existing template exercise
  const existingResult = await pool.query(
    `
    SELECT
      wte.id,
      wte.exercise_id,
      wte.display_order,
      wte.target_sets,
      wte.target_reps,
      wte.target_weight,
      wte.target_duration_seconds,
      wte.target_distance,
      wte.rest_seconds,
      wte.notes
    FROM workout_template_exercises wte
    INNER JOIN workout_templates wt
      ON wt.id = wte.workout_template_id
    WHERE
      wte.id = $1
      AND wte.workout_template_id = $2
      AND wt.organization_id = $3
      AND wt.is_active = true
    LIMIT 1
    `,
    [
      templateExerciseId,
      templateId,
      organizationId
    ]
  );

  if (!existingResult.rows.length) {
    throw new Error("Workout template exercise not found.");
  }

  const existing = existingResult.rows[0];

  // Keep existing exercise if exerciseId is not supplied
  const exerciseId =
    data.exerciseId === undefined || data.exerciseId === null
      ? existing.exercise_id
      : Number(data.exerciseId);

  if (!Number.isInteger(exerciseId) || exerciseId <= 0) {
    throw new Error("A valid exerciseId is required.");
  }

  // Validate only fields that are actually supplied
  const numericFields = [
    ["displayOrder", data.displayOrder],
    ["targetSets", data.targetSets],
    ["targetReps", data.targetReps],
    ["targetWeight", data.targetWeight],
    ["targetDurationSeconds", data.targetDurationSeconds],
    ["targetDistance", data.targetDistance],
    ["restSeconds", data.restSeconds]
  ];

  for (const [field, value] of numericFields) {
    if (
      value !== undefined &&
      value !== null &&
      (!Number.isFinite(Number(value)) || Number(value) < 0)
    ) {
      throw new Error(`${field} must be a non-negative number.`);
    }
  }

  const displayOrder =
    data.displayOrder !== undefined
      ? data.displayOrder === null
        ? existing.display_order
        : Number(data.displayOrder)
      : existing.display_order;

  const targetSets =
    data.targetSets !== undefined
      ? data.targetSets === null
        ? existing.target_sets
        : Number(data.targetSets)
      : existing.target_sets;

  const targetReps =
    data.targetReps !== undefined
      ? data.targetReps === null
        ? existing.target_reps
        : Number(data.targetReps)
      : existing.target_reps;

  const targetWeight =
    data.targetWeight !== undefined
      ? data.targetWeight === null
        ? existing.target_weight
        : Number(data.targetWeight)
      : existing.target_weight;

  const targetDurationSeconds =
    data.targetDurationSeconds !== undefined
      ? data.targetDurationSeconds === null
        ? existing.target_duration_seconds
        : Number(data.targetDurationSeconds)
      : existing.target_duration_seconds;

  const targetDistance =
    data.targetDistance !== undefined
      ? data.targetDistance === null
        ? existing.target_distance
        : Number(data.targetDistance)
      : existing.target_distance;

  const restSeconds =
    data.restSeconds !== undefined
      ? data.restSeconds === null
        ? existing.rest_seconds
        : Number(data.restSeconds)
      : existing.rest_seconds;

  const notes =
    data.notes !== undefined
      ? data.notes === null || data.notes.trim() === ""
        ? null
        : data.notes.trim()
      : existing.notes;

  // Verify exercise exists and is active
  const exerciseResult = await pool.query(
    `
    SELECT id
    FROM exercises
    WHERE id = $1
      AND is_active = true
    LIMIT 1
    `,
    [exerciseId]
  );

  if (!exerciseResult.rows.length) {
    throw new Error("Exercise not found or inactive.");
  }

  const result = await pool.query(
    `
    UPDATE workout_template_exercises
    SET
      exercise_id = $1,
      display_order = $2,
      target_sets = $3,
      target_reps = $4,
      target_weight = $5,
      target_duration_seconds = $6,
      target_distance = $7,
      rest_seconds = $8,
      notes = $9
    WHERE
      id = $10
      AND workout_template_id = $11
    RETURNING *
    `,
    [
      exerciseId,
      displayOrder,
      targetSets,
      targetReps,
      targetWeight,
      targetDurationSeconds,
      targetDistance,
      restSeconds,
      notes,
      templateExerciseId,
      templateId
    ]
  );

  await pool.query(
    `
    UPDATE workout_templates
    SET updated_at = NOW()
    WHERE id = $1
    `,
    [templateId]
  );

  return result.rows[0];
};

export const deleteWorkoutTemplateExerciseService = async (
  userId,
  organizationId,
  templateId,
  templateExerciseId
) => {

  await getWorkoutMembership(
    userId,
    Number(organizationId),
    "EDIT_WORKOUT"
  );

  const result = await pool.query(
    `
    DELETE FROM workout_template_exercises wte
    USING workout_templates wt
    WHERE
      wte.id = $1
      AND wte.workout_template_id = wt.id
      AND wt.id = $2
      AND wt.organization_id = $3
      AND wt.is_active = true
    RETURNING wte.id
    `,
    [templateExerciseId, templateId, organizationId]
  );

  if (!result.rows.length) {
    throw new Error("Workout template exercise not found.");
  }

  await pool.query(
    `UPDATE workout_templates SET updated_at = NOW() WHERE id = $1`,
    [templateId]
  );

  return {
    template_exercise_id: result.rows[0].id
  };
};


export const reorderWorkoutTemplateExercisesService = async (
  userId,
  organizationId,
  templateId,
  exerciseIds
) => {

  await getWorkoutMembership(
    userId,
    Number(organizationId),
    "EDIT_WORKOUT"
  );

  if (!Array.isArray(exerciseIds) || !exerciseIds.length) {
    throw new Error("exerciseIds must be a non-empty array.");
  }

  const normalizedIds = exerciseIds.map(Number);

  if (normalizedIds.some((id) => !Number.isInteger(id) || id <= 0)) {
    throw new Error("Invalid template exercise id.");
  }

  if (new Set(normalizedIds).size !== normalizedIds.length) {
    throw new Error("Duplicate template exercise ids are not allowed.");
  }

  const client = await pool.connect();

  try {

    await client.query("BEGIN");

    const existingResult = await client.query(
      `
      SELECT id
      FROM workout_template_exercises
      WHERE workout_template_id = $1
      ORDER BY display_order ASC, id ASC
      `,
      [templateId]
    );

    const existingIds = existingResult.rows.map((row) => Number(row.id));

    if (
      existingIds.length !== normalizedIds.length ||
      existingIds.some((id) => !normalizedIds.includes(id))
    ) {
      throw new Error("Reorder list must contain every exercise in the template exactly once.");
    }

    for (let index = 0; index < normalizedIds.length; index += 1) {
      await client.query(
        `
        UPDATE workout_template_exercises
        SET display_order = $1
        WHERE id = $2 AND workout_template_id = $3
        `,
        [index + 1, normalizedIds[index], templateId]
      );
    }

    await client.query(
      `UPDATE workout_templates SET updated_at = NOW() WHERE id = $1`,
      [templateId]
    );

    await client.query("COMMIT");

    return getWorkoutTemplateByIdService(
      userId,
      organizationId,
      templateId
    );

  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
};


/* ======================================================
   WORKOUT ASSIGNMENTS
====================================================== */

/**
 * Create a workout assignment for one of the trainer's own clients.
 *
 * Important:
 * A trainer can only assign workouts to clients who are
 * currently assigned to that trainer through
 * organization_client_assignments.
 */
export const createWorkoutAssignmentService = async (
  userId,
  organizationId,
  data
) => {

  const normalizedOrganizationId =
    Number(organizationId);

  if (
    !Number.isInteger(normalizedOrganizationId) ||
    normalizedOrganizationId <= 0
  ) {
    throw new Error("Valid organizationId is required.");
  }


  /* ---------------------------------------------
     PERMISSION + ACTIVE MEMBERSHIP
  ---------------------------------------------- */

  const membership =
    await getWorkoutMembership(
      userId,
      normalizedOrganizationId,
      "ASSIGN_WORKOUT"
    );


  const {
    templateId,
    clientMemberId,
    startDate,
    endDate,
    scheduledDays = []
  } = data;


  const normalizedTemplateId =
    Number(templateId);

  const normalizedClientMemberId =
    Number(clientMemberId);


  if (
    !Number.isInteger(normalizedTemplateId) ||
    normalizedTemplateId <= 0
  ) {
    throw new Error("A valid templateId is required.");
  }


  if (
    !Number.isInteger(normalizedClientMemberId) ||
    normalizedClientMemberId <= 0
  ) {
    throw new Error("A valid clientMemberId is required.");
  }


  if (!startDate) {
    throw new Error("startDate is required.");
  }


  /* ---------------------------------------------
     VALIDATE SCHEDULED DAYS
  ---------------------------------------------- */

  const allowedDays = [
    "MON",
    "TUE",
    "WED",
    "THU",
    "FRI",
    "SAT",
    "SUN"
  ];


  if (!Array.isArray(scheduledDays)) {
    throw new Error("scheduledDays must be an array.");
  }


  const normalizedScheduledDays =
    scheduledDays
      .map((day) =>
        String(day).trim().toUpperCase()
      )
      .filter(Boolean);


  const invalidDays =
    normalizedScheduledDays.filter(
      (day) => !allowedDays.includes(day)
    );


  if (invalidDays.length) {
    throw new Error(
      `Invalid scheduled day(s): ${invalidDays.join(", ")}.`
    );
  }


  if (
    new Set(normalizedScheduledDays).size !==
    normalizedScheduledDays.length
  ) {
    throw new Error(
      "Duplicate scheduled days are not allowed."
    );
  }


  /* ---------------------------------------------
     DATE VALIDATION
  ---------------------------------------------- */

  if (endDate && endDate < startDate) {
    throw new Error(
      "endDate cannot be before startDate."
    );
  }


  const client =
    await pool.connect();


  try {

    await client.query("BEGIN");


    /* ---------------------------------------------
       VERIFY TEMPLATE
    ---------------------------------------------- */

    const templateResult =
      await client.query(
        `
        SELECT
          id,
          organization_id,
          name,
          is_active
        FROM workout_templates
        WHERE
          id = $1
          AND organization_id = $2
          AND is_active = true
        LIMIT 1
        `,
        [
          normalizedTemplateId,
          normalizedOrganizationId
        ]
      );


    if (!templateResult.rows.length) {
      throw new Error(
        "Workout template not found."
      );
    }


    const template =
      templateResult.rows[0];


    /* ---------------------------------------------
       VERIFY CLIENT IS ACTIVE + CLIENT ROLE
    ---------------------------------------------- */

    const clientResult =
      await client.query(
        `
        SELECT
          om.id,
          om.user_id,
          om.organization_id,
          r.name AS role_name,
          u.name AS client_name
        FROM organization_members om

        INNER JOIN organization_roles r
          ON r.id = om.role_id

        INNER JOIN users u
          ON u.id = om.user_id

        WHERE
          om.id = $1
          AND om.organization_id = $2
          AND om.status = 'ACTIVE'
        LIMIT 1
        `,
        [
          normalizedClientMemberId,
          normalizedOrganizationId
        ]
      );


    if (!clientResult.rows.length) {
      throw new Error(
        "Client not found."
      );
    }


    const clientMember =
      clientResult.rows[0];


    if (
      clientMember.role_name !== "CLIENT"
    ) {
      throw new Error(
        "Selected member is not a client."
      );
    }


    /* ---------------------------------------------
       CRITICAL:
       CLIENT MUST BELONG TO THIS TRAINER
    ---------------------------------------------- */

    const trainerClientResult =
      await client.query(
        `
        SELECT
          id
        FROM organization_client_assignments
        WHERE
          organization_id = $1
          AND trainer_member_id = $2
          AND client_member_id = $3
          AND is_active = true
        LIMIT 1
        `,
        [
          normalizedOrganizationId,
          membership.member_id,
          normalizedClientMemberId
        ]
      );


    if (!trainerClientResult.rows.length) {
      throw new Error(
        "You can only assign workouts to your own active clients."
      );
    }


    /* ---------------------------------------------
       PREVENT DUPLICATE ACTIVE ASSIGNMENT
       FOR SAME TEMPLATE + CLIENT
    ---------------------------------------------- */

    const existingAssignment =
      await client.query(
        `
        SELECT
          id
        FROM workout_assignments
        WHERE
          organization_id = $1
          AND workout_template_id = $2
          AND trainer_member_id = $3
          AND client_member_id = $4
          AND status = 'ACTIVE'
        LIMIT 1
        `,
        [
          normalizedOrganizationId,
          normalizedTemplateId,
          membership.member_id,
          normalizedClientMemberId
        ]
      );


    if (existingAssignment.rows.length) {
      throw new Error(
        "This workout is already actively assigned to this client."
      );
    }


    /* ---------------------------------------------
       CREATE ASSIGNMENT
    ---------------------------------------------- */

    const assignmentResult =
      await client.query(
        `
      INSERT INTO workout_assignments (
        organization_id,
        workout_template_id,
        trainer_member_id,
        client_member_id,
        start_date,
        end_date,
        scheduled_days,
        status
      )
      VALUES (
        $1,
        $2,
        $3,
        $4,
        $5,
        $6,
        $7::jsonb,
        'ACTIVE'
      )
        RETURNING *
        `,
        [
          normalizedOrganizationId,
          normalizedTemplateId,
          membership.member_id,
          normalizedClientMemberId,
          startDate,
          endDate || null,
          JSON.stringify(normalizedScheduledDays)
        ]
      );


    await client.query("COMMIT");


    return {
      ...assignmentResult.rows[0],
      template_name: template.name,
      client_name: clientMember.client_name
    };


  } catch (err) {

    await client.query("ROLLBACK");

    throw err;

  } finally {

    client.release();

  }

};


/* ======================================================
   GET MY WORKOUT ASSIGNMENTS
====================================================== */

export const getMyWorkoutAssignmentsService = async (
  userId,
  organizationId
) => {

  const normalizedOrganizationId =
    Number(organizationId);


  const membership =
    await getWorkoutMembership(
      userId,
      normalizedOrganizationId,
      "VIEW_WORKOUT"
    );


  const result =
    await pool.query(
      `
      SELECT

        wa.id,

        wa.organization_id,

        wa.workout_template_id,

        wa.trainer_member_id,

        wa.client_member_id,

        wa.start_date,

        wa.end_date,

        wa.scheduled_days,

        wa.status,

        wa.created_at,

        wt.name AS workout_name,

        wt.description AS workout_description,

        wt.training_goal_id,

        tg.name AS training_goal_name,

        u.name AS client_name,

        u.nickname AS client_nickname

      FROM workout_assignments wa

      INNER JOIN workout_templates wt
        ON wt.id = wa.workout_template_id

      LEFT JOIN workout_training_goals tg
        ON tg.id = wt.training_goal_id

      INNER JOIN organization_members clientMember
        ON clientMember.id = wa.client_member_id

      INNER JOIN users u
        ON u.id = clientMember.user_id

      WHERE
        wa.organization_id = $1
        AND wa.trainer_member_id = $2

      ORDER BY
        wa.status ASC,
        wa.start_date DESC,
        u.name ASC
      `,
      [
        normalizedOrganizationId,
        membership.member_id
      ]
    );


  return result.rows;
};