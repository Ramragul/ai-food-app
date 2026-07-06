import pool from "../../db/connection.js";

/* ======================================================
   GET MY CLIENTS
====================================================== */

export const getMyClientsService = async (
  userId
) => {

  const client = await pool.connect();

  try {

    const result =
      await client.query(
        `
        SELECT

          oca.id AS assignment_id,

          om.id AS client_member_id,

          u.id AS client_user_id,

          u.name,

          u.nickname,

          u.mobile,

          u.email,

          oc.granted AS consent_granted,

          oca.assigned_at,

          o.id AS organization_id,

          o.name AS organization_name

        FROM organization_client_assignments oca

        INNER JOIN organization_members trainer
          ON trainer.id = oca.trainer_member_id

        INNER JOIN organization_members om
          ON om.id = oca.client_member_id

        INNER JOIN users u
          ON u.id = om.user_id

        INNER JOIN organizations o
          ON o.id = oca.organization_id

        LEFT JOIN organization_consents oc
          ON oc.organization_id = oca.organization_id
         AND oc.client_user_id = om.user_id

        WHERE

          trainer.user_id = $1

          AND trainer.status = 'ACTIVE'

          AND oca.is_active = true

        ORDER BY

          u.name
        `,
        [
          userId
        ]
      );

    return result.rows;

  } finally {

    client.release();

  }

};


/* ======================================================
   COACH DASHBOARD
====================================================== */

export const getDashboardService = async (
  userId
) => {

  const client = await pool.connect();

  try {

    /* ---------------------------------------------
       COACH INFO
    ---------------------------------------------- */

    const coachResult =
      await client.query(
        `
        SELECT
          id,
          name,
          nickname,
          email,
          mobile
        FROM users
        WHERE id = $1
        LIMIT 1
        `,
        [
          userId
        ]
      );

    /* ---------------------------------------------
       DASHBOARD SUMMARY
    ---------------------------------------------- */

    const summaryResult =
      await client.query(
        `
        SELECT

          COUNT(*) AS total_clients,

          SUM(
            CASE
              WHEN COALESCE(oc.granted,false) = false
              THEN 1
              ELSE 0
            END
          ) AS pending_consents

        FROM organization_client_assignments oca

        INNER JOIN organization_members coach
          ON coach.id = oca.trainer_member_id

        INNER JOIN organization_members client_member
          ON client_member.id = oca.client_member_id

        LEFT JOIN organization_consents oc
          ON oc.organization_id = oca.organization_id
         AND oc.client_user_id = client_member.user_id

        WHERE

          coach.user_id = $1

          AND coach.status = 'ACTIVE'

          AND oca.is_active = true
        `,
        [
          userId
        ]
      );

    /* ---------------------------------------------
       MY CLIENTS
    ---------------------------------------------- */

    const clients =
      await getMyClientsService(
        userId
      );

    return {

      coach:
        coachResult.rows[0],

      summary: {

        total_clients:
          Number(
            summaryResult.rows[0]
              .total_clients
          ),

        pending_consents:
          Number(
            summaryResult.rows[0]
              .pending_consents || 0
          )

      },

      clients

    };

  } finally {

    client.release();

  }

};


/* ======================================================
   CLIENT DETAILS
====================================================== */

