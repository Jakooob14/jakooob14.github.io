import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";
import projects, { ProjectCategory, ProjectItem } from "@/data/projects";
import { locales, defaultLocale, Locale } from "@/i18n/config";
import { resolveAsset } from "@/lib/assets";

export interface ProjectDetail extends ProjectItem {
    title: string;
    description: string;
    contentHtml: string;
    rawMarkdown: string;
    coverUrl: string | null;
    iconUrl: string | null;
    gallery: string[];
}

export interface ProjectNavigationItem {
    id: string;
    title: string;
    category: ProjectCategory;
    coverUrl: string | null;
}

export interface AdjacentProjects {
    prev: ProjectNavigationItem | null;
    next: ProjectNavigationItem | null;
}

marked.setOptions({
    gfm: true,
    breaks: true,
});

/**
 * Returns the absolute path to a project's markdown file, falling back to defaultLocale if the requested locale is missing.
 */
function resolveMarkdownFilePath(id: string, locale: string): string | null {
    const basePath = path.join(process.cwd(), "src", "i18n", "translations", "projects", id);
    const localizedPath = path.join(basePath, `${locale}.md`);
    if (fs.existsSync(localizedPath)) {
        return localizedPath;
    }

    const fallbackPath = path.join(basePath, `${defaultLocale}.md`);
    if (fs.existsSync(fallbackPath)) {
        return fallbackPath;
    }

    return null;
}

/**
 * Reads and parses localized title and description from a project's markdown file.
 */
export function getProjectMeta(id: string, locale: string): { title: string; description: string } {
    const filePath = resolveMarkdownFilePath(id, locale);
    const fallbackItem = projects.find((p) => p.id === id);

    if (!filePath) {
        return {
            title: fallbackItem?.title ?? id,
            description: fallbackItem?.description ?? "",
        };
    }

    try {
        const raw = fs.readFileSync(filePath, "utf-8");
        const { data } = matter(raw);
        return {
            title: (data.title as string) || fallbackItem?.title || id,
            description: (data.description as string) || fallbackItem?.description || "",
        };
    } catch {
        return {
            title: fallbackItem?.title ?? id,
            description: fallbackItem?.description ?? "",
        };
    }
}

/**
 * Fetches a single project with full markdown rendered to HTML and resolved assets.
 */
export async function getProject(id: string, locale: string): Promise<ProjectDetail | null> {
    const projectItem = projects.find((p) => p.id === id);
    if (!projectItem) {
        return null;
    }

    const filePath = resolveMarkdownFilePath(id, locale);
    let title = projectItem.title ?? id;
    let description = projectItem.description ?? "";
    let rawMarkdown = "";
    let contentHtml = "";

    if (filePath) {
        try {
            const raw = fs.readFileSync(filePath, "utf-8");
            const parsed = matter(raw);
            title = (parsed.data.title as string) || title;
            description = (parsed.data.description as string) || description;
            rawMarkdown = parsed.content.trim();
            contentHtml = await marked.parse(rawMarkdown);
        } catch (err) {
            console.error(`Error loading markdown for project ${id} [${locale}]:`, err);
        }
    }

    const coverUrl = resolveAsset(id, "cover");
    const iconUrl = resolveAsset(id, "icon");
    const gallery = resolveAsset(id, "gallery");

    return {
        ...projectItem,
        title,
        description,
        contentHtml,
        rawMarkdown,
        coverUrl,
        iconUrl,
        gallery,
    };
}

/**
 * Returns static params for all project routes across all supported locales.
 */
export function getAllProjectStaticParams(): Array<{ locale: Locale; id: string }> {
    const params: Array<{ locale: Locale; id: string }> = [];
    for (const locale of locales) {
        for (const project of projects) {
            params.push({
                locale,
                id: project.id,
            });
        }
    }
    return params;
}

/**
 * Returns previous and next projects for navigation on project detail pages.
 */
export function getAdjacentProjects(currentId: string, locale: string): AdjacentProjects {
    const currentIndex = projects.findIndex((p) => p.id === currentId);
    if (currentIndex === -1) {
        return { prev: null, next: null };
    }

    const prevIndex = (currentIndex - 1 + projects.length) % projects.length;
    const nextIndex = (currentIndex + 1) % projects.length;

    const prevItem = projects[prevIndex];
    const nextItem = projects[nextIndex];

    const prevMeta = getProjectMeta(prevItem.id, locale);
    const nextMeta = getProjectMeta(nextItem.id, locale);

    return {
        prev: {
            id: prevItem.id,
            category: prevItem.category,
            title: prevMeta.title,
            coverUrl: resolveAsset(prevItem.id, "cover"),
        },
        next: {
            id: nextItem.id,
            category: nextItem.category,
            title: nextMeta.title,
            coverUrl: resolveAsset(nextItem.id, "cover"),
        },
    };
}
