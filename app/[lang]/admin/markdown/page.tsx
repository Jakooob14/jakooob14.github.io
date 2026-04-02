'use client';

import { useEffect, useState } from 'react';
import Translate from '@/app/components/Translate';
import { Button } from '@/app/components/Buttons';

export default function MarkdownAdminPage() {
    const [value, setValue] = useState('');

    const localeMarkdown = (value: string) => {
        let newValue = value;
        newValue = newValue.replaceAll('\n', '\\n');

        return newValue;
    };

    useEffect(() => {
        const saved = window.localStorage.getItem('saved-markdown');
        if (saved) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setValue(saved);
        }
    }, []);

    useEffect(() => {
        window.localStorage.setItem('saved-markdown', value);
    }, [value]);

    return (
        <main className={'container mx-auto my-24'}>
            <h1 className={'text-4xl font-bold mb-6'}>Markdown Editor</h1>
            <textarea
                className={'border-2 w-full h-64 border-alt-gray-300 outline-none p-2'}
                placeholder={'Type markdown here...'}
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
            <div className={'flex gap-2'}>
                <span className={'border-2 border-alt-gray-300 p-2 line-clamp-1 text-nowrap w-full mb-2'}>
                    {localeMarkdown(value)}
                </span>
                <Button onClick={() => navigator.clipboard.writeText(value)}>Copy</Button>
            </div>
            <Translate value={value} />
        </main>
    );
}