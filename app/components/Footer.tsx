'use client';

import {FaGithub, FaInstagram, FaSteam} from "react-icons/fa";
import {SiMaildotru} from "react-icons/si";

export default function Footer() {
    return (
        <footer className={'z-50 relative'}>
            <div className={'flex h-16 px-4 justify-between bg-blue-1000 shadow-[0_0_15px_5px_rgba(0,35,74,0.5)]'}>
                <ul className={'w-full flex justify-center items-center gap-4 text-xl text-white'}>
                    <li><a className={'block p-2 rounded-full bg-blue-930 hover:opacity-60 transition-opacity text-inherit'} href={'https://github.com/Jakooob14'} title={'Github'} target={'_blank'} rel={'noreferrer noopener'}><FaGithub/></a></li>
                    <li><a className={'block p-2 rounded-full bg-blue-930 hover:opacity-60 transition-opacity text-inherit'} href={'https://instagram.com/Jakooob14'} title={'Instagram'} target={'_blank'} rel={'noreferrer noopener'}><FaInstagram/></a></li>
                    <li><a className={'block p-2 rounded-full bg-blue-930 hover:opacity-60 transition-opacity text-inherit'} href={'mailto:me@jakooob.dev'} title={'E-Mail'}><SiMaildotru/></a></li>
                    <li><a className={'block p-2 rounded-full bg-blue-930 hover:opacity-60 transition-opacity text-inherit'} href={'https://steamcommunity.com/id/jakooob'} title={'Steam'} target={'_blank'} rel={'noreferrer noopener'}><FaSteam/></a></li>
                </ul>
            </div>
        </footer>
    )
}