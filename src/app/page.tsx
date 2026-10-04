export default function Home() {
    return (
        <main className="relative min-h-screen overflow-hidden">
            <section className="background grid place-content-center absolute inset-0">
                <h1 className="text-[164px] font-bold text-white">Lorem Ipsum</h1>
            </section>

            <section>
                <svg
                    className="fixed inset-0 w-full h-full z-10"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <defs>
                        <mask id="cutout-mask">
                            <rect width="100%" height="100%" fill="white" />
            
                            <text
                                x="50%"
                                y="50%"
                                textAnchor="middle"
                                dominantBaseline="central"
                                fill="black"
                                style={{
                                    fontFamily: "var(--font-nexa), sans-serif",
                                    fontWeight: 900,
                                }}
                                className="text-[clamp(3rem,10vw,12rem)] tracking-wider uppercase"
                            >
                                Jakub Sokol
                            </text>
                        </mask>
                    </defs>
            
                    <rect width="100%" height="100%" fill="white" mask="url(#cutout-mask)" />
                </svg>
            </section>
        </main>
    );
}

