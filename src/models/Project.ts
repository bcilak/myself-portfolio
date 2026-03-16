import mongoose, { Schema, Document } from "mongoose";

export interface IProject extends Document {
    slug: string;
    technologies: string[];
    githubUrl?: string;
    demoUrl?: string;
    featured: boolean;
    screenshots: string[];
    createdAt: string;

    // Localized fields
    title: { en: string; tr: string };
    shortDescription: { en: string; tr: string };
    description: { en: string; tr: string };
    problem: { en: string; tr: string };
    solution: { en: string; tr: string };
    architecture: { en: string; tr: string };
    challenges: { en: string; tr: string };
    lessons: { en: string; tr: string };
}

const ProjectSchema: Schema = new Schema(
    {
        slug: { type: String, required: true, unique: true },
        technologies: [{ type: String }],
        githubUrl: { type: String, default: "" },
        demoUrl: { type: String, default: "" },
        featured: { type: Boolean, default: false },
        screenshots: [{ type: String }],
        createdAt: { type: String, required: true },

        title: { en: { type: String, required: true }, tr: { type: String, required: true } },
        shortDescription: { en: { type: String }, tr: { type: String } },
        description: { en: { type: String }, tr: { type: String } },
        problem: { en: { type: String }, tr: { type: String } },
        solution: { en: { type: String }, tr: { type: String } },
        architecture: { en: { type: String }, tr: { type: String } },
        challenges: { en: { type: String }, tr: { type: String } },
        lessons: { en: { type: String }, tr: { type: String } },
    },
    { timestamps: true }
);

export default mongoose.models.Project || mongoose.model<IProject>("Project", ProjectSchema);
