import pool from "../db/connection.js";

// import pool from "../config/db.js";


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