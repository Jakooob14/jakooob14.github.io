import { Heading1 } from "@/components/Heading";
import Project from "@/components/home/Project";
import projects from "@/data/projects";
import { Link } from "@/i18n/routing";
import { LuArrowRight } from "react-icons/lu";
import { useTranslations } from "next-intl";

export default function PortfolioSection() {
    const t = useTranslations("portfolio");

    const localizedProjects = projects.map((project) => ({
        ...project,
        title: t.has(`projects.${project.id}.title`)
            ? t(`projects.${project.id}.title`)
            : project.title,
        description: t.has(`projects.${project.id}.description`)
            ? t(`projects.${project.id}.description`)
            : project.description,
    }));

    return (
        <section id="portfolio" className="container mx-auto mt-24">
            <Heading1>{t("heading")}</Heading1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {localizedProjects.map((project) => (
                    <Project
                        key={project.id}
                        project={project}
                    />
                ))}
            </div>
            <Link
                href="/portfolio"
                className="block bg-neutral-100 p-8 mt-8 rounded-3xl hover:bg-heading hover:text-text-secondary transition-colors"
            >
                <span className="flex items-center gap-2 text-3xl">
                    {t("seeAll")} <LuArrowRight />
                </span>
            </Link>
        </section>
    );
}
