import pool from "../../db/connection.js";


const getClientStatus = (

  consumedCalories,

  targetCalories

) => {

  if (!targetCalories) {

    return {

      code: "NO_GOAL",

      label: "No Goal",

      color: "gray",

      progress: 0

    };

  }

  const progress = Math.min(
    100,
    Math.round(
      (consumedCalories / targetCalories) * 100
    )
  );

  if (consumedCalories === 0) {

    return {

      code: "NOT_STARTED",

      label: "Not Started",

      color: "gray",

      progress

    };

  }

  if (progress >= 80) {

    return {

      code: "ON_TRACK",

      label: "On Track",

      color: "green",

      progress

    };

  }

  return {

    code: "PENDING",

    label: "Needs Attention",

    color: "orange",

    progress

  };

};


const getGoal = (goalType) => {

  const labels = {

    lean_muscle_gain: "Lean Muscle Gain",

    weight_loss: "Weight Loss",

    fat_loss: "Fat Loss",

    maintenance: "Maintenance",

    bulk_up: "Bulk Up",

    strength_gain: "Strength Gain",

    athletic_performance: "Athletic Performance",

    healthy_lifestyle: "Healthy Lifestyle"

  };

  return {

    code: goalType,

    label: labels[goalType] || "Unknown"

  };

};


const buildNutrition = (

    targetCalories,
    consumedCalories,

    targetProtein,
    consumedProtein,

    targetCarbs,
    consumedCarbs,

    targetFats,
    consumedFats,

    consumedFiber

) => ({

    calories: {

        target: targetCalories,

        consumed: consumedCalories,

        progress: targetCalories
            ? Math.round(
                consumedCalories * 100 / targetCalories
            )
            : 0

    },

    protein: {

        target: targetProtein,

        consumed: consumedProtein,

        progress: targetProtein
            ? Math.round(
                consumedProtein * 100 / targetProtein
            )
            : 0

    },

    carbs: {

        target: targetCarbs,

        consumed: consumedCarbs,

        progress: targetCarbs
            ? Math.round(
                consumedCarbs * 100 / targetCarbs
            )
            : 0

    },

    fats: {

        target: targetFats,

        consumed: consumedFats,

        progress: targetFats
            ? Math.round(
                consumedFats * 100 / targetFats
            )
            : 0

    },

    fiber: {

        consumed: consumedFiber

    }

});

/* ======================================================
   GET MY CLIENTS
====================================================== */

// export const getMyClientsService = async (
//   userId
// ) => {

//   const client = await pool.connect();

//   try {

//     const result =
//       await client.query(
//         `
//         SELECT

//           oca.id AS assignment_id,

//           om.id AS client_member_id,

//           u.id AS client_user_id,

//           u.name,

//           u.nickname,

//           u.mobile,

//           u.email,

//           oc.granted AS consent_granted,

//           oca.assigned_at,

//           o.id AS organization_id,

//           o.name AS organization_name

//         FROM organization_client_assignments oca

//         INNER JOIN organization_members trainer
//           ON trainer.id = oca.trainer_member_id

//         INNER JOIN organization_members om
//           ON om.id = oca.client_member_id

//         INNER JOIN users u
//           ON u.id = om.user_id

//         INNER JOIN organizations o
//           ON o.id = oca.organization_id

//         LEFT JOIN organization_consents oc
//           ON oc.organization_id = oca.organization_id
//          AND oc.client_user_id = om.user_id

//         WHERE

//           trainer.user_id = $1

//           AND trainer.status = 'ACTIVE'

//           AND oca.is_active = true

//         ORDER BY

//           u.name
//         `,
//         [
//           userId
//         ]
//       );

//     return result.rows;

//   } finally {

//     client.release();

//   }

// };


// Version 2 

