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
    links: WorkLink[];
    media?: {
        type: 'image' | 'video';
        url: string;
        alt?: string;
    }[];
}

export const works: Work[] = [
    {
        id: 'test-work',
        category: 'web-development',
        links: [
            {
                type: 'source-code',
                url: '#'
            },
            {
                type: 'website',
                url: '#'
            }
        ],
        media: [
            {
                type: 'image',
                url: '/works/acnodnet/acnodnet.png'
            },
            {
                type: 'image',
                url: '/works/acnodnet/acnodnet-Home.png'
            },
            {
                type: 'image',
                url: '/works/monitoring-dashboard/monitoring-dashboard.png'
            },
            {
                type: 'image',
                url: '/works/monitoring-dashboard/monitoring-dashboard-maintenances.png'
            },
            {
                type: 'image',
                url: '/works/monitoring-dashboard/monitoring-dashboard-services.png'
            },
            {
                type: 'image',
                url: '/works/monitoring-dashboard/monitoring-dashboard-users.png'
            }
        ]
    },
    {
        id: 'acnod',
        category: 'web-development',
        links: [
            {
                type: 'source-code',
                url: 'https://github.com/jakooob14/'
            },
            {
                type: 'website',
                url: 'https://final-acnod.vercel.app/'
            }
        ],
        media: [
            {
                type: 'image',
                url: '/works/acnodnet/acnodnet.png'
            }
        ]
    },
    {
        id: 'nagy3d',
        category: 'web-development',
        links: [
            {
                type: 'website',
                url: 'https://nagy3d.cz/'
            }
        ],
        media: [
            {
                type: 'image',
                url: '/works/nagy3dcz/nagy3dcz.png'
            }
        ]
    },
    {
        id: 'monitoring-dashboard',
        category: 'web-development',
        links: [
            {
                type: 'source-code',
                url: 'https://github.com/Jakooob/monitoring-dashboard'
            },
            {
                type: 'website',
                url: 'https://status.jakooob.dev/'
            }
        ],
        media: [
            {
                type: 'image',
                url: '/works/monitoring-dashboard/monitoring-dashboard.png'
            }
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
                url: '/works/slenderman/slenderman.png'
            }
        ]
    },
    {
        id: 'raylib-games',
        category: 'game-development',
        links: [
            {
                type: 'source-code',
                url: 'https://github.com/stars/Jakooob14/lists/raylib-games'
            }
        ],
        media: [
            {
                type: 'image',
                url: '/works/raylib-games/raylib-games.png'
            }
        ]
    }
];

export function translateWorkCategory(category: WorkCategory): string {
    switch (category) {
        case 'web-development':
            return 'Web Development';
        case 'game-development':
            return 'Game Development';
        default:
            return 'Other';
    }
}