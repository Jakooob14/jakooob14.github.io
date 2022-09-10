import { NextPage } from 'next'
import Link from 'next/link'
import header from '../styles/Header.module.scss'

const Header: NextPage = () => {
    return (
        <header className={header.main}>
            <Link className={header.name} href='/'>Jakooob</Link>
            <ul>
                <li><Link href='/'>Home</Link></li>
                <li><Link href='/projects'>Projects</Link></li>
            </ul>
        </header>
    )
}

export default Header