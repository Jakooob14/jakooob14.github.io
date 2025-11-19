'use client'

import {Heading1, Heading2} from "@/app/components/Headings";
import Image from "next/image";
import {Suspense} from "react";
import Loader from "@/app/components/Loader";
import Tag from "@/app/components/Tag";
import {SiBlazor} from "react-icons/si";
import {LinkButton} from "@/app/components/Buttons";
import {useDictionary} from "@/app/[lang]/DictionaryProvider";

export default function MonitoringDashboard(){
    const dict = useDictionary();

    return (
        <main>
            <div className={'container mx-auto my-24'}>
                <LinkButton href={'/#works'}>{dict.general.back}</LinkButton>
                <Heading1 className={'mt-8'}>Monitoring Dashboard</Heading1>
                <p className={'my-4'}>
                    {dict.home.works.monitoring_dashboard.description}
                </p>
                <div className={'flex gap-2'}>
                    <Tag className={'!bg-aero-300 !text-aero-950'} icon={<SiBlazor/>}>Blazor</Tag>
                </div>
                <div>
                    <div className={'my-8'}>
                        <Heading2 className={'mb-4'}>{dict.work.pages.home}</Heading2>
                        <Suspense fallback={<Loader/>}>
                            <Image src={'/works/monitoring-dashboard/monitoring-dashboard.png'} alt={'Home page'} width={1600} height={1972}/>
                        </Suspense>
                    </div>
                    <div className={'my-8'}>
                        <Heading2 className={'mb-4'}>{dict.work.pages.services}</Heading2>
                        <Suspense fallback={<Loader/>}>
                            <Image src={'/works/monitoring-dashboard/monitoring-dashboard-services.png'} alt={'Services page'} width={1600} height={1972}/>
                        </Suspense>
                    </div>
                    <div className={'my-8'}>
                        <Heading2 className={'mb-4'}>{dict.work.pages.maintenances}</Heading2>
                        <Suspense fallback={<Loader/>}>
                            <Image src={'/works/monitoring-dashboard/monitoring-dashboard-maintenances.png'} alt={'Maintenances page'} width={1600} height={1972}/>
                        </Suspense>
                    </div>
                    <div className={'my-8'}>
                        <Heading2 className={'mb-4'}>{dict.work.pages.users}</Heading2>
                        <Suspense fallback={<Loader/>}>
                            <Image src={'/works/monitoring-dashboard/monitoring-dashboard-users.png'} alt={'Users page'} width={1600} height={1972}/>
                        </Suspense>
                    </div>
                </div>
            </div>
        </main>
    )
}
