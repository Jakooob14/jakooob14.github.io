import Footer from '../../components/Footer'
import Header from '../../components/Header'
import styles from '../../styles/Projects.module.scss'
import nepIcon from '../../public/nep icon.png'
import mejsczIcon from '../../public/mejs.cz icon.svg'
import acnodIcon from '/public/acnod-logo-small.svg';
import Image from 'next/image'
import DHead from "../../components/Head";
import Link from "next/link";
import $ from "jquery"
import {useEffect} from "react";


const Projects = () => {
  return (
    <>
        <DHead title="Jakooob | Projects"/>

        <Header />
        <main className={styles.main}>
            <div className={styles.projects}>
                <Project title={"Not Enough PvP"} url={"https://github.com/Jakooob14/Not-Enough-PvP"} year={"2022"} image={nepIcon} limbo>Not Enough PvP or just NEP is a simple mod for Minecraft Fabric 1.19.2 that adds a missing armor HUD. So when you&apos;re in a fight you know instantly when an armor piece breaks so you can put on a new one. If I have more ideas I will add more features. If you have any ideas for this mod you can post them in the GitHub repo <a href='https://github.com/Jakooob14/Not-Enough-PvP/issues' target='_BLANK' rel='noreferrer noopener'>issues tab</a>.</Project>
                <Project title={"Mejs.cz"} url={"https://mejs.cz"} year={"2022"} image={mejsczIcon} dead>Mejs.cz is a Czech website made with NextJS for a Minecraft server with the same name. I made this website with my friend <a href='https://skymmel.eu' target='_BLANK' rel='noreferrer noopener'>Skymmel</a>.</Project>
                <Project title={"Acnod"} url={"https://acnod.net"} year={"2022"} image={acnodIcon} imagePadding={'20px'}>Acnod is a project me and <a href={'https://skymmel.eu'} target={'_blank'} rel={'noreferrer noopener'}>Skymmel</a> are working on. It is a freelance website on which we offer software development services.</Project>
            </div>
        </main>
        <Footer />
    </>
  )
}

const Project = ({children, title, url, year, image, imageAlt = title + " icon", imagePadding = '0px', dead = false, limbo = false}) => {
    useEffect(() => {
        // $('img').css('padding', imagePadding);
    })
    return (
        <div className={styles.project}>
            {image ? <span style={{padding: imagePadding}}><div style={{position: 'relative', height: '100%', width: '100%'}}><Image src={image} layout='fill' objectFit='contain' alt={imageAlt}/></div></span> : null}
            <div>
                <h1>
                    {
                        dead ?
                            <Link href={{pathname: "/projects/rip", query: {url: url, name: title} }}>{title}</Link> :
                            <a href={url} target='_BLANK' rel='noreferrer noopener'>{title}</a>
                    }
                    {year ? <> ({year})</> : null}
                    {dead ? <b title={"This app is no longer running"} onClick={() => {alert("This app is no longer running")}}> ☠️</b> : null}
                    {limbo ? <b title={"In limbo"} onClick={() => {alert("In limbo")}}> ❓</b> : null}
                </h1>
                <p>{children}</p>
            </div>
        </div>
    )
}

export default Projects
