// backend/routes/imageRoutes.js
import express from "express";
import upload from "../middlewares/uploadMiddleware.js";

import {
  createFolder,
  getFolders,
  getFolderImages,
  uploadImage,
  deleteImage,
  deleteFolder
} from "../controllers/galleryController.js";

const router = express.Router();

// FOLDER ROUTES
router.post("/folder", createFolder);
router.get("/folders", getFolders);
router.delete("/folder/:folderId", deleteFolder);

// IMAGES ROUTES
router.get("/images/:folderId", getFolderImages);
router.post("/image", upload.single("image"), uploadImage);
router.delete("/image/:imageId", deleteImage);

export default router;
