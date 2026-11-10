'use client';

import { useState, useEffect, useCallback, HTMLAttributes } from "react";
import { CertificateAsset } from "@/lib/assets";
import { Lightbox, LightboxItemData } from "@/components/Lightbox";
import { getPdfPageCount } from "@/lib/pdf";
import { LuEye } from "react-icons/lu";

interface CertificateProps extends HTMLAttributes<HTMLDivElement> {
    title: string;
    organization: string;
    description: string;
    year: number;
    assets?: CertificateAsset[];
}

export default function Certificate({
    title,
    organization,
    description,
    year,
    assets = [],
    className = "",
    ...props
}: CertificateProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [slides, setSlides] = useState<LightboxItemData[]>([]);

    const hasAssets = assets.length > 0;

    const prepareSlides = useCallback(async (): Promise<LightboxItemData[]> => {
        const result: LightboxItemData[] = [];

        for (const asset of assets) {
            if (asset.type === "pdf") {
                const count = await getPdfPageCount(asset.url);
                for (let page = 1; page <= count; page++) {
                    result.push({
                        id: `${asset.url}#p${page}`,
                        src: asset.url,
                        alt: count > 1 ? `${title} (str. ${page}/${count})` : title,
                        type: "pdf",
                        pageNumber: page,
                    });
                }
            } else {
                result.push({
                    id: asset.url,
                    src: asset.url,
                    alt: title,
                    type: "image",
                });
            }
        }

        return result;
    }, [assets, title]);

    // Pre-calculate page counts so opening is instant
    useEffect(() => {
        if (!hasAssets) return;
        let isMounted = true;
        prepareSlides().then((res) => {
            if (isMounted) setSlides(res);
        });
        return () => {
            isMounted = false;
        };
    }, [hasAssets, prepareSlides]);

    const handleOpen = async () => {
        if (!hasAssets) return;
        if (slides.length === 0) {
            const res = await prepareSlides();
            setSlides(res);
        }
        setIsOpen(true);
    };

    return (
        <>
            <div
                {...props}
                role={hasAssets ? "button" : undefined}
                tabIndex={hasAssets ? 0 : undefined}
                aria-label={hasAssets ? `${title} - ${organization}` : undefined}
                onClick={hasAssets ? handleOpen : undefined}
                onKeyDown={
                    hasAssets
                        ? (e) => {
                              if (e.key === "Enter" || e.key === " ") {
                                  e.preventDefault();
                                  handleOpen();
                              }
                          }
                        : undefined
                }
                className={`group flex flex-col md:flex-row justify-between bg-neutral-100 p-8 rounded-3xl transition-all duration-300 ${
                    hasAssets
                        ? "cursor-pointer hover:bg-heading hover:text-text-secondary"
                        : "hover:bg-heading hover:text-text-secondary"
                } ${className}`}
            >
                <div className="w-full md:w-56 flex flex-col mb-4 md:mb-0">
                    <span className="font-semibold text-lg">{title}</span>
                    <span className="opacity-80">{organization}</span>
                </div>
                <div className="flex-1 md:px-6">
                    <p className="leading-relaxed opacity-90">{description}</p>
                </div>
                <div className="w-full md:w-28 text-2xl flex items-center justify-between md:justify-end mt-4 md:mt-0 gap-3">
                    <span>{year}</span>
                </div>
            </div>

            {hasAssets && (
                <Lightbox
                    items={slides}
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                />
            )}
        </>
    );
}