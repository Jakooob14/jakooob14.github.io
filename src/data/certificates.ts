export type AchievementType = "achievement" | "certificate";

export interface CertificateItem {
    id: string;
    type: AchievementType;
    year: number;
    href?: string;
    title?: string;
    organization?: string;
    description?: string;
}

const certificates: CertificateItem[] = [
    {
        id: "tda26",
        type: "achievement",
        year: 2026,
        href: "/portfolio/tda26",
    },
    {
        id: "cambridge",
        type: "certificate",
        year: 2023,
    },
];

export default certificates;
