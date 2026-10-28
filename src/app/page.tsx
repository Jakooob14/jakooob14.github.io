import { WarpedName } from "@/components/WarpedName";
import SpinningCircleText from "@/components/home/SpinningCircleText";
import IconContainer from "@/components/IconContainer";
import {LuArrowRight, LuGithub, LuInstagram, LuLinkedin} from "react-icons/lu";
import Link from "next/link";
import socials from "@/data/socials";
import {Heading1, Heading2} from "@/components/Heading";
import TechnologyMarquee from "@/components/home/TechnologyMarquee";
import Project from "@/components/home/Project";

export default function Home() {
    return (
      <div className={'min-h-[10000px]'}>
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
          <section id={"about"} className={'container mx-auto mt-24'}>
              <section>
                  <Heading1 className={'mb-6 max-w-[600px]'}>About Me</Heading1>
                  <span className={'text-5xl'}>I'm a full-stack developer and student from Czechia focused on building modern, high performance web applications.</span>
                <div className={'flex gap-8 w-full mt-8 items-center'}>
                    <div className={'w-[350px] h-[120px] shrink-0 bg-primary-400 rounded-2xl'}></div>
                    <span className={'max-w-[700px]'}>My daily toolkit includes React, Next.js, Vue, Nuxt.js, and ASP.NET. I have a strong interest in learning emerging technologies, refining software architecture, and optimizing overall performance and development workflows.</span>
                </div>
              </section>
              <section className={'mt-10'}>
                  <Heading2 
                      visualLevel={4} 
                      variant={"foreground"}
                      className={'mb-4'}
                  >Technologies I use</Heading2>
                  <TechnologyMarquee/>
              </section>
          </section>
          <section id={"portfolio"} className={'container mx-auto mt-24'}>
              <Heading1>Portfolio</Heading1>
              <Project 
                  title="Netuvio" 
                  iconUrl="/portfolio/netuvio.svg" 
                  description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi metus metus, tincidunt nec ante vitae, condimentum vehicula magna. Vivamus gravida justo sed aliquet venenatis. Quisque eu eros quis elit efficitur pharetra eget eget dolor. Maecenas eleifend convallis sapien. Sed vestibulum congue lectus vitae sagittis. "}
              />
              <Link href={"/portfolio"} className={'block bg-neutral-100 p-8 mt-4 rounded-3xl hover:bg-heading hover:text-text-secondary transition-colors'}>
                  <span className={'flex items-center gap-2 text-3xl'}>See my entire portfolio <LuArrowRight/></span>
              </Link>
          </section>
      </div>
    );
}
