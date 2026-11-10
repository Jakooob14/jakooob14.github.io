'use client';

import { useEffect, useRef, useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import type { RenderTask } from "pdfjs-dist";

// Initialize worker in browser
if (typeof window !== "undefined" && !pdfjsLib.GlobalWorkerOptions.workerSrc) {
    pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
}

export interface PdfCanvasViewerProps {
    src: string;
    pageNumber: number;
    onLoad?: () => void;
    onError?: (error: unknown) => void;
    className?: string;
}

export default function PdfCanvasViewer({
    src,
    pageNumber,
    onLoad,
    onError,
    className = "",
}: PdfCanvasViewerProps) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const renderTaskRef = useRef<RenderTask | null>(null);
    const [aspectRatio, setAspectRatio] = useState<string>("4 / 3");

    useEffect(() => {
        let isCancelled = false;

        async function renderPage() {
            try {
                if (renderTaskRef.current) {
                    try {
                        renderTaskRef.current.cancel();
                    } catch {
                        // ignore cancellation
                    }
                    renderTaskRef.current = null;
                }

                if (!pdfjsLib.GlobalWorkerOptions.workerSrc && typeof window !== "undefined") {
                    pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
                }

                const loadingTask = pdfjsLib.getDocument({ url: src });
                const pdf = await loadingTask.promise;
                if (isCancelled) return;

                const page = await pdf.getPage(pageNumber);
                if (isCancelled) return;

                const baseViewport = page.getViewport({ scale: 1 });
                setAspectRatio(`${baseViewport.width} / ${baseViewport.height}`);

                const canvas = canvasRef.current;
                if (!canvas) return;

                const context = canvas.getContext("2d");
                if (!context) return;

                const pixelRatio = window.devicePixelRatio || 1;
                // Render at high resolution for crisp text
                const targetScale = Math.max(1.5, Math.min(2.5, 2 * pixelRatio));
                const renderViewport = page.getViewport({ scale: targetScale });

                canvas.width = renderViewport.width;
                canvas.height = renderViewport.height;

                const renderContext = {
                    canvas,
                    canvasContext: context,
                    viewport: renderViewport,
                };

                const renderTask = page.render(renderContext);
                renderTaskRef.current = renderTask;

                await renderTask.promise;

                if (!isCancelled) {
                    onLoad?.();
                }
            } catch (error: unknown) {
                const err = error as { name?: string };
                if (err?.name === "RenderingCancelledException") {
                    return;
                }
                console.error("Failed to render PDF page:", error);
                onError?.(error);
            }
        }

        renderPage();

        return () => {
            isCancelled = true;
            if (renderTaskRef.current) {
                try {
                    renderTaskRef.current.cancel();
                } catch {
                    // ignore
                }
            }
        };
    }, [src, pageNumber, onLoad, onError]);

    return (
        <canvas
            ref={canvasRef}
            style={{ aspectRatio }}
            className={`max-w-full max-h-[80vh] w-auto h-auto object-contain rounded-xl select-none bg-white shadow-2xl transition-opacity duration-300 ${className}`}
        />
    );
}
