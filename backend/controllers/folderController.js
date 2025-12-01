// backend/controllers/folderController.js
import Folder from "../models/Folder.js";
import Image from "../models/Image.js";
import cloudinary from "../config/cloudinary.js";

export const createFolder = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: "Folder name required" });
    const existing = await Folder.findOne({ name });
    if (existing) return res.status(400).json({ message: "Folder already exists" });
    const folder = new Folder({ name });
    await folder.save();
    res.status(201).json(folder);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Create folder failed" });
  }
};

export const getFolders = async (req, res) => {
  try {
    const folders = await Folder.find().sort({ createdAt: -1 });
    res.json(folders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Fetch folders failed" });
  }
};

export const deleteFolder = async (req, res) => {
  try {
    const folderId = req.params.id;
    // find images in this folder and delete them from cloudinary and DB
    const images = await Image.find({ folderId });
    for (const img of images) {
      try { await cloudinary.uploader.destroy(img.publicId); } catch (e) { console.warn("Cloud destroy fail:", e.message); }
      await img.deleteOne();
    }
    await Folder.findByIdAndDelete(folderId);
    res.json({ message: "Folder and its images deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Delete folder failed" });
  }
};
