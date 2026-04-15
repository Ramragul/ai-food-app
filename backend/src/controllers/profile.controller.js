// Version 1

// import {
//     upsertProfileService,
//     getProfileService
//   } from "../services/profile/profile.service.js";
  
//   // CREATE / UPDATE
//   export const createProfile = async (req, res) => {
//     try {
//       const {
//         userId,
//         height_cm,
//         weight_kg,
//         gender
//       } = req.body;
  
//       if (!userId || !height_cm || !weight_kg || !gender) {
//         return res.status(400).json({
//           error: "Missing required fields"
//         });
//       }
  
//       const profile = await upsertProfileService(req.body);
  
//       res.json({
//         message: "Profile saved successfully 💙",
//         data: profile
//       });
  
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ error: err.message });
//     }
//   };
  
//   // GET PROFILE
//   export const getProfile = async (req, res) => {
//     try {
//       const profile = await getProfileService(req.params.userId);
  
//       if (!profile) {
//         return res.status(404).json({ message: "Profile not found" });
//       }
  
//       res.json(profile);
  
//     } catch (err) {
//       res.status(500).json({ error: err.message });
//     }
//   };


// Version 2 


import {
  createProfileService,
  getAllProfilesService,
  getActiveProfileService
} from "../services/profile/profile.service.js";

/* 🔥 CREATE NEW GOAL */
export const createProfile = async (req, res) => {
  try {
    const {
      userId,
      height_cm,
      weight_kg,
      gender
    } = req.body;

    if (!userId || !height_cm || !weight_kg || !gender) {
      return res.status(400).json({
        error: "Missing required fields"
      });
    }

    const profile = await createProfileService(req.body);

    res.json({
      message: "New goal created 🚀",
      data: profile
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

/* 🔥 GET ALL GOALS */
export const getAllProfiles = async (req, res) => {
  try {
    const data = await getAllProfilesService(req.params.userId);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* 🔥 GET ACTIVE GOAL */
export const getActiveProfile = async (req, res) => {
  try {
    const data = await getActiveProfileService(req.params.userId);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};