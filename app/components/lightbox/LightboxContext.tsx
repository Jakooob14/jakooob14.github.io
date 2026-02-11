import { createContext, useContext } from 'react';
import { LightboxItemData } from '@/app/components/lightbox/Lightbox';

type LightboxContextType = {
    register: (src: LightboxItemData) => void;
    openAt: (index: number) => void;
    openBySrc (src: string): void;
};

export const LightboxContext = createContext<LightboxContextType | null>(null);

export const useLightbox = () => {
    const context = useContext(LightboxContext);
    if (!context) throw new Error('useLightbox must be used within a LightboxProvider');
    return context;
};