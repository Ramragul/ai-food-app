import pool from "../db/connection.js";

const getClientMemberIds = async (client, userId) => {
  const result = await client.query(
    `
    SELECT
      om.id AS client_member_id,
      om.organization_id
    FROM organization_members om
    INNER JOIN organization_roles r
      ON r.id = om.role_id
    WHERE
      om.user_id = $1
      AND om.status = 'ACTIVE'
      AND UPPER(r.name) = 'CLIENT'
    ORDER BY om.id ASC
    `,
    [userId]
  );

  return result.rows;
};

export const getClientWorkoutAssignmentsService = async (userId) => {
  const result = await pool.query(
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
      trainer_user.nickname AS trainer_nickname,

      COUNT(wae.id)::INTEGER AS exercise_count

    FROM workout_assignments wa

    INNER JOIN organization_members client_member
      ON client_member.id = wa.client_member_id
     AND client_member.user_id = $1
     AND client_member.status = 'ACTIVE'

    INNER JOIN workout_templates wt
      ON wt.id = wa.workout_template_id

    LEFT JOIN workout_training_goals tg
      ON tg.id = wt.training_goal_id

    LEFT JOIN workout_muscle_groups pmg
      ON pmg.id = wt.primary_muscle_group_id

    INNER JOIN organizations org
      ON org.id = wa.organization_id

    LEFT JOIN organization_members trainer_member
      ON trainer_member.id = wa.trainer_member_id

    LEFT JOIN users trainer_user
      ON trainer_user.id = trainer_member.user_id

    LEFT JOIN workout_assignment_exercises wae
      ON wae.workout_assignment_id = wa.id

    WHERE
      wa.status = 'ACTIVE'

    GROUP BY
      wa.id,
      wt.id,
      tg.id,
      pmg.id,
      org.id,
      trainer_user.id

    ORDER BY
      wa.start_date DESC,
      wa.created_at DESC,
      wa.id DESC
    `,
    [userId]
  );

  return result.rows;
};

export const getClientWorkoutAssignmentByIdService = async (
  userId,
  assignmentId
) => {
  const normalizedAssignmentId = Number(assignmentId);

  if (!Number.isInteger(normalizedAssignmentId) || normalizedAssignmentId <= 0) {
    throw new Error("Invalid workout assignment id.");
  }

  const client = await pool.connect();

  try {
    const assignmentResult = await client.query(
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
       AND client_member.status = 'ACTIVE'

      INNER JOIN workout_templates wt
        ON wt.id = wa.workout_template_id

      LEFT JOIN workout_training_goals tg
        ON tg.id = wt.training_goal_id

      LEFT JOIN workout_muscle_groups pmg
        ON pmg.id = wt.primary_muscle_group_id

      INNER JOIN organizations org
        ON org.id = wa.organization_id

      LEFT JOIN organization_members trainer_member
        ON trainer_member.id = wa.trainer_member_id

      LEFT JOIN users trainer_user
        ON trainer_user.id = trainer_member.user_id

      WHERE
        wa.id = $2

      LIMIT 1
      `,
      [userId, normalizedAssignmentId]
    );

    if (!assignmentResult.rows.length) {
      throw new Error("Workout assignment not found.");
    }

    const exerciseResult = await client.query(
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
        COALESCE(wae.exercise_description_snapshot, e.description) AS exercise_description,
        COALESCE(wae.tracking_type_snapshot, e.tracking_type) AS tracking_type,
        COALESCE(wae.exercise_environment_snapshot, e.environment) AS exercise_environment,
        COALESCE(wae.difficulty_snapshot, e.difficulty) AS difficulty,
        COALESCE(wae.instructions_snapshot, e.instructions) AS instructions,
        COALESCE(wae.image_url_snapshot, e.image_url) AS image_url,
        COALESCE(wae.video_url_snapshot, e.video_url) AS video_url,
        COALESCE(wae.primary_muscle_group_snapshot, mg.name) AS primary_muscle_group,
        COALESCE(wae.met_value_snapshot, e.met_value) AS met_value

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
      [normalizedAssignmentId]
    );

    return {
      ...assignmentResult.rows[0],
      exercises: exerciseResult.rows,
    };
  } finally {
    client.release();
  }
};

/* Exported for session validation and future reuse. */
export const getClientAssignmentForUser = async (client, userId, assignmentId) => {
  const result = await client.query(
    `
    SELECT
      wa.id,
      wa.organization_id,
      wa.workout_template_id,
      wa.client_member_id,
      wa.trainer_member_id,
      wa.status
    FROM workout_assignments wa
    INNER JOIN organization_members om
      ON om.id = wa.client_member_id
     AND om.user_id = $1
     AND om.status = 'ACTIVE'
    WHERE wa.id = $2
    LIMIT 1
    `,
    [userId, assignmentId]
  );

  return result.rows[0] ?? null;
};

export default {
  getClientWorkoutAssignmentsService,
  getClientWorkoutAssignmentByIdService,
  getClientAssignmentForUser,
};