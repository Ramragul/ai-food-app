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
          ON coach.id = oca.coach_member_id

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