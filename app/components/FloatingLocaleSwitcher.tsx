'use client';

import { CZ, US } from 'country-flag-icons/react/3x2';
import { usePathname } from 'next/navigation';
import { handleChangeLocale } from '@/app/utilities/handleChangeLocale';

export default function FloatingLocaleSwitcher() {
    const pathname = usePathname();
    const match = pathname.match(/^\/([a-z]{2})(?=\/|$)/);

    return (
        <div className={ 'fixed top-0 right-0 m-4 z-50 bg-alt-gray-200 border-2 border-alt-gray-300 overflow-hidden' }>
            {
                match && match[1] === 'cs' ? (
                    <a className={ 'cursor-pointer block' } onClick={ () => handleChangeLocale(pathname, 'en') }>
                        <US className={ 'w-10' }/>
                    </a>
                ) : (
                    <a className={ 'cursor-pointer block' } onClick={ () => handleChangeLocale(pathname, 'cs') }>
                        <CZ className={ 'w-10' }/>
                    </a>
                )
            }
        </div>
    );
}
