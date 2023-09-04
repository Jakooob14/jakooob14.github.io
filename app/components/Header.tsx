'use client';

import Image from "next/image";
import Link from "next/link";
import {Menu, Transition} from "@headlessui/react";
import {Fragment} from "react";

export default function Header() {
    const activeMenu: string = 'bg-blue-700 text-white';
    const notActiveMenu: string = 'text-gray-300';

    return (
        <header className={'z-50 relative'}>
            <nav className={'w-full flex h-16 px-4 justify-center min-[320px]:justify-between bg-blue-1000 shadow-[0_0_15px_5px_rgba(0,35,74,0.5)]'}>
                <a className={'h-16 hidden min-[320px]:flex items-center'} href={'/'}><Image src={'/jakooob logo.svg'} alt={'Logo'} width={40} height={40}/></a>
                <ul className={'flex uppercase text-white gap-7 md:gap-0'}>
                    <li><Link className={'text-lg/[64px] h-16 block px-4 text-inherit'} href={'/'}>Home</Link></li>
                    <li><Link className={'text-lg/[64px] h-16 block px-4 text-inherit'} href={'/projects'}>Projects</Link></li>
                    <li>
                        <Menu as={'a'} className={'relative inline-block text-lg/[64px] h-16 px-4 text-inherit dark'}>
                            <div>
                                <Menu.Button className={'inline-flex uppercase items-center'}>
                                    Tools
                                    {/*<HiChevronDown className={'ml-1 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100'} aria-hidden={'true'}/>*/}
                                </Menu.Button>
                            </div>
                            <Transition
                                as={Fragment}
                                enter={'transition ease-out duration-100'}
                                enterFrom={'transform opacity-0 scale-95'}
                                enterTo={'transform opacity-100 scale-100'}
                                leave={'transition ease-in duration-75'}
                                leaveFrom={'transform opacity-100 scale-100'}
                                leaveTo={'transform opacity-0 scale-95'}
                            >
                                <Menu.Items className={'absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-500 rounded-md bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'}>
                                    <div className={'px-1 py-1 '}>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <Link href={'/tools/metadata-generator'} className={`${active ? activeMenu : notActiveMenu} group flex w-full items-center rounded-md px-2 py-2 text-sm`}>Metadata Generator</Link>
                                            )}
                                        </Menu.Item>
                                    </div>
                                </Menu.Items>
                            </Transition>
                        </Menu>
                    </li>
                </ul>
            </nav>
        </header>
    )
}