'use client';

import { Heading2 } from "@/components/Heading";
import { Lightbox, LightboxItem, useLightboxContext } from "@/components/Lightbox";

interface ProjectGalleryProps {
    images: string[];
    projectTitle: string;
    labels: {
        heading: string;
        subtitle?: string;
    };
}

export default function ProjectGallery({
    images,
    projectTitle,
    labels,
}: ProjectGalleryProps) {
    const context = useLightboxContext();

    if (!images || images.length === 0) {
        return null;
    }

    const galleryContent = (
        <section className="mt-16 sm:mt-24 pt-12 border-t border-neutral-200">
            <div className="mb-8">
                <Heading2 className="mb-2! text-3xl sm:text-4xl">
                    {labels.heading}
                </Heading2>
                {labels.subtitle && (
                    <p className="text-neutral-600 text-lg">
                        {labels.subtitle}
                    </p>
                )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {images.map((src, index) => (
                    <LightboxItem
                        key={src}
                        src={src}
                        alt={`${projectTitle} screenshot ${index + 1}`}
                    />
                ))}
            </div>
        </section>
    );

    if (context) {
        return galleryContent;
    }

    return <Lightbox>{galleryContent}</Lightbox>;
}
