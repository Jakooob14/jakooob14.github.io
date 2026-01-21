'use client';

import { HTMLAttributes, useCallback, useState } from 'react';
import { LightboxContext } from './LightboxContext'; 
import Image from 'next/image'; 
import { createPortal } from 'react-dom';

export type LightboxItemData = {
    src: string;
    width: number;
    height?: number;
    alt?: string;
};

interface LightboxProps extends HTMLAttributes<HTMLDivElement> {
    
}

export default function Lightbox({ children }: LightboxProps) {
    const [items, setItems] = useState<LightboxItemData[]>([]);
    const [open, setOpen] = useState<boolean>(false);
    const [index, setIndex] = useState<number>(0);
    
    const register = useCallback((item: LightboxItemData) => {
        let index = -1;
        setItems(prev => {
            if (prev.some(i => i.src === item.src)) return prev;
            index = prev.length;
            return [...prev, item];
        });
        return index;
    }, [items.length]);
    
    const openAt = useCallback((index: number) => {
        setIndex(index);
        setOpen(true);
    }, []);
    
    const close = () => setOpen(false);
    
    const prev = () => {
        if (items.length === 0) return;
        setIndex(i => (i - 1 + items.length) % items.length);
    };
    
    const next = () => {
        if (items.length === 0) return;
        setIndex(i => (i + 1) % items.length);
    };
    
    return (
        <>
            <LightboxContext.Provider value={{ register, openAt }}>
                {children}

                {
                    open && items.length > 0 && createPortal(
                        <div className='fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50'>
                            <button
                                className='absolute top-4 right-4 text-white text-3xl'
                                onClick={close}
                            >
                                &times;
                            </button>
                            <button
                                className='absolute left-4 text-white text-3xl'
                                onClick={prev}
                            >
                                &#8592;
                            </button>
                            <Image
                                src={items[index].src}
                                alt={items[index].alt || ''}
                                width={items[index].width}
                                height={items[index].height || items[index].width}
                                priority
                            />
                            <button
                                className='absolute right-4 text-white text-3xl'
                                onClick={next}
                            >
                                &#8594;
                            </button>
                        </div>,
                        document.body
                    )
                }
            </LightboxContext.Provider>
        </>
    );
}
