import { WarpedName } from "@/components/WarpedName";
import SpinningCircleText from "@/components/home/SpinningCircleText";
import IconContainer from "@/components/IconContainer";
import {LuGithub, LuInstagram, LuLinkedin} from "react-icons/lu";
import Link from "next/link";
import socials from "@/data/socials";

export default function Home() {
    return (
        <main className="min-h-screen p-8 flex flex-col">
            <section className="background rounded-xl w-full flex-1 flex items-center justify-center p-6 overflow-hidden text-white">
                <div className={'mx-auto flex items-center justify-center w-full max-w-[1024px]'}>
                    <div className={'flex flex-col w-full'}>
                        <h1 className="sr-only">JAKUB SOKOL</h1>
                        <WarpedName className="w-full max-w-[1024px] h-auto select-none" />
                        <span className={'ps-16 font-medium text-2xl max-w-[650px]'}>Lorem ipsum dolor sit amet & lorem ipsum dolor, dolor amet lorem ipsum dolor sit amet</span>
                        <div className={'flex justify-end gap-4 text-foreground mt-8'}>
                            <Link href={socials.github.link}>
                                <IconContainer>
                                    <LuGithub />
                                </IconContainer>
                            </Link>
                            <Link href={socials.linkedin.link}>
                                <IconContainer>
                                    <LuLinkedin />
                                </IconContainer>
                            </Link>
                            <Link href={socials.instagram.link}>
                                <IconContainer>
                                    <LuInstagram />
                                </IconContainer>
                            </Link>
                        </div>
                    </div>
                    
                    <SpinningCircleText
                        className={'absolute bottom-[-68px] left-[10%] z-100'}
                        textClassName={'tracking-widest text-red-500!'}
                        text={"Lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem"}
                    />

                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 251.19 251.19"
                        className={'w-64 absolute -bottom-24 right-[10%]'}
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
