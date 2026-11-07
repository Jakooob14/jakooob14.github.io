export interface ProjectItem {
    id: string;
    title: string;
    description: string;
}

const projects: ProjectItem[] = [
    {
        id: "netuvio",
        title: "Netuvio",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi metus metus, tincidunt nec ante vitae, condimentum vehicula magna. Vivamus gravida justo sed aliquet venenatis. Quisque eu eros quis elit efficitur pharetra eget eget dolor. Maecenas eleifend convallis sapien. Sed vestibulum congue lectus vitae sagittis.",
    },
    {
        id: "tda26",
        title: "Think different Academy",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi metus metus, tincidunt nec ante vitae, condimentum vehicula magna. Vivamus gravida justo sed aliquet venenatis. Quisque eu eros quis elit efficitur pharetra eget eget dolor. Maecenas eleifend convallis sapien. Sed vestibulum congue lectus vitae sagittis.",
    },
    {
        id: "acnodnet",
        title: "Acnod",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi metus metus, tincidunt nec ante vitae, condimentum vehicula magna. Vivamus gravida justo sed aliquet venenatis. Quisque eu eros quis elit efficitur pharetra eget eget dolor. Maecenas eleifend convallis sapien. Sed vestibulum congue lectus vitae sagittis.",
    },
];

export default projects;
