export type WorkCategory =
    | 'web-development'
    | 'game-development'
    | 'other';

export type WorkLinkType =
    | 'source-code'
    | 'website'
    | 'download';

export interface Work {
    id: string;
    category: WorkCategory;
    links: {
        type: WorkLinkType;
        url: string;
    }[];
}

export const works: Work[] = [
    {
        id: 'acnod',
        category: 'web-development',
        links: [
            {
                type: 'source-code',
                url: 'https://github.com/jakooob14/'
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
        ]
    },
    {
        id: 'monitoring-dashboard',
        category: 'web-development',
        links: [
            {
                type: 'source-code',
                url: 'https://github.com/Jakooob/monitoring-dashboard'
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
                url: 'https://git.jakooob.dev/Jakooob/slenderman-unreal/releases/download/latest/Slenderman%20-%20Windows.zip'
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
        ]
    }
];