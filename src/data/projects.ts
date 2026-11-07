export type ProjectCategory = "work" | "personal";

export interface ProjectItem {
    id: string;
    category: ProjectCategory;
    title?: string;
    description?: string;
}

const projects: ProjectItem[] = [
    {
        id: "netuvio",
        category: "work",
    },
    {
        id: "tda26",
        category: "personal",
    },
    {
        id: "acnodnet",
        category: "personal",
    },
    {
        id: "monitoring-dashboard",
        category: "personal",
    },
    {
        id: "nagy3d",
        category: "work",
    },
    {
        id: "uzejdliku",
        category: "work",
    },
    {
        id: "premiovymakler",
        category: "work",
    },
    {
        id: "klarakubinova",
        category: "work",
    },
];

export default projects;
