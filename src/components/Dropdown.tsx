'use client';

import {
    useState,
    useRef,
    useEffect,
    useCallback,
    ReactNode,
    HTMLAttributes,
    MouseEvent,
    FocusEvent,
} from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';

export interface DropdownItem {
    label: string;
    icon?: ReactNode;
    onClick?: () => void;
    href?: string;
    active?: boolean;
    disabled?: boolean;
}

export interface DropdownProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
    /** The trigger element that activates the dropdown on hover/click. Can also be passed as children. */
    trigger?: ReactNode;
    /** The trigger element passed as children. */
    children?: ReactNode;
    /** Array of menu items */
    items?: DropdownItem[];
    /** Custom menu content if not using standard items */
    menuContent?: ReactNode;
    /** Horizontal alignment of the dropdown menu relative to the trigger ('right' | 'left') */
    align?: 'left' | 'right';
    /** Custom class name for the dropdown menu panel */
    contentClassName?: string;
    /** Delay in milliseconds before closing on mouse leave (grace period to prevent accidental closing) */
    closeDelay?: number;
    /** Delay in milliseconds before opening on mouse enter */
    openDelay?: number;
}

export default function Dropdown({
    trigger,
    children,
    items,
    menuContent,
    align = 'right',
    contentClassName = '',
    closeDelay = 180,
    openDelay = 0,
    className = '',
    ...props
}: DropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const openTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const clearTimers = useCallback(() => {
        if (closeTimeoutRef.current) {
            clearTimeout(closeTimeoutRef.current);
            closeTimeoutRef.current = null;
        }
        if (openTimeoutRef.current) {
            clearTimeout(openTimeoutRef.current);
            openTimeoutRef.current = null;
        }
    }, []);

    const handleMouseEnter = useCallback(() => {
        if (closeTimeoutRef.current) {
            clearTimeout(closeTimeoutRef.current);
            closeTimeoutRef.current = null;
        }

        if (openDelay > 0) {
            openTimeoutRef.current = setTimeout(() => {
                setIsOpen(true);
            }, openDelay);
        } else {
            setIsOpen(true);
        }
    }, [openDelay]);

    const handleMouseLeave = useCallback(() => {
        if (openTimeoutRef.current) {
            clearTimeout(openTimeoutRef.current);
            openTimeoutRef.current = null;
        }

        closeTimeoutRef.current = setTimeout(() => {
            setIsOpen(false);
        }, closeDelay);
    }, [closeDelay]);

    const handleTriggerClick = useCallback((e: MouseEvent) => {
        e.stopPropagation();
        clearTimers();
        setIsOpen((prev) => !prev);
    }, [clearTimers]);

    const handleItemClick = useCallback((item: DropdownItem, e: MouseEvent) => {
        if (item.disabled) {
            e.preventDefault();
            return;
        }
        item.onClick?.();
        clearTimers();
        setIsOpen(false);
    }, [clearTimers]);

    // Close on click outside
    useEffect(() => {
        if (!isOpen) return;

        const handleClickOutside = (event: globalThis.MouseEvent | TouchEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                clearTimers();
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('touchstart', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
        };
    }, [isOpen, clearTimers]);

    // Close on Escape key
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                clearTimers();
                setIsOpen(false);
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, clearTimers]);

    // Close on blur outside container
    const handleBlur = useCallback((e: FocusEvent) => {
        if (!containerRef.current?.contains(e.relatedTarget as Node)) {
            clearTimers();
            setIsOpen(false);
        }
    }, [clearTimers]);

    useEffect(() => {
        return () => {
            clearTimers();
        };
    }, [clearTimers]);

    const triggerNode = trigger ?? children;
    const hasAnyIcon = items?.some((item) => Boolean(item.icon));

    return (
        <div
            ref={containerRef}
            className={`relative inline-flex items-center ${className}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onBlur={handleBlur}
            {...props}
        >
            <div
                role="button"
                tabIndex={0}
                aria-haspopup="menu"
                aria-expanded={isOpen}
                onClick={handleTriggerClick}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setIsOpen((prev) => !prev);
                    }
                }}
                className={'cursor-pointer select-none inline-flex items-center justify-center outline-none'}
            >
                {triggerNode}
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -6 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -6 }}
                        transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
                        style={{
                            transformOrigin: align === 'right' ? 'top right' : 'top left',
                        }}
                        className={`absolute top-full ${
                            align === 'right' ? 'right-0' : 'left-0'
                        } mt-2 z-50 min-w-[140px] bg-background border border-foreground/10 rounded-xl shadow-lg p-1.5 flex flex-col gap-0.5 text-sm text-foreground before:absolute before:-top-3 before:left-0 before:right-0 before:h-3 before:content-[''] ${contentClassName}`}
                    >
                        {menuContent ? (
                            menuContent
                        ) : (
                            <ul role="menu" className={'flex flex-col gap-1 w-full'}>
                                {items?.map((item, index) => {
                                    const content = (
                                        <>
                                            {hasAnyIcon ? (
                                                item.icon ? (
                                                    <span className={'w-4 h-4 flex items-center justify-center shrink-0'}>
                                                        {item.icon}
                                                    </span>
                                                ) : (
                                                    <span className={'w-4 h-4 shrink-0'} aria-hidden="true" />
                                                )
                                            ) : null}
                                            <span className={'truncate'}>{item.label}</span>
                                        </>
                                    );

                                    const itemClasses = `w-full text-left px-3 py-1.5 rounded-lg transition-colors duration-150 flex items-center gap-2 cursor-pointer font-medium text-sm ${
                                        item.active
                                            ? 'bg-foreground text-background font-semibold'
                                            : item.disabled
                                            ? 'opacity-40 cursor-not-allowed'
                                            : 'hover:bg-foreground/10 active:bg-foreground/15 text-foreground'
                                    }`;

                                    return (
                                        <li key={index} role="menuitem">
                                            {item.href ? (
                                                <Link
                                                    href={item.href}
                                                    onClick={(e) => handleItemClick(item, e)}
                                                    className={itemClasses}
                                                    target={item.href.startsWith("http") ? "_blank" : "_self"}
                                                >
                                                    {content}
                                                </Link>
                                            ) : (
                                                <button
                                                    type="button"
                                                    onClick={(e) => handleItemClick(item, e)}
                                                    disabled={item.disabled}
                                                    className={itemClasses}
                                                >
                                                    {content}
                                                </button>
                                            )}
                                        </li>
                                    );
                                })}
                            </ul>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
