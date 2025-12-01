import mongoose from "mongoose";

const galleryImageSchema = new mongoose.Schema({
  folderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "GalleryFolder",
    required: true
  },
  imageUrl: { type: String, required: true },
  publicId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("GalleryImage", galleryImageSchema);
