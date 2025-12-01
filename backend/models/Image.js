// backend/models/Image.js
import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema({
  folderId: { type: mongoose.Schema.Types.ObjectId, ref: "Folder", required: true },
  title: { type: String, default: "" },         // optional, admin may leave blank
  description: { type: String, default: "" },   // optional
  imageUrl: { type: String, required: true },
  publicId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Image = mongoose.model("Image", ImageSchema);
export default Image;
