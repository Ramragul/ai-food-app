import pool from "../../db/connection.js";
import crypto, { randomUUID }from "crypto";

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
   VERIFY ORGANIZATION MEMBERSHIP
====================================================== */

const verifyMembership = async (
  client,
  organizationId,
  userId
) => {

  const result = await client.query(
    `
    SELECT

      om.id,
      om.role_id,
      om.status,
      r.name AS role_name

    FROM organization_members om

    INNER JOIN organization_roles r
      ON r.id = om.role_id

    WHERE

      om.organization_id = $1
      AND om.user_id = $2
      AND om.status = 'ACTIVE'

    LIMIT 1
    `,
    [
      organizationId,
      userId
    ]
  );

  return result.rows[0] || null;

};

/* ======================================================
   GET ROLE BY NAME
====================================================== */

const getOrganizationRole = async (
  client,
  organizationId,
  roleName
) => {

  const result = await client.query(
    `
    SELECT *

    FROM organization_roles

    WHERE

      organization_id = $1
      AND name = $2

    LIMIT 1
    `,
    [
      organizationId,
      roleName
    ]
  );

  return result.rows[0] || null;

};


/* ======================================================
   CREATE ACTIVITY LOG
====================================================== */

const createActivityLog = async (
  client,
  {
    organizationId,
    actorUserId,
    targetUserId = null,
    entityType,
    entityId,
    action,
    description,
    severity = "INFO",
    metadata = {}
  }
) => {

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
      organizationId,
      actorUserId,
      targetUserId,
      entityType,
      entityId,
      action,
      description,
      severity,
      JSON.stringify(metadata)
    ]
  );

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

await createActivityLog(
  client,
  {
    organizationId: organization.id,
    actorUserId: userId,
    targetUserId: userId,
    entityType: "ORGANIZATION",
    entityId: organization.id,
    action: "WORKSPACE_CREATED",
    description: `Workspace '${organization.name}' created`,
    metadata: {
      workspace_code:
        organization.workspace_code
    }
  }
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




/* 🔥 GET MY ORGANIZATIONS */

export const getMyOrganizationsService =
async (userId) => {

  const result = await pool.query(
    `
    SELECT

      o.id AS organization_id,

      o.name AS organization_name,

      o.workspace_code,

      o.organization_type,

      o.logo_url,

      o.subscription_plan,

      o.status AS organization_status,

      om.status AS member_status,

      r.name AS role

    FROM organization_members om

    INNER JOIN organizations o
      ON o.id = om.organization_id

    INNER JOIN organization_roles r
      ON r.id = om.role_id



    WHERE
    om.user_id = $1
    AND om.status = 'ACTIVE'
    AND o.status = 'ACTIVE'

    ORDER BY
      o.created_at DESC
    `,
    [userId]
  );

  return result.rows;

};



/* 🔥 INVITE MEMBER */

/* ======================================================
   INVITE EMPLOYEE
====================================================== */

export const inviteEmployeeService = async (
  userId,
  {
    organization_id,
    role,
    invited_name,
    invited_mobile,
    invited_email
  }
) => {

  const client = await pool.connect();

  try {

    await client.query("BEGIN");

    /* ---------------------------------------------
       VERIFY MEMBERSHIP
    ---------------------------------------------- */

    const member =
      await verifyMembership(
        client,
        organization_id,
        userId
      );

    if (!member) {

      throw new Error(
        "You are not a member of this workspace."
      );

    }

    /* ---------------------------------------------
       ONLY OWNER / ADMIN CAN INVITE
    ---------------------------------------------- */

    if (
      !["OWNER", "ADMIN"]
        .includes(member.role_name)
    ) {

      throw new Error(
        "You don't have permission to invite employees."
      );

    }

    /* ---------------------------------------------
       GET ROLE
    ---------------------------------------------- */

    const roleRecord =
      await getOrganizationRole(
        client,
        organization_id,
        role
      );

    if (!roleRecord) {

      throw new Error(
        "Invalid role."
      );

    }

    /* ---------------------------------------------
       EMPLOYEE ROLES ONLY
    ---------------------------------------------- */

    if (
      roleRecord.name === "CLIENT"
    ) {

      throw new Error(
        "Use invite-client API for clients."
      );

    }

    /* ---------------------------------------------
       DUPLICATE INVITATION
    ---------------------------------------------- */

    const duplicate =
      await client.query(
        `
        SELECT id

        FROM organization_invitations

        WHERE

        organization_id = $1

        AND invited_mobile = $2

        AND status = 'PENDING'

        LIMIT 1
        `,
        [
          organization_id,
          invited_mobile
        ]
      );

    if (
      duplicate.rows.length
    ) {

      throw new Error(
        "An active invitation already exists."
      );

    }

    /* ---------------------------------------------
       CREATE INVITATION
    ---------------------------------------------- */

    const expiresAt =
      new Date(
        Date.now() +
        7 * 24 * 60 * 60 * 1000
      );

    const invitation =
      await client.query(
        `
        INSERT INTO
        organization_invitations
        (
          organization_id,
          invited_name,
          invited_mobile,
          invited_email,
          role_id,
          invitation_type,
          invitation_token,
          expires_at,
          status,
          created_by
        )

        VALUES
        (
          $1,$2,$3,$4,
          $5,
          'EMPLOYEE',
          gen_random_uuid(),
          $6,
          'PENDING',
          $7
        )

        RETURNING *
        `,
        [

          organization_id,

          invited_name || null,

          invited_mobile,

          invited_email || null,

          roleRecord.id,

          expiresAt,

          userId

        ]
      );

    /* ---------------------------------------------
       ACTIVITY LOG
    ---------------------------------------------- */

    await createActivityLog(
      client,
      {

        organizationId:
          organization_id,

        actorUserId:
          userId,

        entityType:
          "INVITATION",

        entityId:
          invitation.rows[0].id,

        action:
          "EMPLOYEE_INVITED",

        description:
          `${roleRecord.name} invited (${invited_mobile})`,

        metadata: {

          role:
            roleRecord.name

        }

      }
    );

    await client.query("COMMIT");

    return invitation.rows[0];

  } catch (err) {

    await client.query(
      "ROLLBACK"
    );

    throw err;

  } finally {

    client.release();

  }

};