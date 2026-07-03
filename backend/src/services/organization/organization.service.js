import pool from "../../db/connection.js";
import crypto from "crypto";

/* ======================================================
   DEFAULT ROLES
====================================================== */

const DEFAULT_ROLES = [
  "OWNER",
  "ADMIN",
  "TRAINER",
  "DIETITIAN",
  "RECEPTIONIST",
  "CLIENT"
];

/* ======================================================
   ROLE -> PERMISSION MAP
====================================================== */

const ROLE_PERMISSION_MAP = {

  OWNER: ["*"],

  ADMIN: [
    "VIEW_CLIENT",
    "EDIT_CLIENT",
    "CREATE_GOAL",
    "EDIT_GOAL",
    "REMOVE_GOAL",
    "WRITE_NOTE",
    "VIEW_ANALYTICS",
    "VIEW_REPORTS",
    "EXPORT_REPORT",
    "INVITE_MEMBER",
    "REMOVE_MEMBER",
    "MANAGE_MEMBERS",
    "ASSIGN_CLIENT"
  ],

  TRAINER: [
    "VIEW_CLIENT",
    "CREATE_GOAL",
    "EDIT_GOAL",
    "WRITE_NOTE",
    "VIEW_REPORTS"
  ],

  DIETITIAN: [
    "VIEW_CLIENT",
    "CREATE_GOAL",
    "EDIT_GOAL",
    "WRITE_NOTE",
    "VIEW_ANALYTICS"
  ],

  RECEPTIONIST: [
    "VIEW_CLIENT",
    "INVITE_MEMBER"
  ],

  CLIENT: [
    "VIEW_SELF"
  ]

};

/* ======================================================
   GENERATE WORKSPACE CODE
====================================================== */

const generateWorkspaceCode = () => {

  return `NEKA-${crypto
    .randomBytes(3)
    .toString("hex")
    .toUpperCase()}`;

};

/* ======================================================
   CREATE ORGANIZATION
====================================================== */

export const createOrganizationService = async (
  userId,
  body
) => {

  const client = await pool.connect();

  try {

    await client.query("BEGIN");

    const workspaceCode =
      generateWorkspaceCode();

    /* ---------------------------------------------
       CREATE ORGANIZATION
    ---------------------------------------------- */

    const organizationResult =
      await client.query(
        `
        INSERT INTO organizations
        (
          name,
          organization_type,
          logo_url,
          email,
          mobile,
          website,
          address,
          city,
          state,
          country,
          timezone,
          currency,
          subscription_plan,
          status,
          workspace_code,
          created_by
        )
        VALUES
        (
          $1,$2,$3,$4,$5,$6,
          $7,$8,$9,$10,
          $11,$12,$13,$14,
          $15,$16
        )
        RETURNING *
        `,
        [
          body.name,
          body.organization_type,
          body.logo_url || null,
          body.email || null,
          body.mobile || null,
          body.website || null,
          body.address || null,
          body.city || null,
          body.state || null,
          body.country || null,
          body.timezone || "Asia/Kolkata",
          body.currency || "INR",
          body.subscription_plan || "STARTER",
          "ACTIVE",
          workspaceCode,
          userId
        ]
      );

    const organization =
      organizationResult.rows[0];

    /* ======================================================
       PART 2 STARTS HERE
    ====================================================== */


        /* ---------------------------------------------
       CREATE DEFAULT ROLES
    ---------------------------------------------- */

    const roleMap = {};

    for (const roleName of DEFAULT_ROLES) {

      const roleResult =
        await client.query(
          `
          INSERT INTO organization_roles
          (
            organization_id,
            name,
            is_system
          )
          VALUES
          ($1,$2,true)
          RETURNING *
          `,
          [
            organization.id,
            roleName
          ]
        );

      roleMap[roleName] =
        roleResult.rows[0].id;

    }

    /* ---------------------------------------------
       LOAD ALL PERMISSIONS
    ---------------------------------------------- */

    const permissionResult =
      await client.query(
        `
        SELECT
          id,
          permission_key
        FROM organization_permissions
        `
      );

    const permissionMap = {};

    permissionResult.rows.forEach(
      (permission) => {

        permissionMap[
          permission.permission_key
        ] = permission.id;

      }
    );

    /* ======================================================
       ASSIGN ROLE PERMISSIONS
    ====================================================== */

    for (const roleName of DEFAULT_ROLES) {

      const roleId =
        roleMap[roleName];

      const permissions =
        ROLE_PERMISSION_MAP[
          roleName
        ];

      /* OWNER GETS EVERYTHING */

      if (
        permissions.length === 1 &&
        permissions[0] === "*"
      ) {

        for (const permission of permissionResult.rows) {

          await client.query(
            `
            INSERT INTO organization_role_permissions
            (
              role_id,
              permission_id
            )
            VALUES
            ($1,$2)
            `,
            [
              roleId,
              permission.id
            ]
          );

        }

      }

      else {

        for (const permissionKey of permissions) {

          const permissionId =
            permissionMap[
              permissionKey
            ];

          if (!permissionId)
            continue;

          await client.query(
            `
            INSERT INTO organization_role_permissions
            (
              role_id,
              permission_id
            )
            VALUES
            ($1,$2)
            `,
            [
              roleId,
              permissionId
            ]
          );

        }

      }

    }

    /* ======================================================
       PART 3 STARTS HERE
    ====================================================== */


        /* ---------------------------------------------
       CREATE OWNER MEMBERSHIP
    ---------------------------------------------- */

    await client.query(
      `
      INSERT INTO organization_members
      (
        organization_id,
        user_id,
        role_id,
        status,
        joined_at
      )
      VALUES
      (
        $1,
        $2,
        $3,
        'ACTIVE',
        NOW()
      )
      `,
      [
        organization.id,
        userId,
        roleMap["OWNER"]
      ]
    );

    /* ---------------------------------------------
       WRITE ACTIVITY LOG
    ---------------------------------------------- */

    await client.query(
      `
      INSERT INTO activity_logs
      (
        organization_id,
        actor_user_id,
        target_user_id,
        entity_type,
        entity_id,
        action,
        description,
        severity,
        metadata
      )
      VALUES
      (
        $1,$2,$3,$4,$5,$6,$7,$8,$9
      )
      `,
      [
        organization.id,
        userId,
        userId,
        "ORGANIZATION",
        organization.id,
        "WORKSPACE_CREATED",
        `Workspace '${organization.name}' created`,
        "INFO",
        JSON.stringify({
          workspace_code:
            organization.workspace_code
        })
      ]
    );

    /* ---------------------------------------------
       COMMIT
    ---------------------------------------------- */

    await client.query("COMMIT");

    return {

      ...organization,

      owner_role_id:
        roleMap["OWNER"]

    };

  } catch (err) {

    await client.query("ROLLBACK");

    throw err;

  } finally {

    client.release();

  }

};