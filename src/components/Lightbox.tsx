'use client';

import {
    createContext,
    useContext,
    useState,
    useEffect,
    useCallback,
    useId,
    useMemo,
    useRef,
    ReactNode,
} from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { LuChevronLeft, LuChevronRight, LuX, LuImage, LuFileText } from "react-icons/lu";

const PdfCanvasViewer = dynamic(() => import("./PdfCanvasViewer"), {
    ssr: false,
});

export interface LightboxItemData {
    id: string;
    src: string;
    alt: string;
    type?: "image" | "pdf";
    pageNumber?: number;
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
    children?: ReactNode;
    className?: string;
    items?: LightboxItemData[];
    isOpen?: boolean;
    onClose?: () => void;
    initialIndex?: number;
}

export function Lightbox({
    children,
    className = "",
    items: controlledItems,
    isOpen: controlledIsOpen,
    onClose: controlledOnClose,
    initialIndex = 0,
}: LightboxProps) {
    const [registeredItems, setRegisteredItems] = useState<LightboxItemData[]>([]);
    const [internalActiveIndex, setInternalActiveIndex] = useState<number | null>(null);
    const [controlledIndex, setControlledIndex] = useState(initialIndex);
    const [prevInitialIndex, setPrevInitialIndex] = useState(initialIndex);
    const [loadedItemKey, setLoadedItemKey] = useState<string | null>(null);

    // Fade animation states
    const [isClosing, setIsClosing] = useState(false);
    const [closingItem, setClosingItem] = useState<LightboxItemData | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Zoom & pan states
    const [isZoomed, setIsZoomed] = useState(false);
    const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const dragStartRef = useRef<{ startX: number; startY: number; initialOffsetX: number; initialOffsetY: number; didMove: boolean }>({
        startX: 0,
        startY: 0,
        initialOffsetX: 0,
        initialOffsetY: 0,
        didMove: false,
    });
    const imageContainerRef = useRef<HTMLDivElement | null>(null);

    const items = controlledItems ?? registeredItems;
    const isControlled = controlledIsOpen !== undefined;

    // Reset controlled index if initialIndex changes
    if (initialIndex !== prevInitialIndex) {
        setPrevInitialIndex(initialIndex);
        setControlledIndex(initialIndex);
    }

    const activeIndex = isControlled
        ? controlledIsOpen && items.length > 0
            ? controlledIndex
            : null
        : internalActiveIndex;

    const resetZoom = useCallback(() => {
        setIsZoomed(false);
        setZoomPosition({ x: 50, y: 50 });
        setDragOffset({ x: 0, y: 0 });
        setIsDragging(false);
    }, []);

    const registerItem = useCallback((item: LightboxItemData) => {
        setRegisteredItems((prev) => {
            const exists = prev.some((i) => i.id === item.id);
            if (exists) {
                return prev.map((i) => (i.id === item.id ? item : i));
            }
            return [...prev, item];
        });
    }, []);

    const unregisterItem = useCallback((id: string) => {
        setRegisteredItems((prev) => prev.filter((item) => item.id !== id));
    }, []);

    const openLightbox = useCallback((id: string) => {
        const index = items.findIndex((item) => item.id === id);
        if (index !== -1) {
            setInternalActiveIndex(index);
            setIsClosing(false);
            setClosingItem(null);
            resetZoom();
        }
    }, [items, resetZoom]);

    const activeItem = activeIndex !== null && items[activeIndex] ? items[activeIndex] : null;

    const closeLightbox = useCallback(() => {
        if (isClosing) return;
        if (activeItem) {
            setClosingItem(activeItem);
        }
        setIsClosing(true);
        setIsVisible(false);
        resetZoom();

        if (closeTimeoutRef.current) {
            clearTimeout(closeTimeoutRef.current);
        }

        closeTimeoutRef.current = setTimeout(() => {
            setIsClosing(false);
            setClosingItem(null);
            setLoadedItemKey(null);
            if (isControlled) {
                setControlledIndex(initialIndex);
                controlledOnClose?.();
            } else {
                setInternalActiveIndex(null);
            }
        }, 200);
    }, [activeItem, controlledOnClose, initialIndex, isClosing, isControlled, resetZoom]);

    // Handle fade in when activeIndex opens
    useEffect(() => {
        if (activeIndex !== null && !isClosing) {
            const frame = requestAnimationFrame(() => {
                setIsVisible(true);
            });
            return () => cancelAnimationFrame(frame);
        }
    }, [activeIndex, isClosing]);

    // Clean up close timer on unmount
    useEffect(() => {
        return () => {
            if (closeTimeoutRef.current) {
                clearTimeout(closeTimeoutRef.current);
            }
        };
    }, []);

    const showPrev = useCallback(() => {
        if (isClosing) return;
        resetZoom();
        if (isControlled) {
            setControlledIndex((prev) => {
                if (items.length === 0) return 0;
                return (prev - 1 + items.length) % items.length;
            });
        } else {
            setInternalActiveIndex((prev) => {
                if (prev === null || items.length === 0) return null;
                return (prev - 1 + items.length) % items.length;
            });
        }
    }, [isControlled, isClosing, items.length, resetZoom]);

    const showNext = useCallback(() => {
        if (isClosing) return;
        resetZoom();
        if (isControlled) {
            setControlledIndex((prev) => {
                if (items.length === 0) return 0;
                return (prev + 1) % items.length;
            });
        } else {
            setInternalActiveIndex((prev) => {
                if (prev === null || items.length === 0) return null;
                return (prev + 1) % items.length;
            });
        }
    }, [isControlled, isClosing, items.length, resetZoom]);

    useEffect(() => {
        if (activeIndex === null && !isClosing) return;

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
    }, [activeIndex, isClosing, closeLightbox, showPrev, showNext]);

    // Global mouseup listener for smooth drag release anywhere
    useEffect(() => {
        if (!isDragging) return;

        const handleMouseUp = () => {
            setIsDragging(false);
        };

        window.addEventListener("mouseup", handleMouseUp);
        return () => window.removeEventListener("mouseup", handleMouseUp);
    }, [isDragging]);

    const displayedItem = activeItem ?? closingItem;

    const activeItemKey = displayedItem
        ? `${displayedItem.id}#${displayedItem.src}#${displayedItem.pageNumber ?? 1}`
        : null;
    const isLoading = displayedItem !== null && loadedItemKey !== activeItemKey;

    const adjacentIndices = useMemo(() => {
        if (activeIndex === null || items.length <= 1) return [];
        const nextIndex = (activeIndex + 1) % items.length;
        const prevIndex = (activeIndex - 1 + items.length) % items.length;
        return nextIndex === prevIndex ? [nextIndex] : [nextIndex, prevIndex];
    }, [activeIndex, items.length]);

    const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
        // If a drag move occurred, ignore click toggle
        if (dragStartRef.current.didMove) {
            dragStartRef.current.didMove = false;
            return;
        }

        if (isLoading || isClosing) return;

        if (isZoomed) {
            resetZoom();
        } else {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
            const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
            setZoomPosition({ x, y });
            setDragOffset({ x: 0, y: 0 });
            setIsZoomed(true);
        }
    };

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isZoomed || isLoading || isClosing || e.button !== 0) return;
        dragStartRef.current = {
            startX: e.clientX,
            startY: e.clientY,
            initialOffsetX: dragOffset.x,
            initialOffsetY: dragOffset.y,
            didMove: false,
        };
        setIsDragging(true);
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isZoomed || !isDragging || isClosing) return;
        const deltaX = e.clientX - dragStartRef.current.startX;
        const deltaY = e.clientY - dragStartRef.current.startY;

        if (Math.hypot(deltaX, deltaY) > 4) {
            dragStartRef.current.didMove = true;
        }

        setDragOffset({
            x: dragStartRef.current.initialOffsetX + deltaX,
            y: dragStartRef.current.initialOffsetY + deltaY,
        });
    };

    const cursorClass = isLoading || isClosing
        ? "cursor-default"
        : !isZoomed
        ? "cursor-zoom-in"
        : isDragging
        ? "cursor-grabbing"
        : "cursor-grab";

    const isModalMounted = (activeIndex !== null && activeItem !== null) || isClosing;

    return (
        <LightboxContext.Provider
            value={{
                registerItem,
                unregisterItem,
                openLightbox,
                closeLightbox,
            }}
        >
            {children ? <div className={className}>{children}</div> : null}

            {isModalMounted && displayedItem && (
                <div
                    role="dialog"
                    aria-modal="true"
                    aria-label={displayedItem.alt || "Preview"}
                    className={`fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center select-none overflow-hidden transition-opacity duration-200 ease-in-out ${
                        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
                    } ${isZoomed ? "p-0" : "p-4 sm:p-8"}`}
                    onClick={closeLightbox}
                >
                    {/* Close Button */}
                    <button
                        type="button"
                        onClick={closeLightbox}
                        aria-label="Close preview"
                        className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white/80 hover:text-white p-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-50 cursor-pointer"
                    >
                        <LuX className="w-6 h-6" />
                    </button>

                    {/* Navigation Buttons (hidden when zoomed to avoid accidental clicks) */}
                    {items.length > 1 && !isZoomed && (
                        <>
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    showPrev();
                                }}
                                aria-label="Previous page"
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
                                aria-label="Next page"
                                className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-50 cursor-pointer"
                            >
                                <LuChevronRight className="w-6 h-6" />
                            </button>
                        </>
                    )}

                    {/* Active Modal Content Wrapper */}
                    <div
                        className={`relative w-full h-full flex flex-col items-center justify-center transition-all duration-200 ease-out ${
                            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
                        } ${isZoomed ? "max-w-none max-h-none" : "max-w-6xl max-h-[85vh]"}`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div
                            ref={imageContainerRef}
                            className={`relative w-full h-full flex items-center justify-center ${cursorClass}`}
                            onClick={handleContainerClick}
                            onMouseDown={handleMouseDown}
                            onMouseMove={handleMouseMove}
                        >
                            {/* Pulsing skeleton / frosted placeholder card */}
                            {isLoading && (
                                <div
                                    aria-hidden="true"
                                    className="w-full max-w-4xl h-[55vh] sm:h-[70vh] rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl animate-pulse flex flex-col items-center justify-center p-8 shadow-2xl"
                                >
                                    <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center mb-4 text-white/40">
                                        {displayedItem.type === "pdf" ? (
                                            <LuFileText className="w-8 h-8" />
                                        ) : (
                                            <LuImage className="w-8 h-8" />
                                        )}
                                    </div>
                                    <div className="h-3 w-44 bg-white/15 rounded-full mb-3" />
                                    <div className="h-2.5 w-28 bg-white/10 rounded-full" />
                                </div>
                            )}

                            <div
                                className={`flex items-center justify-center ${
                                    isZoomed && !isLoading ? "will-change-transform" : ""
                                }`}
                                style={{
                                    transform: isZoomed && !isLoading
                                        ? `translate3d(${dragOffset.x}px, ${dragOffset.y}px, 0px) scale(2.5)`
                                        : "translate3d(0px, 0px, 0px) scale(1)",
                                    transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                                    transition: isDragging
                                        ? "none"
                                        : "transform 250ms cubic-bezier(0.2, 0, 0.2, 1)",
                                }}
                            >
                                {displayedItem.type === "pdf" ? (
                                    <div className={isLoading ? "opacity-0 absolute pointer-events-none" : "opacity-100 transition-opacity duration-300"}>
                                        <PdfCanvasViewer
                                            key={activeItemKey ?? displayedItem.src}
                                            src={displayedItem.src}
                                            pageNumber={displayedItem.pageNumber ?? 1}
                                            onLoad={() => {
                                                if (activeItemKey) setLoadedItemKey(activeItemKey);
                                            }}
                                            onError={() => {
                                                if (activeItemKey) setLoadedItemKey(activeItemKey);
                                            }}
                                        />
                                    </div>
                                ) : (
                                    <Image
                                        key={displayedItem.src}
                                        src={displayedItem.src}
                                        alt={displayedItem.alt}
                                        width={2400}
                                        height={1600}
                                        draggable={false}
                                        className={`max-w-full max-h-[80vh] w-auto h-auto object-contain rounded-xl select-none transition-opacity duration-300 pointer-events-none ${
                                            isLoading ? "opacity-0 absolute" : "opacity-100"
                                        }`}
                                        priority
                                        onLoad={() => {
                                            if (activeItemKey) setLoadedItemKey(activeItemKey);
                                        }}
                                        onError={() => {
                                            if (activeItemKey) setLoadedItemKey(activeItemKey);
                                        }}
                                    />
                                )}
                            </div>
                        </div>

                        {/* Preload adjacent images (excluding PDFs) */}
                        {adjacentIndices.map((idx) => {
                            const preloadItem = items[idx];
                            if (!preloadItem || preloadItem.type === "pdf") return null;
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

                        {/* Counter */}
                        {items.length > 1 && !isZoomed && activeIndex !== null && (
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
    type?: "image" | "pdf";
    pageNumber?: number;
}

export function LightboxItem({
    src,
    alt = "Preview image",
    id,
    children,
    className = "",
    aspectRatio = "aspect-16/10",
    type = "image",
    pageNumber,
}: LightboxItemProps) {
    const generatedId = useId();
    const itemId = id || generatedId;
    const { registerItem, unregisterItem, openLightbox } = useLightbox();

    useEffect(() => {
        registerItem({ id: itemId, src, alt, type, pageNumber });
        return () => unregisterItem(itemId);
    }, [itemId, src, alt, type, pageNumber, registerItem, unregisterItem]);

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
