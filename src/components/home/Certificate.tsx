import {HTMLAttributes} from "react";

interface CertificateProps extends HTMLAttributes<HTMLDivElement> {
    title: string;
    organization: string;
    description: string;
    year: number;
}

export default function Certificate({ title, organization, description, year }: CertificateProps) {
    return (
        <div className={'flex justify-between bg-neutral-100 p-8 rounded-3xl hover:bg-heading hover:text-text-secondary transition-colors'}>
            <div className={'w-48 flex flex-col'}>
                <span className={'font-semibold'}>{title}</span>
                <span>{organization}</span>
            </div>
            <div className={'flex-1'}>
                <p>{description}</p>
            </div>
            <div className={'w-16 text-xl flex items-center justify-end'}>
                <span>{year}</span>
            </div>
        </div>
    );
}