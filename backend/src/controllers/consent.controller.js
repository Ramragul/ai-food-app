import {

  getMyConsentsService,

  grantConsentService,

  revokeConsentService

} from "../services/consent/consent.service.js";

/* ==========================================
   GET CONSENTS
========================================== */

export const getMyConsents =
async (
  req,
  res
) => {

  try {

    const data =
      await getMyConsentsService(
        req.user.id
      );

    return res.json({

      success: true,

      data

    });

  } catch (err) {

    console.error(err);

    return res.status(500).json({

      error:
        err.message

    });

  }

};

/* ==========================================
   GRANT
========================================== */

export const grantConsent =
async (
  req,
  res
) => {

  try {

    await grantConsentService(

      req.user.id,

      req.body.organization_id

    );

    return res.json({

      success: true,

      message:
        "Consent granted."

    });

  } catch (err) {

    console.error(err);

    return res.status(500).json({

      error:
        err.message

    });

  }

};

/* ==========================================
   REVOKE
========================================== */

export const revokeConsent =
async (
  req,
  res
) => {

  try {

    await revokeConsentService(

      req.user.id,

      req.body.organization_id

    );

    return res.json({

      success: true,

      message:
        "Consent revoked."

    });

  } catch (err) {

    console.error(err);

    return res.status(500).json({

      error:
        err.message

    });

  }

};