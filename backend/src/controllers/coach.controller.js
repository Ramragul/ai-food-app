import {
  getMyClientsService
} from "../services/coach/coach.service.js";

/* ==========================================
   MY CLIENTS
========================================== */

export const getMyClients =
async (req, res) => {

  try {

    const data =
      await getMyClientsService(
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