'use client';

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Project, { ProjectCardItem } from "@/components/home/Project";
import { ProjectCategory } from "@/data/projects";

type FilterType = "all" | ProjectCategory;

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

export default function PortfolioFilterGrid({
    projects,
    filterLabels,
    categoryBadgeLabels,
    emptyMessage,
}: PortfolioFilterGridProps) {
    const [selectedFilter, setSelectedFilter] = useState<FilterType>("all");

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
                            onClick={() => setSelectedFilter(filter.id)}
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
            {filteredProjects.length === 0 ? (
                <div className="py-20 text-center text-neutral-500 bg-neutral-50 rounded-3xl">
                    <p className="text-lg">{emptyMessage}</p>
                </div>
            ) : (
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project) => (
                            <motion.div
                                key={project.id}
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.25 }}
                                className="h-full flex flex-col"
                            >
                                <Project
                                    project={project}
                                    className="h-full"
                                    categoryBadgeLabel={
                                        categoryBadgeLabels[project.category]
                                    }
                                />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            )}
        </div>
    );
}
