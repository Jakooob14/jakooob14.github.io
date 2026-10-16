import {HTMLAttributes, ReactNode} from "react";

interface IconContainerProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}

export default function IconContainer({ children, className = '', ...props }: IconContainerProps) {
    return (
        <div
            className={`bg-background grid place-content-center rounded-full w-12 h-12 text-xl relative transition-colors duration-150 hover:bg-foreground hover:text-background ${className}`}
            {...props}
        >
            {children}
        </div>
    );
}
