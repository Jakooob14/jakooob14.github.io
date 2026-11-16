'use client';

import { useState, useEffect, useCallback } from "react";
import Card from "@/components/Card";
import { CertificateAsset } from "@/lib/assets";
import { Lightbox, LightboxItemData } from "@/components/Lightbox";
import { getPdfPageCount } from "@/lib/pdf";

interface CertificateProps {
    title: string;
    organization: string;
    description: string;
    year: number;
    assets?: CertificateAsset[];
    className?: string;
    id?: string;
}

export default function Certificate({
    title,
    organization,
    description,
    year,
    assets = [],
    className = "",
    id,
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
            <Card
                id={id}
                title={title}
                subtitle={organization}
                description={description}
                year={year}
                hoverVariant="accent"
                onClick={hasAssets ? handleOpen : undefined}
                ariaLabel={hasAssets ? `${title} - ${organization}` : undefined}
                className={className}
            />

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