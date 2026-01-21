'use client';

import { HTMLAttributes, useState } from 'react';
import Image from 'next/image';
import { useLightbox } from '@/app/components/lightbox/LightboxContext';

interface LightBoxItemProps extends HTMLAttributes<HTMLImageElement> {
    src: string,
    width: number,
    height?: number,
    alt?: string
}

export function LightboxItem({ src, width, height, alt = '' }: LightBoxItemProps) {
    const { openAt, register } = useLightbox();

    const [index] = useState(() =>
        register({
            src,
            width,
            height: height || width,
            alt,
        })
    );
    
    return (
        <div
            onClick={() => openAt(index)}
        >
            <Image
                src={src}
                alt={alt}
                width={width}
                height={height || width}
            />
        </div>
    );
}