import {
    ElementType,
    forwardRef,
    HTMLAttributes,
    ReactNode,
} from "react";

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
export type HeadingWeight = "black" | "bold" | "extralight" | "light" | "normal";
export type HeadingVariant =
    | "default"
    | "heading"
    | "foreground"
    | "accent"
    | "muted"
    | "white"
    | "primary"
    | "inherit";

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
    /**
     * Semantic HTML heading level (h1 through h6).
     * @default 1
     */
    level?: HeadingLevel | number;

    /**
     * Visual hierarchy level for styling (1 through 6).
     * Allows decoupling semantic level from visual appearance.
     * Defaults to the semantic `level`.
     */
    visualLevel?: HeadingLevel | number;

    /**
     * Optional polymorphic HTML element or custom component override.
     * Defaults to `h${level}`.
     */
    as?: ElementType;

    /**
     * Font weight variant.
     * @default "black"
     */
    weight?: HeadingWeight;

    /**
     * Color theme variant for the heading.
     * @default "default" (uses --color-heading)
     */
    variant?: HeadingVariant;

    /**
     * Heading content.
     */
    children?: ReactNode;
}

export interface SubHeadingProps extends Omit<HeadingProps, "level"> {
    /**
     * Optional level override for sub-heading components.
     */
    level?: HeadingLevel | number;
}

const visualStyles: Record<HeadingLevel, string> = {
    1: "text-6xl sm:text-7xl md:text-8xl",
    2: "text-5xl sm:text-6xl md:text-7xl",
    3: "text-4xl sm:text-5xl md:text-6xl",
    4: "text-3xl sm:text-4xl md:text-4xl",
    5: "text-2xl sm:text-3xl md:text-3xl",
    6: "text-xl sm:text-2xl md:text-2xl",
};

const weightClasses: Record<HeadingWeight, string> = {
    black: "font-black",
    bold: "font-black",
    extralight: "font-extralight",
    light: "font-extralight",
    normal: "font-normal",
};

const variantClasses: Record<HeadingVariant, string> = {
    default: "text-heading",
    heading: "text-heading",
    foreground: "text-foreground",
    accent: "text-accent",
    muted: "text-foreground/70",
    white: "text-white",
    primary: "text-primary-500",
    inherit: "",
};

function clampLevel(val: number | undefined, fallback: HeadingLevel = 1): HeadingLevel {
    if (typeof val === "number" && Number.isFinite(val)) {
        const rounded = Math.round(val);
        if (rounded < 1) return 1;
        if (rounded > 6) return 6;
        return rounded as HeadingLevel;
    }
    return fallback;
}

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(function Heading(
    {
        children,
        className = "",
        level = 1,
        visualLevel,
        as,
        weight = "black",
        variant = "default",
        ...props
    },
    ref
) {
    const clampedLevel = clampLevel(level, 1);
    const effectiveVisualLevel = clampLevel(visualLevel ?? clampedLevel, clampedLevel);
    const Component = as || (`h${clampedLevel}` as ElementType);

    const isSemanticHeading = !as || (typeof as === "string" && /^h[1-6]$/i.test(as));
    const a11yProps = !isSemanticHeading
        ? {
              role: props.role ?? "heading",
              "aria-level": props["aria-level"] ?? clampedLevel,
          }
        : {};

    const computedClassName = [
        "font-heading tracking-tight leading-tight",
        weightClasses[weight] || "font-black",
        variantClasses[variant] ?? "text-heading",
        visualStyles[effectiveVisualLevel],
        className,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <Component
            ref={ref}
            className={computedClassName}
            {...a11yProps}
            {...props}
        >
            {children}
        </Component>
    );
});

Heading.displayName = "Heading";

function createSubHeading(level: HeadingLevel, displayName: string) {
    const Component = forwardRef<HTMLHeadingElement, SubHeadingProps>(
        function SubHeading(props, ref) {
            return <Heading ref={ref} level={level} {...props} />;
        }
    );
    Component.displayName = displayName;
    return Component;
}

export const Heading1 = createSubHeading(1, "Heading1");
export const Heading2 = createSubHeading(2, "Heading2");
export const Heading3 = createSubHeading(3, "Heading3");
export const Heading4 = createSubHeading(4, "Heading4");
export const Heading5 = createSubHeading(5, "Heading5");
export const Heading6 = createSubHeading(6, "Heading6");

export default Heading;
