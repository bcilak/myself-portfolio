// Benchmark script to compare O(N^2) array.find lookup against O(N) Map lookup.

import { performance } from "perf_hooks";

interface DummyItem {
    slug: string;
    title: string;
}

function generateData(size: number) {
    const english: DummyItem[] = [];
    const turkish: DummyItem[] = [];
    for (let i = 0; i < size; i++) {
        const slug = `item-slug-${i}`;
        english.push({ slug, title: `English Title ${i}` });
        turkish.push({ slug, title: `Turkish Title ${i}` });
    }
    return { english, turkish };
}

function runBenchmark(size: number, iterations: number = 5) {
    console.log(`Running benchmark with dataset size of ${size} items for ${iterations} iterations...`);
    const { english, turkish } = generateData(size);

    // 1. Array.find (Baseline)
    let totalBaselineTime = 0;
    for (let iter = 0; iter < iterations; iter++) {
        const start = performance.now();
        const merged = english.map((en) => {
            const tr = turkish.find((s) => s.slug === en.slug) || en;
            return {
                slug: en.slug,
                title: { en: en.title, tr: tr.title }
            };
        });
        const end = performance.now();
        totalBaselineTime += (end - start);
    }
    const avgBaselineTime = totalBaselineTime / iterations;

    // 2. Map (Optimized)
    let totalOptimizedTime = 0;
    for (let iter = 0; iter < iterations; iter++) {
        const start = performance.now();
        const trMap = new Map(turkish.map(item => [item.slug, item]));
        const merged = english.map((en) => {
            const tr = trMap.get(en.slug) || en;
            return {
                slug: en.slug,
                title: { en: en.title, tr: tr.title }
            };
        });
        const end = performance.now();
        totalOptimizedTime += (end - start);
    }
    const avgOptimizedTime = totalOptimizedTime / iterations;

    const speedup = avgBaselineTime / avgOptimizedTime;
    console.log(`- Baseline (array.find): ${avgBaselineTime.toFixed(4)} ms`);
    console.log(`- Optimized (Map):       ${avgOptimizedTime.toFixed(4)} ms`);
    console.log(`- Speedup:               ${speedup.toFixed(2)}x faster\n`);
}

runBenchmark(10);
runBenchmark(100);
runBenchmark(1000);
runBenchmark(5000);
