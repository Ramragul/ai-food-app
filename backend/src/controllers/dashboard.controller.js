// Version 1 :


// import { getDashboardService } from "../services/dashboard.service.js";

// export const getDashboard = async (req, res) => {
//   try {
//     const { userId, type = "DAY" } = req.query;

//     const data = await getDashboardService(userId, type);

//     res.json(data);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Failed to load dashboard" });
//   }
// };


// Version 2 :

import { getDashboardService } from "../services/dashboard.service.js";

export const getDashboard = async (req, res) => {
  try {
    const { userId, type = "DAY" } = req.query;

    if (!userId) {
      return res.status(400).json({ error: "userId is required" });
    }

    const data = await getDashboardService(userId, type);

    res.json(data);
  } catch (err) {
    console.error("Dashboard Error:", err);
    res.status(500).json({ error: "Failed to load dashboard" });
  }
};
