import Image from 'next/image'
import footer from '../styles/Footer.module.scss'
import instagramLogo from '../public/instagram.svg'
import githubLogo from '../public/github.svg'
import emailIcon from '../public/email.svg'
import {FaGithub, FaInstagram, FaSteam} from 'react-icons/fa';
import { SiMaildotru } from "react-icons/si";

const Footer = () => {
    return (
        <footer className={footer.main}>
            <a href='https://github.com/Jakooob14' target='_BLANK' rel="noreferrer" className={`${footer.icon} ${footer.github}`}><div><FaGithub/></div></a>
            <a href='https://instagram.com/Jakooob14' target='_BLANK' rel="noreferrer" className={`${footer.icon} ${footer.instagram}`}><div><FaInstagram/></div></a>
            <a href='mailto:me@jakooob.dev' className={`${footer.icon} ${footer.email}`}><div><SiMaildotru/></div></a>
            <a href='https://steamcommunity.com/id/jakooob' target='_BLANK' rel="noreferrer" className={`${footer.icon} ${footer.email}`}><div><FaSteam/></div></a>
        </footer>
    )
}

export default Footer;