// backend/server.js
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import cloudinary from "./config/cloudinary.js";

import authRoutes from "./routes/authRoutes.js";
import imageRoutes from "./routes/imageRoutes.js";
import folderRoutes from "./routes/folderRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";

import Admin from "./models/Admin.js";
import bcrypt from "bcryptjs";

const app = express();

// Allow localhost + LAN access (192.x.x.x)
app.use(cors({
  origin: (origin, callback) => {
    callback(null, true); // allow ALL origins temporarily
  },
  credentials: true
}));


app.use(express.json());

// Connect DB
connectDB(process.env.MONGO_URI);

// ROUTES
app.use("/api/admin", authRoutes);
app.use("/api/gallery", imageRoutes);   // only for IMAGES
app.use("/api/folders", folderRoutes);  // only for FOLDERS
app.use("/api/contact", contactRoutes);

// test
app.get("/", (req, res) => res.send("API running"));

// Admin creation
const ensureAdmin = async () => {
  try {
    if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) return;

    const exists = await Admin.findOne({ email: process.env.ADMIN_EMAIL });

    if (!exists) {
      const hashed = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
      await Admin.create({
        email: process.env.ADMIN_EMAIL,
        password: hashed
      });
      console.log("Admin created:", process.env.ADMIN_EMAIL);
    } else {
      console.log("Admin already exists");
    }
  } catch (e) {
    console.error(e);
  }
};

const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  console.log(`Server running on ${PORT}`);
  await ensureAdmin();
});
