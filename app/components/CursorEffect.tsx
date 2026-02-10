'use client';
import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function CursorEffect() {
    const [cursorEnabled, setCursorEnabled] = useState(true);
    const pathname = usePathname();

    const defaultCursorSize = 256;
    let cursorSize = defaultCursorSize;

    const hoveredOptions = {
        padding: {
            x: 0
        }
    };


    const mouse = {
        x: useMotionValue(-300),
        y: useMotionValue(-300),
    };

    const size = {
        width: useMotionValue(cursorSize),
        height: useMotionValue(cursorSize),
        borderRadius: useMotionValue(cursorSize / 2),
    };

    const smoothOptions = {
        damping: 30,
        stiffness: 350,
        mass: .5
    };

    const smoothMouse = {
        x: useSpring(mouse.x, smoothOptions),
        y: useSpring(mouse.y, smoothOptions)
    };

    const smoothSize = {
        width: useSpring(size.width, smoothOptions),
        height: useSpring(size.height, smoothOptions),
        borderRadius: useSpring(size.borderRadius, smoothOptions)
    };

    const checkIfCursorHide = (element: HTMLElement | null): boolean => {
        while (element) {
            const hide = element.getAttribute('data-cursor-hide') === 'true';
            if (hide) {
                return true;
            }
            element = element.parentElement;
        }
        return false;
    };

     
    const handleMouseMove = (event: MouseEvent) => {
        if (!cursorEnabled) return;

        const { clientX, clientY } = event;

        mouse.x.set(clientX - cursorSize / 2);
        mouse.y.set(clientY - cursorSize / 2);

        if (!event.target) return;

        const element = event.target as HTMLElement;
        const dataCursorPaddingX = element.getAttribute('data-cursor-padding-x');
        const cursorPaddingX = dataCursorPaddingX ? parseFloat(dataCursorPaddingX) : hoveredOptions.padding.x;


        let hoveredElement: HTMLElement | null = element;

        while (hoveredElement) {
            if (
                hoveredElement.tagName?.toLowerCase() === 'a' ||
                hoveredElement.getAttribute('data-cursor-hover') === 'true'
            ) {
                break;
            }
            hoveredElement = hoveredElement.parentElement;
        }

        if (checkIfCursorHide(hoveredElement)) {
            cursorSize = 0;
        } else {
            cursorSize = defaultCursorSize;
        }

        const rect = hoveredElement
            ? hoveredElement.getBoundingClientRect()
            : null;

        if (!rect) {
            size.width.set(cursorSize);
            size.height.set(cursorSize);
            size.borderRadius.set(cursorSize / 2);
            return;
        }

        size.width.set(rect.width + cursorPaddingX);
        size.height.set(rect.height);
        size.borderRadius.set(Math.max(0, parseFloat(getComputedStyle(element).borderRadius)));
        mouse.x.set(rect.left - hoveredOptions.padding.x / 2);
        mouse.x.set(rect.left - cursorPaddingX / 2);
        mouse.y.set(rect.top);

    };

    const resetCursor = (event?: MouseEvent) => {
        cursorSize = defaultCursorSize;
        size.width.set(cursorSize);
        size.height.set(cursorSize);
        size.borderRadius.set(cursorSize / 2);
        if (event) {
            const { clientX, clientY } = event;
            mouse.x.set(clientX - cursorSize / 2);
            mouse.y.set(clientY - cursorSize / 2);
        }
    };

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [handleMouseMove, resetCursor]);
    
    const handleTouch = () => {
        setCursorEnabled(false);
    };
    
    const handleClick = (event: MouseEvent) => {
        const element = event.target as HTMLElement;
        console.log(element.getAttribute('data-cursor-reset-click'));
        if (element.getAttribute('data-cursor-reset-click') === 'true' || element.tagName?.toLowerCase() === 'a' || element.closest('a')) {
            if (element.getAttribute('data-cursor-reset-click') === 'false') return;
            resetCursor(event);
        }
    };

    useEffect(() => {
        window.addEventListener('touchstart', handleTouch);
        window.addEventListener('touchmove', handleTouch);
        window.addEventListener('touchend', handleTouch);
        window.addEventListener('click', handleClick);

        return () => {
            window.removeEventListener('touchstart', handleTouch);
            window.removeEventListener('touchmove', handleTouch);
            window.removeEventListener('touchend', handleTouch);
            window.removeEventListener('click', handleClick);
        };
    }, []);

    return (
        <motion.div
            style={{
                left: smoothMouse.x,
                top: smoothMouse.y,
                width: smoothSize.width,
                height: smoothSize.height,
                borderRadius: smoothSize.borderRadius,
                display: cursorEnabled ? 'block' : 'none',
            }}
            className={'fixed z-[1000] /border-[3px] border-alt-gray-900 pointer-events-none backdrop-invert shadow-2xl'}>
        </motion.div>
    );
}