import {
  createOrganizationService,getMyOrganizationsService, inviteEmployeeService,
    inviteClientService,getMyInvitationsService, acceptInvitationService ,getOrganizationMembersService,
    assignClientService,getOrganizationDashboardService , getEmployeesService, getClientsService , getAssignmentsService,
    getInvitationsService,getClientDetailsService, transferAssignmentService, removeAssignmentService, declineInvitationService,
    getWorkspaceMembersService
} from "../services/organization/organization.service.js";

/* 🔥 CREATE ORGANIZATION */
export const createOrganization =
async (req, res) => {

  try {

    const {
      name,
      organization_type
    } = req.body;

    if (!name || !organization_type) {

      return res.status(400).json({
        error:
          "Organization name and type are required"
      });

    }

    const organization =
      await createOrganizationService(
        req.user.id,
        req.body
      );

    return res.status(201).json({

      success: true,

      message:
        "Workspace created successfully 🚀",

      data: organization

    });

  } catch (err) {

    console.error(err);

    return res.status(500).json({
      error: err.message
    });

  }

};


/* 🔥 GET MY ORGANIZATIONS */
export const getMyOrganizations =
async (req, res) => {

  try {

    const organizations =
      await getMyOrganizationsService(
        req.user.id
      );

    return res.json({
      success: true,
      data: organizations
    });

  } catch (err) {

    console.error(err);

    return res.status(500).json({
      error: err.message
    });

  }

};




/* 🔥 INVITE EMPLOYEE */

export const inviteEmployee =
async (req, res) => {

    try {

        const invitation =
            await inviteEmployeeService(
                req.user.id,
                req.body
            );

        return res.status(201).json({

            success: true,

            message:
                "Employee invitation sent.",

            data: invitation

        });

    } catch (err) {

        console.error(err);

        return res.status(500).json({

            error: err.message

        });

    }

};


/* 🔥 INVITE CLIENT */

export const inviteClient =
async (req, res) => {

    try {

        const invitation =
            await inviteClientService(
                req.user.id,
                req.body
            );

        return res.status(201).json({

            success: true,

            message:
                "Client invitation sent.",

            data: invitation

        });

    } catch (err) {

        console.error(err);

        return res.status(500).json({

            error: err.message

        });

    }

};


/* 🔥 GET MY INVITATIONS */

export const getMyInvitations =
async (req, res) => {

  try {

    const invitations =
      await getMyInvitationsService(
        req.user.id
      );

    return res.json({

      success: true,

      data: invitations

    });

  } catch (err) {

    console.error(err);

    return res.status(500).json({

      error: err.message

    });

  }

};


/* 🔥 ACCEPT INVITATION */

export const acceptInvitation =
async (req, res) => {

  try {

    const invitation =
      await acceptInvitationService(
        req.user.id,
        req.params.token
      );

    return res.json({

      success: true,

      message:
        "Invitation accepted successfully.",

      data: invitation

    });

  } catch (err) {

    console.error(err);

    return res.status(500).json({

      error: err.message

    });

  }

};

 // Decline Invitations

export const declineInvitation =
async (req, res) => {

  try {

    const result =
      await declineInvitationService(
        req.user.id,
        req.params.token
      );

    return res.json({

      success: true,

      message:
        "Invitation declined successfully.",

      data: result

    });

  } catch (err) {

    console.error(err);

    return res.status(500).json({

      error: err.message

    });

  }

};


/* 🔥 GET ORGANIZATION MEMBERS */

export const getOrganizationMembers =
async (req, res) => {

  try {

    const members =
      await getOrganizationMembersService(
        req.user.id,
        req.params.organizationId
      );

    return res.json({

      success: true,

      data: members

    });

  } catch (err) {

    console.error(err);

    return res.status(500).json({

      error: err.message

    });

  }

};


/* 🔥 ASSIGN CLIENT */

