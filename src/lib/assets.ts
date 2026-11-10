import fs from "node:fs";
import path from "node:path";

export type SingleAssetType = "icon" | "cover";
export type AssetType = SingleAssetType | "gallery";

export const IMAGE_EXTENSIONS = ["svg", "webp", "png", "jpg", "jpeg", "avif", "ico"] as const;
export const VIDEO_EXTENSIONS = ["mp4", "webm", "ogg", "mov"] as const;
export const PDF_EXTENSIONS = ["pdf"] as const;
export const MEDIA_EXTENSIONS = [...IMAGE_EXTENSIONS, ...VIDEO_EXTENSIONS] as const;

export type ImageExtension = (typeof IMAGE_EXTENSIONS)[number];
export type VideoExtension = (typeof VIDEO_EXTENSIONS)[number];
export type PdfExtension = (typeof PDF_EXTENSIONS)[number];
export type MediaExtension = (typeof MEDIA_EXTENSIONS)[number];

const ICON_EXTENSION_PRIORITY: ImageExtension[] = ["svg", "webp", "png", "ico", "jpg", "jpeg", "avif"];
const COVER_EXTENSION_PRIORITY: MediaExtension[] = ["webp", "avif", "png", "jpg", "jpeg", "mp4", "webm", "mov", "svg",
];

export function isVideoAsset(assetPath: string | null | undefined): boolean {
    if (!assetPath) return false;
    const ext = assetPath.split(".").pop()?.toLowerCase();
    return VIDEO_EXTENSIONS.includes(ext as VideoExtension);
}

export function isImageAsset(assetPath: string | null | undefined): boolean {
    if (!assetPath) return false;
    const ext = assetPath.split(".").pop()?.toLowerCase();
    return IMAGE_EXTENSIONS.includes(ext as ImageExtension);
}

export function resolveAsset(projectOrId: string | { id: string }, type: "gallery"): string[];
export function resolveAsset(projectOrId: string | { id: string }, type: SingleAssetType): string | null;
export function resolveAsset(projectOrId: string | { id: string }, type: AssetType): string | string[] | null {
    const projectId = typeof projectOrId === "string" ? projectOrId : projectOrId.id;
    const projectDir = path.join(process.cwd(), "public", "portfolio", projectId);

    if (!fs.existsSync(projectDir)) {
        return type === "gallery" ? [] : null;
    }

    if (type === "gallery") {
        const galleryDir = path.join(projectDir, "gallery");
        if (!fs.existsSync(galleryDir)) {
            return [];
        }

        return fs
            .readdirSync(galleryDir)
            .filter((file) => {
                const ext = file.split(".").pop()?.toLowerCase();
                return MEDIA_EXTENSIONS.includes(ext as MediaExtension);
            })
            .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }))
            .map((file) => `/portfolio/${projectId}/gallery/${file}`);
    }

    const files = fs.readdirSync(projectDir);
    const priorityList: MediaExtension[] =
        type === "icon" ? ICON_EXTENSION_PRIORITY : COVER_EXTENSION_PRIORITY;

    let bestMatch: string | null = null;
    let bestPriority = Infinity;

    for (const file of files) {
        const dotIndex = file.lastIndexOf(".");
        if (dotIndex === -1) continue;
        const name = file.slice(0, dotIndex);
        const ext = file.slice(dotIndex + 1).toLowerCase() as MediaExtension;

        if (name === type) {
            const priorityIndex = priorityList.indexOf(ext);
            if (priorityIndex !== -1 && priorityIndex < bestPriority) {
                bestMatch = file;
                bestPriority = priorityIndex;
            }
        }
    }

    if (bestMatch) {
        return `/portfolio/${projectId}/${bestMatch}`;
    }

    return null;
}

export interface CertificateAsset {
    url: string;
    type: "image" | "pdf";
    filename: string;
}

export function resolveCertificateAssets(certificateId: string): CertificateAsset[] {
    const certDir = path.join(process.cwd(), "public", "certificates", certificateId);

    if (!fs.existsSync(certDir)) {
        return [];
    }

    const files = fs.readdirSync(certDir);
    const validAssets: CertificateAsset[] = [];

    for (const file of files) {
        if (file.startsWith(".")) continue;
        const ext = file.split(".").pop()?.toLowerCase();
        if (!ext) continue;

        if (IMAGE_EXTENSIONS.includes(ext as ImageExtension)) {
            validAssets.push({
                url: `/certificates/${certificateId}/${file}`,
                type: "image",
                filename: file,
            });
        } else if (ext === "pdf") {
            validAssets.push({
                url: `/certificates/${certificateId}/${file}`,
                type: "pdf",
                filename: file,
            });
        }
    }

    return validAssets.sort((a, b) =>
        a.filename.localeCompare(b.filename, undefined, { numeric: true, sensitivity: "base" })
    );
}

export default resolveAsset;
