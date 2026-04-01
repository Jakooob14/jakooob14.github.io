import ReactMarkdown, { Components } from 'react-markdown';
import Link from 'next/link';
import { Heading1, Heading2 } from '@/app/components/Headings';

interface TranslateProps {
    value: string;
    components?: Components;
}

const defaultComponents: Components = {
    a: ({ href, children }) => <Link href={href ?? '#'}>{children}</Link>,
    h1: ({ children }) => <Heading1 className={'text-5xl! mb-2'}>{children}</Heading1>,
    h2: ({ children }) => <Heading2 className={'text-3xl! mb-2'}>{children}</Heading2>,
    ul: ({ children }) => <ul className={'list-[square] marker:text-aero-400 list-inside mt-2 mb-4'}>{children}</ul>,
    li: ({ children }) => <li className={'ml-1'}>{children}</li>,
};

export default function Translate({ value, components }: TranslateProps) {
    return (
        <section className={'markdown'}>
            <ReactMarkdown components={{ ...defaultComponents, ...components }}>
                {value}
            </ReactMarkdown>
        </section>
    );
}