import mongoose, { Schema, Document } from "mongoose";

export interface IExperience extends Document {
    year: string;
    technologies: string[];

    // Localized fields
    title: { en: string; tr: string };
    company: { en: string; tr: string };
    description: { en: string; tr: string };
}

const ExperienceSchema: Schema = new Schema(
    {
        year: { type: String, required: true },
        technologies: [{ type: String }],

        title: { en: { type: String, required: true }, tr: { type: String, required: true } },
        company: { en: { type: String, required: true }, tr: { type: String, required: true } },
        description: { en: { type: String }, tr: { type: String } },
    },
    { timestamps: true }
);

export default mongoose.models.Experience || mongoose.model<IExperience>("Experience", ExperienceSchema);
