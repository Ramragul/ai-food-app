// import { getDashboardService,  getWeeklySummaryService, getMonthlySummaryService } from "../services/dashboard.service.js";

// export const getDashboard = async (req, res) => {
//   const data = await getDashboardService(req.query.userId);
//   res.json(data);
// };

// export const getWeeklySummary = async (req, res) => {
//     const data = await getWeeklySummaryService(req.query.userId);
//     res.json(data);
//   };
  
//   export const getMonthlySummary = async (req, res) => {
//     const data = await getMonthlySummaryService(req.query.userId);
//     res.json(data);
//   };



import { getDashboardService } from "../services/dashboard.service.js";

export const getDashboard = async (req, res) => {
  try {
    const { userId, type = "DAY" } = req.query;

    const data = await getDashboardService(userId, type);

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to load dashboard" });
  }
};
