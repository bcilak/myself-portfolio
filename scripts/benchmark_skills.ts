import { skillCategories } from "../src/data/skills";

// Simulate a database insertion function with an average round-trip network latency of 15ms.
const simulatedDbLatencyMs = 15;

async function mockCreate() {
    // Simulate database write time
    await new Promise((resolve) => setTimeout(resolve, simulatedDbLatencyMs));
}

async function mockInsertMany() {
    // A single round-trip for inserting all skills
    await new Promise((resolve) => setTimeout(resolve, simulatedDbLatencyMs));
}

async function runBenchmark() {
    console.log("=== Skills Migration Benchmark ===");
    console.log(`Simulated MongoDB round-trip network latency: ${simulatedDbLatencyMs}ms`);

    const skillsToInsert = [];
    let totalSkillsCount = 0;
    for (const cat of skillCategories) {
        for (const skill of cat.skills) {
            skillsToInsert.push({
                name: skill.name,
                icon: skill.icon,
                level: skill.level,
                category: cat.name,
                categoryIcon: cat.icon,
            });
            totalSkillsCount++;
        }
    }
    console.log(`Total skills to migrate: ${totalSkillsCount}\n`);

    // 1. Baseline: N+1 (Individual insertions)
    const baselineStart = performance.now();
    for (const cat of skillCategories) {
        for (let i = 0; i < cat.skills.length; i++) {
            await mockCreate();
        }
    }
    const baselineEnd = performance.now();
    const baselineDuration = baselineEnd - baselineStart;
    console.log(`[Baseline] Individual insertions (N+1 queries):`);
    console.log(`  - Total operations: ${totalSkillsCount} individual creates`);
    console.log(`  - Time taken: ${baselineDuration.toFixed(2)} ms`);

    // 2. Optimized: Bulk Insertion (insertMany)
    const optimizedStart = performance.now();
    const accumulatedSkills = [];
    for (const cat of skillCategories) {
        for (const skill of cat.skills) {
            accumulatedSkills.push({
                name: skill.name,
                icon: skill.icon,
                level: skill.level,
                category: cat.name,
                categoryIcon: cat.icon,
            });
        }
    }
    await mockInsertMany();
    const optimizedEnd = performance.now();
    const optimizedDuration = optimizedEnd - optimizedStart;
    console.log(`[Optimized] Batch insertion (Skill.insertMany):`);
    console.log(`  - Total operations: 1 bulk insert`);
    console.log(`  - Time taken: ${optimizedDuration.toFixed(2)} ms`);

    const speedup = (baselineDuration / optimizedDuration).toFixed(1);
    const reduction = (((baselineDuration - optimizedDuration) / baselineDuration) * 100).toFixed(1);
    console.log(`\n🚀 Speedup: ~${speedup}x faster`);
    console.log(`📉 Execution time reduced by ~${reduction}%`);
}

runBenchmark();
