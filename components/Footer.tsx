import { NextPage } from 'next'
import Image from 'next/image'
import footer from '../styles/Footer.module.scss'
import instagramLogo from '../public/instagram.svg'
import githubLogo from '../public/github.svg'
import emailIcon from '../public/email.svg'

const Header: NextPage = () => {
    return (
        <footer className={footer.main}>
            <a href='https://github.com/Jakooob14' target='_BLANK' rel="noreferrer" className={`${footer.icon} ${footer.github}`}><div><Image src={githubLogo} alt="Github logo"/></div></a>
            <a href='https://instagram.com/Jakooob14' target='_BLANK' rel="noreferrer" className={`${footer.icon} ${footer.instagram}`}><div><Image src={instagramLogo} alt="Instagram logo"/></div></a>
            <a href='mailto:sokoljakub14@gmail.com' className={`${footer.icon} ${footer.email}`}><div><Image src={emailIcon} alt="Email icon"/></div></a>
        </footer>
    )
}

export default Header