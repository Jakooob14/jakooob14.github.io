'use client';

import { motion, AnimatePresence } from "motion/react";
import { usePathname, useSearchParams } from "next/navigation";
import Project, { ProjectCardItem } from "@/components/home/Project";
import { ProjectCategory } from "@/data/projects";

type FilterType = "all" | ProjectCategory;

const FILTER_QUERY_PARAM = "category";
const VALID_CATEGORIES: readonly ProjectCategory[] = ["work", "personal"];

function parseFilterParam(value: string | null): FilterType {
    if (value && (VALID_CATEGORIES as readonly string[]).includes(value)) {
        return value as ProjectCategory;
    }
    return "all";
}

interface PortfolioFilterGridProps {
    projects: ProjectCardItem[];
    filterLabels: {
        all: string;
        work: string;
        personal: string;
    };
    categoryBadgeLabels: {
        work: string;
        personal: string;
    };
    emptyMessage: string;
}

interface PortfolioFilterGridViewProps extends PortfolioFilterGridProps {
    selectedFilter: FilterType;
    onSelectFilter?: (filter: FilterType) => void;
}

function PortfolioFilterGridView({
    projects,
    filterLabels,
    categoryBadgeLabels,
    emptyMessage,
    selectedFilter,
    onSelectFilter,
}: PortfolioFilterGridViewProps) {
    const workCount = projects.filter((p) => p.category === "work").length;
    const personalCount = projects.filter((p) => p.category === "personal").length;
    const allCount = projects.length;

    const filters: { id: FilterType; label: string; count: number }[] = [
        { id: "all", label: filterLabels.all, count: allCount },
        { id: "work", label: filterLabels.work, count: workCount },
        { id: "personal", label: filterLabels.personal, count: personalCount },
    ];

    const filteredProjects = projects.filter((project) => {
        if (selectedFilter === "all") return true;
        return project.category === selectedFilter;
    });

    return (
        <div>
            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-3 mb-10">
                {filters.map((filter) => {
                    const isActive = selectedFilter === filter.id;
                    return (
                        <button
                            key={filter.id}
                            type="button"
                            aria-pressed={isActive}
                            onClick={() => onSelectFilter?.(filter.id)}
                            className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                                isActive
                                    ? "bg-foreground text-background"
                                    : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200/80 hover:text-foreground"
                            }`}
                        >
                            <span>{filter.label}</span>
                            <span
                                className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                                    isActive
                                        ? "bg-background/20 text-background"
                                        : "bg-neutral-200/80 text-neutral-600"
                                }`}
                            >
                                {filter.count}
                            </span>
                        </button>
                    );
                })}
            </div>

            {/* Projects Grid */}
            <AnimatePresence mode="wait" initial={false}>
                <motion.div
                    key={selectedFilter}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                >
                    {filteredProjects.length === 0 ? (
                        <div className="py-20 text-center text-neutral-500 bg-neutral-50 rounded-3xl">
                            <p className="text-lg">{emptyMessage}</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                            {filteredProjects.map((project) => (
                                <div
                                    key={project.id}
                                    className="h-full flex flex-col"
                                >
                                    <Project
                                        project={project}
                                        className="h-full"
                                        categoryBadgeLabel={
                                            categoryBadgeLabels[project.category]
                                        }
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}

export function PortfolioFilterGridFallback(props: PortfolioFilterGridProps) {
    return <PortfolioFilterGridView {...props} selectedFilter="all" />;
}

export default function PortfolioFilterGrid(props: PortfolioFilterGridProps) {
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const selectedFilter = parseFilterParam(searchParams.get(FILTER_QUERY_PARAM));

    const handleSelectFilter = (filter: FilterType) => {
        if (filter === selectedFilter) return;

        const params = new URLSearchParams(searchParams.toString());
        if (filter === "all") {
            params.delete(FILTER_QUERY_PARAM);
        } else {
            params.set(FILTER_QUERY_PARAM, filter);
        }

        const query = params.toString();
        const nextUrl = query ? `${pathname}?${query}` : pathname;
        window.history.pushState(null, "", nextUrl);
    };

    return (
        <PortfolioFilterGridView
            {...props}
            selectedFilter={selectedFilter}
            onSelectFilter={handleSelectFilter}
        />
    );
}
