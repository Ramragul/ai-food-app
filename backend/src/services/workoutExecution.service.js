import pool from "../db/connection.js";
import { getClientAssignmentForUser } from "./workoutClient.service.js";

const nowDate = () => new Date();

const toInt = (value, fallback = 0) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? Math.trunc(parsed) : fallback;
};

const secondsBetween = (from, to = nowDate()) => {
  if (!from) return 0;
  return Math.max(
    0,
    Math.floor(
      (new Date(to).getTime() - new Date(from).getTime()) / 1000
    )
  );
};

/* =========================================================
   ASSIGNMENT / SESSION HELPERS
========================================================= */

const getAssignmentExercises = async (client, assignmentId) => {
  const result = await client.query(
    `
    SELECT
      wae.id,
      wae.workout_assignment_id,
      wae.template_exercise_id,
      wae.exercise_id,
      wae.display_order,
      wae.target_sets,
      wae.target_reps,
      wae.target_weight,
      wae.target_duration_seconds,
      wae.target_distance,
      wae.rest_seconds,
      wae.notes,

      COALESCE(wae.exercise_name_snapshot, e.name) AS exercise_name,
      COALESCE(
        wae.exercise_description_snapshot,
        e.description
      ) AS exercise_description,
      COALESCE(
        wae.tracking_type_snapshot,
        e.tracking_type
      ) AS tracking_type,
      COALESCE(
        wae.exercise_environment_snapshot,
        e.environment
      ) AS exercise_environment,
      COALESCE(
        wae.difficulty_snapshot,
        e.difficulty
      ) AS difficulty,
      COALESCE(
        wae.instructions_snapshot,
        e.instructions
      ) AS instructions,
      COALESCE(
        wae.image_url_snapshot,
        e.image_url
      ) AS image_url,
      COALESCE(
        wae.video_url_snapshot,
        e.video_url
      ) AS video_url,
      COALESCE(
        wae.primary_muscle_group_snapshot,
        mg.name
      ) AS primary_muscle_group,
      COALESCE(
        wae.met_value_snapshot,
        e.met_value
      ) AS met_value

    FROM workout_assignment_exercises wae

    LEFT JOIN exercises e
      ON e.id = wae.exercise_id

    LEFT JOIN workout_muscle_groups mg
      ON mg.id = e.primary_muscle_group_id

    WHERE
      wae.workout_assignment_id = $1

    ORDER BY
      wae.display_order ASC,
      wae.id ASC
    `,
    [assignmentId]
  );

  return result.rows;
};

const setsForExercise = (exercise) => {
  const targetSets = Number(exercise.target_sets);

  if (
    Number.isFinite(targetSets) &&
    targetSets > 0
  ) {
    return Math.trunc(targetSets);
  }

  return 1;
};

const getSessionForUser = async (
  client,
  userId,
  sessionId,
  lock = false
) => {
  const result = await client.query(
    `
    SELECT *
    FROM workout_sessions
    WHERE
      id = $1
      AND user_id = $2
    ${lock ? "FOR UPDATE" : ""}
    `,
    [sessionId, userId]
  );

  if (!result.rows.length) {
    throw new Error("Workout session not found.");
  }

  return result.rows[0];
};

