'use client';
import {useEffect} from 'react';
import {motion, useMotionValue, useSpring} from 'framer-motion';

export default function CursorEffect() {
    const defaultCursorSize = 256;
    let cursorSize = defaultCursorSize;

    const hoveredOptions = {
        padding: {
            x: 0
        }
    }


    const mouse = {
        x: useMotionValue(-300),
        y: useMotionValue(-300),
    }

    const size = {
        width: useMotionValue(cursorSize),
        height: useMotionValue(cursorSize),
        borderRadius: useMotionValue(cursorSize / 2),
    }

    const smoothOptions = {
        damping: 30,
        stiffness: 350,
        mass: .5
    }

    const smoothMouse = {
        x: useSpring(mouse.x, smoothOptions),
        y: useSpring(mouse.y, smoothOptions)
    }

    const smoothSize = {
        width: useSpring(size.width, smoothOptions),
        height: useSpring(size.height, smoothOptions),
        borderRadius: useSpring(size.borderRadius, smoothOptions)
    }
    const checkIfCursorHide = (element: HTMLElement | null): boolean => {
        while (element) {
            const hide = element.getAttribute('data-cursor-hide') === 'true';
            if (hide) {
                return true; // Found a parent with the attribute
            }
            element = element.parentElement; // Move to the parent element
        }
        return false; // Reached the root without finding it
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleMouseMove = (event: MouseEvent) => {
        const { clientX, clientY } = event;

        mouse.x.set(clientX - cursorSize / 2);
        mouse.y.set(clientY - cursorSize / 2);

        if (!event.target) return;

        const element = event.target as HTMLElement;
        const dataCursorPaddingX = element.getAttribute('data-cursor-padding-x');
        const cursorPaddingX = dataCursorPaddingX ? parseFloat(dataCursorPaddingX) : hoveredOptions.padding.x;

        let rect: DOMRect | null = null;

        if (element.nodeName === 'A') rect = element.getBoundingClientRect();

        if (element.parentNode && element.parentElement && element.parentNode.nodeName === 'A') rect = element.parentElement.getBoundingClientRect();


        if (checkIfCursorHide(element)) cursorSize = 0; else cursorSize = defaultCursorSize;

        if (!rect) {
            size.width.set(cursorSize);
            size.height.set(cursorSize);
            size.borderRadius.set(cursorSize / 2);

            // Make mouse smaller
            // mouse.x.set(clientX - cursorSize / 2);
            // mouse.y.set(clientY - cursorSize / 2);
            return;
        }

        // Make mouse size fit the anchor
        size.width.set(rect.width + cursorPaddingX);
        size.height.set(rect.height);
        size.borderRadius.set(Math.max(0, parseFloat(getComputedStyle(element).borderRadius)));
        mouse.x.set(rect.left - hoveredOptions.padding.x / 2);
        mouse.x.set(rect.left - cursorPaddingX / 2);
        mouse.y.set(rect.top);

        // Make mouse smaller
        // const multiplier = 2;
        // size.width.set(cursorSize / multiplier);
        // size.height.set(cursorSize / multiplier);
        // mouse.x.set(clientX - cursorSize / multiplier / 2);
        // mouse.y.set(clientY - cursorSize / multiplier / 2);

    }

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
        }
    }, [handleMouseMove])

    return (
        <motion.div
            style={{
                left: smoothMouse.x,
                top: smoothMouse.y,
                width: smoothSize.width,
                height: smoothSize.height,
                borderRadius: smoothSize.borderRadius,
            }}
            className={'fixed z-[1000] /border-[3px] border-alt-gray-900 pointer-events-none backdrop-invert shadow-2xl'}>
        </motion.div>
    )
}