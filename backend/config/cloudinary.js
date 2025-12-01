// backend/config/cloudinary.js
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config(); // ensure .env loaded for this module too

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// debug helper (remove in production)
console.log("Cloudinary ENV Check:", {
  cloud: process.env.CLOUDINARY_CLOUD_NAME ? "LOADED" : "MISSING",
  key: process.env.CLOUDINARY_API_KEY ? "LOADED" : "MISSING",
  secret: process.env.CLOUDINARY_API_SECRET ? "LOADED" : "MISSING",
});

export default cloudinary;
