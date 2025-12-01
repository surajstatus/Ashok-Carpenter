// backend/routes/folderRoutes.js
import express from "express";
import { createFolder, getFolders, deleteFolder } from "../controllers/folderController.js";
import verifyAdmin from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", getFolders);
router.post("/", verifyAdmin, createFolder);
router.delete("/:id", verifyAdmin, deleteFolder);

export default router;
