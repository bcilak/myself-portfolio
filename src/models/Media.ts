import mongoose, { Schema, Document } from "mongoose";

export interface IMedia extends Document {
  name: string;
  url: string;
  createdAt: Date;
}

const MediaSchema = new Schema(
  {
    name: { type: String, required: true },
    url: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Media || mongoose.model<IMedia>("Media", MediaSchema);
