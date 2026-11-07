import { AnchorHTMLAttributes } from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { Heading3 } from "@/components/Heading";
import { ProjectItem } from "@/data/projects";
import { useTranslations } from "next-intl";

export interface ProjectCardItem extends ProjectItem {
    iconUrl?: string | null;
    coverUrl?: string | null;
}

interface ProjectProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children" | "href"> {
    project: ProjectCardItem;
    categoryBadgeLabel?: string;
    href?: string;
}

export default function Project({
    project,
    categoryBadgeLabel,
    href = `/portfolio/${project.id}`,
    className = "",
    ...props
}: ProjectProps) {
    const tBadge = useTranslations("portfolioPage.categoryBadge");
    const iconUrl = project.iconUrl;
    const coverUrl = project.coverUrl;
    const badgeLabel =
        categoryBadgeLabel ??
        (tBadge.has(project.category)
            ? tBadge(project.category)
            : project.category);

    return (
        <Link
            href={href}
            className={`group bg-neutral-100 p-8 rounded-3xl flex flex-col justify-between transition-all duration-300 hover:bg-neutral-200 ${className}`}
            {...props}
        >
            <div>
                <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-heading grid place-content-center rounded-2xl shrink-0 transition-transform duration-300">
                            {iconUrl && (
                                <Image
                                    className="w-full p-2.5"
                                    src={iconUrl}
                                    alt={project.title}
                                    width={28}
                                    height={28}
                                />
                            )}
                        </div>
                        <div>
                            <Heading3 className="mb-0! text-5xl! leading-[1.1]!">
                                {project.title}
                            </Heading3>
                        </div>
                    </div>
                </div>

                <span className="inline-block mt-4 text-xs font-semibold uppercase tracking-wider text-neutral-500 bg-neutral-200/60 px-2.5 py-0.5 rounded-full">
                    {badgeLabel}
                </span>
                
                <p className="mt-2 text-neutral-600 leading-relaxed">
                    {project.description}
                </p>
            </div>

            <div className="mt-8 aspect-3/2 w-full rounded-2xl bg-neutral-200 overflow-hidden relative">
                {coverUrl && (
                    <Image
                        src={coverUrl}
                        alt={`${project.title} preview`}
                        fill
                        className="object-cover transition-transform duration-500 ease-out"
                    />
                )}
            </div>
        </Link>
    );
}
