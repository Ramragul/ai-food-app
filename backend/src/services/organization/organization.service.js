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
    "INVITE_EMPLOYEE",
    "INVITE_CLIENT",
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
    "INVITE_CLIENT"
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
   GET MEMBER
====================================================== */

const getMember = async (
  client,
  organizationId,
  userId
) => {

  const result =
    await client.query(
      `
      SELECT

        om.id,

        om.organization_id,

        om.user_id,

        om.role_id,

        om.status,

        om.joined_at,

        r.name AS role_name

      FROM organization_members om

      INNER JOIN organization_roles r
        ON r.id = om.role_id

      WHERE

        om.organization_id = $1

        AND om.user_id = $2

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
   CHECK PERMISSION
====================================================== */

const hasPermission = async (
  client,
  organizationId,
  userId,
  permissionKey
) => {

  const result =
    await client.query(
      `
      SELECT 1

      FROM organization_members om

      INNER JOIN organization_roles r
        ON r.id = om.role_id

      INNER JOIN organization_role_permissions rp
        ON rp.role_id = r.id

      INNER JOIN organization_permissions p
        ON p.id = rp.permission_id

      WHERE

        om.organization_id = $1

        AND om.user_id = $2

        AND om.status = 'ACTIVE'

        AND p.permission_key = $3

      LIMIT 1
      `,
      [
        organizationId,
        userId,
        permissionKey
      ]
    );

   
console.log("Permission check:")
console.log(result.rows);



  return result.rows.length > 0;

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
   GET USER
====================================================== */

const getUser = async (
  client,
  userId
) => {

  const result =
    await client.query(
      `
      SELECT
        id,
        name,
        mobile,
        email
      FROM users
      WHERE id = $1
      LIMIT 1
      `,
      [userId]
    );

  return result.rows[0] || null;

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

    // if (
    //   !["OWNER", "ADMIN"]
    //     .includes(member.role_name)
    // ) {

    //   throw new Error(
    //     "You don't have permission to invite employees."
    //   );

    // }

    const allowed =
    await hasPermission(
    client,
    organization_id,
    userId,
    "INVITE_EMPLOYEE"
    );

    if (!allowed) {

    throw new Error(
        "Permission denied."
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




// export const inviteClientService = async (
//   userId,
//   {
//     organization_id,
//     role,
//     invited_name,
//     invited_mobile,
//     invited_email
//   }
// ) => { 
//     console.log("To be edited")
// }

/* ======================================================
   INVITE CLIENT
====================================================== */

export const inviteClientService = async (
  userId,
  {
    organization_id,
    invited_name,
    invited_mobile,
    invited_email
  }
) => {

  const client = await pool.connect();

  if (!invited_mobile && !invited_email) {

  throw new Error(
    "Either mobile number or email is required."
  );

}

  try {

    await client.query("BEGIN");

    /* ---------------------------------------------
       CHECK PERMISSION
    ---------------------------------------------- */

    

    const allowed =
      await hasPermission(
        client,
        organization_id,
        userId,
        "INVITE_CLIENT"
      );

    if (!allowed) {

      throw new Error(
        "Permission denied."
      );

    }

    /* ---------------------------------------------
       GET CLIENT ROLE
    ---------------------------------------------- */

    const clientRole =
      await getOrganizationRole(
        client,
        organization_id,
        "CLIENT"
      );

    if (!clientRole) {

      throw new Error(
        "CLIENT role not found."
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

      AND
      (
        invited_mobile = $2

        OR

        (
          invited_email IS NOT NULL
          AND invited_email = $3
        )
      )

      AND status = 'PENDING'

    LIMIT 1
    `,
    [
      organization_id,
      invited_mobile,
      invited_email || null
    ]
  );

    if (duplicate.rows.length) {

      throw new Error(
        "Client already invited."
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
        INSERT INTO organization_invitations
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
          'CLIENT',
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
          clientRole.id,
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
          "CLIENT_INVITED",

        description:
          `${invited_name} invited as CLIENT.`,

        metadata: {

          mobile:
            invited_mobile

        }

      }
    );

    await client.query("COMMIT");

    return invitation.rows[0];

  } catch (err) {

    await client.query("ROLLBACK");

    throw err;

  } finally {

    client.release();

  }

};



/* ======================================================
   GET MY INVITATIONS
====================================================== */

export const getMyInvitationsService =
async (userId) => {

  const client = await pool.connect();

  try {

    /* ---------------------------------------------
       GET LOGGED IN USER
    ---------------------------------------------- */

    const user =
      await getUser(
        client,
        userId
      );

    if (!user) {

      throw new Error(
        "User not found."
      );

    }

    /* ---------------------------------------------
       GET PENDING INVITATIONS
    ---------------------------------------------- */

    const result =
      await client.query(
        `
        SELECT

          oi.id,

          oi.invitation_token,

          oi.invitation_type,

          oi.invited_name,

          oi.invited_mobile,

          oi.invited_email,

          oi.status,

          oi.expires_at,

          oi.created_at,

          o.id AS organization_id,

          o.name AS organization_name,

          o.organization_type,

          o.logo_url,

          r.name AS role

        FROM organization_invitations oi

        INNER JOIN organizations o
          ON o.id = oi.organization_id

        INNER JOIN organization_roles r
          ON r.id = oi.role_id

        WHERE

        oi.status = 'PENDING'

        AND

        oi.expires_at > NOW()

        AND

        (

          oi.invited_mobile = $1

          OR

          (
            oi.invited_email IS NOT NULL
            AND
            oi.invited_email = $2
          )

        )

        ORDER BY

          oi.created_at DESC
        `,
        [
          user.mobile,
          user.email
        ]
      );

    return result.rows;

  } finally {

    client.release();

  }

};


/* ======================================================
   ACCEPT INVITATION
====================================================== */

