'use client';

import { FaAngleUp } from 'react-icons/fa6';
import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export default function ScrollToTop() {
    const [visible, setVisible] = useState(false);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        history.pushState(null, '', '#');
    };

    const handleScroll = () => {
        setVisible(window.scrollY > 300);
    };

    useEffect(() => {
        document.addEventListener('scroll', handleScroll);

        return () => {
            document.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <motion.div
            onClick={scrollToTop}
            className={'fixed bottom-4 right-4 p-2 bg-aero-400 rounded-full text-aero-950 shadow-md cursor-pointer z-10'}
            data-cursor-hover
            initial={{
                opacity: 0,
                scale: 0.5
            }}
            animate={{
                opacity: visible ? 1 : 0,
                scale: visible ? 1 : 0.5
            }}
            transition={{
                duration: 0.1
            }}
        >
            <FaAngleUp size={20}/>
        </motion.div>
    );
}