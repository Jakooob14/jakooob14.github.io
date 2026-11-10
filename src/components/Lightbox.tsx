'use client';

import {
    createContext,
    useContext,
    useState,
    useEffect,
    useCallback,
    useId,
    useMemo,
    ReactNode,
} from "react";
import Image from "next/image";
import { LuChevronLeft, LuChevronRight, LuX, LuImage } from "react-icons/lu";

export interface LightboxItemData {
    id: string;
    src: string;
    alt: string;
}

interface LightboxContextType {
    registerItem: (item: LightboxItemData) => void;
    unregisterItem: (id: string) => void;
    openLightbox: (id: string) => void;
    closeLightbox: () => void;
}

export const LightboxContext = createContext<LightboxContextType | null>(null);

export function useLightbox() {
    const context = useContext(LightboxContext);
    if (!context) {
        throw new Error("useLightbox must be used within a <Lightbox>");
    }
    return context;
}

export function useLightboxContext() {
    return useContext(LightboxContext);
}

export interface LightboxProps {
    children: ReactNode;
    className?: string;
}

export function Lightbox({ children, className = "" }: LightboxProps) {
    const [items, setItems] = useState<LightboxItemData[]>([]);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [loadedItemSrc, setLoadedItemSrc] = useState<string | null>(null);

    const registerItem = useCallback((item: LightboxItemData) => {
        setItems((prev) => {
            const exists = prev.some((i) => i.id === item.id);
            if (exists) {
                return prev.map((i) => (i.id === item.id ? item : i));
            }
            return [...prev, item];
        });
    }, []);

    const unregisterItem = useCallback((id: string) => {
        setItems((prev) => prev.filter((item) => item.id !== id));
    }, []);

    const openLightbox = useCallback((id: string) => {
        setItems((currentItems) => {
            const index = currentItems.findIndex((item) => item.id === id);
            if (index !== -1) {
                setActiveIndex(index);
            }
            return currentItems;
        });
    }, []);

    const closeLightbox = useCallback(() => {
        setActiveIndex(null);
        setLoadedItemSrc(null);
    }, []);

    const showPrev = useCallback(() => {
        setActiveIndex((prev) => {
            if (prev === null || items.length === 0) return null;
            return (prev - 1 + items.length) % items.length;
        });
    }, [items.length]);

    const showNext = useCallback(() => {
        setActiveIndex((prev) => {
            if (prev === null || items.length === 0) return null;
            return (prev + 1) % items.length;
        });
    }, [items.length]);

    useEffect(() => {
        if (activeIndex === null) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") closeLightbox();
            if (e.key === "ArrowLeft") showPrev();
            if (e.key === "ArrowRight") showNext();
        };

        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.style.overflow = originalOverflow;
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [activeIndex, closeLightbox, showPrev, showNext]);

    const activeItem = activeIndex !== null && items[activeIndex] ? items[activeIndex] : null;
    const isLoading = activeItem !== null && loadedItemSrc !== activeItem.src;

    const adjacentIndices = useMemo(() => {
        if (activeIndex === null || items.length <= 1) return [];
        const nextIndex = (activeIndex + 1) % items.length;
        const prevIndex = (activeIndex - 1 + items.length) % items.length;
        return nextIndex === prevIndex ? [nextIndex] : [nextIndex, prevIndex];
    }, [activeIndex, items.length]);

    return (
        <LightboxContext.Provider
            value={{
                registerItem,
                unregisterItem,
                openLightbox,
                closeLightbox,
            }}
        >
            <div className={className}>{children}</div>

            {activeIndex !== null && activeItem && (
                <div
                    role="dialog"
                    aria-modal="true"
                    aria-label={activeItem.alt || "Image preview"}
                    className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
                    onClick={closeLightbox}
                >
                    {/* Close Button */}
                    <button
                        type="button"
                        onClick={closeLightbox}
                        aria-label="Close image preview"
                        className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white/80 hover:text-white p-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-50 cursor-pointer"
                    >
                        <LuX className="w-6 h-6" />
                    </button>

                    {/* Navigation Buttons */}
                    {items.length > 1 && (
                        <>
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    showPrev();
                                }}
                                aria-label="Previous image"
                                className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-50 cursor-pointer"
                            >
                                <LuChevronLeft className="w-6 h-6" />
                            </button>
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    showNext();
                                }}
                                aria-label="Next image"
                                className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-50 cursor-pointer"
                            >
                                <LuChevronRight className="w-6 h-6" />
                            </button>
                        </>
                    )}

                    {/* Active Modal Image */}
                    <div
                        className="relative max-w-6xl max-h-[85vh] w-full h-full flex flex-col items-center justify-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="relative w-full h-full flex items-center justify-center">
                            {/* Pulsing skeleton / frosted placeholder card */}
                            {isLoading && (
                                <div
                                    aria-hidden="true"
                                    className="w-full max-w-4xl h-[55vh] sm:h-[70vh] rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl animate-pulse flex flex-col items-center justify-center p-8 shadow-2xl"
                                >
                                    <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center mb-4 text-white/40">
                                        <LuImage className="w-8 h-8" />
                                    </div>
                                    <div className="h-3 w-44 bg-white/15 rounded-full mb-3" />
                                    <div className="h-2.5 w-28 bg-white/10 rounded-full" />
                                </div>
                            )}

                            <Image
                                key={activeItem.src}
                                src={activeItem.src}
                                alt={activeItem.alt}
                                width={1600}
                                height={1000}
                                className={`max-w-full max-h-[80vh] w-auto h-auto object-contain rounded-xl transition-opacity duration-300 ${
                                    isLoading ? "opacity-0 absolute pointer-events-none" : "opacity-100"
                                }`}
                                priority
                                onLoad={() => setLoadedItemSrc(activeItem.src)}
                                onError={() => setLoadedItemSrc(activeItem.src)}
                            />
                        </div>

                        {/* Preload adjacent images */}
                        {adjacentIndices.map((idx) => {
                            const preloadItem = items[idx];
                            if (!preloadItem) return null;
                            return (
                                <div
                                    key={`preload-${preloadItem.id}-${preloadItem.src}`}
                                    className="hidden"
                                    aria-hidden="true"
                                >
                                    <Image
                                        src={preloadItem.src}
                                        alt=""
                                        width={1600}
                                        height={1000}
                                        priority
                                    />
                                </div>
                            );
                        })}

                        {/* Image Counter */}
                        {items.length > 1 && (
                            <div className="mt-3 text-white/70 text-sm font-medium tracking-wide">
                                {activeIndex + 1} / {items.length}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </LightboxContext.Provider>
    );
}

