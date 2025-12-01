import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Resolve __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env reliably
dotenv.config({ path: path.join(__dirname, "../.env") });

import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Admin from "../models/Admin.js";

console.log("Mongo URI:", process.env.MONGO_URI); // should now print your URI

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    const hashedPassword = await bcrypt.hash("123456", 10);

    const admin = new Admin({
      email: "surajstatus@gmail.com",
      password: hashedPassword,
    });

    await admin.save();
    console.log("Admin created successfully!");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

createAdmin();
