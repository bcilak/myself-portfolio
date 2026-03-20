import mongoose, { Schema, Document } from "mongoose";

export interface ISettings extends Document {
  titleTR: string;
  titleEN: string;
  descriptionTR: string;
  descriptionEN: string;
  keywords: string;
  ogImageUrl: string;
  googleVerification: string;
  twitterHandle: string;
  siteUrl: string;
  email: string;
  github: string;
  linkedin: string;
}

const SettingsSchema = new Schema(
  {
    titleTR: { type: String, default: "Barış Çilak — Full Stack & AI Developer" },
    titleEN: { type: String, default: "Barış Çilak — Full Stack & AI Developer" },
    descriptionTR: { type: String, default: "AI destekli scalable web uygulamaları geliştiriyorum." },
    descriptionEN: { type: String, default: "I build scalable AI-powered web applications." },
    keywords: { type: String, default: "AI developer, Full Stack" },
    ogImageUrl: { type: String, default: "/og-image.png" },
    googleVerification: { type: String, default: "" },
    twitterHandle: { type: String, default: "@bariscilak" },
    siteUrl: { type: String, default: "https://bariscilak.dev" },
    email: { type: String, default: "bcilak@gmail.com" },
    github: { type: String, default: "github.com/bcilak" },
    linkedin: { type: String, default: "linkedin.com/in/bariscilak" },
  },
  { timestamps: true }
);

export default mongoose.models.Settings || mongoose.model<ISettings>("Settings", SettingsSchema);
