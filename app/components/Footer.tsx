'use client'

import {MainLogo} from "@/app/components/Icons";
import Link from "next/link";
import {IoLogoGithub, IoLogoInstagram, IoMail, IoLogoLinkedin} from "react-icons/io5";
import {useDictionary} from "@/app/[lang]/DictionaryProvider";
import {usePathname} from 'next/navigation'
import {handleChangeLocale} from "@/app/utilities/handleChangeLocale";

export default function Footer(){
    const dict = useDictionary();
    const pathname = usePathname();

    return (
        <footer>
            <div className={'container mx-auto my-12 flex flex-col md:flex-row gap-y-6 h-[150px] justify-between'}>
                <div className={'flex flex-col md:flex-row gap-y-6'}>
                    <div className={'flex w-fit flex-col items-center gap-6'}>
                    <span className={'text-3xl font-semibold font-heading grid grid-cols-5 uppercase select-none'}>
                        {
                            Array.from('JakubSokol').map((letter, index) => {
                                return <span key={index}
                                             className={`${index == 4 || index == 9 ? 'w-[.65em]' : ''} ${index == 6 ? '-ms-[.1em]' : ''} ${index == 1 ? '-ms-[.08em]' : ''} ${index == 0 ? 'ms-[.08em]' : ''} leading-[calc(1em-10%)]`}>{letter}</span>
                            })
                        }
                    </span>
                        <MainLogo className={'w-20 h-auto'}/>
                    </div>

                    <div className={'w-2 h-full bg-alt-gray-200 mx-24'}></div>

                    <div id={'contact'}>
                        <span
                            className={'text-3xl font-semibold text-aero-500 font-heading'}>{dict.home.main.navigation.contact}</span>
                        <ul className={'text-xl mt-1'}>
                            <li><Link className={'flex items-center gap-2 text-white w-fit'} data-cursor-padding-x={8}
                                      href={'https://www.linkedin.com/in/sokoljakub'} rel={'noreferrer'}
                                      target={'_blank'}><IoLogoLinkedin/>LinkedIn</Link></li>
                            <li><Link className={'flex items-center gap-2 text-white w-fit'} data-cursor-padding-x={8}
                                      href={'https://github.com/Jakooob14'} rel={'noreferrer'}
                                      target={'_blank'}><IoLogoGithub/>Github</Link></li>
                            <li><Link className={'flex items-center gap-2 text-white w-fit'} data-cursor-padding-x={8}
                                      href={'https://instagram.com/Jakooob14'} rel={'noreferrer'}
                                      target={'_blank'}><IoLogoInstagram/>Instagram</Link></li>
                            <li><Link className={'flex items-center gap-2 text-white w-fit'} data-cursor-padding-x={8}
                                      href={'mailto:me@jakooob.dev'} rel={'noreferrer'}><IoMail/>me@jakooob.dev</Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className={'flex items-start'}>
                    <a className={'cursor-pointer px-2'} onClick={() => handleChangeLocale(pathname, 'en')}>EN</a>
                    <a className={'cursor-pointer px-2'} onClick={() => handleChangeLocale(pathname, 'cs')}>CS</a>
                </div>
            </div>
        </footer>
    )
}
