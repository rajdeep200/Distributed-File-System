import mongoose from "mongoose";

const fileSchema = new mongoose.Schema(
  {
    originalName: {
      type: String,
      required: true,
    },
    storageName: {
      type: String,
      required: true
    },
    mimeType: String,
    size: Number,
    uploadedAt: {
      type: Date,
      default: Date.now,
    },
    key: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("File", fileSchema);
