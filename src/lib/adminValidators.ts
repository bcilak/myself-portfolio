import {
  assertObject,
  cleanLocalizedText,
  cleanSlug,
  cleanStringArray,
  cleanText,
  cleanUrl,
} from "@/lib/apiSecurity";

export function sanitizeProjectPayload(input: unknown) {
  const body = assertObject(input);
  const payload: Record<string, unknown> = {
    slug: cleanSlug(body.slug),
    featured: Boolean(body.featured),
    githubUrl: cleanUrl(body.githubUrl),
    demoUrl: cleanUrl(body.demoUrl),
    technologies: cleanStringArray(body.technologies, 30, 60),
    createdAt: cleanText(body.createdAt, 40, new Date().toISOString()),
    title: cleanLocalizedText(body.title, 160, true),
    shortDescription: cleanLocalizedText(body.shortDescription, 320),
    description: cleanLocalizedText(body.description, 4000),
    problem: cleanLocalizedText(body.problem, 2500),
    solution: cleanLocalizedText(body.solution, 2500),
    architecture: cleanLocalizedText(body.architecture, 2500),
    challenges: cleanLocalizedText(body.challenges, 2500),
    lessons: cleanLocalizedText(body.lessons, 2500),
  };

  if (Array.isArray(body.screenshots)) {
    payload.screenshots = cleanStringArray(body.screenshots, 20, 500);
  }

  return payload;
}

export function sanitizeBlogPayload(input: unknown) {
  const body = assertObject(input);
  const status = cleanText(body.status, 20, "published");
  const readTimeText = cleanText(body.readTime, 30, "5");
  const readTime = Number.parseInt(readTimeText, 10);

  if (!["draft", "published"].includes(status)) {
    throw new Error("Invalid blog status.");
  }

  return {
    slug: cleanSlug(body.slug),
    category: cleanText(body.category, 80),
    readTime: Number.isFinite(readTime) ? Math.max(1, Math.min(readTime, 120)) : 5,
    tags: cleanStringArray(body.tags, 20, 50),
    status,
    createdAt: cleanText(body.createdAt, 40, new Date().toISOString()),
    title: cleanLocalizedText(body.title, 180, true),
    excerpt: cleanLocalizedText(body.excerpt, 500, true),
    content: cleanLocalizedText(body.content, 30000, true),
  };
}

export function sanitizeCaseStudyPayload(input: unknown) {
  const body = assertObject(input);
  const order = Number(body.order ?? 0);

  return {
    slug: cleanSlug(body.slug),
    icon: cleanText(body.icon, 20),
    title: cleanLocalizedText(body.title, 180, true),
    subtitle: cleanLocalizedText(body.subtitle, 320),
    category: cleanLocalizedText(body.category, 120),
    problem: cleanLocalizedText(body.problem, 3000),
    approach: cleanLocalizedText(body.approach, 3000),
    architecture: cleanLocalizedText(body.architecture, 3000),
    impact: cleanLocalizedText(body.impact, 300),
    challenges: {
      tr: cleanStringArray(assertObject(body.challenges).tr, 20, 300),
      en: cleanStringArray(assertObject(body.challenges).en, 20, 300),
    },
    lessons: {
      tr: cleanStringArray(assertObject(body.lessons).tr, 20, 300),
      en: cleanStringArray(assertObject(body.lessons).en, 20, 300),
    },
    technologies: cleanStringArray(body.technologies, 30, 60),
    order: Number.isFinite(order) ? order : 0,
  };
}
