import Link from 'next/link'
import header from '../styles/Header.module.scss'
import Image from "next/image";
import logo from '../public/jakooob logo.svg'

const Header = () => {
    return (
        <header className={header.main}>
            <a className={header.logo}><Image src={logo} width='40px'/></a>
            <ul>
                <li><Link href='/'>Home</Link></li>
                <li><Link href='/projects'>Projects</Link></li>
            </ul>
        </header>
        )
}

export default Header;