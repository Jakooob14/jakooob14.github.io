import { Link } from "@/i18n/routing";
import { Heading1 } from "@/components/Heading";
import { ProjectDetail } from "@/lib/projects";
import { LuArrowLeft, LuExternalLink, LuGithub } from "react-icons/lu";

interface ProjectHeaderProps {
    project: ProjectDetail;
    labels: {
        backToPortfolio: string;
        categoryBadge: string;
        liveSite: string;
        sourceCode: string;
    };
}

export default function ProjectHeader({ project, labels }: ProjectHeaderProps) {
    return (
        <header className="mb-10 sm:mb-14">
            <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 text-sm font-medium text-neutral-500 hover:text-foreground transition-colors mb-6 group"
            >
                <LuArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span>{labels.backToPortfolio}</span>
            </Link>

            <div className="flex flex-wrap items-center gap-2.5 mb-4">
                <span className="inline-block text-xs font-semibold uppercase tracking-wider text-neutral-700 bg-neutral-200/70 px-3 py-1 rounded-full">
                    {labels.categoryBadge}
                </span>

                {project.year && (
                    <span className="inline-block text-xs font-medium text-neutral-600 bg-neutral-100 px-3 py-1 rounded-full">
                        {project.year}
                    </span>
                )}
            </div>

            <Heading1 className="mb-4! text-4xl sm:text-6xl lg:text-7xl leading-[1.08]! text-foreground">
                {project.title}
            </Heading1>

            <p className="text-xl md:text-2xl text-neutral-600 max-w-3xl leading-relaxed mb-6">
                {project.description}
            </p>

            {/* Tech Stack Pills (fully rounded, borderless) */}
            {project.technologies && project.technologies.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 mb-8">
                    {project.technologies.map((tech) => (
                        <span
                            key={tech}
                            className="text-xs sm:text-sm font-medium text-neutral-700 bg-neutral-100 px-4 py-1.5 rounded-full"
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            )}

            {/* Action Links */}
            {(project.liveUrl || project.githubUrl) && (
                <div className="flex flex-wrap items-center gap-3">
                    {project.liveUrl && (
                        <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-foreground text-background text-sm font-semibold hover:bg-neutral-800 transition-colors cursor-pointer"
                        >
                            <span>{labels.liveSite}</span>
                            <LuExternalLink className="w-4 h-4" />
                        </a>
                    )}

                    {project.githubUrl && (
                        <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-neutral-100 text-neutral-800 hover:bg-neutral-200/80 text-sm font-semibold transition-colors border border-neutral-200/60 cursor-pointer"
                        >
                            <LuGithub className="w-4 h-4" />
                            <span>{labels.sourceCode}</span>
                        </a>
                    )}
                </div>
            )}
        </header>
    );
}
