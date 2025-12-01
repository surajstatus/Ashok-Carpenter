// backend/models/Folder.js
import mongoose from "mongoose";

const FolderSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

const Folder = mongoose.model("Folder", FolderSchema);
export default Folder;
