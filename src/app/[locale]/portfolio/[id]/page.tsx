import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { isValidLocale, locales, defaultLocale } from "@/i18n/config";
import projects from "@/data/projects";
import { getProject, getAdjacentProjects } from "@/lib/projects";
import { Lightbox, LightboxItem } from "@/components/Lightbox";
import ProjectHeader from "@/components/portfolio/ProjectHeader";
import ProjectMarkdown from "@/components/portfolio/ProjectMarkdown";
import ProjectGallery from "@/components/portfolio/ProjectGallery";
import {Link} from "@/i18n/routing";
import {LuArrowRight} from "react-icons/lu";

interface ProjectPageProps {
    params: Promise<{
        locale: string;
        id: string;
    }>;
}

export function generateStaticParams() {
    return projects.map((project) => ({
        id: project.id,
    }));
}

export async function generateMetadata({
    params,
}: ProjectPageProps): Promise<Metadata> {
    const { locale, id } = await params;
    if (!isValidLocale(locale)) return {};

    const project = await getProject(id, locale);
    if (!project) return {};

    const baseUrl = "https://jakubsokol.cz";
    const canonicalUrl = `${baseUrl}/${locale}/portfolio/${id}`;

    const languages: Record<string, string> = {};
    for (const loc of locales) {
        languages[loc] = `${baseUrl}/${loc}/portfolio/${id}`;
    }
    languages["x-default"] = `${baseUrl}/${defaultLocale}/portfolio/${id}`;

    const ogImages = project.coverUrl
        ? [
              {
                  url: project.coverUrl.startsWith("http")
                      ? project.coverUrl
                      : `${baseUrl}${project.coverUrl}`,
                  alt: `${project.title} preview`,
              },
          ]
        : undefined;

    return {
        title: `${project.title} - Jakub Sokol`,
        description: project.description,
        alternates: {
            canonical: canonicalUrl,
            languages,
        },
        openGraph: {
            title: `${project.title} - Jakub Sokol`,
            description: project.description,
            url: canonicalUrl,
            siteName: "Jakub Sokol",
            locale: locale === "cs" ? "cs_CZ" : "en_US",
            type: "article",
            images: ogImages,
        },
        twitter: {
            card: "summary_large_image",
            title: `${project.title} - Jakub Sokol`,
            description: project.description,
            images: ogImages ? [ogImages[0].url] : undefined,
        },
    };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
    const { locale, id } = await params;
    if (!isValidLocale(locale)) {
        notFound();
    }

    setRequestLocale(locale);

    const project = await getProject(id, locale);
    if (!project) {
        notFound();
    }

    const tPortfolio = await getTranslations({ locale, namespace: "portfolio" });
    const tPage = await getTranslations({ locale, namespace: "portfolioPage" });
    const tDetail = await getTranslations({ locale, namespace: "projectDetail" });

    const adjacent = getAdjacentProjects(id, locale);

    const categoryBadgeLabel = tPage.has(`categoryBadge.${project.category}`)
        ? tPage(`categoryBadge.${project.category}`)
        : project.category;

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        headline: project.title,
        name: project.title,
        description: project.description,
        url: `https://jakubsokol.cz/${locale}/portfolio/${project.id}`,
        author: {
            "@type": "Person",
            name: "Jakub Sokol",
            url: "https://jakubsokol.cz",
        },
        image: project.coverUrl
            ? `https://jakubsokol.cz${project.coverUrl}`
            : undefined,
        keywords: project.technologies?.join(", "),
        genre: project.category,
    };

    return (
        <main className="container mx-auto pb-24 px-4 sm:px-6 lg:px-8">
            {/* JSON-LD Structured Data for SEO */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <Lightbox>
                <article className="max-w-4xl mx-auto">
                    <ProjectHeader
                        project={project}
                        labels={{
                            backToPortfolio: tDetail("backToPortfolio"),
                            categoryBadge: categoryBadgeLabel,
                            liveSite: tDetail("liveSite"),
                            sourceCode: tDetail("sourceCode"),
                        }}
                    />

                    {project.coverUrl && (
                        <LightboxItem
                            src={project.coverUrl}
                            alt={`${project.title} cover`}
                            className="relative aspect-3/2 w-full rounded-3xl overflow-hidden bg-neutral-100 border border-neutral-200/80 mb-12 sm:mb-16 block text-left group cursor-pointer"
                        >
                            <Image
                                src={project.coverUrl}
                                alt={`${project.title} cover`}
                                fill
                                priority
                                fetchPriority="high"
                                sizes="(max-width: 1024px) 100vw, 896px"
                                className="object-cover transition-transform duration-500 ease-out group-hover:scale-102"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                        </LightboxItem>
                    )}

                    <ProjectMarkdown contentHtml={project.contentHtml} />

                    {project.gallery.length > 0 && (
                        <ProjectGallery
                            images={project.gallery}
                            projectTitle={project.title}
                            labels={{
                                heading: tDetail("gallery"),
                                subtitle: tDetail("gallerySubtitle"),
                            }}
                        />
                    )}

                    <Link href="/portfolio" className="block bg-neutral-100 p-8 mt-8 rounded-3xl hover:bg-heading hover:text-text-secondary transition-colors">
                        <span className="flex items-center gap-2 text-3xl">
                            {tPortfolio("seeAll")} <LuArrowRight className="shrink-0" />
                        </span>
                    </Link>
                </article>
            </Lightbox>
        </main>
    );
}
