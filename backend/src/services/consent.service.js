import pool from "../../db/connection.js";

/* ======================================================
   GET MY CONSENTS
====================================================== */

export const getMyConsentsService = async (
  userId
) => {

  const client = await pool.connect();

  try {

    const result =
      await client.query(
        `
        SELECT

          oc.organization_id,

          o.name AS organization_name,

          o.organization_type,

          oc.granted,

          oc.granted_at,

          oc.created_at

        FROM organization_consents oc

        INNER JOIN organizations o
          ON o.id = oc.organization_id

        WHERE

          oc.client_user_id = $1

        ORDER BY

          o.name
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
   GRANT CONSENT
====================================================== */

export const grantConsentService = async (
  userId,
  organizationId
) => {

  const client = await pool.connect();

  try {

    const result =
      await client.query(
        `
        UPDATE organization_consents

        SET

          granted = true,

          granted_at = NOW()

        WHERE

          organization_id = $1

          AND client_user_id = $2

        RETURNING id
        `,
        [
          organizationId,
          userId
        ]
      );

    if (!result.rows.length) {

      throw new Error(
        "Consent record not found."
      );

    }

  } finally {

    client.release();

  }

};

/* ======================================================
   REVOKE CONSENT
====================================================== */

export const revokeConsentService = async (
  userId,
  organizationId
) => {

  const client = await pool.connect();

  try {

    const result =
      await client.query(
        `
        UPDATE organization_consents

        SET

          granted = false,

          granted_at = NULL

        WHERE

          organization_id = $1

          AND client_user_id = $2

        RETURNING id
        `,
        [
          organizationId,
          userId
        ]
      );

    if (!result.rows.length) {

      throw new Error(
        "Consent record not found."
      );

    }

  } finally {

    client.release();

  }

};