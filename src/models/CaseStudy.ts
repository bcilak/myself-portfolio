import mongoose, { Schema, Document } from "mongoose";

export interface ICaseStudy extends Document {
    slug: string;
    icon: string;
    title: { en: string; tr: string };
    subtitle: { en: string; tr: string };
    category: { en: string; tr: string };
    problem: { en: string; tr: string };
    approach: { en: string; tr: string };
    architecture: { en: string; tr: string };
    impact: { en: string; tr: string };
    challenges: { en: string[]; tr: string[] };
    lessons: { en: string[]; tr: string[] };
    technologies: string[];
    order: number;
}

const CaseStudySchema: Schema = new Schema(
    {
        slug: { type: String, required: true, unique: true },
        icon: { type: String, required: true },
        title: {
            en: { type: String, required: true },
            tr: { type: String, required: true },
        },
        subtitle: {
            en: { type: String, required: true },
            tr: { type: String, required: true },
        },
        category: {
            en: { type: String, required: true },
            tr: { type: String, required: true },
        },
        problem: {
            en: { type: String, required: true },
            tr: { type: String, required: true },
        },
        approach: {
            en: { type: String, required: true },
            tr: { type: String, required: true },
        },
        architecture: {
            en: { type: String, required: true },
            tr: { type: String, required: true },
        },
        impact: {
            en: { type: String, required: true },
            tr: { type: String, required: true },
        },
        challenges: {
            en: [{ type: String }],
            tr: [{ type: String }],
        },
        lessons: {
            en: [{ type: String }],
            tr: [{ type: String }],
        },
        technologies: [{ type: String }],
        order: { type: Number, default: 0 },
    },
    { timestamps: true }
);

export default mongoose.models.CaseStudy || mongoose.model<ICaseStudy>("CaseStudy", CaseStudySchema);
