import Link from 'next/link';
import { FC, HTMLAttributes } from 'react';

interface LinksGroupComponent extends FC<HTMLAttributes<HTMLDivElement>> {
    LinkButton: FC<LinksGroupButtonProps>;
    AnchorButton: FC<LinksGroupButtonProps>;
    
    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
};

const LinksGroup: LinksGroupComponent = ({ children, className, onClick, ...props }) => {
    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const target = e.target as HTMLElement;
        const button = target.closest('[data-link-group-item]') as HTMLElement;
        if (button) {
            if (onClick) onClick(e);
        }
    };
    
    return <div 
        className={'font-semibold bg-alt-gray-primary border-4 border-alt-gray-250 ' + className}
        onClick={handleClick}
        {...props}
    >
        <ul className={'flex justify-around h-[calc(clamp(16px,4vw,20px)*3)] md:h-24'}>
            {children}
        </ul>
    </div>;
};

interface LinksGroupButtonProps extends Omit<HTMLAttributes<HTMLAnchorElement>, 'href'> {
    label: string;
    href: string;
    active?: boolean;
}

const linkClassNames = 'block h-full w-full text-white transition-colors text-[clamp(16px,4vw,20px)] sm:text-[3.3vw]# md:text-2xl leading-[calc(clamp(16px,4vw,20px)*3)] md:leading-24';

const LinkButton: FC<LinksGroupButtonProps> = ({ label, className, href, active = false, ...props }) => {
    return <li className={'w-full text-center'}>
        <Link
            className={`${linkClassNames} ${active && 'bg-alt-gray-250'} ${className}`}
            href={href}
            data-link-group-item
            {...props}
        >{label}</Link>
    </li>;
};

const AnchorButton: FC<LinksGroupButtonProps> = ({ label, className, href, active = false, ...props }) => {
    return <li className={'w-full text-center'}>
        <a
            className={`${linkClassNames} ${active && 'bg-alt-gray-250'} ${className}`}
            href={href}
            data-link-group-item
            {...props}
        >{label}</a>
    </li>;
};

LinksGroup.LinkButton = LinkButton;
LinksGroup.AnchorButton = AnchorButton;

export default LinksGroup;