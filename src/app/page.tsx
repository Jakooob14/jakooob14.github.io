"use client";

import { useEffect, useRef } from "react";
import { animate } from "motion/react";

export default function Home() {
    const textGroupRef = useRef<SVGGElement>(null);
    const dashRef = useRef<SVGRectElement>(null);

    useEffect(() => {
        const ox = 880;
        const oy = 540;
        const startScale = 50;
        const startW = 100;
        const startH = 28;

        const controls = animate(startScale, 1, {
            duration: 1.6,
            delay: 0.15,
            ease: [0.16, 1, 0.3, 1],
            onUpdate: (latest) => {
                if (textGroupRef.current) {
                    textGroupRef.current.setAttribute(
                        "transform",
                        `translate(${ox}, ${oy}) scale(${latest}) translate(${-ox}, ${-oy})`
                    );
                }
                if (dashRef.current) {
                    const progress = Math.max(0, (latest - 1) / (startScale - 1));
                    const w = progress * startW;
                    const h = progress * startH;
                    const rx = Math.min(h / 2, 4);
                    dashRef.current.setAttribute("x", String(ox - w / 2));
                    dashRef.current.setAttribute("y", String(oy - h / 2));
                    dashRef.current.setAttribute("width", String(w));
                    dashRef.current.setAttribute("height", String(h));
                    dashRef.current.setAttribute("rx", String(rx));
                }
            },
        });

        return () => controls.stop();
    }, []);

    return (
        <main className="relative min-h-screen overflow-hidden">
            <section className="bottom-section background grid place-content-center absolute inset-0">
            </section>

            <section className="top-section">
                <svg
                    className="overlay fixed inset-0 w-full h-full z-10 pointer-events-none"
                    viewBox="0 0 1920 1080"
                    preserveAspectRatio="xMidYMid slice"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <defs>
                        <mask id="cutout-mask">
                            <rect width="100%" height="100%" fill="white" />

                            <g
                                ref={textGroupRef}
                                className="mask-text-group"
                                transform="translate(880, 540) scale(50) translate(-880, -540)"
                            >
                                <rect
                                    ref={dashRef}
                                    x={880 - 50}
                                    y={540 - 14}
                                    width="100"
                                    height="28"
                                    rx="4"
                                    fill="black"
                                />
                                <text
                                    x="960"
                                    y="540"
                                    textAnchor="middle"
                                    dominantBaseline="central"
                                    fill="black"
                                    style={{
                                        fontFamily: "var(--font-nexa), sans-serif",
                                        fontWeight: 900,
                                        fontSize: "164px",
                                    }}
                                    className="tracking-wider uppercase"
                                >
                                    Jakub Sokol
                                </text>
                            </g>
                        </mask>
                    </defs>

                    <rect width="100%" height="100%" fill="white" mask="url(#cutout-mask)" />
                </svg>
            </section>
        </main>
    );
}

