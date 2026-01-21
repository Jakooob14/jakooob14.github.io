import { createContext, useContext } from 'react';
import { LightboxItemData } from '@/app/components/lightbox/Lightbox';

type LightboxContextType = {
    register: (src: LightboxItemData) => number;
    openAt: (index: number) => void;
};

export const LightboxContext = createContext<LightboxContextType | null>(null);

export const useLightbox = () => {
    const context = useContext(LightboxContext);
    if (!context) throw new Error('useLightbox must be used within a LightboxProvider');
    return context;
};