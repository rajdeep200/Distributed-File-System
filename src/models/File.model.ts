import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
  originalName: {
    type: String,
    required: true
  },
  storageName: {
    type: String,
    required: true,
    unique: true,
  },
  mimeType: String,
  size: Number,
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("File", fileSchema)
