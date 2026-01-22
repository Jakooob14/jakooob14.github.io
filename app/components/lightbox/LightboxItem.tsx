'use client';

import { HTMLAttributes, useEffect, useState } from 'react';
import Image from 'next/image';
import { useLightbox } from '@/app/components/lightbox/LightboxContext';
import { FaMagnifyingGlassPlus } from 'react-icons/fa6';

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
            className={'cursor-pointer relative ' + className}
        >
            <Image
                src={src}
                alt={alt}
                width={width}
                height={height || width}
                className={imageClassName}
            />
            <div className={'absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity'}>
                <FaMagnifyingGlassPlus size={32}/>
            </div>
        </div>
    );
}