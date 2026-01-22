'use client';

import { HTMLAttributes, useEffect, useState } from 'react';
import Image from 'next/image';
import { useLightbox } from '@/app/components/lightbox/LightboxContext';

interface LightBoxItemProps extends HTMLAttributes<HTMLImageElement> {
    src: string,
    width: number,
    height?: number,
    alt?: string,
    imageClassName?: string,
}

export function LightboxItem({ src, width, height, alt = '', className, imageClassName }: LightBoxItemProps) {
    const { openBySrc, register } = useLightbox();

    useEffect(() => {
        register({
            src,
            width,
            height: height || width,
            alt,
        });
    }, [register, src, width, height, alt]);

    return (
        <div
            onClick={() => openBySrc(src)}
            className={'cursor-pointer ' + className}
        >
            <Image
                src={src}
                alt={alt}
                width={width}
                height={height || width}
                className={imageClassName}
            />
        </div>
    );
}