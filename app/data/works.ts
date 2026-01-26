import { Technology } from '@/app/components/TechnologyTag';

export type WorkCategory =
    | 'web-development'
    | 'game-development';

export type WorkLinkType =
    | 'source-code'
    | 'website'
    | 'download';

export type WorkLink = {
    type: WorkLinkType;
    url: string;
    openInNewTab?: boolean;
    popupText?: string;
};

export interface Work {
    id: string;
    category: WorkCategory;
    links?: WorkLink[];
    media?: {
        type: 'image' | 'video';
        url: string;
        alt?: string;
    }[];
    technologies?: Technology[];
    redirectUrl?: string; // Instead of a work page, when clicking learn more in a work card redirect to this link
}

export const works: Work[] = [
    {
        id: 'acnod',
        category: 'web-development',
        links: [
            {
                type: 'website',
                url: 'https://final-acnod.vercel.app'
            }
        ],
        media: [
            {
                type: 'image',
                url: '/works/acnodnet/acnodnet1.webp',
                alt: 'Acnod Home page 1'
            },
            {
                type: 'image',
                url: '/works/acnodnet/acnodnet2.webp',
                alt: 'Acnod Home page 2'
            }
        ],
        technologies: ['nextjs', 'threejs', 'i18next']
    },
    {
        id: 'nagy3d',
        category: 'web-development',
        links: [
            {
                type: 'website',
                url: 'https://nagy3d.cz'
            }
        ],
        media: [
            {
                type: 'image',
                url: '/works/nagy3dcz/nagy3d.webp',
                alt: 'Nagy3D Home page'
            },
            {
                type: 'image',
                url: '/works/nagy3dcz/nagy3d-services.webp',
                alt: 'Nagy3DServices page'
            },
            {
                type: 'image',
                url: '/works/nagy3dcz/nagy3d-about.webp',
                alt: 'Nagy3D About page'
            },
            {
                type: 'image',
                url: '/works/nagy3dcz/nagy3d-contact.webp',
                alt: 'Nagy3D Contact page'
            },
        ]
    },
    {
        id: 'monitoring-dashboard',
        category: 'web-development',
        links: [
            {
                type: 'website',
                url: 'https://status.jakooob.dev/'
            },
            {
                type: 'source-code',
                url: 'https://github.com/Jakooob/monitoring-dashboard'
            }
        ],
        media: [
            {
                type: 'image',
                url: '/works/monitoring-dashboard/monitoring-dashboard-home.webp',
                alt: 'Monitoring Dashboard Home page'
            },
            {
                type: 'image',
                url: '/works/monitoring-dashboard/monitoring-dashboard-services.webp',
                alt: 'Monitoring Dashboard Services page'
            },
            {
                type: 'image',
                url: '/works/monitoring-dashboard/monitoring-dashboard-maintenances.webp',
                alt: 'Monitoring Dashboard Maintenances page'
            },
            {
                type: 'image',
                url: '/works/monitoring-dashboard/monitoring-dashboard-users.webp',
                alt: 'Monitoring Dashboard Users page'
            },
        ]
    },
    {
        id: 'slenderman',
        category: 'game-development',
        links: [
            {
                type: 'source-code',
                url: 'https://git.jakooob.dev/Jakooob/slenderman-unreal'
            },
            {
                type: 'download',
                url: 'https://git.jakooob.dev/Jakooob/slenderman-unreal/releases/download/latest/Slenderman%20-%20Windows.zip',
                openInNewTab: false,
                popupText: 'Download for Windows',
                
            }
        ],
        media: [
            {
                type: 'image',
                url: '/works/slenderman/slenderman.webp',
                alt: 'Slenderman Game',
            }
        ]
    },
    {
        id: 'raylib-games',
        category: 'game-development',
        redirectUrl: 'https://github.com/stars/Jakooob14/lists/raylib-games',
        media: [
            {
                type: 'image',
                url: '/works/raylib-games/raylib-games.webp',
                alt: 'Raylib Games'
            }
        ]
    }
];
