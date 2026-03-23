import mongoose from "mongoose";
import { skillCategories } from "../src/data/skills";
import { getCaseStudies } from "../src/data/case-studies";
import Skill from "../src/models/Skill";
import CaseStudy from "../src/models/CaseStudy";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

async function migrate() {
    try {
        await mongoose.connect(MONGODB_URI as string);
        console.log("Connected to MongoDB");

        // Migrate Skills
        await Skill.deleteMany({});
        console.log("Cleared existing Skills");

        let skillOrder = 0;
        for (const cat of skillCategories) {
            for (const skill of cat.skills) {
                await Skill.create({
                    name: skill.name,
                    icon: skill.icon,
                    level: skill.level,
                    category: { en: cat.name, tr: cat.name },
                    categoryIcon: cat.icon,
                    featured: (skill as any).featured || false,
                    order: skillOrder++,
                });
            }
        }
        console.log("Skills migrated successfully!");

        // Migrate Case Studies
        await CaseStudy.deleteMany({});
        console.log("Cleared existing Case Studies");

        const englishStudies = getCaseStudies("en");
        const turkishStudies = getCaseStudies("tr");

        let csOrder = 0;
        for (let i = 0; i < englishStudies.length; i++) {
            const en = englishStudies[i];
            const tr = turkishStudies.find((s) => s.slug === en.slug) || en;

            await CaseStudy.create({
                slug: en.slug,
                icon: en.icon,
                title: { en: en.title, tr: tr.title },
                subtitle: { en: en.subtitle, tr: tr.subtitle },
                category: { en: en.category, tr: tr.category },
                problem: { en: en.problem, tr: tr.problem },
                approach: { en: en.approach, tr: tr.approach },
                architecture: { en: en.architecture, tr: tr.architecture },
                impact: { en: en.impact, tr: tr.impact },
                challenges: { en: en.challenges, tr: tr.challenges },
                lessons: { en: en.lessons, tr: tr.lessons },
                technologies: en.technologies,
                order: csOrder++,
            });
        }
        console.log("Case Studies migrated successfully!");

    } catch (error) {
        console.error("Migration failed:", error);
    } finally {
        await mongoose.disconnect();
        console.log("Disconnected from MongoDB");
    }
}

migrate();
