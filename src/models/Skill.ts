import mongoose, { Schema, Document } from "mongoose";

export interface ISkill extends Document {
    name: string;
    icon: string;
    level: "Expert" | "Advanced" | "Intermediate";
    category: { en: string; tr: string };
    categoryIcon: string;
    featured: boolean;
    order: number;
}

const SkillSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        icon: { type: String, required: true },
        level: {
            type: String,
            enum: ["Expert", "Advanced", "Intermediate"],
            required: true,
            default: "Intermediate",
        },
        category: {
            en: { type: String, required: true },
            tr: { type: String, required: true },
        },
        categoryIcon: { type: String, required: true },
        featured: { type: Boolean, default: false },
        order: { type: Number, default: 0 },
    },
    { timestamps: true }
);

export default mongoose.models.Skill || mongoose.model<ISkill>("Skill", SkillSchema);
