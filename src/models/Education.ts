import mongoose, { Schema, Document } from "mongoose";

export interface IEducation extends Document {
    year: string;
    
    // Localized fields
    degree: { en: string; tr: string };
    school: { en: string; tr: string };
    description: { en: string; tr: string };
}

const EducationSchema: Schema = new Schema(
    {
        year: { type: String, required: true },

        degree: { en: { type: String, required: true }, tr: { type: String, required: true } },
        school: { en: { type: String, required: true }, tr: { type: String, required: true } },
        description: { en: { type: String }, tr: { type: String } },
    },
    { timestamps: true }
);

export default mongoose.models.Education || mongoose.model<IEducation>("Education", EducationSchema);
