import { WarpedName } from "@/components/WarpedName";
import SpinningCircleText from "@/components/home/SpinningCircleText";

export default function Home() {
    return (
        <main className="min-h-screen p-8 flex flex-col">
            <section className="background rounded-xl w-full flex-1 flex items-center justify-center p-6 overflow-hidden text-white">
                <div className={'mx-auto flex items-center justify-center w-full max-w-[1024px]'}>
                    <div className={'flex flex-col w-full -mt-16'}>
                        <h1 className="sr-only">JAKUB SOKOL</h1>
                        <WarpedName className="w-full max-w-[1024px] h-auto select-none" />
                        <span className={'ps-16 font-medium text-2xl max-w-[650px]'}>Lorem ipsum dolor sit amet & lorem ipsum dolor, dolor amet lorem ipsum dolor sit amet</span>
                    </div>
                    
                    <SpinningCircleText
                        className={'absolute bottom-[-68px] left-[10%] z-100'}
                        textClassName={'tracking-widest text-red-500!'}
                        text={"Lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem"}
                    />
                </div>
            </section>
        </main>
    );
}
