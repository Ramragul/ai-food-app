import {
   getMyCoachNotesService
} from "../services/client/client.service.js";



/* ==========================================
   CLIENT CENTRIC COACH NOTES API
========================================== */


export const getMyCoachNotes = async (req, res) => {

    try {

        const data = await getMyCoachNotesService(
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