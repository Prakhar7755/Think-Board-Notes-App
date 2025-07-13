// server.js or index.js

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import helmet from "helmet"; // 🛡️ Secure HTTP headers

// Import internal modules
import notesRoutes from "./routes/notes.routes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

// ---------------------------
// 1. Core Middleware
// ---------------------------
app.use(express.json()); // Parse JSON bodies
app.use(helmet()); // Security headers
app.use(rateLimiter); // Rate limiting to prevent abuse

// ---------------------------
// 2. CORS Setup (Environment Aware)
// ---------------------------
const allowedOrigins = [
  "http://localhost:5173", // dev frontend
  "http://localhost:5001",
  process.env.CORS_ORIGIN, // e.g. "https://yourdomain.com"
].filter(Boolean);

if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: function (origin, callback) {
        console.log("Origin :", origin);
        // development only
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error("Not allowed by CORS"));
        }
      },
      credentials: true,
    })
  );
}

// ---------------------------
// 3. API Routes
// ---------------------------
app.use("/api/notes", notesRoutes);

// ---------------------------
// 4. Serve Frontend (Production Only)
// ---------------------------
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));

  // Fallback route for React Router
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/dist/index.html"));
  });
}

// ---------------------------
// 5. Start Server
// ---------------------------
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect to DB:", err);
    process.exit(1);
  });