export const getMyClientsService = async (
  userId
) => {

  const client = await pool.connect();

  try {

    const result =
      await client.query(
        `
        SELECT

          /* -------------------------------------
             ASSIGNMENT
          ------------------------------------- */

          oca.id AS assignment_id,

          oca.assigned_at,

          o.id AS organization_id,

          o.name AS organization_name,

          /* -------------------------------------
             CLIENT
          ------------------------------------- */

          om.id AS client_member_id,

          u.id AS client_user_id,

          u.name,

          u.nickname,

          u.mobile,

          u.email,

          /* -------------------------------------
             CONSENT
          ------------------------------------- */

          COALESCE(
            oc.granted,
            false
          ) AS consent_granted,

          /* -------------------------------------
             ACTIVE GOAL
          ------------------------------------- */

          up.goal_type,

          up.height_cm,

          up.weight_kg,

          up.target_weight,

          up.target_calories,

          up.protein_target,

          up.carbs_target,

          up.fats_target,

          /* -------------------------------------
             TODAY NUTRITION
          ------------------------------------- */

          COALESCE(
            dn.total_calories,
            0
          ) AS consumed_calories,

          COALESCE(
            dn.protein,
            0
          ) AS consumed_protein,

          COALESCE(
            dn.carbs,
            0
          ) AS consumed_carbs,

          COALESCE(
            dn.fats,
            0
          ) AS consumed_fats,

          COALESCE(
            dn.fiber,
            0
          ) AS consumed_fiber

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

        LEFT JOIN user_profile up
          ON up.user_id = om.user_id
         AND up.is_active = true

        LEFT JOIN daily_nutrition dn
          ON dn.user_id = om.user_id
         AND dn.date = CURRENT_DATE

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

    return result.rows.map(row => {

      const targetCalories =
        Number(
          row.target_calories || 0
        );

      const consumedCalories =
        Number(
          row.consumed_calories || 0
        );

      // let status = "NO_GOAL";

      // if (targetCalories > 0) {

      //   if (

      //     consumedCalories >=
      //     targetCalories * 0.8

      //   ) {

      //     status = "ON_TRACK";

      //   }

      //   else if (

      //     consumedCalories > 0

      //   ) {

      //     status = "PENDING";

      //   }

      //   else {

      //     status = "NOT_STARTED";

      //   }

      // }

      const status =
  getClientStatus(

    consumedCalories,

    targetCalories

  );

      // return {

      //   assignment_id:
      //     row.assignment_id,

      //   assigned_at:
      //     row.assigned_at,

      //   organization_id:
      //     row.organization_id,

      //   organization_name:
      //     row.organization_name,

      //   member_id:
      //     row.client_member_id,

      //   user_id:
      //     row.client_user_id,

      //   name:
      //     row.name,

      //   nickname:
      //     row.nickname,

      //   mobile:
      //     row.mobile,

      //   email:
      //     row.email,

      //   consent_granted:
      //     row.consent_granted,

      //   goal_type:
      //     row.goal_type,

      //   height_cm:
      //     row.height_cm,

      //   weight_kg:
      //     row.weight_kg,

      //   target_weight:
      //     row.target_weight,

      //   target_calories:
      //     targetCalories,

      //   target_protein:
      //     Number(
      //       row.protein_target || 0
      //     ),

      //   target_carbs:
      //     Number(
      //       row.carbs_target || 0
      //     ),

      //   target_fats:
      //     Number(
      //       row.fats_target || 0
      //     ),

      //   consumed_calories:
      //     consumedCalories,

      //   consumed_protein:
      //     Number(
      //       row.consumed_protein || 0
      //     ),

      //   consumed_carbs:
      //     Number(
      //       row.consumed_carbs || 0
      //     ),

      //   consumed_fats:
      //     Number(
      //       row.consumed_fats || 0
      //     ),

      //   consumed_fiber:
      //     Number(
      //       row.consumed_fiber || 0
      //     ),

      //   status

      // };


      return {

  assignment_id:
    row.assignment_id,

  assigned_at:
    row.assigned_at,

  organization_id:
    row.organization_id,

  organization_name:
    row.organization_name,

  member_id:
    row.client_member_id,

  user_id:
    row.client_user_id,

  name:
    row.name,

  nickname:
    row.nickname,

  mobile:
    row.mobile,

  email:
    row.email,

  consent_granted:
    row.consent_granted,

  goal:
    getGoal(row.goal_type),

  height_cm:
    row.height_cm,

  weight_kg:
    row.weight_kg,

  target_weight:
    row.target_weight,

  target_calories:
    targetCalories,

  target_protein:
    Number(
      row.protein_target || 0
    ),

  target_carbs:
    Number(
      row.carbs_target || 0
    ),

  target_fats:
    Number(
      row.fats_target || 0
    ),

  consumed_calories:
    consumedCalories,

  consumed_protein:
    Number(
      row.consumed_protein || 0
    ),

  consumed_carbs:
    Number(
      row.consumed_carbs || 0
    ),

  consumed_fats:
    Number(
      row.consumed_fats || 0
    ),

  consumed_fiber:
    Number(
      row.consumed_fiber || 0
    ),

  status

};

    });

  }

  finally {

    client.release();

  }

};


/* ======================================================
   COACH DASHBOARD
====================================================== */

// export const getDashboardService = async (
//   userId
// ) => {

//   const client = await pool.connect();

//   try {

//     /* ---------------------------------------------
//        COACH INFO
//     ---------------------------------------------- */

//     const coachResult =
//       await client.query(
//         `
//         SELECT
//           id,
//           name,
//           nickname,
//           email,
//           mobile
//         FROM users
//         WHERE id = $1
//         LIMIT 1
//         `,
//         [
//           userId
//         ]
//       );

//     /* ---------------------------------------------
//        DASHBOARD SUMMARY
//     ---------------------------------------------- */

//     const summaryResult =
//       await client.query(
//         `
//         SELECT

//           COUNT(*) AS total_clients,

//           SUM(
//             CASE
//               WHEN COALESCE(oc.granted,false) = false
//               THEN 1
//               ELSE 0
//             END
//           ) AS pending_consents

//         FROM organization_client_assignments oca

//         INNER JOIN organization_members coach
//           ON coach.id = oca.trainer_member_id

//         INNER JOIN organization_members client_member
//           ON client_member.id = oca.client_member_id

//         LEFT JOIN organization_consents oc
//           ON oc.organization_id = oca.organization_id
//          AND oc.client_user_id = client_member.user_id

//         WHERE

//           coach.user_id = $1

//           AND coach.status = 'ACTIVE'

//           AND oca.is_active = true
//         `,
//         [
//           userId
//         ]
//       );

//     /* ---------------------------------------------
//        MY CLIENTS
//     ---------------------------------------------- */

//     const clients =
//       await getMyClientsService(
//         userId
//       );

//     return {

//       coach:
//         coachResult.rows[0],

//       summary: {

//         total_clients:
//           Number(
//             summaryResult.rows[0]
//               .total_clients
//           ),

//         pending_consents:
//           Number(
//             summaryResult.rows[0]
//               .pending_consents || 0
//           )

//       },

//       clients

//     };

//   } finally {

//     client.release();

//   }

// };



// Version 2

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

        WHERE

          id = $1

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

          ) AS pending_consents,

          COUNT(

            DISTINCT CASE

              WHEN up.is_active = true

              THEN up.user_id

            END

          ) AS active_goals,

          COUNT(

            DISTINCT CASE

              WHEN dn.user_id IS NOT NULL

              THEN dn.user_id

            END

          ) AS clients_logged_today

        FROM organization_client_assignments oca

        INNER JOIN organization_members coach

          ON coach.id = oca.trainer_member_id

        INNER JOIN organization_members client_member

          ON client_member.id = oca.client_member_id

        LEFT JOIN organization_consents oc

          ON oc.organization_id = oca.organization_id

         AND oc.client_user_id = client_member.user_id

        LEFT JOIN user_profile up

          ON up.user_id = client_member.user_id

         AND up.is_active = true

        LEFT JOIN daily_nutrition dn

          ON dn.user_id = client_member.user_id

         AND dn.date = CURRENT_DATE

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

    const myClients =
      await getMyClientsService(
        userId
      );

    const summary =
      summaryResult.rows[0];

    const totalClients =
      Number(
        summary.total_clients
      );

    const clientsLoggedToday =
      Number(
        summary.clients_logged_today || 0
      );

    return {

      coach:
        coachResult.rows[0],

      summary: {

        total_clients:
          totalClients,

        pending_consents:
          Number(
            summary.pending_consents || 0
          ),

        active_goals:
          Number(
            summary.active_goals || 0
          ),

        clients_logged_today:
          clientsLoggedToday,

        clients_pending:

          totalClients -

          clientsLoggedToday

      },

      clients:
        myClients

    };

  }

  finally {

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

       client: profile,

consent: {

  granted: false,

  status: "PENDING",

  message:
    "Client has not granted health data access."

},

        fitness_profile: null,

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

    if (fitnessProfile && today) {

      todaySummary = {

        target: {

          calories:
            fitnessProfile.target_calories,

          protein:
            fitnessProfile.target_protein,

          carbs:
            fitnessProfile.target_carbs,

          fats:
            fitnessProfile.target_fats

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
              fitnessProfile.target_calories - today.calories
            ),

          protein:
            Math.max(
              0,
              fitnessProfile.target_protein - today.protein
            ),

          carbs:
            Math.max(
              0,
              fitnessProfile.target_carbs - today.carbs
            ),

          fats:
            Math.max(
              0,
              fitnessProfile.target_fats - today.fats
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

        status: "GRANTED",
        
        message: "Client has granted health data access."

      },

      fitness_profile: fitnessProfile,

      today: todaySummary,

      coach_notes: [],

      analytics: {},

      permissions

    };

  } finally {

    client.release();

  }

};



    /* ---------------------------------------------
       DASHBOARD API
    ---------------------------------------------- */



// export const getDashboardService = async (
//   coachUserId
// ) => {

//   const client = await pool.connect();

//   try {

//     /* ---------------------------------------
//        FIND TRAINER
//     ---------------------------------------- */

//     const trainerResult =
//       await client.query(
//         `
//         SELECT

//           id

//         FROM organization_members

//         WHERE

//           user_id = $1

//           AND status='ACTIVE'

//         LIMIT 1
//         `,
//         [coachUserId]
//       );

//     if (!trainerResult.rows.length) {

//       throw new Error(
//         "Trainer not found."
//       );

//     }

//     const trainerMemberId =
//       trainerResult.rows[0].id;

//     /* ---------------------------------------
//        SUMMARY
//     ---------------------------------------- */

//     const summaryResult =
//       await client.query(
//         `
//         SELECT

//           COUNT(*) AS my_clients,

//           COUNT(
//             CASE
//               WHEN up.is_active = true
//               THEN 1
//             END
//           ) AS active_goals,

//           COUNT(
//             CASE
//               WHEN dn.user_id IS NOT NULL
//               THEN 1
//             END
//           ) AS clients_logged_today

//         FROM organization_client_assignments oca

//         INNER JOIN organization_members om

//           ON om.id = oca.client_member_id

//         LEFT JOIN user_profile up

//           ON up.user_id = om.user_id

//          AND up.is_active = true

//         LEFT JOIN daily_nutrition dn

//           ON dn.user_id = om.user_id

//          AND dn.date = CURRENT_DATE

//         WHERE

//           oca.trainer_member_id = $1

//           AND oca.is_active = true
//         `,
//         [trainerMemberId]
//       );

//     const summary =
//       summaryResult.rows[0];

//     const clientsPending =
//       Number(summary.my_clients) -
//       Number(summary.clients_logged_today);

//     /* ---------------------------------------
//        TODAY CLIENTS
//     ---------------------------------------- */

//     const clientsResult =
//       await client.query(
//         `
//         SELECT

//           om.id AS member_id,

//           u.name,

//           u.nickname,

//           up.goal_type,

//           up.target_calories,

//           up.protein_target,

//           COALESCE(
//             dn.total_calories,
//             0
//           ) AS consumed_calories,

//           COALESCE(
//             dn.protein,
//             0
//           ) AS consumed_protein

//         FROM organization_client_assignments oca

//         INNER JOIN organization_members om

//           ON om.id =
//              oca.client_member_id

//         INNER JOIN users u

//           ON u.id =
//              om.user_id

//         LEFT JOIN user_profile up

//           ON up.user_id = u.id

//          AND up.is_active = true

//         LEFT JOIN daily_nutrition dn

//           ON dn.user_id = u.id

//          AND dn.date = CURRENT_DATE

//         WHERE

//           oca.trainer_member_id = $1

//           AND oca.is_active = true

//         ORDER BY

//           u.name
//         `,
//         [trainerMemberId]
//       );

//     const todayClients =
//       clientsResult.rows.map(
//         client => ({

//           ...client,

//           status:

//             Number(
//               client.consumed_calories
//             ) >=

//             Number(
//               client.target_calories
//             ) * 0.8

//               ? "ON_TRACK"

//               : "PENDING"

//         })
//       );

//     return {

//       summary: {

//         my_clients:
//           Number(summary.my_clients),

//         active_goals:
//           Number(summary.active_goals),

//         clients_logged_today:
//           Number(
//             summary.clients_logged_today
//           ),

//         clients_pending:
//           clientsPending

//       },

//       today_clients:
//         todayClients

//     };

//   }

//   finally {

//     client.release();

//   }

// };


  