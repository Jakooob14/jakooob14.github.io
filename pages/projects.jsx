import Footer from '../components/Footer'
import Header from '../components/Header'
import styles from '../styles/Projects.module.scss'
import nepIcon from '../public/nep icon.png'
import mejsczIcon from '../public/mejs.cz icon.svg'
import Image from 'next/image'
import DHead from "../components/Head";

const Projects = () => {
  return (
    <>
        <DHead title="Jakooob | Projects"/>

        <Header />
        <main className={styles.main}>
            <div className={styles.projects}>
                <div className={styles.project}>
                    <span><Image src={nepIcon} layout='fill' objectFit='contain' alt="Not enough PvP image"/></span>
                    <div>
                        <h1><a href='https://github.com/Jakooob14/Not-Enough-PvP' target='_BLANK' rel='noreferrer noopener'>Not Enough PvP</a> (2022)</h1>
                        <p>Not Enough PvP or just NEP is a simple mod for Minecraft Fabric 1.19.2 that adds a missing armor HUD. So when you&apos;re in a fight you know instantly when an armor piece breaks so you can put on a new one. If I have more ideas I will add more features. If you have any ideas for this mod you can post them in the GitHub repo <a href='https://github.com/Jakooob14/Not-Enough-PvP/issues' target='_BLANK' rel='noreferrer noopener'>issues tab</a>.</p>
                    </div>
                </div>
                    <div className={styles.project}>
                    <span><Image src={mejsczIcon} layout='fill' objectFit='contain' alt="Mejs cz image"/></span>
                    <div>
                        <h1><a href='https://mejs.cz/' target='_BLANK' rel='noreferrer noopener'>Mejs.cz</a> (2022)</h1>
                        <p>Mejs.cz is a Czech website made with NextJS for a Minecraft server with the same name. I made this website with my friend <a href='https://github.com/Skymmel' target='_BLANK' rel='noreferrer noopener'>Skymmel</a>.</p>
                    </div>
                </div>
            </div>
        </main>
        <Footer />
    </>
  )
}

export default Projects
