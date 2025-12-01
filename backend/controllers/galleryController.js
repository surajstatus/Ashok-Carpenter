import GalleryFolder from "../models/GalleryFolder.js";
import GalleryImage from "../models/GalleryImage.js";
import cloudinary from "../config/cloudinary.js";

// ---------------------
// CREATE FOLDER
// ---------------------
export const createFolder = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: "Folder name required" });

    const folder = await GalleryFolder.create({ name });

    res.status(201).json(folder);
    
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ---------------------
// GET ALL FOLDERS (Users page)
// ---------------------
export const getFolders = async (req, res) => {
  try {
    const folders = await GalleryFolder.find().sort({ createdAt: -1 });
    res.json(folders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ---------------------
// GET IMAGES BY FOLDER
// ---------------------
export const getFolderImages = async (req, res) => {
  try {
    const { folderId } = req.params;

    const images = await GalleryImage.find({ folderId }).sort({ createdAt: -1 });

    res.json(images);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ---------------------
// UPLOAD IMAGE TO FOLDER
// ---------------------
export const uploadImage = async (req, res) => {
  try {
    const { folderId } = req.body;

    if (!req.file) return res.status(400).json({ message: "File missing" });

    const upload = await cloudinary.uploader.upload(req.file.path, {
      folder: "gallery/" + folderId,
    });

    const image = await GalleryImage.create({
      folderId,
      imageUrl: upload.secure_url,
      publicId: upload.public_id,
    });

    // Update folder cover + count
    const folder = await GalleryFolder.findById(folderId);
    folder.imageCount += 1;
    if (!folder.coverImage) folder.coverImage = upload.secure_url;
    await folder.save();

    res.status(201).json(image);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ---------------------
// DELETE IMAGE
// ---------------------
export const deleteImage = async (req, res) => {
  try {
    const { imageId } = req.params;

    const img = await GalleryImage.findById(imageId);
    if (!img) return res.status(404).json({ message: "Not found" });

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(img.publicId);

    // Update folder count
    const folder = await GalleryFolder.findById(img.folderId);
    folder.imageCount -= 1;
    await folder.save();

    await img.deleteOne();

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ---------------------
// DELETE FOLDER
// ---------------------
export const deleteFolder = async (req, res) => {
  try {
    const { folderId } = req.params;

    const images = await GalleryImage.find({ folderId });

    // Delete all Cloudinary images
    for (let img of images) {
      await cloudinary.uploader.destroy(img.publicId);
    }

    await GalleryImage.deleteMany({ folderId });
    await GalleryFolder.findByIdAndDelete(folderId);

    res.json({ message: "Folder removed" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