export const getClientDetailsService = async (
  coachUserId,
  clientMemberId
) => {

  const client = await pool.connect();

  try {

    /* ---------------------------------------------
       VERIFY ASSIGNMENT
    ---------------------------------------------- */

    const assignmentResult =
      await client.query(
        `
        SELECT

          oca.organization_id,

          om.user_id AS client_user_id,

          oc.granted AS consent_granted

        FROM organization_client_assignments oca

        INNER JOIN organization_members coach
          ON coach.id = oca.trainer_member_id

        INNER JOIN organization_members om
          ON om.id = oca.client_member_id

        LEFT JOIN organization_consents oc
          ON oc.organization_id = oca.organization_id
         AND oc.client_user_id = om.user_id

        WHERE

          coach.user_id = $1

          AND oca.client_member_id = $2

          AND coach.status = 'ACTIVE'

          AND oca.is_active = true

        LIMIT 1
        `,
        [
          coachUserId,
          clientMemberId
        ]
      );

    if (!assignmentResult.rows.length) {

      throw new Error(
        "Client not assigned to you."
      );

    }

    const assignment =
      assignmentResult.rows[0];

          /* ---------------------------------------------
       CLIENT PROFILE
    ---------------------------------------------- */

    const profileResult =
      await client.query(
        `
        SELECT

          id,

          name,

          nickname,

          mobile,

          email,

          gender,

          age_range,

          created_at

        FROM users

        WHERE

          id = $1

        LIMIT 1
        `,
        [
          assignment.client_user_id
        ]
      );

    if (!profileResult.rows.length) {

      throw new Error(
        "Client not found."
      );

    }

    const profile =
      profileResult.rows[0];


          /* ---------------------------------------------
       CONSENT CHECK
    ---------------------------------------------- */

    if (
      !assignment.consent_granted
    ) {

      return {

        profile,

consent: {

  granted: false,

  status: "PENDING",

  message:
    "Client has not granted health data access."

},

        goal: null,

        today: null,

        recent_meals: [],

        coach_notes: []

      };

    } 



/* ---------------------------------------------
   ACTIVE FITNESS PROFILE
---------------------------------------------- */

const goalResult =
  await client.query(
    `
    SELECT

      id,

      goal_type,

      activity_level,

      height_cm,

      weight_kg,

      target_weight,

      duration_days,

      target_calories,

      protein_target,

      carbs_target,

      fats_target,

      food_preference,

      meal_plan_enabled,

      goal_mode,

      target_source,

      created_at,

      updated_at

    FROM user_profile

    WHERE

      user_id = $1

      AND is_active = true

    LIMIT 1
    `,
    [
      assignment.client_user_id
    ]
  );

const fitnessProfile =
  goalResult.rows.length
    ? goalResult.rows[0]
    : null;


    /* ---------------------------------------------
   TODAY'S NUTRITION
---------------------------------------------- */

const nutritionResult =
  await client.query(
    `
    SELECT

      total_calories,

      protein,

      carbs,

      fats,

      fiber

    FROM daily_nutrition

    WHERE

      user_id = $1

      AND date = CURRENT_DATE

    LIMIT 1
    `,
    [
      assignment.client_user_id
    ]
  );

const today =
  nutritionResult.rows.length
    ? nutritionResult.rows[0]
    : null;



        /* ---------------------------------------------
       TODAY SUMMARY
    ---------------------------------------------- */

    let todaySummary = null;

    if (goal && today) {

      todaySummary = {

        target: {

          calories:
            goal.target_calories,

          protein:
            goal.target_protein,

          carbs:
            goal.target_carbs,

          fats:
            goal.target_fats

        },

        consumed: {

          calories:
            today.calories,

          protein:
            today.protein,

          carbs:
            today.carbs,

          fats:
            today.fats,

          water:
            today.water

        },

        remaining: {

          calories:
            Math.max(
              0,
              goal.target_calories - today.calories
            ),

          protein:
            Math.max(
              0,
              goal.target_protein - today.protein
            ),

          carbs:
            Math.max(
              0,
              goal.target_carbs - today.carbs
            ),

          fats:
            Math.max(
              0,
              goal.target_fats - today.fats
            )

        }

      };

    }

    /* ---------------------------------------------
       PERMISSIONS
    ---------------------------------------------- */

    const permissions = {

      can_view_profile: true,

      can_view_nutrition:
        true,

      can_write_notes:
        true,

      can_create_goal:
        true

    };

    /* ---------------------------------------------
       RESPONSE
    ---------------------------------------------- */

    return {

      client: profile,

      consent: {

        granted: true,

        status: "GRANTED"

      },

      fitness_profile: goal,

      today: todaySummary,

      coach_notes: [],

      analytics: {},

      permissions

    };

  } finally {

    client.release();

  }

};


  