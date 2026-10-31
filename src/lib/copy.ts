export async function copy(content: string): Promise<boolean> {
    if (typeof navigator === "undefined") {
        return false;
    }

    try {
        if (navigator.clipboard?.writeText) {
            await navigator.clipboard.writeText(content);
            return true;
        }
    } catch {
        // Fall through to legacy fallback when Clipboard API is unavailable or denied
    }

    if (typeof document === "undefined") {
        return false;
    }

    const textarea = document.createElement("textarea");
    textarea.value = content;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    textarea.style.pointerEvents = "none";
    document.body.appendChild(textarea);

    try {
        textarea.select();
        return document.execCommand("copy");
    } catch {
        return false;
    } finally {
        document.body.removeChild(textarea);
    }
}

export default copy;
