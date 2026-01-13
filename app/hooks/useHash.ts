'use client';

import { useEffect, useState } from 'react';

export default function useHash() {
    const [hash, setHash] = useState<string | null>(null);

    useEffect(() => {
        const updateHash = () => {
            setHash(window.location.hash.replace('#', ''));
        };

        updateHash();
        window.addEventListener('hashchange', updateHash);

        return () => window.removeEventListener('hashchange', updateHash);
    }, []);

    return hash;
}
