"use client";

import { CSSProperties, HTMLAttributes, useId, useLayoutEffect, useRef, useState } from "react";

interface SpinningCircleTextProps extends HTMLAttributes<HTMLDivElement> {
    text: string;
    textClassName?: string;
    textStyle?: CSSProperties;
}

const RADIUS = 75;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const DEFAULT_FONT_SIZE = 15;
const MIN_FONT_SIZE = 2;
const MIN_TRACKING_RATIO = 0.04;

function countGraphemes(value: string): number {
    if (typeof Intl !== "undefined" && "Segmenter" in Intl) {
        const segmenter = new Intl.Segmenter(undefined, { granularity: "grapheme" });
        let count = 0;
        for (const segment of segmenter.segment(value)) {
            if (segment.segment) count++;
        }
        return count;
    }
    return Array.from(value).length;
}

function resolveMaxFontSize(textStyle?: CSSProperties): number {
    const raw = textStyle?.fontSize;
    if (typeof raw === "number" && Number.isFinite(raw) && raw > 0) {
        return raw;
    }
    if (typeof raw === "string") {
        const parsed = Number.parseFloat(raw);
        if (Number.isFinite(parsed) && parsed > 0 && raw.trim().endsWith("px")) {
            return parsed;
        }
    }
    return DEFAULT_FONT_SIZE;
}

function estimateLayout(cleanText: string, maxFontSize: number) {
    const charCount = countGraphemes(cleanText);
    if (charCount === 0) {
        return { fontSize: maxFontSize, letterSpacing: 0 };
    }

    const slotCount = charCount + 1;
    const approxNaturalWidth = charCount * maxFontSize * 0.56 + maxFontSize * 0.25;
    const minTotal = approxNaturalWidth + slotCount * (maxFontSize * MIN_TRACKING_RATIO);

    const fontSize =
        minTotal <= CIRCUMFERENCE
            ? maxFontSize
            : Math.max(MIN_FONT_SIZE, maxFontSize * (CIRCUMFERENCE / minTotal));

    const scaledApproxWidth = charCount * fontSize * 0.56 + fontSize * 0.25;
    const letterSpacing = Math.max(0, (CIRCUMFERENCE - scaledApproxWidth) / slotCount);

    return { fontSize, letterSpacing };
}

