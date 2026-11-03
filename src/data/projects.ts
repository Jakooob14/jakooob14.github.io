export interface ProjectItem {
    id: string;
    title: string;
    iconUrl: string;
    description: string;
    previewUrl?: string;
}

const projects: ProjectItem[] = [
    {
        id: "netuvio-1",
        title: "Netuvio",
        iconUrl: "/portfolio/netuvio.svg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi metus metus, tincidunt nec ante vitae, condimentum vehicula magna. Vivamus gravida justo sed aliquet venenatis. Quisque eu eros quis elit efficitur pharetra eget eget dolor. Maecenas eleifend convallis sapien. Sed vestibulum congue lectus vitae sagittis.",
    },
    {
        id: "netuvio-2",
        title: "Netuvio",
        iconUrl: "/portfolio/netuvio.svg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi metus metus, tincidunt nec ante vitae, condimentum vehicula magna. Vivamus gravida justo sed aliquet venenatis. Quisque eu eros quis elit efficitur pharetra eget eget dolor. Maecenas eleifend convallis sapien. Sed vestibulum congue lectus vitae sagittis.",
    },
    {
        id: "netuvio-3",
        title: "Netuvio",
        iconUrl: "/portfolio/netuvio.svg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi metus metus, tincidunt nec ante vitae, condimentum vehicula magna. Vivamus gravida justo sed aliquet venenatis. Quisque eu eros quis elit efficitur pharetra eget eget dolor. Maecenas eleifend convallis sapien. Sed vestibulum congue lectus vitae sagittis.",
    },
];

export default projects;