export const acceptInvitationService = async (
  userId,
  invitationToken
) => {

  const client = await pool.connect();

  try {

    await client.query("BEGIN");

    /* ---------------------------------------------
       GET LOGGED IN USER
    ---------------------------------------------- */

    const user =
      await getUser(
        client,
        userId
      );

    if (!user) {
      throw new Error("User not found.");
    }

    /* ---------------------------------------------
       LOAD INVITATION
    ---------------------------------------------- */

    const invitationResult =
      await client.query(
        `
        SELECT
          *
        FROM organization_invitations
        WHERE
          invitation_token = $1
        LIMIT 1
        `,
        [invitationToken]
      );

    if (!invitationResult.rows.length) {
      throw new Error("Invitation not found.");
    }

    const invitation =
      invitationResult.rows[0];

    /* ---------------------------------------------
       STATUS CHECK
    ---------------------------------------------- */

    if (invitation.status !== "PENDING") {
      throw new Error("Invitation is no longer valid.");
    }

    /* ---------------------------------------------
       EXPIRY CHECK
    ---------------------------------------------- */

    if (new Date(invitation.expires_at) < new Date()) {
      throw new Error("Invitation has expired.");
    }

    /* ---------------------------------------------
       VERIFY MOBILE / EMAIL
    ---------------------------------------------- */

    const mobileMatches =
      invitation.invited_mobile === user.mobile;

    const emailMatches =
      invitation.invited_email &&
      user.email &&
      invitation.invited_email.toLowerCase() ===
      user.email.toLowerCase();

    if (!mobileMatches && !emailMatches) {

      throw new Error(
        "This invitation doesn't belong to your account."
      );

    }

    /* ---------------------------------------------
       ALREADY MEMBER?
    ---------------------------------------------- */

    // const existingMember =
    //   await client.query(
    //     `
    //     SELECT id
    //     FROM organization_members
    //     WHERE
    //       organization_id = $1
    //       AND user_id = $2
    //       AND status = 'ACTIVE'
    //     LIMIT 1
    //     `,
    //     [
    //       invitation.organization_id,
    //       userId
    //     ]
    //   );

    // if (existingMember.rows.length) {

    //   throw new Error(
    //     "You are already a member of this workspace."
    //   );

    // }

    // /* ---------------------------------------------
    //    CREATE MEMBER
    // ---------------------------------------------- */

    // const memberResult =
    //   await client.query(
    //     `
    //     INSERT INTO organization_members
    //     (
    //       organization_id,
    //       user_id,
    //       role_id,
    //       status,
    //       joined_at
    //     )
    //     VALUES
    //     (
    //       $1,
    //       $2,
    //       $3,
    //       'ACTIVE',
    //       NOW()
    //     )
    //     RETURNING *
    //     `,
    //     [
    //       invitation.organization_id,
    //       userId,
    //       invitation.role_id
    //     ]
    //   );


    /* ---------------------------------------------
   EXISTING MEMBERSHIP
---------------------------------------------- */

const existingMember =
  await client.query(
    `
    SELECT
      id,
      status
    FROM organization_members
    WHERE
      organization_id = $1
      AND user_id = $2
    LIMIT 1
    `,
    [
      invitation.organization_id,
      userId
    ]
  );

let memberResult;

/* ---------------------------------------------
   ALREADY ACTIVE
---------------------------------------------- */

if (
  existingMember.rows.length &&
  existingMember.rows[0].status === "ACTIVE"
) {

  throw new Error(
    "You are already a member of this workspace."
  );

}

/* ---------------------------------------------
   REJOIN EXISTING MEMBER
---------------------------------------------- */

if (
  existingMember.rows.length
) {

  memberResult =
    await client.query(
      `
      UPDATE organization_members

      SET

        role_id = $1,

        status = 'ACTIVE',

        joined_at = NOW(),

        left_at = NULL

      WHERE id = $2

      RETURNING *
      `,
      [
        invitation.role_id,
        existingMember.rows[0].id
      ]
    );

}

/* ---------------------------------------------
   FIRST TIME JOIN
---------------------------------------------- */

else {

  memberResult =
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
      RETURNING *
      `,
      [
        invitation.organization_id,
        userId,
        invitation.role_id
      ]
    );

}


      /* ---------------------------------------------
   GET ROLE
---------------------------------------------- */

const roleResult =
  await client.query(
    `
    SELECT
      name
    FROM organization_roles
    WHERE id = $1
    LIMIT 1
    `,
    [
      invitation.role_id
    ]
  );

const roleName =
  roleResult.rows[0]?.name;


  if (
  roleName === "CLIENT"
) {

//   await client.query(
//     `
//     INSERT INTO organization_consents
//     (
//       organization_id,
//       client_user_id,
//       granted,
//       granted_at,
//       created_at
//     )
//     VALUES
//     (
//       $1,
//       $2,
//       false,
//       NULL,
//       NOW()
//     )
//     `,
//     [
//       invitation.organization_id,
//       userId
//     ]
//   );

const consent =
  await client.query(
    `
    SELECT id
    FROM organization_consents
    WHERE
      organization_id = $1
      AND client_user_id = $2
    LIMIT 1
    `,
    [
      invitation.organization_id,
      userId
    ]
  );

if (!consent.rows.length) {

    await client.query(
      `
      INSERT INTO organization_consents
      (
        organization_id,
        client_user_id,
        granted,
        granted_at,
        created_at
      )
      VALUES
      (
        $1,
        $2,
        false,
        NULL,
        NOW()
      )
      `,
      [
        invitation.organization_id,
        userId
      ]
    );

} else {

    await client.query(
      `
      UPDATE organization_consents

      SET

        granted = false,

        granted_at = NULL,

        revoked_at = NULL

      WHERE

        organization_id = $1

        AND client_user_id = $2
      `,
      [
        invitation.organization_id,
        userId
      ]
    );

}



}

    /* ---------------------------------------------
       UPDATE INVITATION
    ---------------------------------------------- */

    await client.query(
      `
      UPDATE organization_invitations
      SET

        status = 'ACCEPTED',

        accepted_at = NOW(),

        accepted_by = $1

      WHERE id = $2
      `,
      [
        userId,
        invitation.id
      ]
    );

    /* ---------------------------------------------
       ACTIVITY LOG
    ---------------------------------------------- */

    await createActivityLog(
      client,
      {
        organizationId:
          invitation.organization_id,

        actorUserId:
          userId,

        targetUserId:
          userId,

        entityType:
          "INVITATION",

        entityId:
          invitation.id,

        action:
          "INVITATION_ACCEPTED",

        description:
          `${user.name} joined the workspace.`,

        metadata: {
          member_id:
            memberResult.rows[0].id
        }
      }
    );

    await client.query("COMMIT");

    return {

      member:
        memberResult.rows[0],

      organization_id:
        invitation.organization_id

    };

  } catch (err) {

    await client.query("ROLLBACK");

    throw err;

  } finally {

    client.release();

  }

};




export const declineInvitationService = async (
  userId,
  invitationToken
) => {

  const client = await pool.connect();

  try {

    await client.query("BEGIN");

    /* ---------------------------------------------
       GET USER
    ---------------------------------------------- */

    const user = await getUser(
      client,
      userId
    );

    if (!user) {
      throw new Error("User not found.");
    }

    /* ---------------------------------------------
       LOAD INVITATION
    ---------------------------------------------- */

    const invitationResult =
      await client.query(
        `
        SELECT *
        FROM organization_invitations
        WHERE invitation_token = $1
        LIMIT 1
        `,
        [invitationToken]
      );

    if (!invitationResult.rows.length) {
      throw new Error("Invitation not found.");
    }

    const invitation =
      invitationResult.rows[0];

    /* ---------------------------------------------
       STATUS CHECK
    ---------------------------------------------- */

    if (invitation.status !== "PENDING") {
      throw new Error(
        "Invitation is no longer valid."
      );
    }

    /* ---------------------------------------------
       VERIFY USER
    ---------------------------------------------- */

    const mobileMatches =
      invitation.invited_mobile === user.mobile;

    const emailMatches =
      invitation.invited_email &&
      user.email &&
      invitation.invited_email.toLowerCase() ===
      user.email.toLowerCase();

    if (!mobileMatches && !emailMatches) {

      throw new Error(
        "This invitation doesn't belong to your account."
      );

    }

    /* ---------------------------------------------
       DECLINE
    ---------------------------------------------- */

    await client.query(
      `
      UPDATE organization_invitations
      SET
        status = 'DECLINED',
        accepted_at = NOW(),
        accepted_by = $1
      WHERE id = $2
      `,
      [
        userId,
        invitation.id
      ]
    );

    /* ---------------------------------------------
       ACTIVITY
    ---------------------------------------------- */

    await createActivityLog(
      client,
      {
        organizationId:
          invitation.organization_id,

        actorUserId:
          userId,

        targetUserId:
          userId,

        entityType:
          "INVITATION",

        entityId:
          invitation.id,

        action:
          "INVITATION_DECLINED",

        description:
          `${user.name} declined the workspace invitation.`,

        metadata: {}
      }
    );

    await client.query("COMMIT");

    return {

      invitation_id:
        invitation.id

    };

  } catch (err) {

    await client.query("ROLLBACK");

    throw err;

  } finally {

    client.release();

  }

};



