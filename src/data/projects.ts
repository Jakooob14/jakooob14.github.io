export type ProjectCategory = "work" | "personal";

export interface ProjectItem {
    id: string;
    category: ProjectCategory;
    year?: string;
    technologies?: string[];
    liveUrl?: string;
    githubUrl?: string;
    title?: string;
    description?: string;
    featured?: boolean;
}

const projects: ProjectItem[] = [
    {
        id: "netuvio",
        category: "work",
        year: "2024 - Present",
        technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL"],
        liveUrl: "https://netuvio.cz",
        featured: true
    },
    {
        id: "tda26",
        category: "personal",
        year: "2026",
        technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "ASP.NET Core", "WebSockets"],
    },
    {
        id: "acnodnet",
        category: "personal",
        year: "2025",
        technologies: ["React", "TypeScript", "Node.js", "Tailwind CSS"],
    },
    {
        id: "monitoring-dashboard",
        category: "personal",
        year: "2025",
        technologies: ["Vue.js", "TypeScript", "Docker", "Prometheus", "Tailwind CSS"],
    },
    {
        id: "nagy3d",
        category: "work",
        year: "2024",
        technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    },
    {
        id: "uzejdliku",
        category: "work",
        year: "2024",
        technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    },
    {
        id: "premiovymakler",
        category: "work",
        year: "2024",
        technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    },
    {
        id: "klarakubinova",
        category: "work",
        year: "2023",
        technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    },
];

export default projects;
