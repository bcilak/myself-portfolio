import mongoose, { Schema, Document } from "mongoose";

export interface IBlog extends Document {
  slug: string;
  tags: string[];
  category: string;
  readTime: number;
  createdAt: string;
  views: number;
  likes: number;
  status: "draft" | "published";

  // Localized fields
  title: { en: string; tr: string };
  excerpt: { en: string; tr: string };
  content: { en: string; tr: string };
}

const BlogSchema: Schema = new Schema(
  {
    slug: { type: String, required: true, unique: true },
    tags: [{ type: String }],
    category: { type: String },
    readTime: { type: Number },
    createdAt: { type: String, required: true },
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    status: { type: String, enum: ["draft", "published"], default: "published" },

    title: { en: { type: String, required: true }, tr: { type: String, required: true } },
    excerpt: { en: { type: String }, tr: { type: String } },
    content: { en: { type: String, required: true }, tr: { type: String, required: true } },
  },
  { timestamps: true }
);

export default mongoose.models.Blog || mongoose.model<IBlog>("Blog", BlogSchema);
