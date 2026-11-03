import { HTMLAttributes } from "react";
import Image from "next/image";
import { Heading3 } from "@/components/Heading";

interface ProjectProps extends HTMLAttributes<HTMLDivElement> {
    title: string;
    iconUrl: string;
    description: string;
    previewUrl?: string;
}

export default function Project({
    title,
    iconUrl,
    description,
    previewUrl,
    className = "",
    ...props
}: ProjectProps) {
    return (
        <div
            className={`bg-neutral-100 p-8 rounded-3xl flex flex-col justify-between ${className}`}
            {...props}
        >
            <div>
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-heading grid place-content-center rounded-2xl shrink-0">
                        <Image className="w-full p-2.5" src={iconUrl} alt={title} width={28} height={28} />
                    </div>
                    <Heading3 className="mb-0! text-5xl! leading-[1.1]!">
                        {title}
                    </Heading3>
                </div>
                <p className="mt-4 text-neutral-600 leading-relaxed">
                    {description}
                </p>
            </div>

            <div className="mt-8 aspect-16/10 w-full rounded-2xl bg-neutral-200/60 overflow-hidden relative border border-neutral-200/50">
                {previewUrl && (
                    <Image
                        src={previewUrl}
                        alt={`${title} preview`}
                        fill
                        className="object-cover"
                    />
                )}
            </div>
        </div>
    );
}
