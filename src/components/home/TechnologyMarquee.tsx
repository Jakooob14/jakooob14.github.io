import { Fragment, ReactNode } from "react";
import { RiJavaFill, RiNextjsFill } from "react-icons/ri";
import {
  SiDocker,
  SiDotnet,
  SiNuxt,
  SiPostgresql,
  SiRedis,
} from "react-icons/si";

interface TechnologyItem {
  id: string;
  name: string;
  icon: ReactNode;
}

const TECHNOLOGIES: TechnologyItem[] = [
  { id: "nextjs", name: "Next.js", icon: <RiNextjsFill /> },
  { id: "nuxtjs", name: "Nuxt.js", icon: <SiNuxt /> },
  { id: "dotnet", name: "ASP.NET", icon: <SiDotnet /> },
  { id: "java", name: "Java", icon: <RiJavaFill /> },
  { id: "docker", name: "Docker", icon: <SiDocker /> },
  { id: "postgresql", name: "PostgreSQL", icon: <SiPostgresql /> },
  { id: "redis", name: "Redis", icon: <SiRedis /> },
];

const REPEAT_COUNT = 3;

interface TechnologyMarqueeProps {
  className?: string;
}

export default function TechnologyMarquee({ className = "" }: TechnologyMarqueeProps) {
  return (
    <div
      className={`group relative flex overflow-hidden select-none marquee-mask marquee-container ${className}`}
      aria-label="Technologies and tools"
    >
      <div className="flex shrink-0 items-center gap-16 pr-12 animate-marquee group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused]">
        {Array.from({ length: REPEAT_COUNT }).map((_, repeatIndex) => (
          <Fragment key={`primary-${repeatIndex}`}>
            {TECHNOLOGIES.map((tech) => (
              <Technology
                key={`${tech.id}-primary-${repeatIndex}`}
                icon={tech.icon}
                aria-hidden={repeatIndex > 0 ? "true" : undefined}
              >
                {tech.name}
              </Technology>
            ))}
          </Fragment>
        ))}
      </div>

      <div
        aria-hidden="true"
        className="flex shrink-0 items-center gap-12 pr-12 animate-marquee group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused]"
      >
        {Array.from({ length: REPEAT_COUNT }).map((_, repeatIndex) => (
          <Fragment key={`secondary-${repeatIndex}`}>
            {TECHNOLOGIES.map((tech) => (
              <Technology
                key={`${tech.id}-secondary-${repeatIndex}`}
                icon={tech.icon}
              >
                {tech.name}
              </Technology>
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  );
}

interface TechnologyProps {
  icon: ReactNode;
  children: ReactNode;
  "aria-hidden"?: "true" | undefined;
}

function Technology({ icon, children, ...props }: TechnologyProps) {
  return (
    <div className="flex gap-2 items-center shrink-0" {...props}>
      <span className="text-4xl">{icon}</span>
      <span className="text-3xl font-medium">{children}</span>
    </div>
  );
}
