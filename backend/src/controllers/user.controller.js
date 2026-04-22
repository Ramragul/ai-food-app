// import {
//     getUserProfileService,
//     updateUserProfileService
//   } from "../services/user/user.service.js";
  
//   /**
//    * GET USER PROFILE
//    */
//   export const getProfile = async (req, res) => {
//     try {
//       const userId = req.user.id;
  
//       const profile = await getUserProfileService(userId);
  
//       res.json(profile);
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ message: "Failed to fetch profile" });
//     }
//   };
  

//   export const updateProfile = async (req, res) => {
//     try {
//       const userId = req.user.id;
  
//       const result = await updateUserProfileService(userId, req.body);
  
//       res.json(result);
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ message: "Update failed" });
//     }
//   };


// version 2 

import {
    getUserProfileService,
    updateUserProfileService
  } from "../services/user/user.service.js";
  
  /**
   * GET USER PROFILE
   */
  export const getProfile = async (req, res) => {
    try {
      const userId = req.user.id;
  
      const profile = await getUserProfileService(userId);
  
      if (!profile) {
        return res.status(404).json({
          message: "User profile not found"
        });
      }
  
      res.json(profile);
    } catch (err) {
      console.error("GET PROFILE ERROR:", err);
      res.status(500).json({
        message: "Failed to fetch profile"
      });
    }
  };
  
  /**
   * UPDATE PROFILE
   */
  export const updateProfile = async (req, res) => {
    try {
      const userId = req.user.id;
  
      const result = await updateUserProfileService(userId, req.body);
  
      res.json({
        message: "Profile updated successfully",
        data: result
      });
    } catch (err) {
      console.error("UPDATE PROFILE ERROR:", err);
      res.status(500).json({
        message: "Update failed"
      });
    }
  };