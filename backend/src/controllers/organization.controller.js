import {
  createOrganizationService,getMyOrganizationsService
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