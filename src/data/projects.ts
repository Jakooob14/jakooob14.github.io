export type ProjectCategory = "work" | "personal";

export interface ProjectItem {
    id: string;
    title: string;
    description: string;
    category: ProjectCategory;
}

const projects: ProjectItem[] = [
    {
        id: "netuvio",
        title: "Netuvio",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi metus metus, tincidunt nec ante vitae, condimentum vehicula magna. Vivamus gravida justo sed aliquet venenatis. Quisque eu eros quis elit efficitur pharetra eget eget dolor. Maecenas eleifend convallis sapien. Sed vestibulum congue lectus vitae sagittis.",
        category: "work",
    },
    {
        id: "tda26",
        title: "Think different Academy",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi metus metus, tincidunt nec ante vitae, condimentum vehicula magna. Vivamus gravida justo sed aliquet venenatis. Quisque eu eros quis elit efficitur pharetra eget eget dolor. Maecenas eleifend convallis sapien. Sed vestibulum congue lectus vitae sagittis.",
        category: "personal",
    },
    {
        id: "acnodnet",
        title: "Acnod",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi metus metus, tincidunt nec ante vitae, condimentum vehicula magna. Vivamus gravida justo sed aliquet venenatis. Quisque eu eros quis elit efficitur pharetra eget eget dolor. Maecenas eleifend convallis sapien. Sed vestibulum congue lectus vitae sagittis.",
        category: "personal",
    },
];

export default projects;
