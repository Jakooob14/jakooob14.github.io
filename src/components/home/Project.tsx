import Image from "next/image";
import Card from "@/components/Card";
import { ProjectItem } from "@/data/projects";
import { useTranslations } from "next-intl";

export interface ProjectCardItem extends ProjectItem {
    title: string;
    description: string;
    iconUrl?: string | null;
    coverUrl?: string | null;
}

interface ProjectProps {
    project: ProjectCardItem;
    categoryBadgeLabel?: string;
    href?: string;
    titleLines?: 1 | 2;
    descriptionLines?: 2 | 3 | 4;
    className?: string;
    id?: string;
}

export default function Project({
    project,
    categoryBadgeLabel,
    href = `/portfolio/${project.id}`,
    titleLines = 2,
    descriptionLines = 3,
    className = "",
    id,
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
        <Card
            id={id}
            href={href}
            hoverVariant="subtle"
            icon={
                iconUrl ? (
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
                )
            }
            title={project.title}
            titleAttr={project.title}
            titleClassName={`text-3xl sm:text-4xl lg:text-5xl leading-[1.1]! pb-1 ${titleClampClass} break-words`}
            badge={badgeLabel}
            description={project.description}
            descriptionAttr={project.description}
            descriptionClassName={`${descClampClass} break-words`}
            media={
                <div className="aspect-3/2 w-full rounded-2xl bg-neutral-200 overflow-hidden relative shrink-0">
                    {coverUrl && (
                        <Image
                            src={coverUrl}
                            alt={`${project.title} preview`}
                            fill
                            className="object-cover transition-transform duration-500 ease-out"
                        />
                    )}
                </div>
            }
            className={`h-full ${className}`}
        />
    );
}
