export interface CertificateItem {
    id: string;
    year: number;
    title?: string;
    organization?: string;
    description?: string;
}

const certificates: CertificateItem[] = [
    {
        id: "cambridge",
        year: 2023,
    },
];

export default certificates;
