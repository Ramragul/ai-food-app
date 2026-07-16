import {
  getMyClientsService , getDashboardService, getClientDetailsService
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


/* ==========================================
   COACH DASHBOARD
========================================== */

export const getDashboard =
async (req, res) => {

  try {

    const data =
      await getDashboardService(
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
   CLIENT DETAILS
========================================== */

export const getClientDetails =
async (
  req,
  res
) => {

  try {

    const data =
      await getClientDetailsService(

        req.user.id,

        req.params.memberId

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


// export const getDashboard = async (
//   req,
//   res
// ) => {

//   try {

//     const data =
//       await getDashboardService(
//         req.user.id
//       );

//     return res.json({

//       success: true,

//       data

//     });

//   }

//   catch (err) {

//     console.error(err);

//     return res.status(500).json({

//       error: err.message

//     });

//   }

// };