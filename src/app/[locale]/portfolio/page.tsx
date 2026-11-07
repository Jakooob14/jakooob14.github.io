import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { isValidLocale, locales, defaultLocale } from "@/i18n/config";
import { Link } from "@/i18n/routing";
import { Heading1 } from "@/components/Heading";
import PortfolioFilterGrid from "@/components/portfolio/PortfolioFilterGrid";
import projects from "@/data/projects";
import { resolveAsset } from "@/lib/assets";
import { LuArrowLeft } from "react-icons/lu";

export function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    if (!isValidLocale(locale)) return {};

    const t = await getTranslations({ locale, namespace: "portfolioPage" });

    const languages: Record<string, string> = {};
    for (const loc of locales) {
        languages[loc] = `https://jakubsokol.cz/${loc}/portfolio`;
    }
    languages["x-default"] = `https://jakubsokol.cz/${defaultLocale}/portfolio`;

    return {
        title: t("title"),
        description: t("description"),
        alternates: {
            canonical: `https://jakubsokol.cz/${locale}/portfolio`,
            languages,
        },
        openGraph: {
            title: t("title"),
            description: t("description"),
            url: `https://jakubsokol.cz/${locale}/portfolio`,
            siteName: "Jakub Sokol",
            locale: locale === "cs" ? "cs_CZ" : "en_US",
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: t("title"),
            description: t("description"),
        },
    };
}

export default async function PortfolioPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    if (!isValidLocale(locale)) notFound();

    setRequestLocale(locale);

    const tPortfolio = await getTranslations({ locale, namespace: "portfolio" });
    const tPage = await getTranslations({ locale, namespace: "portfolioPage" });

    const localizedProjects = projects.map((project) => ({
        ...project,
        title: tPortfolio.has(`projects.${project.id}.title`)
            ? tPortfolio(`projects.${project.id}.title`)
            : project.title,
        description: tPortfolio.has(`projects.${project.id}.description`)
            ? tPortfolio(`projects.${project.id}.description`)
            : project.description,
        iconUrl: resolveAsset(project, "icon"),
        coverUrl: resolveAsset(project, "cover"),
    }));

    return (
        <main className="container mx-auto pb-20 px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-sm font-medium text-neutral-500 hover:text-foreground transition-colors mb-6 group"
                >
                    <LuArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span>{tPage("backHome")}</span>
                </Link>

                <Heading1 className="mb-0!">{tPage("heading")}</Heading1>
                <p className="text-xl md:text-2xl text-neutral-600 max-w-3xl leading-relaxed">
                    {tPage("subtitle")}
                </p>
            </div>

            <PortfolioFilterGrid
                projects={localizedProjects}
                filterLabels={{
                    all: tPage("filter.all"),
                    work: tPage("filter.work"),
                    personal: tPage("filter.personal"),
                }}
                categoryBadgeLabels={{
                    work: tPage("categoryBadge.work"),
                    personal: tPage("categoryBadge.personal"),
                }}
                emptyMessage={tPage("empty")}
            />
        </main>
    );
}
