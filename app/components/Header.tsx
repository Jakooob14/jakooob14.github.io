import Image from "next/image";
import Link from "next/link";

export default function Header() {
    return (
        <header className={'z-50 relative'}>
            <nav className={'w-full flex h-16 px-4 justify-center min-[320px]:justify-between bg-blue-1000 shadow-[0_0_15px_5px_rgba(0,35,74,0.5)]'}>
                <a className={'h-16 hidden min-[320px]:flex items-center'} href={'/'}><Image src={'/jakooob logo.svg'} alt={'Logo'} width={40} height={40}/></a>
                <ul className={'flex uppercase text-white gap-7 md:gap-0'}>
                    <li><Link className={'text-lg/[64px] h-16 block px-4 text-inherit'} href={'/'}>Home</Link></li>
                    <li><Link className={'text-lg/[64px] h-16 block px-4 text-inherit'} href={'/projects'}>Projects</Link></li>
                </ul>
            </nav>
        </header>
    )
}