/* ======================================================
   GET ORGANIZATION MEMBERS
====================================================== */

export const getOrganizationMembersService =
async (
  userId,
  organizationId
) => {

  const client =
    await pool.connect();

  try {

    /* ---------------------------------------------
       PERMISSION CHECK
    ---------------------------------------------- */

    const allowed =
      await hasPermission(
        client,
        organizationId,
        userId,
        "VIEW_MEMBERS"
      );

    if (!allowed) {

      throw new Error(
        "Permission denied."
      );

    }

    /* ---------------------------------------------
       LOAD MEMBERS
    ---------------------------------------------- */

    const result =
      await client.query(
        `
        SELECT

          om.id AS member_id,

          om.user_id,

          u.name,

          u.nickname,

          u.mobile,

          u.email,

          r.name AS role,

          om.status,

          om.joined_at

        FROM organization_members om

        INNER JOIN users u
          ON u.id = om.user_id

        INNER JOIN organization_roles r
          ON r.id = om.role_id

        WHERE

          om.organization_id = $1

        ORDER BY

          r.name,

          u.name
        `,
        [
          organizationId
        ]
      );

    return result.rows;

  } finally {

    client.release();

  }

};




/* ======================================================
   ASSIGN CLIENT TO TRAINER
====================================================== */

export const assignClientService = async (
  userId,
  {
    organization_id,
    trainer_member_id,
    client_member_id
  }
) => {

  const client = await pool.connect();

  try {

    await client.query("BEGIN");

    /* ---------------------------------------------
       PERMISSION CHECK
    ---------------------------------------------- */

    const allowed =
      await hasPermission(
        client,
        organization_id,
        userId,
        "ASSIGN_CLIENT"
      );

    if (!allowed) {
      throw new Error(
        "Permission denied."
      );
    }

    /* ---------------------------------------------
       LOAD TRAINER
    ---------------------------------------------- */

    const trainerResult =
      await client.query(
        `
        SELECT
          om.*,
          r.name AS role_name,
          u.name
        FROM organization_members om
        INNER JOIN organization_roles r
          ON r.id = om.role_id
        INNER JOIN users u
          ON u.id = om.user_id
        WHERE
          om.id = $1
          AND om.organization_id = $2
          AND om.status = 'ACTIVE'
        `,
        [
          trainer_member_id,
          organization_id
        ]
      );

    if (!trainerResult.rows.length) {
      throw new Error("Trainer not found.");
    }

    const trainer =
      trainerResult.rows[0];

    if (
      trainer.role_name !== "TRAINER"
    ) {
      throw new Error(
        "Selected member is not a trainer."
      );
    }

    /* ---------------------------------------------
       LOAD CLIENT
    ---------------------------------------------- */

    const clientResult =
      await client.query(
        `
        SELECT
          om.*,
          r.name AS role_name,
          u.name
        FROM organization_members om
        INNER JOIN organization_roles r
          ON r.id = om.role_id
        INNER JOIN users u
          ON u.id = om.user_id
        WHERE
          om.id = $1
          AND om.organization_id = $2
          AND om.status = 'ACTIVE'
        `,
        [
          client_member_id,
          organization_id
        ]
      );

    if (!clientResult.rows.length) {
      throw new Error("Client not found.");
    }

    const assignedClient =
      clientResult.rows[0];

    if (
      assignedClient.role_name !== "CLIENT"
    ) {
      throw new Error(
        "Selected member is not a client."
      );
    }

    /* ---------------------------------------------
       EXISTING ACTIVE ASSIGNMENT?
    ---------------------------------------------- */

    const existingAssignment =
      await client.query(
        `
        SELECT id
        FROM organization_client_assignments
        WHERE
          organization_id = $1
          AND client_member_id = $2
          AND is_active = true
        LIMIT 1
        `,
        [
          organization_id,
          client_member_id
        ]
      );

    if (
      existingAssignment.rows.length
    ) {
      throw new Error(
        "Client is already assigned to a trainer."
      );
    }

    /* ---------------------------------------------
       CREATE ASSIGNMENT
    ---------------------------------------------- */

    const assignment =
      await client.query(
        `
        INSERT INTO
        organization_client_assignments
        (
          organization_id,
          trainer_member_id,
          client_member_id,
          assigned_by
        )
        VALUES
        (
          $1,
          $2,
          $3,
          $4
        )
        RETURNING *
        `,
        [
          organization_id,
          trainer_member_id,
          client_member_id,
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

        targetUserId:
          assignedClient.user_id,

        entityType:
          "CLIENT_ASSIGNMENT",

        entityId:
          assignment.rows[0].id,

        action:
          "CLIENT_ASSIGNED",

        description:
          `${assignedClient.name} assigned to ${trainer.name}.`,

        metadata: {

          trainer_member_id,

          client_member_id

        }

      }
    );

    await client.query("COMMIT");

    return assignment.rows[0];

  } catch (err) {

    await client.query("ROLLBACK");

    throw err;

  } finally {

    client.release();

  }

};


/* ======================================================
   ORGANIZATION DASHBOARD
====================================================== */

export const getOrganizationDashboardService =
async (
  userId
) => {

  const client =
    await pool.connect();

  try {

    /* ---------------------------------------------
       FIND ORGANIZATION
    ---------------------------------------------- */

    const organizationResult =
      await client.query(
        // `
        // SELECT

        //   o.id,

        //   o.name,

        //   o.organization_type,

        //   o.workspace_code

        // FROM organizations o

        // INNER JOIN organization_members om
        //   ON om.organization_id = o.id

        // WHERE

        //   om.user_id = $1

        //   AND om.status = 'ACTIVE'

        // LIMIT 1
        // `,

       ` SELECT

    id,

    name,

    organization_type,

    workspace_code

FROM organizations

WHERE

    created_by = $1

    AND status = 'ACTIVE'

ORDER BY

    created_at DESC

LIMIT 1`,
        [
          userId
        ]
      );

    if (
      !organizationResult.rows.length
    ) {

      throw new Error(
        "Organization not found."
      );

    }

    const organization =
      organizationResult.rows[0];




    const summaryResult =
  await client.query(
    `
    SELECT

    (
        SELECT COUNT(*)
        FROM organization_members
        WHERE
          organization_id = $1
          AND status = 'ACTIVE'
          AND role_id IN
          (
            SELECT id
            FROM organization_roles
            WHERE
              organization_id = $1
              AND name <> 'CLIENT'
          )
    ) AS employees,

    (
        SELECT COUNT(*)
        FROM organization_members om

        INNER JOIN organization_roles r
          ON r.id = om.role_id

        WHERE
          om.organization_id = $1
          AND om.status = 'ACTIVE'
          AND r.name = 'CLIENT'
    ) AS clients,

    (
        SELECT COUNT(*)
        FROM organization_invitations
        WHERE
          organization_id = $1
          AND invitation_type = 'EMPLOYEE'
          AND status = 'PENDING'
    ) AS pending_employee_invitations,

    (
        SELECT COUNT(*)
        FROM organization_invitations
        WHERE
          organization_id = $1
          AND invitation_type = 'CLIENT'
          AND status = 'PENDING'
    ) AS pending_client_invitations,

    (
        SELECT COUNT(*)
        FROM organization_client_assignments
        WHERE
          organization_id = $1
          AND is_active = true
    ) AS active_assignments,

    (
        SELECT COUNT(*)

        FROM organization_members om

        INNER JOIN organization_roles r
          ON r.id = om.role_id

        LEFT JOIN organization_client_assignments oca
          ON oca.client_member_id = om.id
          AND oca.is_active = true

        WHERE

          om.organization_id = $1

          AND om.status = 'ACTIVE'

          AND r.name = 'CLIENT'

          AND oca.id IS NULL

    ) AS unassigned_clients

    `,
    [
      organization.id
    ]
  );

/* ---------------------------------------------
   RECENT ACTIVITY
---------------------------------------------- */

const activityResult =
  await client.query(
    `
    SELECT

      action,

      description,

      severity,

      created_at

    FROM activity_logs

    WHERE
      organization_id = $1

    ORDER BY
      created_at DESC

    LIMIT 10
    `,
    [
      organization.id
    ]
  );



    const summary = {

  employees:
    Number(
      summaryResult.rows[0].employees
    ),

  clients:
    Number(
      summaryResult.rows[0].clients
    ),

  pending_employee_invitations:
    Number(
      summaryResult.rows[0].pending_employee_invitations
    ),

  pending_client_invitations:
    Number(
      summaryResult.rows[0].pending_client_invitations
    ),

  active_assignments:
    Number(
      summaryResult.rows[0].active_assignments
    ),

  unassigned_clients:
    Number(
      summaryResult.rows[0].unassigned_clients
    )

};

const quickActions = [];

/* ---------------------------------------------
   QUICK ACTIONS
---------------------------------------------- */

if (summary.pending_employee_invitations > 0) {

  quickActions.push({

    action: "REVIEW_EMPLOYEE_INVITATIONS",

    title: "Employee invitations pending",

    count: summary.pending_employee_invitations

  });

}

if (summary.pending_client_invitations > 0) {

  quickActions.push({

    action: "REVIEW_CLIENT_INVITATIONS",

    title: "Client invitations pending",

    count: summary.pending_client_invitations

  });

}

if (summary.unassigned_clients > 0) {

  quickActions.push({

    action: "ASSIGN_COACH",

    title: "Clients waiting for coach assignment",

    count: summary.unassigned_clients

  });

}

/* ---------------------------------------------
   NO PENDING ACTIONS
---------------------------------------------- */

if (quickActions.length === 0) {

  quickActions.push({

    action: "ALL_CAUGHT_UP",

    title: "Everything looks good",

    description:
      "No pending invitations or client assignments."

  });

}

return {

  organization,

  summary,

  quick_actions: quickActions,

  recent_activity:
    activityResult.rows

};

  } finally {

    client.release();

  }

};


