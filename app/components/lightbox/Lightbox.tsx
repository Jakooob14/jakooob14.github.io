'use client';

import { HTMLAttributes, useCallback, useEffect, useState, MouseEvent } from 'react';
import { LightboxContext } from './LightboxContext';
import Image from 'next/image';
import { createPortal } from 'react-dom';
import { FaChevronLeft, FaChevronRight, FaXmark } from 'react-icons/fa6';
import { AnimatePresence, motion } from 'motion/react';

export type LightboxItemData = {
    src: string;
    width: number;
    height?: number;
    alt?: string;
};

type Transform = {
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

    const [transform, setTransform] = useState<Transform>({
        scale: 1,
        x: 0,
        y: 0,
    });

    const [direction, setDirection] = useState<1 | -1>(1);


    const register = useCallback((item: LightboxItemData) => {
        setItems(prev => {
            if (prev.some(i => i.src === item.src)) return prev;
            return [...prev, item];
        });
    }, []);

    const openAt = useCallback((index: number) => {
        setIndex(index);
        setOpen(true);
        setTransform(t => {
            return { scale: 1, x: t.x, y: t.y };
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
        setDirection(-1);
        setIndex(i => (i - 1 + items.length) % items.length);
        setTransform(t => {
            return { scale: 1, x: t.x, y: t.y };
        });
    }, [items.length]);

    const next = useCallback(() => {
        if (items.length === 0) return;
        setDirection(1);
        setIndex(i => (i + 1) % items.length);
        setTransform(t => {
            return { scale: 1, x: t.x, y: t.y };
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

    const toggleZoom = (e: MouseEvent) => {
        e.stopPropagation();

        setTransform(t => {
            if (t.scale === 1) {
                return { scale: 3, x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY };
            } else {
                return { scale: 1, x: t.x, y: t.y };
            }
        });
    };
    
    const slideVariants = {
        enter: (dir: number) => ({
            x: dir * 100,
            opacity: 0,
        }),
        center: {
            x: 0,
            opacity: 1,
        },
        exit: (dir: number) => ({
            x: -dir * 100,
            opacity: 0,
        }),
    };
    
    function prevent(e: Event) {
        e.preventDefault();
    }

    useEffect(() => {
        // Turn off scroll events when lightbox is open
        if (open) {
            document.body.addEventListener('wheel', prevent, { passive: false });
            document.body.addEventListener('touchmove', prevent, { passive: false });
        } else {
            document.body.removeEventListener('wheel', prevent);
            document.body.removeEventListener('touchmove', prevent);
        }

        return () => {
            document.body.removeEventListener('wheel', prevent);
            document.body.removeEventListener('touchmove', prevent);
        };
    }, [open]);

    return (
        <>
            <LightboxContext.Provider value={{ register, openAt, openBySrc }}>
                {children}

                {createPortal(
                    <AnimatePresence>
                        {open && (
                            <motion.div
                                className={'fixed inset-0 bg-black/75 backdrop-blur-sm bg-opacity-75 flex items-center justify-center z-2000'}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                
                                <button
                                    className={'absolute top-4 right-4 text-white text-3xl p-2 z-10 cursor-pointer'}
                                    onClick={close}
                                >
                                    <FaXmark/>
                                </button>
                                {
                                    items.length > 1 && (
                                        <>
                                            <button
                                                className={'absolute left-4 text-white text-3xl p-2 z-10 cursor-pointer'}
                                                onClick={prev}
                                            >
                                                <FaChevronLeft/>
                                            </button>
                                            <button
                                                className={'absolute right-4 text-white text-3xl p-2 z-10 cursor-pointer'}
                                                onClick={next}
                                            >
                                                <FaChevronRight/>
                                            </button>
                                            <span className={'absolute left-6 top-6 z-10'}>{index + 1}/{items.length}</span>
                                        </>
                                    )
                                }
                                <div className={'max-w-[90vw] h-full relative flex flex-col items-center inset-0 justify-between'}>
                                    <div className={'h-[10%]'}></div>
                                    <AnimatePresence initial={false} custom={direction}>
                                        <motion.div 
                                            className={'w-screen h-screen flex justify-center items-center absolute z-5'}
                                            key={items[index].src}
                                            custom={direction}
                                            variants={slideVariants}
                                            initial='enter'
                                            animate='center'
                                            exit='exit'
                                            transition={{ duration: 0.3, ease: 'easeOut' }}
                                        >
                                            <div className={'absolute w-full h-full top-0 left-0'} onClick={close}></div>
                                            <Image
                                                className={`w-auto! max-h-[80%] max-w-[90%] relative! object-contain ${transform.scale > 1 ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
                                                style={{
                                                    transform: `scale(${transform.scale})`,
                                                    transition: 'transform 0.3s ease',
                                                    transformOrigin: `${transform.x}px ${transform.y}px`,
                                                }}
                                                src={items[index].src}
                                                alt={items[index].alt || ''}
                                                onClick={toggleZoom}
                                                fill
                                            />
                                        </motion.div>
                                    </AnimatePresence>
                                    <span className={'text-center w-full h-[10%] grid content-center z-10'}>{items[index].alt}</span>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>,
                    document.body
                )}
            </LightboxContext.Provider>
        </>
    );
}