'use client';

const pageCountCache = new Map<string, number>();

export async function getPdfPageCount(src: string): Promise<number> {
    if (pageCountCache.has(src)) {
        return pageCountCache.get(src)!;
    }

    try {
        const pdfjs = await import('pdfjs-dist');
        if (typeof window !== "undefined" && !pdfjs.GlobalWorkerOptions.workerSrc) {
            pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
        }

        const loadingTask = pdfjs.getDocument({ url: src });
        const doc = await loadingTask.promise;
        const pages = doc.numPages;
        pageCountCache.set(src, pages);
        return pages;
    } catch (err) {
        console.error("Failed to read PDF pages for:", src, err);
        return 1;
    }
}
