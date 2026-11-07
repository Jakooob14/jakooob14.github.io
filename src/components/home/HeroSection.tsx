import { WarpedName } from "@/components/WarpedName";
import SpinningCircleText from "@/components/home/SpinningCircleText";
import IconContainer from "@/components/IconContainer";
import { LuGithub, LuInstagram, LuLinkedin } from "react-icons/lu";
import socials from "@/data/socials";
import { useTranslations } from "next-intl";

export default function HeroSection() {
    const t = useTranslations("hero");

    return (
        <main id="home" className="min-h-screen p-8 flex flex-col">
            <section className="background rounded-xl w-full flex-1 flex items-center justify-center p-6 overflow-hidden text-white">
                <div className="mx-auto flex items-center justify-center w-full max-w-[1024px]">
                    <div className="flex flex-col w-full">
                        <h1 className="sr-only">{t("title")}</h1>
                        <WarpedName className="w-full max-w-[1024px] h-auto select-none" />
                        <span className="ps-16 font-medium text-2xl max-w-[650px]">
                            {t("subtitle")}
                        </span>
                        <div className="flex justify-end gap-4 text-foreground mt-8">
                            <a href={socials.github.link} target="_blank" rel="noopener noreferrer">
                                <IconContainer>
                                    <LuGithub />
                                </IconContainer>
                            </a>
                            <a href={socials.linkedin.link} target="_blank" rel="noopener noreferrer">
                                <IconContainer>
                                    <LuLinkedin />
                                </IconContainer>
                            </a>
                            <a href={socials.instagram.link} target="_blank" rel="noopener noreferrer">
                                <IconContainer>
                                    <LuInstagram />
                                </IconContainer>
                            </a>
                        </div>
                    </div>

                    <SpinningCircleText
                        className="absolute bottom-[-68px] left-[10%] z-100"
                        textClassName="tracking-widest text-red-500!"
                        text={t("circleText")}
                    />

                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 251.19 251.19"
                        className="w-64 absolute -bottom-24 right-[10%]"
                    >
                        <mask
                            id="a"
                            width={252}
                            height={252}
                            x={16}
                            y={16}
                            maskUnits="userSpaceOnUse"
                        >
                            <rect
                                width={201}
                                height={201}
                                y={142.13}
                                fill="#fff"
                                rx={40}
                                transform="rotate(-45 0 142.13)"
                            />
                        </mask>
                        <g mask="url(#a)" transform="translate(-16.532 -16.532)">
                            <path fill="#dcf0fe" d="M-41 142h366v201H-41z" />
                        </g>
                        <mask
                            id="b"
                            width={252}
                            height={252}
                            x={16}
                            y={16}
                            maskUnits="userSpaceOnUse"
                        >
                            <rect
                                width={201}
                                height={201}
                                y={142.13}
                                fill="#fff"
                                rx={40}
                                transform="rotate(-45 0 142.13)"
                            />
                        </mask>
                        <g mask="url(#b)" transform="translate(-16.532 -16.532)">
                            <path fill="#fff" d="M-58-59h366v201H-58z" />
                        </g>
                    </svg>
                </div>
            </section>
        </main>
    );
}
