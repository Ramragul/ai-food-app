import express from "express";
import cors from "cors";
import mealRoutes from "./routes/meal.routes.js";
import ingredientRoutes from "./routes/ingredient.routes.js";
import orderRoutes from "./routes/order.routes.js";
import trackMeal from "./routes/trackMeal.routes.js"
import nutritionRoutes from  "./routes/nutrition.routes.js"
import profileRoutes from "./routes/profile.routes.js";
import authRoutes from "./routes/auth.routes.js";
import { redis } from "./utils/redisClient.js"; // adjust path if needed
import userRoutes from "./routes/user.routes.js";





const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/meals", mealRoutes);
app.use("/api/ingredients", ingredientRoutes);
app.use("/api/orders", orderRoutes);
// app.use("/api/track",trackMeal);
app.use("/api/nutrition",nutritionRoutes);


// app.use("/api/users", profileRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/auth", authRoutes);

app.use("/api/user", userRoutes);



app.get("/", (req, res) => {
  res.send("AI Food API running...");
});


// temporary api for clearing redis cache

app.get("/clear-cache", async (req, res) => {
  try {
    await redis.flushall(); // 🔥 clear all cache
    res.send("Cache cleared successfully ✅");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error clearing cache");
  }
});

export default app;