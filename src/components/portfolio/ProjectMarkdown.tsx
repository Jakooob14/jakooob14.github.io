interface ProjectMarkdownProps {
    contentHtml: string;
    className?: string;
}

export default function ProjectMarkdown({
    contentHtml,
    className = "",
}: ProjectMarkdownProps) {
    if (!contentHtml) {
        return null;
    }

    return (
        <article
            className={`project-markdown max-w-4xl text-neutral-700 leading-relaxed ${className}`}
            dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
    );
}