export default function SpinningCircleText({
    text,
    className,
    textClassName,
    textStyle,
    ...props
}: SpinningCircleTextProps) {
    const cleanText = text.trim().replace(/\s+/g, " ");
    const maxFontSize = resolveMaxFontSize(textStyle);

    const pathId = useId();
    const topMaskId = useId();
    const bottomMaskId = useId();
    const measureRef = useRef<SVGTextElement>(null);

    const [measured, setMeasured] = useState<{
        key: string;
        fontSize: number;
        letterSpacing: number;
    } | null>(null);

    const layoutKey = `${cleanText}::${maxFontSize}::${textClassName ?? ""}::${String(textStyle?.fontFamily ?? "")}::${String(textStyle?.fontWeight ?? "")}`;

    useLayoutEffect(() => {
        const measure = () => {
            const el = measureRef.current;
            if (!el || !cleanText) return;

            const charCount = countGraphemes(cleanText);
            if (charCount === 0) return;

            const slotCount = charCount + 1;

            el.style.setProperty("font-size", `${maxFontSize}px`);
            el.style.setProperty("letter-spacing", "0px", "important");

            el.textContent = cleanText;
            const baseTextWidth = el.getComputedTextLength();

            el.textContent = "H H";
            const withSpace = el.getComputedTextLength();
            el.textContent = "HH";
            const withoutSpace = el.getComputedTextLength();
            const baseSpaceWidth = Math.max(0, withSpace - withoutSpace);

            if (!Number.isFinite(baseTextWidth) || baseTextWidth <= 0) {
                return;
            }

            const totalBase = baseTextWidth + baseSpaceWidth;
            const minTotalAtMax = totalBase + slotCount * (maxFontSize * MIN_TRACKING_RATIO);

            let fontSize = maxFontSize;
            let totalNatural = totalBase;

            if (minTotalAtMax > CIRCUMFERENCE) {
                const scale = CIRCUMFERENCE / minTotalAtMax;
                fontSize = Math.max(MIN_FONT_SIZE, maxFontSize * scale);

                el.style.setProperty("font-size", `${fontSize}px`);
                el.textContent = cleanText;
                const scaledTextWidth = el.getComputedTextLength();

                el.textContent = "H H";
                const scaledWithSpace = el.getComputedTextLength();
                el.textContent = "HH";
                const scaledWithoutSpace = el.getComputedTextLength();
                const scaledSpaceWidth = Math.max(0, scaledWithSpace - scaledWithoutSpace);

                if (Number.isFinite(scaledTextWidth) && scaledTextWidth > 0) {
                    totalNatural = scaledTextWidth + scaledSpaceWidth;
                } else {
                    totalNatural = totalBase * (fontSize / maxFontSize);
                }
            }

            el.textContent = cleanText;

            const letterSpacing = Math.max(0, (CIRCUMFERENCE - totalNatural) / slotCount);
            setMeasured((prev) =>
                prev &&
                prev.key === layoutKey &&
                Math.abs(prev.fontSize - fontSize) < 0.01 &&
                Math.abs(prev.letterSpacing - letterSpacing) < 0.01
                    ? prev
                    : { key: layoutKey, fontSize, letterSpacing }
            );
        };

        measure();

        let cancelled = false;
        if (typeof document !== "undefined" && "fonts" in document) {
            document.fonts.ready.then(() => {
                if (!cancelled) {
                    measure();
                }
            });
        }

        return () => {
            cancelled = true;
        };
    }, [cleanText, layoutKey, maxFontSize]);

    const activeLayout =
        measured && measured.key === layoutKey
            ? measured
            : estimateLayout(cleanText, maxFontSize);

    const computedTextStyle: CSSProperties = {
        ...textStyle,
        fontSize: `${activeLayout.fontSize}px`,
        letterSpacing: `${activeLayout.letterSpacing}px`,
    };

    return (
        <div className={className || "relative"} {...props}>
            <div className="w-[250px] h-[250px]" />
            <div className="absolute inset-0 select-none">
                <svg
                    viewBox="0 0 200 200"
                    width="250"
                    height="250"
                    className="font-black"
                    role="img"
                    aria-label={cleanText}
                >
                    <defs>
                        <mask id={topMaskId} maskUnits="userSpaceOnUse">
                            <rect x="0" y="0" width="200" height="120" fill="white" />
                        </mask>
                        <mask id={bottomMaskId} maskUnits="userSpaceOnUse">
                            <rect x="0" y="120" width="200" height="80" fill="white" />
                        </mask>
                        <path
                            id={pathId}
                            d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
                            fill="none"
                        />
                    </defs>

                    <text
                        ref={measureRef}
                        x="0"
                        y="-9999"
                        aria-hidden="true"
                        visibility="hidden"
                        className={textClassName}
                        style={{
                            ...textStyle,
                            fontSize: `${maxFontSize}px`,
                            letterSpacing: "0px",
                        }}
                    >
                        {cleanText}
                    </text>

                    <MaskedLayer
                        maskId={topMaskId}
                        pathId={pathId}
                        text={cleanText}
                        color="white"
                        textClassName={textClassName}
                        textStyle={computedTextStyle}
                    />
                    <MaskedLayer
                        maskId={bottomMaskId}
                        pathId={pathId}
                        text={cleanText}
                        color="black"
                        textClassName={textClassName}
                        textStyle={computedTextStyle}
                    />
                </svg>
            </div>
        </div>
    );
}

interface MaskedLayerProps {
    maskId: string;
    pathId: string;
    text: string;
    color: string;
    textClassName?: string;
    textStyle?: CSSProperties;
}

function MaskedLayer({
    maskId,
    pathId,
    text,
    color,
    textClassName,
    textStyle,
}: MaskedLayerProps) {
    const textClasses = [
        "animate-spin [animation-duration:25s] [animation-direction:reverse] origin-[100px_100px]",
        textClassName,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <g mask={`url(#${maskId})`} aria-hidden="true">
            {text ? (
                <text className={textClasses} style={textStyle} fill={color}>
                    <textPath href={`#${pathId}`} startOffset="0%">
                        {text}
                    </textPath>
                </text>
            ) : null}

            <g transform="translate(100, 100) scale(0.7) translate(-27, -51)">
                <path
                    d="M27 2V100M52 75L27 100L2 75"
                    stroke={color}
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                />
            </g>
        </g>
    );
}