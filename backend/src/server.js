import "dotenv/config";
// dotenv.config();

import app from "./app.js";

const PORT = 3004;

app.use((req, res, next) => {
  console.log("🔥 REQUEST:", req.method, req.url);
  next();
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});