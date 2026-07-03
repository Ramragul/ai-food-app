import {
  createOrganizationService,getMyOrganizationsService, inviteEmployeeService,
    inviteClientService,getMyInvitationsService, acceptInvitationService
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