/* ======================================================
   GET ORGANIZATION EMPLOYEES
====================================================== */

export const getEmployeesService = async (
  userId
) => {

  const client = await pool.connect();

  try {

    /* ---------------------------------------------
       FIND ORGANIZATION
    ---------------------------------------------- */

    const organizationResult =
      await client.query(
        `
        SELECT
          organization_id
        FROM organization_members
        WHERE
          user_id = $1
          AND status = 'ACTIVE'
        LIMIT 1
        `,
        [
          userId
        ]
      );

    if (!organizationResult.rows.length) {

      throw new Error(
        "Organization not found."
      );

    }

    const organizationId =
      organizationResult.rows[0]
        .organization_id;

    /* ---------------------------------------------
       LOAD EMPLOYEES
    ---------------------------------------------- */

    const result =
      await client.query(
        `
        SELECT

          om.id AS member_id,

          u.id AS user_id,

          u.name,

          u.nickname,

          u.mobile,

          u.email,

          r.name AS role,

          om.status,

          om.joined_at,

          COUNT(oca.id) FILTER (
            WHERE
              oca.is_active = true
          ) AS assigned_clients

        FROM organization_members om

        INNER JOIN users u
          ON u.id = om.user_id

        INNER JOIN organization_roles r
          ON r.id = om.role_id

        LEFT JOIN organization_client_assignments oca
          ON oca.trainer_member_id = om.id

        WHERE

          om.organization_id = $1

          AND om.status = 'ACTIVE'

          AND r.name <> 'CLIENT'

        GROUP BY

          om.id,

          u.id,

          u.name,

          u.nickname,

          u.mobile,

          u.email,

          r.name,

          om.status,

          om.joined_at

        ORDER BY

          CASE

            WHEN r.name = 'OWNER' THEN 1

            WHEN r.name = 'ADMIN' THEN 2

            WHEN r.name = 'COACH' THEN 3

            WHEN r.name = 'DIETITIAN' THEN 4

            WHEN r.name = 'RECEPTIONIST' THEN 5

            ELSE 99

          END,

          u.name
        `,
        [
          organizationId
        ]
      );

    return result.rows.map(employee => ({

  ...employee,

  assigned_clients:
    Number(employee.assigned_clients)

}));

  } finally {

    client.release();

  }

};


/* ======================================================
   GET ORGANIZATION CLIENTS
====================================================== */

export const getClientsService = async (
  userId
) => {

  const client = await pool.connect();

  try {

    /* ---------------------------------------------
       FIND ORGANIZATION
    ---------------------------------------------- */

    const organizationResult =
      await client.query(
        `
        SELECT
          organization_id
        FROM organization_members
        WHERE
          user_id = $1
          AND status = 'ACTIVE'
        LIMIT 1
        `,
        [
          userId
        ]
      );

    if (!organizationResult.rows.length) {

      throw new Error(
        "Organization not found."
      );

    }

    const organizationId =
      organizationResult.rows[0]
        .organization_id;

    /* ---------------------------------------------
       LOAD CLIENTS
    ---------------------------------------------- */

    const result =
      await client.query(
        `
        SELECT

          om.id AS member_id,

          u.id AS user_id,

          u.name,

          u.nickname,

          u.mobile,

          u.email,

          om.status,

          om.joined_at,

          oc.granted AS consent_granted,

          coachMember.id AS coach_member_id,

          coachUser.id AS coach_user_id,

          coachUser.name AS coach_name,

          coachRole.name AS coach_role

        FROM organization_members om

        INNER JOIN users u
          ON u.id = om.user_id

        INNER JOIN organization_roles clientRole
          ON clientRole.id = om.role_id

        LEFT JOIN organization_consents oc
          ON oc.organization_id = om.organization_id
         AND oc.client_user_id = om.user_id

        LEFT JOIN organization_client_assignments oca
          ON oca.client_member_id = om.id
         AND oca.is_active = true

        LEFT JOIN organization_members coachMember
          ON coachMember.id = oca.trainer_member_id

        LEFT JOIN users coachUser
          ON coachUser.id = coachMember.user_id

        LEFT JOIN organization_roles coachRole
          ON coachRole.id = coachMember.role_id

        WHERE

          om.organization_id = $1

          AND om.status = 'ACTIVE'

          AND clientRole.name = 'CLIENT'

        ORDER BY

          u.name
        `,
        [
          organizationId
        ]
      );

    return result.rows.map(row => ({

      member_id:
        row.member_id,

      user_id:
        row.user_id,

      name:
        row.name,

      nickname:
        row.nickname,

      mobile:
        row.mobile,

      email:
        row.email,

      status:
        row.status,

      joined_at:
        row.joined_at,

      consent_granted:
        row.consent_granted ?? false,

      assigned_coach:
        row.coach_member_id
          ? {

              member_id:
                row.coach_member_id,

              user_id:
                row.coach_user_id,

              name:
                row.coach_name,

              role:
                row.coach_role

            }
          : null

    }));

  } finally {

    client.release();

  }

};



/* ======================================================
   GET ORGANIZATION CLIENT DETAILS
====================================================== */