export const assignClient =
async (req, res) => {

  try {

    const assignment =
      await assignClientService(
        req.user.id,
        req.body
      );

    return res.status(201).json({

      success: true,

      message:
        "Client assigned successfully.",

      data: assignment

    });

  } catch (err) {

    console.error(err);

    return res.status(500).json({

      error: err.message

    });

  }

};


/* ==========================================
   ORGANIZATION DASHBOARD
========================================== */

export const getOrganizationDashboard =
async (req, res) => {

  try {

    const data =
      await getOrganizationDashboardService(
        req.user.id
      );

    return res.json({

      success: true,

      data

    });

  } catch (err) {

    console.error(err);

    return res.status(500).json({

      error: err.message

    });

  }

};


/* ==========================================
   EMPLOYEES
========================================== */

export const getEmployees =
async (
  req,
  res
) => {

  try {

    const data =
      await getEmployeesService(
        req.user.id
      );

    return res.json({

      success: true,

      data

    });

  } catch (err) {

    console.error(err);

    return res.status(500).json({

      error: err.message

    });

  }

};


/* ==========================================
   CLIENTS
========================================== */

export const getClients =
async (
  req,
  res
) => {

  try {

    const data =
      await getClientsService(
        req.user.id
      );

    return res.json({

      success: true,

      data

    });

  } catch (err) {

    console.error(err);

    return res.status(500).json({

      error: err.message

    });

  }

};


/* ==========================================
   CLIENTS DETAILS
========================================== */


export const getClientDetails = async (
  req,
  res,
  next
) => {

  console.log("Client Details controller called with memberId:", req.params.memberId);

  try {

    const data =
      await getClientDetailsService(

        req.user.id,

        Number(
          req.params.memberId
        )

      );

    res.json({

      success: true,

      data

    });

  }

catch (err) {

    console.error(err);

    return res.status(400).json({

        success:false,

        error: err.message

    });

}

};


/* ==========================================
   ASSIGNMENTS
========================================== */

export const getAssignments =
async (
  req,
  res
) => {

  try {

    const data =
      await getAssignmentsService(
        req.user.id
      );

    return res.json({

      success: true,

      data

    });

  } catch (err) {

    console.error(err);

    return res.status(500).json({

      error: err.message

    });

  }

};



/* ==========================================
  TRANSFER ASSIGNMENTS
========================================== */



export const transferAssignment = async (
  req,
  res
) => {

  try {

    const data =
      await transferAssignmentService(

        req.user.id,

        Number(req.params.assignmentId),

        Number(req.body.trainer_member_id)

      );

    return res.json({

      success: true,

      message:
        "Client transferred successfully.",

      data

    });

  }

  catch (err) {

    console.error(err);

    return res.status(400).json({

      success: false,

      error: err.message

    });

  }

};


/* ==========================================
  Remove ASSIGNMENTS
========================================== */

export const removeAssignment =
async (
  req,
  res
) => {

  try {

    const data =
      await removeAssignmentService(

        req.user.id,

        Number(
          req.params.assignmentId
        )

      );

    return res.json({

      success: true,

      message:
        "Assignment removed successfully.",

      data

    });

  }

  catch (err) {

    console.error(err);

    return res.status(400).json({

      success:false,

      error: err.message

    });

  }

};

/* ==========================================
   INVITATIONS
========================================== */

export const getInvitations =
async (
  req,
  res
) => {

  try {

    const data =
      await getInvitationsService(
        req.user.id
      );

    return res.json({

      success: true,

      data

    });

  } catch (err) {

    console.error(err);

    return res.status(500).json({

      error: err.message

    });

  }

};


export const getWorkspaceMembers = async (req, res) => {

    try {

        const data =
            await getWorkspaceMembersService(
                req.user.id
            );

        return res.json({

            success: true,

            data

        });

    } catch (err) {

        console.error(err);

        return res.status(500).json({

            success: false,

            message: err.message

        });

    }

};