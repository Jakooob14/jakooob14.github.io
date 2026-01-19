import type { Metadata } from 'next';
import '../globals.scss';
import Signature from '@/app/utilities/signature';
import CursorEffect from '@/app/components/CursorEffect';
import Footer from '@/app/components/Footer';
import { ReactNode } from 'react';
import { getDictionary } from '@/app/[lang]/getDictionary';
import DictionaryProvider from '@/app/[lang]/DictionaryProvider';
import FloatingLocaleSwitcher from '@/app/components/FloatingLocaleSwitcher';

export const metadata: Metadata = {
    title: 'Jakub Sokol'
};

export async function generateStaticParams() {
    return [{ lang: 'en' }, { lang: 'cs' }];
}

interface RootLayoutProps {
    children: ReactNode;
    params: Promise<{
        lang: string;
    }>;
}

export default async function LangLayout({ children, params }: Readonly<RootLayoutProps>) {
    const { lang } = await params;
    const dict = await getDictionary(lang);

    return (
        <html lang={lang}>
            <body className={'antialiased text-white'}>
                <DictionaryProvider dictionary={dict}>
                    {children}
                    <Footer/>
                    <Signature/>
                    <CursorEffect/>
                    <FloatingLocaleSwitcher/>
                </DictionaryProvider>
            </body>
        </html>
    );
}
