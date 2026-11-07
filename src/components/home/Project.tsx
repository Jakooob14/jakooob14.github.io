import { AnchorHTMLAttributes } from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { Heading3 } from "@/components/Heading";
import { ProjectItem } from "@/data/projects";
import { useTranslations } from "next-intl";

export interface ProjectCardItem extends ProjectItem {
    title: string;
    description: string;
    iconUrl?: string | null;
    coverUrl?: string | null;
}

interface ProjectProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children" | "href"> {
    project: ProjectCardItem;
    categoryBadgeLabel?: string;
    href?: string;
    titleLines?: 1 | 2;
    descriptionLines?: 2 | 3 | 4;
}

export default function Project({
    project,
    categoryBadgeLabel,
    href = `/portfolio/${project.id}`,
    titleLines = 2,
    descriptionLines = 3,
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

    const titleClampClass = titleLines === 1 ? "line-clamp-1" : "line-clamp-2";
    const descClampClass =
        descriptionLines === 2
            ? "line-clamp-2"
            : descriptionLines === 4
            ? "line-clamp-4"
            : "line-clamp-3";

    return (
        <Link
            href={href}
            className={`group bg-neutral-100 p-8 rounded-3xl flex flex-col justify-between h-full transition-all duration-300 hover:bg-neutral-200 ${className}`}
            {...props}
        >
            <div className="flex flex-col flex-1">
                <div className="flex items-center gap-4 min-w-0">
                    <div className="w-14 h-14 bg-heading grid place-content-center rounded-2xl shrink-0 transition-transform duration-300">
                        {iconUrl ? (
                            <Image
                                className="w-full p-2.5"
                                src={iconUrl}
                                alt={project.title}
                                width={28}
                                height={28}
                            />
                        ) : (
                            <span className="font-heading font-black text-4xl text-white select-none leading-none">
                                {(project.title || project.id).trim().charAt(0).toUpperCase()}
                            </span>
                        )}
                    </div>
                    <div className="min-w-0 flex-1">
                        <Heading3
                            className={`mb-0! text-3xl sm:text-4xl lg:text-5xl leading-[1.1]! pb-1 ${titleClampClass} break-words`}
                            title={project.title}
                        >
                            {project.title}
                        </Heading3>
                    </div>
                </div>

                <div className="mt-4">
                    <span className="inline-block text-xs font-semibold uppercase tracking-wider text-neutral-500 bg-neutral-200/60 px-2.5 py-0.5 rounded-full">
                        {badgeLabel}
                    </span>
                </div>
                
                <p
                    className={`mt-2 text-neutral-600 leading-relaxed ${descClampClass} break-words`}
                    title={project.description}
                >
                    {project.description}
                </p>
            </div>

            <div className="mt-8 aspect-3/2 w-full rounded-2xl bg-neutral-200 overflow-hidden relative shrink-0">
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
