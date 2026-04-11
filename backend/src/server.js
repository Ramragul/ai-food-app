import "dotenv/config";
// dotenv.config();

import app from "./app.js";

const PORT = 3004;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});