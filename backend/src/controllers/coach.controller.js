import {
  getMyClientsService , getDashboardService, getClientDetailsService , getCoachNotesService,createCoachNoteService,updateCoachNoteService, deleteCoachNoteService
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



export const getCoachNotes = async (req, res) => {

    try {

        const notes = await getCoachNotesService(
            Number(req.params.memberId)
        );

        return res.status(200).json({

            success: true,

            data: notes

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: "Unable to fetch coach notes."

        });

    }

};



export const createCoachNote = async (req, res) => {

    try {

        const note = await createCoachNoteService(
            Number(req.params.memberId),
            req.user.id,
            req.body
        );

        return res.status(201).json({
            success: true,
            data: note
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


export const updateCoachNote = async (req, res) => {

    try {

        const note = await updateCoachNoteService(
            Number(req.params.noteId),
            req.body
        );

        if (!note) {

            return res.status(404).json({

                success: false,

                message: "Coach note not found."

            });

        }

        return res.status(200).json({

            success: true,

            data: note

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


export const deleteCoachNote = async (req, res) => {

    try {

        const deleted = await deleteCoachNoteService(
            Number(req.params.noteId)
        );

        if (!deleted) {

            return res.status(404).json({

                success: false,

                message: "Coach note not found."

            });

        }

        return res.status(200).json({

            success: true,

            message: "Coach note deleted successfully."

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};