/*
  Session history must remain readable even when a client leaves the
  organization later, so this helper does not require an ACTIVE membership.
*/
const getAssignmentForSessionUser = async (
  client,
  userId,
  assignmentId
) => {
  const result = await client.query(
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
      wt.goal_type,
      wt.training_goal_id,
      tg.name AS training_goal_name,
      wt.primary_muscle_group_id,
      pmg.name AS primary_muscle_group,
      wt.environment,
      wt.estimated_duration_minutes,

      org.name AS organization_name,
      trainer_user.id AS trainer_user_id,
      trainer_user.name AS trainer_name,
      trainer_user.nickname AS trainer_nickname

    FROM workout_assignments wa

    INNER JOIN organization_members client_member
      ON client_member.id = wa.client_member_id
     AND client_member.user_id = $1

    LEFT JOIN workout_templates wt
      ON wt.id = wa.workout_template_id

    LEFT JOIN workout_training_goals tg
      ON tg.id = wt.training_goal_id

    LEFT JOIN workout_muscle_groups pmg
      ON pmg.id = wt.primary_muscle_group_id

    LEFT JOIN organizations org
      ON org.id = wa.organization_id

    LEFT JOIN organization_members trainer_member
      ON trainer_member.id = wa.trainer_member_id

    LEFT JOIN users trainer_user
      ON trainer_user.id = trainer_member.user_id

    WHERE
      wa.id = $2

    LIMIT 1
    `,
    [userId, assignmentId]
  );

  return result.rows[0] ?? null;
};

const getSessionExercises = async (client, sessionId) => {
  const result = await client.query(
    `
    SELECT
      wse.id,
      wse.session_id,
      wse.assignment_exercise_id,
      wse.exercise_id,
      wse.exercise_name_snapshot AS exercise_name,
      wse.display_order,
      wse.target_sets,
      wse.target_reps,
      wse.target_weight,
      wse.target_duration_seconds,
      wse.target_distance,
      wse.rest_seconds,
      wse.status,
      wse.started_at,
      wse.completed_at,

      COALESCE(
        wse.tracking_type_snapshot,
        e.tracking_type
      ) AS tracking_type,
      COALESCE(
        wse.exercise_environment_snapshot,
        e.environment
      ) AS exercise_environment,
      COALESCE(
        wse.difficulty_snapshot,
        e.difficulty
      ) AS difficulty,
      COALESCE(
        wse.instructions_snapshot,
        e.instructions
      ) AS instructions,
      COALESCE(
        wse.image_url_snapshot,
        e.image_url
      ) AS image_url,
      COALESCE(
        wse.video_url_snapshot,
        e.video_url
      ) AS video_url,
      COALESCE(
        wse.primary_muscle_group_snapshot,
        mg.name
      ) AS primary_muscle_group,
      COALESCE(
        wse.met_value_snapshot,
        e.met_value
      ) AS met_value

    FROM workout_session_exercises wse

    LEFT JOIN exercises e
      ON e.id = wse.exercise_id

    LEFT JOIN workout_muscle_groups mg
      ON mg.id = e.primary_muscle_group_id

    WHERE
      wse.session_id = $1

    ORDER BY
      wse.display_order ASC,
      wse.id ASC
    `,
    [sessionId]
  );

  return result.rows;
};

const applyElapsedRunningAndRest = (session, { flushRest = false } = {}) => {
  const now = nowDate();

  let activeSeconds = Number(session.active_seconds || 0);
  let restSeconds = Number(session.rest_seconds || 0);
  let restActive = Boolean(session.rest_active);
  let restStartedAt = session.rest_started_at;
  let restTargetSeconds = Number(session.rest_target_seconds || 0);

  if (
    session.status === "RUNNING" &&
    session.last_resumed_at
  ) {
    activeSeconds += secondsBetween(
      session.last_resumed_at,
      now
    );
  }

  if (restActive && restStartedAt) {
    const restElapsed = secondsBetween(
      restStartedAt,
      now
    );

    const restDone =
      restElapsed >= restTargetSeconds;

    if (restDone || flushRest) {
      restSeconds += restDone
        ? restTargetSeconds
        : restElapsed;

      restActive = false;
      restStartedAt = null;
      restTargetSeconds = 0;
    }
  }

  return {
    now,
    activeSeconds,
    restSeconds,
    restActive,
    restStartedAt,
    restTargetSeconds,
  };
};

const calculateCompletionPercent = (session) => {
  const total = Number(session.total_sets || 0);

  if (!total) return 0;

  return Math.min(
    100,
    Math.max(
      0,
      ((Number(session.completed_sets || 0) +
        Number(session.skipped_sets || 0)) *
        100) /
        total
    )
  );
};

/* =========================================================
   BURN ESTIMATION
========================================================= */

const calculateBurn = async (
  client,
  sessionId,
  userId,
  activeSecondsOverride = null,
  restSecondsOverride = null
) => {
  const profileResult = await client.query(
    `
    SELECT
      weight_kg
    FROM user_profile
    WHERE
      user_id = $1
      AND is_active = true
    ORDER BY
      updated_at DESC NULLS LAST,
      id DESC
    LIMIT 1
    `,
    [userId]
  );

  const weightKg = Number(
    profileResult.rows[0]?.weight_kg
  );

  const usableWeight =
    Number.isFinite(weightKg) && weightKg > 0
      ? weightKg
      : 70;

  const setResult = await client.query(
    `
    SELECT
      ws.*,
      wse.rest_seconds,
      COALESCE(
        wse.met_value_snapshot,
        e.met_value
      ) AS met_value,
      COALESCE(
        wse.tracking_type_snapshot,
        e.tracking_type
      ) AS tracking_type,
      COALESCE(
        wse.difficulty_snapshot,
        e.difficulty
      ) AS difficulty

    FROM workout_sets ws

    INNER JOIN workout_session_exercises wse
      ON wse.id = ws.session_exercise_id

    LEFT JOIN exercises e
      ON e.id = wse.exercise_id

    WHERE
      wse.session_id = $1
      AND ws.status = 'COMPLETED'

    ORDER BY
      wse.display_order ASC,
      ws.set_number ASC
    `,
    [sessionId]
  );

  const defaultSecondsByTrackingType = {
    REPS_WEIGHT: 35,
    REPS_ONLY: 30,
    DURATION: 45,
    DISTANCE: 60,
    REPS_DURATION: 45,
  };

  const defaultMetByTrackingType = {
    REPS_WEIGHT: 6.0,
    REPS_ONLY: 5.0,
    DURATION: 6.0,
    DISTANCE: 8.0,
    REPS_DURATION: 6.0,
  };

  let workSeconds = 0;
  let weightedMetMinutes = 0;

  for (const row of setResult.rows) {
    const trackingType = String(
      row.tracking_type || "REPS_WEIGHT"
    ).toUpperCase();

    const difficulty = String(
      row.difficulty || ""
    ).toUpperCase();

    let setSeconds = Number(
      row.actual_duration_seconds
    );

    if (
      !Number.isFinite(setSeconds) ||
      setSeconds <= 0
    ) {
      setSeconds =
        defaultSecondsByTrackingType[
          trackingType
        ] || 35;
    }

    let met = Number(row.met_value);

    if (!Number.isFinite(met) || met <= 0) {
      met =
        defaultMetByTrackingType[
          trackingType
        ] || 5.5;

      if (difficulty === "INTERMEDIATE") {
        met += 0.5;
      }

      if (difficulty === "ADVANCED") {
        met += 1.0;
      }
    }

    workSeconds += setSeconds;
    weightedMetMinutes +=
      met * (setSeconds / 60);
  }

  const activeSeconds =
    activeSecondsOverride ?? 0;

  const activeMinutes =
    activeSeconds / 60;

  const inferredWorkMinutes =
    workSeconds / 60;

  const explicitRestMinutes =
    Number(restSecondsOverride ?? 0) /
    60;

  const averageMet =
    inferredWorkMinutes > 0
      ? weightedMetMinutes /
        inferredWorkMinutes
      : 5.5;

  const sessionTrainingMinutes =
    Math.max(
      0,
      activeMinutes - explicitRestMinutes
    );

  const proxyTrainingMinutes =
    Math.max(
      inferredWorkMinutes,
      sessionTrainingMinutes * 0.65
    );

  const setBasedCalories =
    inferredWorkMinutes > 0
      ? Math.max(
          0,
          ((weightedMetMinutes - inferredWorkMinutes) *
            3.5 *
            usableWeight) /
            200
        )
      : 0;

  const sessionBasedCalories =
    Math.max(
      0,
      (((averageMet - 1) *
        3.5 *
        usableWeight) /
        200) *
        proxyTrainingMinutes
    );

  const estimatedCalories = Math.round(
    Math.max(
      setBasedCalories,
      sessionBasedCalories
    )
  );

  const confidence =
    profileResult.rows.length &&
    setResult.rows.length
      ? "MEDIUM"
      : "LOW";

  return {
    caloriesBurnedActive: Math.max(
      0,
      estimatedCalories
    ),
    burnConfidence: confidence,
  };
};

/* =========================================================
   SESSION PAYLOAD
========================================================= */

const getSessionPayload = async (
  client,
  userId,
  sessionId
) => {
  const session = await getSessionForUser(
    client,
    userId,
    sessionId
  );

  const assignment =
    await getAssignmentForSessionUser(
      client,
      userId,
      session.workout_assignment_id
    );

  const sessionExercises =
    await getSessionExercises(
      client,
      session.id
    );

  const setResult = await client.query(
    `
    SELECT
      ws.id,
      ws.session_exercise_id,
      ws.set_number,
      ws.target_reps,
      ws.target_weight,
      ws.target_duration_seconds,
      ws.target_distance,
      ws.suggested_reps,
      ws.suggested_weight,
      ws.actual_reps,
      ws.actual_weight,
      ws.actual_duration_seconds,
      ws.actual_distance,
      ws.completed_at,
      ws.status,
      ws.notes,
      ws.started_at

    FROM workout_sets ws

    INNER JOIN workout_session_exercises wse
      ON wse.id = ws.session_exercise_id

    WHERE
      wse.session_id = $1

    ORDER BY
      wse.display_order ASC,
      ws.set_number ASC
    `,
    [session.id]
  );

  const setByExercise = new Map();

  for (const row of setResult.rows) {
    const mapped = {
      ...row,
      set_index: Number(row.set_number) - 1,
      reps_completed: row.actual_reps,
      weight_kg: row.actual_weight,
      duration_seconds: row.actual_duration_seconds,
      distance: row.actual_distance,
    };

    if (!setByExercise.has(row.session_exercise_id)) {
      setByExercise.set(
        row.session_exercise_id,
        []
      );
    }

    setByExercise
      .get(row.session_exercise_id)
      .push(mapped);
  }

  const live = applyElapsedRunningAndRest(
    session
  );

  const elapsedSeconds =
    live.activeSeconds;

  const restRemainingSeconds =
    live.restActive
      ? Math.max(
          0,
          live.restTargetSeconds -
            secondsBetween(live.restStartedAt)
        )
      : 0;

  const enrichedExercises =
    sessionExercises.map((exercise) => ({
      ...exercise,
      sets:
        setByExercise.get(exercise.id) ||
        [],
    }));

  const currentExercise =
    enrichedExercises[
      Number(session.current_exercise_index)
    ] || null;

  return {
    ...session,
    finished_at: session.completed_at,
    calories_burned_active:
      session.estimated_calories,
    current_elapsed_seconds:
      elapsedSeconds,
    total_elapsed_seconds:
      secondsBetween(
        session.started_at,
        session.completed_at || live.now
      ),
    rest_remaining_seconds:
      restRemainingSeconds,
    current_set_number:
      Number(session.current_set_index) + 1,
    current_exercise_index:
      Number(session.current_exercise_index),
    completion_percent:
      calculateCompletionPercent(session),
    current_exercise_id:
      currentExercise?.id || null,
    assignment: {
      ...(assignment || {}),
      exercises: enrichedExercises,
    },
  };
};

/* =========================================================
   START
========================================================= */

export const startWorkoutSessionService = async (
  userId,
  assignmentId
) => {
  const normalizedAssignmentId = Number(
    assignmentId
  );

  if (
    !Number.isInteger(normalizedAssignmentId) ||
    normalizedAssignmentId <= 0
  ) {
    throw new Error(
      "Invalid workout assignment id."
    );
  }

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const assignment =
      await getClientAssignmentForUser(
        client,
        userId,
        normalizedAssignmentId
      );

    if (
      !assignment ||
      String(assignment.status).toUpperCase() !==
        "ACTIVE"
    ) {
      throw new Error(
        "Workout assignment is not active."
      );
    }

    const existingResult = await client.query(
      `
      SELECT
        id,
        workout_assignment_id
      FROM workout_sessions
      WHERE
        user_id = $1
        AND status IN ('RUNNING', 'PAUSED')
      ORDER BY id DESC
      LIMIT 1
      FOR UPDATE
      `,
      [userId]
    );

    if (existingResult.rows.length) {
      const existing =
        existingResult.rows[0];

      if (
        Number(existing.workout_assignment_id) ===
        normalizedAssignmentId
      ) {
        await client.query("COMMIT");
        return getWorkoutSessionService(
          userId,
          Number(existing.id)
        );
      }

      const error = new Error(
        "You already have another workout in progress."
      );

      error.code =
        "ACTIVE_WORKOUT_EXISTS";

      error.activeSessionId = Number(
        existing.id
      );

      throw error;
    }

    const assignmentExercises =
      await getAssignmentExercises(
        client,
        normalizedAssignmentId
      );

    if (!assignmentExercises.length) {
      throw new Error(
        "This workout has no exercises to perform."
      );
    }

    const totalSets =
      assignmentExercises.reduce(
        (total, exercise) =>
          total +
          setsForExercise(exercise),
        0
      );

    const startedAt = nowDate();

    const sessionResult =
      await client.query(
        `
        INSERT INTO workout_sessions (
          user_id,
          organization_id,
          workout_assignment_id,
          trainer_member_id,
          client_member_id,
          workout_template_id,
          started_at,
          last_resumed_at,
          status,
          total_sets,
          duration_seconds
        )
        VALUES (
          $1,
          $2,
          $3,
          $4,
          $5,
          $6,
          $7,
          $7,
          'RUNNING',
          $8,
          0
        )
        RETURNING id
        `,
        [
          userId,
          assignment.organization_id,
          normalizedAssignmentId,
          assignment.trainer_member_id,
          assignment.client_member_id,
          assignment.workout_template_id,
          startedAt,
          totalSets,
        ]
      );

    const sessionId = Number(
      sessionResult.rows[0].id
    );

    for (
      let index = 0;
      index < assignmentExercises.length;
      index += 1
    ) {
      const exercise =
        assignmentExercises[index];

      const sessionExerciseResult =
        await client.query(
          `
          INSERT INTO workout_session_exercises (
            session_id,
            assignment_exercise_id,
            exercise_id,
            exercise_name_snapshot,
            display_order,
            target_sets,
            target_reps,
            target_weight,
            target_duration_seconds,
            target_distance,
            rest_seconds,
            tracking_type_snapshot,
            exercise_environment_snapshot,
            difficulty_snapshot,
            instructions_snapshot,
            image_url_snapshot,
            video_url_snapshot,
            primary_muscle_group_snapshot,
            met_value_snapshot,
            status,
            started_at
          )
          VALUES (
            $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,
            $12,$13,$14,$15,$16,$17,$18,
            $19,$20,$21
          )
          RETURNING id
          `,
          [
            sessionId,
            exercise.id,
            exercise.exercise_id,
            exercise.exercise_name || "Exercise",
            exercise.display_order ?? index + 1,
            exercise.target_sets,
            exercise.target_reps,
            exercise.target_weight,
            exercise.target_duration_seconds,
            exercise.target_distance,
            exercise.rest_seconds,
            exercise.tracking_type,
            exercise.exercise_environment,
            exercise.difficulty,
            exercise.instructions,
            exercise.image_url,
            exercise.video_url,
            exercise.primary_muscle_group,
            exercise.met_value,
            index === 0
              ? "IN_PROGRESS"
              : "PENDING",
            index === 0
              ? startedAt
              : null,
          ]
        );

      const sessionExerciseId =
        Number(
          sessionExerciseResult.rows[0].id
        );

      const totalExerciseSets =
        setsForExercise(exercise);

      for (
        let setNumber = 1;
        setNumber <= totalExerciseSets;
        setNumber += 1
      ) {
        await client.query(
          `
          INSERT INTO workout_sets (
            session_exercise_id,
            set_number,
            target_reps,
            target_weight,
            target_duration_seconds,
            target_distance,
            suggested_reps,
            suggested_weight,
            status
          )
          VALUES ($1,$2,$3,$4,$5,$6,$3,$4,'PENDING')
          `,
          [
            sessionExerciseId,
            setNumber,
            exercise.target_reps,
            exercise.target_weight,
            exercise.target_duration_seconds,
            exercise.target_distance,
          ]
        );
      }
    }

    await client.query("COMMIT");

    return getWorkoutSessionService(
      userId,
      sessionId
    );
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

/* =========================================================
   READ / RESUME
========================================================= */

export const getWorkoutSessionService = async (
  userId,
  sessionId
) => {
  const normalizedSessionId = Number(
    sessionId
  );

  if (
    !Number.isInteger(normalizedSessionId) ||
    normalizedSessionId <= 0
  ) {
    throw new Error(
      "Invalid workout session id."
    );
  }

  const client = await pool.connect();

  try {
    return await getSessionPayload(
      client,
      userId,
      normalizedSessionId
    );
  } finally {
    client.release();
  }
};

export const getActiveWorkoutSessionService = async (
  userId
) => {
  const result = await pool.query(
    `
    SELECT id
    FROM workout_sessions
    WHERE
      user_id = $1
      AND status IN ('RUNNING','PAUSED')
    ORDER BY id DESC
    LIMIT 1
    `,
    [userId]
  );

  if (!result.rows.length) {
    return null;
  }

  return getWorkoutSessionService(
    userId,
    Number(result.rows[0].id)
  );
};

/* =========================================================
   PAUSE / RESUME
========================================================= */

export const pauseWorkoutSessionService = async (
  userId,
  sessionId
) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const session =
      await getSessionForUser(
        client,
        userId,
        Number(sessionId),
        true
      );

    if (session.status !== "RUNNING") {
      await client.query("ROLLBACK");
      return getWorkoutSessionService(
        userId,
        Number(session.id)
      );
    }

    const live =
      applyElapsedRunningAndRest(
        session,
        { flushRest: true }
      );

    const pausedAt = live.now;

    await client.query(
      `
      UPDATE workout_sessions
      SET
        status = 'PAUSED',
        active_seconds = $1,
        rest_seconds = $2,
        paused_at = $3,
        last_resumed_at = NULL,
        rest_active = false,
        rest_started_at = NULL,
        rest_target_seconds = 0,
        rest_for_session_exercise_id = NULL,
        duration_seconds = $4,
        updated_at = NOW()
      WHERE
        id = $5
        AND user_id = $6
      `,
      [
        live.activeSeconds,
        live.restSeconds,
        pausedAt,
        secondsBetween(
          session.started_at,
          pausedAt
        ),
        session.id,
        userId,
      ]
    );

    await client.query("COMMIT");

    return getWorkoutSessionService(
      userId,
      Number(session.id)
    );
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

export const resumeWorkoutSessionService = async (
  userId,
  sessionId
) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const session =
      await getSessionForUser(
        client,
        userId,
        Number(sessionId),
        true
      );

    if (session.status === "RUNNING") {
      await client.query("COMMIT");
      return getWorkoutSessionService(
        userId,
        Number(session.id)
      );
    }

    if (session.status !== "PAUSED") {
      throw new Error(
        "Finished workouts cannot be resumed."
      );
    }

    const resumedAt = nowDate();

    const pauseSeconds = secondsBetween(
      session.paused_at,
      resumedAt
    );

    await client.query(
      `
      UPDATE workout_sessions
      SET
        status = 'RUNNING',
        manual_pause_seconds =
          manual_pause_seconds + $1,
        last_resumed_at = $2,
        paused_at = NULL,
        updated_at = NOW()
      WHERE
        id = $3
        AND user_id = $4
      `,
      [
        pauseSeconds,
        resumedAt,
        session.id,
        userId,
      ]
    );

    await client.query("COMMIT");

    return getWorkoutSessionService(
      userId,
      Number(session.id)
    );
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

/* =========================================================
   SET INPUT / PROGRESSION
========================================================= */

const validateSetInput = (payload = {}) => {
  const values = {};

  if (
    payload.repsCompleted !== undefined &&
    payload.repsCompleted !== null &&
    payload.repsCompleted !== ""
  ) {
    values.repsCompleted = Number(
      payload.repsCompleted
    );
  }

  if (
    payload.weightKg !== undefined &&
    payload.weightKg !== null &&
    payload.weightKg !== ""
  ) {
    values.weightKg = Number(
      payload.weightKg
    );
  }

  if (
    payload.durationSeconds !== undefined &&
    payload.durationSeconds !== null &&
    payload.durationSeconds !== ""
  ) {
    values.durationSeconds = Number(
      payload.durationSeconds
    );
  }

  if (
    payload.distance !== undefined &&
    payload.distance !== null &&
    payload.distance !== ""
  ) {
    values.distance = Number(
      payload.distance
    );
  }

  for (const [key, value] of Object.entries(
    values
  )) {
    if (
      !Number.isFinite(value) ||
      value < 0
    ) {
      throw new Error(
        `${key} must be a non-negative number.`
      );
    }
  }

  return values;
};

const advanceSet = ({
  exerciseIndex,
  setIndex,
  exercises,
}) => {
  let nextExerciseIndex =
    exerciseIndex;
  let nextSetIndex = setIndex;
  let completedExercise = false;

  const currentExercise =
    exercises[exerciseIndex];

  const currentExerciseSets =
    setsForExercise(currentExercise);

  if (
    setIndex + 1 < currentExerciseSets
  ) {
    nextSetIndex += 1;
  } else {
    completedExercise = true;
    nextExerciseIndex += 1;
    nextSetIndex = 0;
  }

  return {
    nextExerciseIndex,
    nextSetIndex,
    completedExercise,
    done:
      nextExerciseIndex >=
      exercises.length,
  };
};

const updateCurrentSetService = async (
  userId,
  sessionId,
  payload,
  finalStatus
) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const session =
      await getSessionForUser(
        client,
        userId,
        Number(sessionId),
        true
      );

    if (session.status !== "RUNNING") {
      throw new Error(
        "Workout is not running."
      );
    }

    const live =
      applyElapsedRunningAndRest(
        session,
        { flushRest: false }
      );

    if (live.restActive) {
      const remaining = Math.max(
        0,
        live.restTargetSeconds -
          secondsBetween(
            live.restStartedAt
          )
      );

      if (remaining > 0) {
        const error = new Error(
          "Rest period is still active."
        );

        error.code =
          "REST_ACTIVE";
        error.restRemainingSeconds =
          remaining;

        throw error;
      }
    }

    const sessionExercises =
      await getSessionExercises(
        client,
        session.id
      );

    const currentExercise =
      sessionExercises[
        Number(session.current_exercise_index)
      ];

    if (!currentExercise) {
      throw new Error(
        "All exercises are already completed."
      );
    }

    const currentSetIndex =
      Number(session.current_set_index);

    const setNumber =
      currentSetIndex + 1;

    const setInput =
      validateSetInput(payload);

    const existingSetResult =
      await client.query(
        `
        SELECT *
        FROM workout_sets
        WHERE
          session_exercise_id = $1
          AND set_number = $2
        FOR UPDATE
        `,
        [
          currentExercise.id,
          setNumber,
        ]
      );

    if (!existingSetResult.rows.length) {
      throw new Error(
        "Current workout set not found."
      );
    }

    const existingSet =
      existingSetResult.rows[0];

    if (
      existingSet.status !==
      "PENDING"
    ) {
      throw new Error(
        "Current workout set has already been recorded."
      );
    }

    const completedAt = nowDate();

    await client.query(
      `
      UPDATE workout_sets
      SET
        status = $1,
        actual_reps = COALESCE($2, actual_reps),
        actual_weight = COALESCE($3, actual_weight),
        actual_duration_seconds = COALESCE(
          $4,
          actual_duration_seconds
        ),
        actual_distance = COALESCE(
          $5,
          actual_distance
        ),
        started_at = COALESCE(
          started_at,
          $6
        ),
        completed_at = $6,
        updated_at = NOW()
      WHERE id = $7
      `,
      [
        finalStatus === "COMPLETE"
          ? "COMPLETED"
          : "SKIPPED",
        setInput.repsCompleted ?? null,
        setInput.weightKg ?? null,
        setInput.durationSeconds ?? null,
        setInput.distance ?? null,
        completedAt,
        existingSet.id,
      ]
    );

    const movement =
      advanceSet({
        exerciseIndex:
          Number(
            session.current_exercise_index
          ),
        setIndex: currentSetIndex,
        exercises:
          sessionExercises,
      });

    const completedSets =
      Number(session.completed_sets || 0) +
      (finalStatus === "COMPLETE"
        ? 1
        : 0);

    const skippedSets =
      Number(session.skipped_sets || 0) +
      (finalStatus === "SKIPPED"
        ? 1
        : 0);

    const completedExercises =
      Number(
        session.completed_exercises || 0
      ) +
      (movement.completedExercise
        ? 1
        : 0);

    let restActive = false;
    let restStartedAt = null;
    let restTargetSeconds = 0;
    let restForSessionExerciseId =
      null;

    const restSeconds = Number(
      currentExercise.rest_seconds || 0
    );

    if (
      restSeconds > 0 &&
      !movement.done
    ) {
      restActive = true;
      restStartedAt = completedAt;
      restTargetSeconds = restSeconds;
      restForSessionExerciseId =
        currentExercise.id;
    }

    if (
      movement.completedExercise
    ) {
      await client.query(
        `
        UPDATE workout_session_exercises
        SET
          status = 'COMPLETED',
          completed_at = $1
        WHERE id = $2
        `,
        [
          completedAt,
          currentExercise.id,
        ]
      );
    }

    const nextExercise =
      sessionExercises[
        movement.nextExerciseIndex
      ];

    if (
      nextExercise &&
      movement.completedExercise
    ) {
      await client.query(
        `
        UPDATE workout_session_exercises
        SET
          status = 'IN_PROGRESS',
          started_at = COALESCE(
            started_at,
            $1
          )
        WHERE id = $2
        `,
        [
          completedAt,
          nextExercise.id,
        ]
      );
    }

    const completionPercent =
      Math.min(
        100,
        ((completedSets + skippedSets) *
          100) /
          Number(session.total_sets || 1)
      );

    await client.query(
      `
      UPDATE workout_sessions
      SET
        active_seconds = $1,
        rest_seconds = $2,
        current_exercise_index = $3,
        current_set_index = $4,
        completed_sets = $5,
        skipped_sets = $6,
        completed_exercises = $7,
        completion_percent = $8,
        rest_active = $9,
        rest_started_at = $10,
        rest_target_seconds = $11,
        rest_for_session_exercise_id = $12,
        duration_seconds = $13,
        updated_at = NOW()
      WHERE
        id = $14
        AND user_id = $15
      `,
      [
        live.activeSeconds,
        live.restSeconds,
        movement.nextExerciseIndex,
        movement.nextSetIndex,
        completedSets,
        skippedSets,
        completedExercises,
        completionPercent,
        restActive,
        restStartedAt,
        restTargetSeconds,
        restForSessionExerciseId,
        secondsBetween(
          session.started_at,
          completedAt
        ),
        session.id,
        userId,
      ]
    );

    await client.query("COMMIT");

    return getWorkoutSessionService(
      userId,
      Number(session.id)
    );
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

export const completeWorkoutSetService = async (
  userId,
  sessionId,
  payload = {}
) => {
  return updateCurrentSetService(
    userId,
    sessionId,
    payload,
    "COMPLETE"
  );
};

export const skipWorkoutSetService = async (
  userId,
  sessionId,
  payload = {}
) => {
  return updateCurrentSetService(
    userId,
    sessionId,
    payload,
    "SKIPPED"
  );
};

/* =========================================================
   REST TIMER
========================================================= */

export const skipWorkoutRestService = async (
  userId,
  sessionId
) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const session =
      await getSessionForUser(
        client,
        userId,
        Number(sessionId),
        true
      );

    if (
      session.status !== "RUNNING"
    ) {
      throw new Error(
        "Workout is not running."
      );
    }

    if (
      !session.rest_active ||
      !session.rest_started_at
    ) {
      await client.query("COMMIT");

      return getWorkoutSessionService(
        userId,
        Number(session.id)
      );
    }

    const elapsed = secondsBetween(
      session.rest_started_at
    );

    await client.query(
      `
      UPDATE workout_sessions
      SET
        rest_seconds = rest_seconds + $1,
        rest_active = false,
        rest_started_at = NULL,
        rest_target_seconds = 0,
        rest_for_session_exercise_id = NULL,
        updated_at = NOW()
      WHERE
        id = $2
        AND user_id = $3
      `,
      [
        Math.min(
          elapsed,
          Number(
            session.rest_target_seconds || 0
          )
        ),
        session.id,
        userId,
      ]
    );

    await client.query("COMMIT");

    return getWorkoutSessionService(
      userId,
      Number(session.id)
    );
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

export const extendWorkoutRestService = async (
  userId,
  sessionId,
  seconds = 30
) => {
  const addSeconds = Math.min(
    120,
    Math.max(
      5,
      toInt(seconds, 30)
    )
  );

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const session =
      await getSessionForUser(
        client,
        userId,
        Number(sessionId),
        true
      );

    if (
      session.status !== "RUNNING"
    ) {
      throw new Error(
        "Workout is not running."
      );
    }

    if (!session.rest_active) {
      throw new Error(
        "No active rest period."
      );
    }

    await client.query(
      `
      UPDATE workout_sessions
      SET
        rest_target_seconds =
          rest_target_seconds + $1,
        updated_at = NOW()
      WHERE
        id = $2
        AND user_id = $3
      `,
      [
        addSeconds,
        session.id,
        userId,
      ]
    );

    await client.query("COMMIT");

    return getWorkoutSessionService(
      userId,
      Number(session.id)
    );
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

/* =========================================================
   FINISH
========================================================= */

export const finishWorkoutSessionService = async (
  userId,
  sessionId
) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const session =
      await getSessionForUser(
        client,
        userId,
        Number(sessionId),
        true
      );

    if (
      session.status === "FINISHED"
    ) {
      await client.query("COMMIT");

      return getWorkoutSessionService(
        userId,
        Number(session.id)
      );
    }

    const live =
      applyElapsedRunningAndRest(
        session,
        { flushRest: true }
      );

    const activeSeconds =
      live.activeSeconds;

    let manualPauseSeconds = Number(
      session.manual_pause_seconds || 0
    );

    if (
      session.status === "PAUSED" &&
      session.paused_at
    ) {
      manualPauseSeconds += secondsBetween(
        session.paused_at
      );
    }

    const completionPercent =
      calculateCompletionPercent(
        session
      );

    const burn = await calculateBurn(
      client,
      session.id,
      userId,
      activeSeconds,
      live.restSeconds
    );

    const finishedAt = live.now;

    await client.query(
      `
      UPDATE workout_sessions
      SET
        status = 'FINISHED',
        active_seconds = $1,
        manual_pause_seconds = $2,
        rest_seconds = $3,
        completed_at = $4,
        paused_at = NULL,
        last_resumed_at = NULL,
        rest_active = false,
        rest_started_at = NULL,
        rest_target_seconds = 0,
        rest_for_session_exercise_id = NULL,
        duration_seconds = $5,
        completion_percent = $6,
        estimated_calories = $7,
        burn_confidence = $8,
        updated_at = NOW()
      WHERE
        id = $9
        AND user_id = $10
      `,
      [
        activeSeconds,
        manualPauseSeconds,
        live.restSeconds,
        finishedAt,
        secondsBetween(
          session.started_at,
          finishedAt
        ),
        completionPercent,
        burn.caloriesBurnedActive,
        burn.burnConfidence,
        session.id,
        userId,
      ]
    );

    await client.query("COMMIT");

    return getWorkoutSessionService(
      userId,
      Number(session.id)
    );
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

/* =========================================================
   HISTORY
========================================================= */

export const getWorkoutSessionHistoryService = async (
  userId,
  limit = 30
) => {
  const safeLimit = Math.min(
    100,
    Math.max(1, toInt(limit, 30))
  );

  const result = await pool.query(
    `
    SELECT
      ws.id,
      ws.workout_assignment_id,
      ws.status,
      ws.started_at,
      ws.completed_at AS finished_at,
      ws.duration_seconds,
      ws.active_seconds,
      ws.manual_pause_seconds,
      ws.rest_seconds,
      ws.completed_sets,
      ws.skipped_sets,
      ws.completed_exercises,
      ws.completion_percent,
      ws.estimated_calories AS calories_burned_active,
      ws.burn_confidence,
      wt.name AS workout_name,
      org.name AS organization_name

    FROM workout_sessions ws

    LEFT JOIN workout_assignments wa
      ON wa.id = ws.workout_assignment_id

    LEFT JOIN workout_templates wt
      ON wt.id = wa.workout_template_id

    LEFT JOIN organizations org
      ON org.id = ws.organization_id

    WHERE
      ws.user_id = $1
      AND ws.status = 'FINISHED'

    ORDER BY
      ws.completed_at DESC NULLS LAST,
      ws.id DESC

    LIMIT $2
    `,
    [userId, safeLimit]
  );

  return result.rows;
};

export default {
  startWorkoutSessionService,
  getWorkoutSessionService,
  getActiveWorkoutSessionService,
  pauseWorkoutSessionService,
  resumeWorkoutSessionService,
  completeWorkoutSetService,
  skipWorkoutSetService,
  skipWorkoutRestService,
  extendWorkoutRestService,
  finishWorkoutSessionService,
  getWorkoutSessionHistoryService,
};