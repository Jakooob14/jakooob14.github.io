import Link from 'next/link';
import { FC, HTMLAttributes } from 'react';

type LinksGroupComponent = FC<HTMLAttributes<HTMLDivElement>> & {
    LinkButton: FC<LinksGroupButtonProps>;
    AnchorButton: FC<LinksGroupButtonProps>;
};

const LinksGroup: LinksGroupComponent = ({ children, className }) => {
    return <div className={'font-semibold backdrop-blur-[10px] border-4 border-alt-gray-250 ' + className}>
        <ul className={'flex justify-around h-12 md:h-24 text-[3.3vw] md:text-2xl leading-12 md:leading-24'}>
            {children}
        </ul>
    </div>;
};

interface LinksGroupButtonProps extends Omit<HTMLAttributes<HTMLAnchorElement>, 'href'> {
    label: string;
    href: string;
    active?: boolean;
}

const linkClassNames = 'block h-full w-full text-white transition-colors';

const LinkButton: FC<LinksGroupButtonProps> = ({ label, className, href, active = false }) => {
    return <li className={'w-full text-center'}>
        <Link
            className={`${linkClassNames} ${active && 'bg-alt-gray-250'} ${className}`}
            href={href}>{label}</Link>
    </li>;
};

const AnchorButton: FC<LinksGroupButtonProps> = ({ label, className, href, active = false }) => {
    return <li className={'w-full text-center'}>
        <a
            className={`${linkClassNames} ${active && 'bg-alt-gray-250'} ${className}`}
            href={href}>{label}</a>
    </li>;
};

LinksGroup.LinkButton = LinkButton;
LinksGroup.AnchorButton = AnchorButton;

export default LinksGroup;