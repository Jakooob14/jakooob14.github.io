'use client';

import { HTMLAttributes, useCallback, useEffect, useState, MouseEvent } from 'react';
import { LightboxContext } from './LightboxContext'; 
import Image from 'next/image'; 
import { createPortal } from 'react-dom';
import { FaChevronLeft, FaChevronRight, FaXmark } from 'react-icons/fa6';

export type LightboxItemData = {
    src: string;
    width: number;
    height?: number;
    alt?: string;
};

type zoomData = {
    scale: number;
    x: number;
    y: number;
};

interface LightboxProps extends HTMLAttributes<HTMLDivElement> {
    
}

export default function Lightbox({ children }: LightboxProps) {
    const [items, setItems] = useState<LightboxItemData[]>([]);
    const [open, setOpen] = useState<boolean>(false);
    const [index, setIndex] = useState<number>(0);
    const [zoom, setZoom] = useState<zoomData>({ scale: 1, x: 0, y: 0 });

    const register = useCallback((item: LightboxItemData) => {
        setItems(prev => {
            if (prev.some(i => i.src === item.src)) return prev;
            return [...prev, item];
        });
    }, []);
    
    const openAt = useCallback((index: number) => {
        setIndex(index);
        setOpen(true);
        setZoom(z => {
            return { scale: 1, x: z.x, y: z.y };
        });
    }, []);

    const openBySrc = useCallback((src: string) => {
        const foundIndex = items.findIndex(item => item.src === src);
        if (foundIndex >= 0) {
            openAt(foundIndex);
        }
    }, [items, openAt]);
    
    const close = () => setOpen(false);
    
    const prev = useCallback(() => {
        if (items.length === 0) return;
        setIndex(i => (i - 1 + items.length) % items.length);
        setZoom(z => {
            return { scale: 1, x: z.x, y: z.y };
        });
    }, [items.length]);
    
    const next = useCallback(() => {
        if (items.length === 0) return;
        setIndex(i => (i + 1) % items.length);
        setZoom(z => {
            return { scale: 1, x: z.x, y: z.y };
        });
    }, [items.length]);
    
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!open) return;
            
            switch (e.key) {
                case 'Escape':
                    close();
                    break;
                case 'ArrowLeft':
                    prev();
                    break;
                case 'ArrowRight':
                    next();
                    break;
            }
        };
        
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [open, items, prev, next]);
    
    const handleImageClick = (e: MouseEvent) => {
        e.stopPropagation();
        
        setZoom(z => {
            if (z.scale === 1) {
                return { scale: 3, x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY };
            } else {
                return { scale: 1, x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY };
            }
        });
    };
    
    return (
        <>
            <LightboxContext.Provider value={{ register, openAt, openBySrc }}>
                {children}

                {
                    open && items.length > 0 && createPortal(
                        <div className={'fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-2000'}>
                            <button
                                className={'absolute top-4 right-4 text-white text-3xl p-2 z-10'}
                                onClick={close}
                            >
                                <FaXmark/>
                            </button>
                            {
                                items.length > 1 && (
                                    <>
                                        <button
                                            className={'absolute left-4 text-white text-3xl p-2 z-10'}
                                            onClick={prev}
                                        >
                                            <FaChevronLeft/>
                                        </button>
                                        <button
                                            className={'absolute right-4 text-white text-3xl p-2 z-10'}
                                            onClick={next}
                                        >
                                            <FaChevronRight/>
                                        </button>
                                    </>
                                )
                            }
                            <div className={'max-h-[80vh] max-w-[90vw] w-full h-full'}>
                                <Image
                                    className={`h-full w-full relative! object-contain ${zoom.scale > 1 ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
                                    style={{
                                        transform: `scale(${zoom.scale})`,
                                        transition: 'transform 0.3s ease',
                                        transformOrigin: `${zoom.x}px ${zoom.y}px`,
                                    }}
                                    src={items[index].src}
                                    alt={items[index].alt || ''}
                                    onClick={handleImageClick}
                                    fill
                                />
                                <span className={'text-center block w-full'}>{items[index].alt}</span>
                            </div>
                        </div>,
                        document.body
                    )
                }
            </LightboxContext.Provider>
        </>
    );
}
