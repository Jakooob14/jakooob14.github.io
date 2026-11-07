import { HTMLAttributes } from "react";
import Image from "next/image";
import { Heading3 } from "@/components/Heading";
import { ProjectItem } from "@/data/projects";
import { resolveAsset } from "@/lib/assets";

interface ProjectProps extends HTMLAttributes<HTMLDivElement> {
    project: ProjectItem;
}

export default function Project({ project, className = "", ...props }: ProjectProps) {
    const iconUrl = resolveAsset(project, "icon");
    const coverUrl = resolveAsset(project, "cover");

    return (
        <div
            className={`bg-neutral-100 p-8 rounded-3xl flex flex-col justify-between ${className}`}
            {...props}
        >
            <div>
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-heading grid place-content-center rounded-2xl shrink-0">
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
                    <Heading3 className="mb-0! text-5xl! leading-[1.1]!">
                        {project.title}
                    </Heading3>
                </div>
                <p className="mt-4 text-neutral-600 leading-relaxed">
                    {project.description}
                </p>
            </div>

            <div className="mt-8 aspect-3/2 w-full rounded-2xl bg-neutral-200/60 overflow-hidden relative border border-neutral-200/50">
                {coverUrl && (
                    <Image
                        src={coverUrl}
                        alt={`${project.title} preview`}
                        fill
                        className="object-cover"
                    />
                )}
            </div>
        </div>
    );
}