export const getClientDetailsService = async (
  userId,
  clientMemberId
) => {

  const client = await pool.connect();

  console.log("Inside Get Client Details Service" +userId + clientMemberId);

  try {

    /* ---------------------------------------------
       FIND ORGANIZATION
    ---------------------------------------------- */

    const organizationResult =
      await client.query(
        `
        SELECT

          organization_id

        FROM organization_members

        WHERE

          user_id = $1

          AND status = 'ACTIVE'

        LIMIT 1
        `,
        [
          userId
        ]
      );

    if (!organizationResult.rows.length) {

      throw new Error(
        "Organization not found."
      );

    }

    const organizationId =
      organizationResult.rows[0]
        .organization_id;

    /* ---------------------------------------------
       VERIFY CLIENT BELONGS TO ORG
    ---------------------------------------------- */

    const assignmentResult =
      await client.query(
        `
        SELECT

          om.user_id AS client_user_id,

          oc.granted AS consent_granted

        FROM organization_members om

        INNER JOIN organization_roles r

          ON r.id = om.role_id

        LEFT JOIN organization_consents oc

          ON oc.organization_id = om.organization_id

         AND oc.client_user_id = om.user_id

        WHERE

          om.id = $1

          AND om.organization_id = $2

          AND om.status = 'ACTIVE'

          AND r.name = 'CLIENT'

        LIMIT 1
        `,
        [
          clientMemberId,
          organizationId
        ]
      );

    if (!assignmentResult.rows.length) {

      throw new Error(
        "Client not found."
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

        // target: {

        //   calories:
        //     fitnessProfile.target_calories,

        //   protein:
        //     fitnessProfile.target_protein,

        //   carbs:
        //     fitnessProfile.target_carbs,

        //   fats:
        //     fitnessProfile.target_fats

        // },

        target: {

            calories:
              fitnessProfile.target_calories,

            protein:
              fitnessProfile.protein_target,

            carbs:
              fitnessProfile.carbs_target,

            fats:
              fitnessProfile.fats_target

          },

          consumed: {

            calories:
              today.total_calories,

            protein:
              today.protein,

            carbs:
              today.carbs,

            fats:
              today.fats

          },
          remaining: {

            calories:
              Math.max(
                0,
                fitnessProfile.target_calories -
                today.total_calories
              ),

            protein:
              Math.max(
                0,
                fitnessProfile.protein_target -
                today.protein
              ),

            carbs:
              Math.max(
                0,
                fitnessProfile.carbs_target -
                today.carbs
              ),

            fats:
              Math.max(
                0,
                fitnessProfile.fats_target -
                today.fats
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


/* ======================================================
   GET ORGANIZATION ASSIGNMENTS
====================================================== */

export const getAssignmentsService =
async (
  userId
) => {

  const client =
    await pool.connect();

  try {

    /* ---------------------------------------------
       FIND ORGANIZATION
    ---------------------------------------------- */

    const organizationResult =
      await client.query(
        `
        SELECT
          organization_id
        FROM organization_members
        WHERE
          user_id = $1
          AND status = 'ACTIVE'
        LIMIT 1
        `,
        [
          userId
        ]
      );

    if (
      !organizationResult.rows.length
    ) {

      throw new Error(
        "Organization not found."
      );

    }

    const organizationId =
      organizationResult.rows[0]
        .organization_id;

    /* ---------------------------------------------
       LOAD ASSIGNMENTS
    ---------------------------------------------- */

    const result =
      await client.query(
        `
        SELECT

          coach.id AS coach_member_id,

          coachUser.id AS coach_user_id,

          coachUser.name AS coach_name,

          coachUser.nickname AS coach_nickname,

          coachRole.name AS coach_role,

          clientMember.id AS client_member_id,

          clientUser.id AS client_user_id,

          clientUser.name AS client_name,

          clientUser.nickname AS client_nickname,

           oca.id AS assignment_id,

          oca.is_active,

          oc.granted AS consent_granted,

          oca.assigned_at

        FROM organization_client_assignments oca

        INNER JOIN organization_members coach
          ON coach.id = oca.trainer_member_id

        INNER JOIN users coachUser
          ON coachUser.id = coach.user_id

        INNER JOIN organization_roles coachRole
          ON coachRole.id = coach.role_id

        INNER JOIN organization_members clientMember
          ON clientMember.id = oca.client_member_id

        INNER JOIN users clientUser
          ON clientUser.id = clientMember.user_id

        LEFT JOIN organization_consents oc
          ON oc.organization_id = oca.organization_id
         AND oc.client_user_id = clientUser.id

        WHERE

          oca.organization_id = $1

          AND oca.is_active = true

        ORDER BY

          coachUser.name,

          clientUser.name
        `,
        [
          organizationId
        ]
      );

          /* ---------------------------------------------
       GROUP BY COACH
    ---------------------------------------------- */

    const assignmentsMap =
      new Map();

    for (const row of result.rows) {

      if (
        !assignmentsMap.has(
          row.coach_member_id
        )
      ) {

        assignmentsMap.set(
          row.coach_member_id,
          {

            coach: {

              member_id:
                row.coach_member_id,

              user_id:
                row.coach_user_id,

              name:
                row.coach_name,

              nickname:
                row.coach_nickname,

              role:
                row.coach_role

            },

            total_clients: 0,

            clients: []

          }
        );

      }

      const coach =
        assignmentsMap.get(
          row.coach_member_id
        );

    coach.clients.push({

      assignment_id:
        row.assignment_id,

      member_id:
        row.client_member_id,

      user_id:
        row.client_user_id,

      name:
        row.client_name,

      nickname:
        row.client_nickname,

      consent_granted:
        row.consent_granted ?? false,

      assigned_at:
        row.assigned_at,

      is_active:
        row.is_active

    });

      coach.total_clients =
        coach.clients.length;

    }

    return Array.from(
      assignmentsMap.values()
    );

  } finally {

    client.release();

  }

};


/* ======================================================
   GET ORGANIZATION INVITATIONS
====================================================== */

export const getInvitationsService = async (
  userId
) => {

  const client =
    await pool.connect();

  try {

    /* ---------------------------------------------
       FIND ORGANIZATION
    ---------------------------------------------- */

    const organizationResult =
      await client.query(
        `
        SELECT
          organization_id
        FROM organization_members
        WHERE
          user_id = $1
          AND status='ACTIVE'
        LIMIT 1
        `,
        [
          userId
        ]
      );

    if (
      !organizationResult.rows.length
    ) {

      throw new Error(
        "Organization not found."
      );

    }

    const organizationId =
      organizationResult.rows[0]
        .organization_id;

    /* ---------------------------------------------
       LOAD INVITATIONS
    ---------------------------------------------- */

    const result =
      await client.query(
        `
        SELECT

          oi.id,

          oi.invitation_type,

          oi.invited_name,

          oi.invited_mobile,

          oi.invited_email,

          oi.status,

          oi.created_at,

          oi.expires_at,

          oi.accepted_at,

          r.name AS role

        FROM organization_invitations oi

        LEFT JOIN organization_roles r
          ON r.id = oi.role_id

        WHERE

          oi.organization_id = $1

        ORDER BY

          oi.created_at DESC
        `,
        [
          organizationId
        ]
      );

    return result.rows;

  } finally {

    client.release();

  }

};


/* ======================================================
   TRANSFER CLIENT
====================================================== */

export const transferAssignmentService = async (
  userId,
  assignmentId,
  trainerMemberId
) => {

  const client = await pool.connect();

  try {

    await client.query("BEGIN");

    /* ---------------------------------------------
       FIND OWNER ORGANIZATION
    ---------------------------------------------- */

    const organizationResult =
      await client.query(
        `
        SELECT

          organization_id

        FROM organization_members

        WHERE

          user_id = $1

          AND status = 'ACTIVE'

        LIMIT 1
        `,
        [
          userId
        ]
      );

    if (!organizationResult.rows.length) {

      throw new Error(
        "Organization not found."
      );

    }

    const organizationId =
      organizationResult.rows[0]
        .organization_id;

    /* ---------------------------------------------
       VERIFY TRAINER
    ---------------------------------------------- */

    const trainerResult =
      await client.query(
        `
        SELECT

          om.id

        FROM organization_members om

        INNER JOIN organization_roles r

          ON r.id = om.role_id

        WHERE

          om.id = $1

          AND om.organization_id = $2

          AND om.status = 'ACTIVE'

          AND r.name = 'TRAINER'

        LIMIT 1
        `,
        [
          trainerMemberId,
          organizationId
        ]
      );

    if (!trainerResult.rows.length) {

      throw new Error(
        "Trainer not found."
      );

    }

    /* ---------------------------------------------
       VERIFY ASSIGNMENT
    ---------------------------------------------- */

    const assignmentResult =
      await client.query(
        `
        SELECT

          oca.id,

          oca.trainer_member_id,

          oca.client_member_id

        FROM organization_client_assignments oca

        WHERE

          oca.id = $1

          AND oca.organization_id = $2

          AND oca.is_active = true

        LIMIT 1
        `,
        [
          assignmentId,
          organizationId
        ]
      );

    if (!assignmentResult.rows.length) {

      throw new Error(
        "Assignment not found."
      );

    }

    const assignment =
      assignmentResult.rows[0];

    /* ---------------------------------------------
       SAME TRAINER?
    ---------------------------------------------- */

    if (

      Number(
        assignment.trainer_member_id
      ) ===
      Number(
        trainerMemberId
      )

    ) {

      throw new Error(
        "Client is already assigned to this trainer."
      );

    }

    /* ---------------------------------------------
       TRANSFER
    ---------------------------------------------- */

    const updateResult =
      await client.query(
        `
        UPDATE organization_client_assignments

        SET

          trainer_member_id = $1

        WHERE

          id = $2

        RETURNING *

        `,
        [
          trainerMemberId,
          assignmentId
        ]
      );

    await client.query(
      "COMMIT"
    );

    return updateResult.rows[0];

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



/* =============================================
   REMOVE ASSIGNMENT
============================================= */

export const removeAssignmentService =
async (

  userId,

  assignmentId

) => {

  const client =
    await pool.connect();

  try {

    await client.query(
      "BEGIN"
    );

    /* ---------------------------------------------
       FIND ORGANIZATION
    ---------------------------------------------- */

    const organizationResult =
      await client.query(

        `
        SELECT

          organization_id

        FROM organization_members

        WHERE

          user_id = $1

          AND status='ACTIVE'

        LIMIT 1
        `,

        [

          userId

        ]

      );

    if (!organizationResult.rows.length) {

      throw new Error(
        "Organization not found."
      );

    }

    const organizationId =
      organizationResult.rows[0]
        .organization_id;

    /* ---------------------------------------------
       VERIFY ASSIGNMENT
    ---------------------------------------------- */

    const assignmentResult =
      await client.query(

        `
        SELECT

          id

        FROM organization_client_assignments

        WHERE

          id = $1

          AND organization_id = $2

          AND is_active = true

        LIMIT 1
        `,

        [

          assignmentId,

          organizationId

        ]

      );

    if (!assignmentResult.rows.length) {

      throw new Error(
        "Assignment not found."
      );

    }

    /* ---------------------------------------------
       SOFT DELETE
    ---------------------------------------------- */

    await client.query(

      `
      UPDATE

        organization_client_assignments

      SET

        is_active = false,

        ended_at = NOW()

      WHERE

        id = $1
      `,

      [

        assignmentId

      ]

    );

    await client.query(
      "COMMIT"
    );

    return {

      assignment_id:
        assignmentId

    };

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


export const getWorkspaceMembersService = async (userId) => {

    const client = await pool.connect();

    try {

        /* ---------------------------------------------
           FIND CURRENT USER MEMBERSHIP
        ---------------------------------------------- */

        const membershipResult =
            await client.query(
                `
                SELECT

                    om.organization_id,

                    r.name AS role_name,

                    o.name AS organization_name,

                    o.organization_type,

                    o.workspace_code

                FROM organization_members om

                INNER JOIN organization_roles r
                    ON r.id = om.role_id

                INNER JOIN organizations o
                    ON o.id = om.organization_id

                WHERE

                    om.user_id = $1

                    AND om.status = 'ACTIVE'

                LIMIT 1
                `,
                [
                    userId
                ]
            );

        if (!membershipResult.rows.length) {

            throw new Error(
                "Organization membership not found."
            );

        }

        const membership =
            membershipResult.rows[0];

            console.log("Membership:", membership);



        /* ---------------------------------------------
           BUILD MEMBERS QUERY
        ---------------------------------------------- */

        let query = `
            SELECT

                om.id,

                om.user_id,

                om.joined_at,

                u.name,

                u.nickname,

                u.email,

                u.gender,

                r.name AS role,

                CASE
                    WHEN om.user_id = $2
                    THEN true
                    ELSE false
                END AS is_current_user

            FROM organization_members om

            INNER JOIN users u
                ON u.id = om.user_id

            INNER JOIN organization_roles r
                ON r.id = om.role_id

            WHERE

                om.organization_id = $1

                AND om.status = 'ACTIVE'
        `;



        /* ---------------------------------------------
           CLIENT SHOULD NOT SEE OTHER CLIENTS
        ---------------------------------------------- */

        if (
            membership.role_name === "CLIENT"
        ) {

            query += `
                AND r.name <> 'CLIENT'
            `;

        }



        /* ---------------------------------------------
           SORT MEMBERS
        ---------------------------------------------- */

        query += `
            ORDER BY

            CASE

                WHEN r.name = 'OWNER' THEN 1

                WHEN r.name = 'ADMIN' THEN 2

                WHEN r.name = 'TRAINER' THEN 3

                WHEN r.name = 'DIETITIAN' THEN 4

                WHEN r.name = 'RECEPTIONIST' THEN 5

                WHEN r.name = 'CLIENT' THEN 6

                ELSE 99

            END,

            u.name ASC
        `;



        const membersResult =
            await client.query(
                query,
                [
                    membership.organization_id,
                    userId
                ]
            );



        return {

            organization: {

                id:
                    membership.organization_id,

                name:
                    membership.organization_name,

                organization_type:
                    membership.organization_type,

                workspace_code:
                    membership.workspace_code

            },

            viewer_role:
                membership.role_name,

            members:
                membersResult.rows

        };

    }

    finally {

        client.release();

    }

};



export const leaveWorkspaceService =
async (
  userId
) => {

  const client =
    await pool.connect();

  try {

    await client.query(
      "BEGIN"
    );

    /* ---------------------------------------------
       FIND ACTIVE MEMBERSHIP
    ---------------------------------------------- */

    const membershipResult =
      await client.query(
        `
        SELECT

          om.id,

          om.organization_id,

          o.name

        FROM organization_members om

        INNER JOIN organizations o
          ON o.id = om.organization_id

        WHERE

          om.user_id = $1

          AND om.status = 'ACTIVE'

        LIMIT 1
        `,
        [
          userId
        ]
      );

    if (
      !membershipResult.rows.length
    ) {

      throw new Error(
        "Active workspace not found."
      );

    }

    const membership =
      membershipResult.rows[0];

      /* ---------------------------------------------
   MARK MEMBERSHIP AS LEFT
---------------------------------------------- */

await client.query(
  `
  UPDATE organization_members

  SET

    status = 'LEFT',

    left_at = NOW()

  WHERE id = $1
  `,
  [
    membership.id
  ]
);

/* ---------------------------------------------
   REVOKE CONSENT
---------------------------------------------- */

await client.query(
  `
  UPDATE organization_consents

  SET

    granted = false,

    granted_at = NULL,

    revoked_at = NOW()

  WHERE

    organization_id = $1

    AND client_user_id = $2
  `,
  [
    membership.organization_id,
    userId
  ]
);

/* ---------------------------------------------
   END ACTIVE ASSIGNMENTS
---------------------------------------------- */

await client.query(
  `
  UPDATE organization_client_assignments

  SET

    is_active = false,

    ended_at = NOW()

  WHERE

    organization_id = $1

    AND client_member_id = $2

    AND is_active = true
  `,
  [
    membership.organization_id,
    membership.id
  ]
);

/* ---------------------------------------------
   LOAD USER
---------------------------------------------- */

const userResult =
  await client.query(
    `
    SELECT

      name

    FROM users

    WHERE id = $1

    LIMIT 1
    `,
    [
      userId
    ]
  );

const userName =
  userResult.rows[0]?.name ??
  "User";

/* ---------------------------------------------
   ACTIVITY LOG
---------------------------------------------- */

await createActivityLog(
  client,
  {

    organizationId:
      membership.organization_id,

    actorUserId:
      userId,

    targetUserId:
      userId,

    entityType:
      "MEMBERSHIP",

    entityId:
      membership.id,

    action:
      "CLIENT_LEFT_WORKSPACE",

    description:
      `${userName} left the workspace.`,

    metadata: {

      member_id:
        membership.id

    }

  }
);

await client.query(
  "COMMIT"
);

return {

  message:
    "Workspace left successfully."

};

} catch (err) {

  await client.query(
    "ROLLBACK"
  );

  throw err;

} finally {

  client.release();

}

};


export const getMyOwnedOrganizationsService =
async (
    userId
) => {

    const client =
        await pool.connect();

    try {

        const result =
            await client.query(
                `
                SELECT

                    id,

                    name,

                    organization_type,

                    workspace_code,

                    logo_url,

                    created_at

                FROM organizations

                WHERE

                    created_by = $1

                ORDER BY

                    created_at DESC
                `,
                [
                    userId
                ]
            );

        return result.rows;

    }

    finally {

        client.release();

    }

};

/* ======================================================
   CHANGE MEMBER ROLE
====================================================== */

export const changeOrganizationMemberRoleService = async (
  userId,
  memberId,
  roleName
) => {

  const client = await pool.connect();

  try {

    await client.query("BEGIN");

    /* ---------------------------------------------
       LOAD TARGET MEMBER
    ---------------------------------------------- */

    const memberResult =
      await client.query(
        `
        SELECT

          om.id AS member_id,

          om.organization_id,

          om.user_id,

          om.role_id,

          om.status,

          r.name AS current_role

        FROM organization_members om

        INNER JOIN organization_roles r
          ON r.id = om.role_id

        WHERE
          om.id = $1

        LIMIT 1
        `,
        [
          memberId
        ]
      );

    if (!memberResult.rows.length) {

      throw new Error(
        "Member not found."
      );

    }

    const member =
      memberResult.rows[0];


    /* ---------------------------------------------
       MEMBER MUST BE ACTIVE
    ---------------------------------------------- */

    if (
      member.status !== "ACTIVE"
    ) {

      throw new Error(
        "Member is not active."
      );

    }


    /* ---------------------------------------------
       PERMISSION CHECK
    ---------------------------------------------- */

    const allowed =
      await hasPermission(
        client,
        member.organization_id,
        userId,
        "MANAGE_MEMBERS"
      );

    if (!allowed) {

      throw new Error(
        "Permission denied."
      );

    }


    /* ---------------------------------------------
       OWNER PROTECTION
    ---------------------------------------------- */

    if (
      member.current_role === "OWNER"
    ) {

      throw new Error(
        "Owner role cannot be changed."
      );

    }


    /* ---------------------------------------------
       GET TARGET ROLE
    ---------------------------------------------- */

    const roleResult =
      await client.query(
        `
        SELECT

          id,

          name

        FROM organization_roles

        WHERE

          organization_id = $1

          AND name = $2

        LIMIT 1
        `,
        [
          member.organization_id,
          roleName
        ]
      );

    if (!roleResult.rows.length) {

      throw new Error(
        "Role not found."
      );

    }

    const newRole =
      roleResult.rows[0];


    /* ---------------------------------------------
       PREVENT OWNER ASSIGNMENT
       THROUGH NORMAL ROLE CHANGE
    ---------------------------------------------- */

    if (
      newRole.name === "OWNER"
    ) {

      throw new Error(
        "Owner role cannot be assigned this way."
      );

    }


    /* ---------------------------------------------
       UPDATE ROLE
    ---------------------------------------------- */

    await client.query(
      `
      UPDATE organization_members

      SET

        role_id = $1,

        updated_at = NOW()

      WHERE

        id = $2

        AND status = 'ACTIVE'
      `,
      [
        newRole.id,
        memberId
      ]
    );


    /* ---------------------------------------------
       ACTIVITY LOG
    ---------------------------------------------- */

    await createActivityLog(
      client,
      {

        organizationId:
          member.organization_id,

        actorUserId:
          userId,

        targetUserId:
          member.user_id,

        entityType:
          "MEMBER",

        entityId:
          member.member_id,

        action:
          "MEMBER_ROLE_CHANGED",

        description:
          `Member role changed from ${member.current_role} to ${newRole.name}.`,

        metadata: {

          previous_role:
            member.current_role,

          new_role:
            newRole.name

        }

      }
    );


    await client.query("COMMIT");


    return {

      member_id:
        member.member_id,

      role:
        newRole.name

    };

  } catch (err) {

    await client.query("ROLLBACK");

    throw err;

  } finally {

    client.release();

  }

};


/* ======================================================
   REMOVE ORGANIZATION MEMBER
====================================================== */

export const removeOrganizationMemberService = async (
  userId,
  memberId
) => {

  const client = await pool.connect();

  try {

    await client.query("BEGIN");


    /* ---------------------------------------------
       LOAD TARGET MEMBER
    ---------------------------------------------- */

    const memberResult =
      await client.query(
        `
        SELECT

          om.id AS member_id,

          om.organization_id,

          om.user_id,

          om.role_id,

          om.status,

          r.name AS role,

          u.name AS name

        FROM organization_members om

        INNER JOIN organization_roles r
          ON r.id = om.role_id

        INNER JOIN users u
          ON u.id = om.user_id

        WHERE

          om.id = $1

        LIMIT 1
        `,
        [
          memberId
        ]
      );

    if (!memberResult.rows.length) {

      throw new Error(
        "Member not found."
      );

    }

    const member =
      memberResult.rows[0];


    /* ---------------------------------------------
       PERMISSION CHECK
    ---------------------------------------------- */

    const allowed =
      await hasPermission(
        client,
        member.organization_id,
        userId,
        "REMOVE_MEMBER"
      );

    if (!allowed) {

      throw new Error(
        "Permission denied."
      );

    }


    /* ---------------------------------------------
       OWNER PROTECTION
    ---------------------------------------------- */

    if (
      member.role === "OWNER"
    ) {

      throw new Error(
        "Workspace owner cannot be removed."
      );

    }


    /* ---------------------------------------------
       STATUS CHECK
    ---------------------------------------------- */

    if (
      member.status !== "ACTIVE"
    ) {

      throw new Error(
        "Member is already inactive."
      );

    }


    /* ---------------------------------------------
       REMOVE MEMBER
    ---------------------------------------------- */

    await client.query(
      `
      UPDATE organization_members

      SET

        status = 'LEFT',

        left_at = NOW(),

        updated_at = NOW()

      WHERE

        id = $1

        AND status = 'ACTIVE'
      `,
      [
        memberId
      ]
    );


    /* ---------------------------------------------
       ACTIVITY LOG
    ---------------------------------------------- */

    await createActivityLog(
      client,
      {

        organizationId:
          member.organization_id,

        actorUserId:
          userId,

        targetUserId:
          member.user_id,

        entityType:
          "MEMBER",

        entityId:
          member.member_id,

        action:
          "MEMBER_REMOVED",

        description:
          `${member.name} was removed from the workspace.`,

        metadata: {

          role:
            member.role

        }

      }
    );


    await client.query("COMMIT");


    return {

      member_id:
        member.member_id,

      status:
        "LEFT"

    };

  } catch (err) {

    await client.query("ROLLBACK");

    throw err;

  } finally {

    client.release();

  }

};




export const getOrganizationSettingsService = async (
  userId
) => {

  const client =
    await pool.connect();

  try {

    const result =
      await client.query(
        `
        SELECT

          o.id,

          o.name,

          o.organization_type,

          o.logo_url,

          o.email,

          o.mobile,

          o.website,

          o.address,

          o.city,

          o.state,

          o.country,

          o.timezone,

          o.currency,

          o.subscription_plan,

          o.workspace_code,

          o.created_at

        FROM organizations o

        INNER JOIN organization_members om
          ON om.organization_id = o.id

        INNER JOIN organization_roles r
          ON r.id = om.role_id

        WHERE

          om.user_id = $1

          AND om.status = 'ACTIVE'

          AND r.name = 'OWNER'

          AND o.status = 'ACTIVE'

        LIMIT 1
        `,
        [userId]
      );

    if (!result.rows.length) {

      throw new Error(
        "Workspace not found."
      );

    }

    return result.rows[0];

  } finally {

    client.release();

  }

};




export const updateOrganizationSettingsService =
async (
  userId,
  {
    name,
    organization_type,
    email,
    mobile,
    website,
    address,
    city,
    state,
    country,
    timezone,
    currency,
    logo_url
  }
) => {

  const client =
    await pool.connect();

  try {

    await client.query("BEGIN");

    const organizationResult =
      await client.query(
        `
        SELECT

          o.id

        FROM organizations o

        INNER JOIN organization_members om
          ON om.organization_id = o.id

        INNER JOIN organization_roles r
          ON r.id = om.role_id

        WHERE

          om.user_id = $1

          AND om.status = 'ACTIVE'

          AND r.name = 'OWNER'

          AND o.status = 'ACTIVE'

        LIMIT 1
        `,
        [userId]
      );

    if (!organizationResult.rows.length) {

      throw new Error(
        "Workspace not found."
      );

    }

    const organizationId =
      organizationResult.rows[0].id;


    const result =
      await client.query(
        `
        UPDATE organizations

        SET

          name = COALESCE($1, name),

          organization_type =
            COALESCE($2, organization_type),

          email =
            COALESCE($3, email),

          mobile =
            COALESCE($4, mobile),

          website =
            COALESCE($5, website),

          address =
            COALESCE($6, address),

          city =
            COALESCE($7, city),

          state =
            COALESCE($8, state),

          country =
            COALESCE($9, country),

          timezone =
            COALESCE($10, timezone),

          currency =
            COALESCE($11, currency),

          logo_url =
            COALESCE($12, logo_url),

          updated_at = NOW()

        WHERE id = $13

        RETURNING

          id,

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

          workspace_code,

          created_at,

          updated_at
        `,
        [
          name,
          organization_type,
          email,
          mobile,
          website,
          address,
          city,
          state,
          country,
          timezone,
          currency,
          logo_url,
          organizationId
        ]
      );


    await createActivityLog(
      client,
      {

        organizationId,

        actorUserId:
          userId,

        entityType:
          "ORGANIZATION",

        entityId:
          organizationId,

        action:
          "ORGANIZATION_SETTINGS_UPDATED",

        description:
          "Workspace settings updated.",

        metadata: {}

      }
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


export const deleteOrganizationService =
async (
  userId
) => {

  const client =
    await pool.connect();

  try {

    await client.query("BEGIN");


    /* ---------------------------------------------
       FIND OWNER WORKSPACE
    ---------------------------------------------- */

    const organizationResult =
      await client.query(
        `
        SELECT

          o.id,

          o.name

        FROM organizations o

        INNER JOIN organization_members om
          ON om.organization_id = o.id

        INNER JOIN organization_roles r
          ON r.id = om.role_id

        WHERE

          om.user_id = $1

          AND om.status = 'ACTIVE'

          AND r.name = 'OWNER'

          AND o.status = 'ACTIVE'

        LIMIT 1

        FOR UPDATE OF o
        `,
        [userId]
      );


    if (!organizationResult.rows.length) {

      throw new Error(
        "Workspace not found."
      );

    }


    const organization =
      organizationResult.rows[0];

    const organizationId =
      organization.id;


    /* ---------------------------------------------
       DEACTIVATE ASSIGNMENTS
    ---------------------------------------------- */

    await client.query(
      `
      UPDATE organization_client_assignments

      SET

        is_active = false,

        ended_at = NOW()

      WHERE

        organization_id = $1

        AND is_active = true
      `,
      [organizationId]
    );


    /* ---------------------------------------------
       EXPIRE PENDING INVITATIONS
    ---------------------------------------------- */

    await client.query(
      `
      UPDATE organization_invitations

      SET

        status = 'EXPIRED'

      WHERE

        organization_id = $1

        AND status = 'PENDING'
      `,
      [organizationId]
    );


    /* ---------------------------------------------
       REMOVE MEMBER ACCESS
    ---------------------------------------------- */

    await client.query(
      `
      UPDATE organization_members

      SET

        status = 'LEFT',

        left_at = COALESCE(
          left_at,
          NOW()
        ),

        updated_at = NOW()

      WHERE

        organization_id = $1

        AND status = 'ACTIVE'
      `,
      [organizationId]
    );


    /* ---------------------------------------------
       DELETE ORGANIZATION LOGIC
    ---------------------------------------------- */

    await client.query(
      `
      UPDATE organizations

      SET

        status = 'DELETED',

        updated_at = NOW()

      WHERE

        id = $1
      `,
      [organizationId]
    );


    /* ---------------------------------------------
       ACTIVITY LOG
    ---------------------------------------------- */

    await createActivityLog(
      client,
      {

        organizationId,

        actorUserId:
          userId,

        entityType:
          "ORGANIZATION",

        entityId:
          organizationId,

        action:
          "ORGANIZATION_DELETED",

        description:
          `${organization.name} workspace was deleted.`,

        metadata: {}

      }
    );


    await client.query("COMMIT");


    return {

      organization_id:
        organizationId,

      status:
        "DELETED"

    };

  } catch (err) {

    await client.query("ROLLBACK");

    throw err;

  } finally {

    client.release();

  }

};