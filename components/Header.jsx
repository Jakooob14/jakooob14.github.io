import Link from 'next/link'
import header from '../styles/Header.module.scss'

const Header = () => {
    return (
        <header className={header.main}>
            <h2 className={header.name}><Link href='/'>Jakooob</Link></h2>
            <ul>
                <li><Link href='/'>Home</Link></li>
                <li><Link href='/projects'>Projects</Link></li>
            </ul>
        </header>
    )
}

export default Header