export interface LightboxItemProps {
    src: string;
    alt?: string;
    id?: string;
    children?: ReactNode;
    className?: string;
    aspectRatio?: string;
}

export function LightboxItem({
    src,
    alt = "Preview image",
    id,
    children,
    className = "",
    aspectRatio = "aspect-16/10",
}: LightboxItemProps) {
    const generatedId = useId();
    const itemId = id || generatedId;
    const { registerItem, unregisterItem, openLightbox } = useLightbox();

    useEffect(() => {
        registerItem({ id: itemId, src, alt });
        return () => unregisterItem(itemId);
    }, [itemId, src, alt, registerItem, unregisterItem]);

    const handleClick = () => {
        openLightbox(itemId);
    };

    if (children) {
        return (
            <button
                type="button"
                onClick={handleClick}
                className={`cursor-pointer ${className}`}
                aria-label={`Open ${alt}`}
            >
                {children}
            </button>
        );
    }

    return (
        <button
            type="button"
            onClick={handleClick}
            className={`group relative ${aspectRatio} rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-200/80 transition-all duration-300 cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-primary-500 ${className}`}
            aria-label={`Open ${alt}`}
        >
            <Image
                src={src}
                alt={alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                loading="lazy"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300" />
        </button>
    );
}

export default Lightbox;
