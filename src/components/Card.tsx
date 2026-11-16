import { KeyboardEvent, ReactNode } from "react";
import { Link } from "@/i18n/routing";
import { Heading3 } from "@/components/Heading";
import { LuArrowRight } from "react-icons/lu";

export interface CardLink {
    href: string;
    label: string;
    external?: boolean;
}

export type CardLayout = "auto" | "vertical" | "horizontal";
export type CardHoverVariant = "none" | "subtle" | "accent";

export interface CardProps {
    icon?: ReactNode;
    title: ReactNode;
    titleAttr?: string;
    subtitle?: ReactNode;
    year?: ReactNode;
    badge?: ReactNode;
    description?: ReactNode;
    descriptionAttr?: string;
    link?: CardLink;
    media?: ReactNode;
    href?: string;
    onClick?: () => void;
    ariaLabel?: string;
    layout?: CardLayout;
    hoverVariant?: CardHoverVariant;
    titleClassName?: string;
    descriptionClassName?: string;
    className?: string;
    id?: string;
}

const hoverClasses: Record<CardHoverVariant, string> = {
    none: "",
    subtle: "hover:bg-neutral-200",
    accent: "hover:bg-heading hover:text-text-secondary",
};

export default function Card({
    icon,
    title,
    titleAttr,
    subtitle,
    year,
    badge,
    description,
    descriptionAttr,
    link,
    media,
    href,
    onClick,
    ariaLabel,
    layout = "auto",
    hoverVariant = "none",
    titleClassName = "text-xl lg:text-2xl leading-[1.15]!",
    descriptionClassName = "",
    className = "",
    id,
}: CardProps) {
    const hasYear = year !== undefined && year !== null && year !== "";

    const resolvedLayout: Exclude<CardLayout, "auto"> =
        layout !== "auto"
            ? layout
            : !icon && !media && !badge && !link && hasYear
            ? "horizontal"
            : "vertical";

    const isAccentHover = hoverVariant === "accent";
    const isInteractiveButton = !href && Boolean(onClick);

    const baseCardClasses = [
        "group bg-neutral-100 p-8 rounded-3xl transition-all duration-300",
        resolvedLayout === "horizontal"
            ? "flex flex-col md:flex-row md:items-center justify-between"
            : "flex flex-col justify-between",
        hoverClasses[hoverVariant],
        href || onClick ? "cursor-pointer" : "",
        className,
    ]
        .filter(Boolean)
        .join(" ");

    const handleKeyDown = isInteractiveButton
        ? (e: KeyboardEvent<HTMLDivElement>) => {
              if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onClick?.();
              }
          }
        : undefined;

    const content =
        resolvedLayout === "horizontal" ? (
            <>
                <div className="w-full md:w-56 flex flex-col mb-4 md:mb-0 shrink-0">
                    <span className="font-semibold text-lg" title={titleAttr}>
                        {title}
                    </span>
                    {subtitle && (
                        <span className={isAccentHover ? "opacity-80" : "text-neutral-600"}>
                            {subtitle}
                        </span>
                    )}
                </div>

                {description && (
                    <div className="flex-1 md:px-6 min-w-0">
                        <p
                            className={`leading-relaxed ${
                                isAccentHover ? "opacity-90" : "text-neutral-600"
                            } ${descriptionClassName}`}
                            title={descriptionAttr}
                        >
                            {description}
                        </p>
                    </div>
                )}

                {hasYear && (
                    <div className="w-full md:w-28 text-2xl flex items-center justify-between md:justify-end mt-4 md:mt-0 gap-3 shrink-0">
                        <span>{year}</span>
                    </div>
                )}
            </>
        ) : (
            <>
                <div className="flex flex-col flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                        <div className="flex items-center gap-4 min-w-0 flex-1">
                            {icon && (
                                <div className="w-14 h-14 bg-heading grid place-content-center rounded-2xl shrink-0 text-white text-2xl transition-transform duration-300">
                                    {icon}
                                </div>
                            )}
                            <div className="min-w-0 flex-1">
                                <Heading3
                                    visualLevel={5}
                                    variant={isAccentHover ? "inherit" : "default"}
                                    className={`mb-0! ${titleClassName}`}
                                    title={titleAttr}
                                >
                                    {title}
                                </Heading3>
                                {subtitle && (
                                    <p
                                        className={`text-sm font-medium mt-1 ${
                                            isAccentHover ? "opacity-80" : "text-neutral-600"
                                        }`}
                                    >
                                        {subtitle}
                                    </p>
                                )}
                            </div>
                        </div>

                        {hasYear && (
                            <span
                                className={`shrink-0 text-sm sm:text-base font-medium whitespace-nowrap ${
                                    isAccentHover ? "" : "text-foreground"
                                }`}
                            >
                                {year}
                            </span>
                        )}
                    </div>

                    {badge && (
                        <div className="mt-4">
                            <span className="inline-block text-xs font-semibold uppercase tracking-wider text-neutral-500 bg-neutral-200/60 px-2.5 py-0.5 rounded-full">
                                {badge}
                            </span>
                        </div>
                    )}

                    {description && (
                        <p
                            className={`${badge ? "mt-2" : "mt-4"} leading-relaxed ${
                                isAccentHover ? "opacity-90" : "text-neutral-600"
                            } ${descriptionClassName}`}
                            title={descriptionAttr}
                        >
                            {description}
                        </p>
                    )}
                </div>

                {link && (
                    href ? (
                        <span
                            className={`mt-6 inline-flex items-center gap-2 font-medium w-fit ${
                                isAccentHover ? "" : "text-heading"
                            }`}
                        >
                            <span>{link.label}</span>
                            <LuArrowRight />
                        </span>
                    ) : link.external ? (
                        <a
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`mt-6 inline-flex items-center gap-2 font-medium w-fit ${
                                isAccentHover ? "" : "text-heading"
                            }`}
                        >
                            <span>{link.label}</span>
                            <LuArrowRight />
                        </a>
                    ) : (
                        <Link
                            href={link.href}
                            className={`mt-6 inline-flex items-center gap-2 font-medium w-fit ${
                                isAccentHover ? "" : "text-heading"
                            }`}
                        >
                            <span>{link.label}</span>
                            <LuArrowRight />
                        </Link>
                    )
                )}

                {media && <div className="mt-8 shrink-0">{media}</div>}
            </>
        );

    if (href) {
        return (
            <Link
                id={id}
                href={href}
                aria-label={ariaLabel}
                className={baseCardClasses}
            >
                {content}
            </Link>
        );
    }

    return (
        <div
            id={id}
            role={isInteractiveButton ? "button" : undefined}
            tabIndex={isInteractiveButton ? 0 : undefined}
            aria-label={ariaLabel}
            onClick={onClick}
            onKeyDown={handleKeyDown}
            className={baseCardClasses}
        >
            {content}
        </div>
    );
}
