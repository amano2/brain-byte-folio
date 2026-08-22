import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, GraduationCap, Award } from "lucide-react";

const timeline = [
  {
    type: "WORK",
    icon: <Briefcase className="w-4 h-4" />,
    iconBg: "#00bc7d",              // Sampled #00bc7d
    badgeColor: "#ffffff",
    badgeBg: "rgba(255,255,255,0.08)",
    badgeBorder: "rgba(255,255,255,0.15)",
    period: "2024 — PRESENT",
    title: "AI / ML Developer",
    org: "Independent · Remote",
    orgColor: "#888888",
    description:
      "Designing practical AI systems, agentic workflows, and full-stack experiences from first prototype to production-ready architecture.",
    tags: ["GenAI", "LangGraph", "Python"],
    side: "left",
  },
  {
    type: "EDUCATION",
    icon: <GraduationCap className="w-4 h-4" />,
    iconBg: "#c750fd",              // Sampled purple #c750fd
    badgeColor: "#fe9a00",          // Sampled amber #fe9a00
    badgeBg: "rgba(254,154,0,0.12)",
    badgeBorder: "rgba(254,154,0,0.35)",
    period: "2022 — 2024",
    title: "M.Tech · Computer Science",
    org: "KIIT University",
    orgColor: "#fe9a00",            // Sampled amber #fe9a00
    description:
      "Focused on machine learning and intelligent systems while turning research questions into useful, human-centered software.",
    tags: ["CGPA 7.76", "Research"],
    side: "right",
  },
  {
    type: "EDUCATION",
    icon: <GraduationCap className="w-4 h-4" />,
    iconBg: "#00d7d9",              // Sampled cyan #00d7d9
    badgeColor: "#ffffff",
    badgeBg: "rgba(255,255,255,0.08)",
    badgeBorder: "rgba(255,255,255,0.15)",
    period: "2021 — 2022",
    title: "B.Tech · Computer Science",
    org: "Techno India University",
    orgColor: "#00d7d9",
    description:
      "Built a strong foundation in software engineering, algorithms, data structures, and web development.",
    tags: ["CGPA 7.91", "DSA"],
    side: "left",
  },
  {
    type: "CERT",
    icon: <Award className="w-4 h-4" />,
    iconBg: "#c750fd",              // Sampled purple #c750fd
    badgeColor: "#c750fd",
    badgeBg: "rgba(199,80,253,0.12)",
    badgeBorder: "rgba(199,80,253,0.35)",
    period: "FEB 2026 — APR 2026",
    title: "Design Thinking & Innovation",
    org: "IIT Bombay via Coursera",
    orgColor: "#888888",
    description:
      "Mastered human-centered design methodologies and systematic innovation frameworks under senior faculty from the School of Design.",
    tags: ["ID: LTBJP78F3DON", "Certified"],
    side: "right",
  },
];

export default function ExperienceSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="py-24 px-6 relative" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-4"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-8" style={{ background: "#22c55e" }} />
            <span className="font-mono text-xs uppercase tracking-widest text-[#22c55e]">
              02 / Experience
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold font-body text-foreground tracking-tight">
                The path so far.
              </h2>
              <p className="mt-3 text-muted-foreground text-sm max-w-lg leading-relaxed">
                A timeline of the places, people, and problems that shaped how
                Aman builds intelligent products.
              </p>
            </div>
            <span
              className="shrink-0 self-start md:self-auto font-mono text-[10px] uppercase tracking-widest px-4 py-2 rounded-full border"
              style={{
                background: "rgba(255,255,255,0.04)",
                borderColor: "rgba(255,255,255,0.12)",
                color: "#9ca3af",
              }}
            >
              4 Milestones / Ongoing
            </span>
          </div>
        </motion.div>

        {/* ── DESKTOP: alternating timeline ── */}
        <div className="hidden md:block relative mt-16">
          <div
            className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px"
            style={{ background: "rgba(34,197,94,0.2)" }}
          />

          <div className="space-y-10">
            {timeline.map((item, i) => {
              const isLeft = item.side === "left";
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.55, delay: 0.12 * i }}
                  className="relative flex items-start"
                >
                  <div className="w-1/2 pr-10">
                    {isLeft && (
                      <div
                        className="p-5 rounded-xl transition-all duration-300"
                        style={{
                          background: "rgba(255,255,255,0.03)",
                          border: "1px solid rgba(255,255,255,0.07)",
                        }}
                      >
                        <TimelineCard item={item} />
                      </div>
                    )}
                  </div>

                  <div className="absolute left-1/2 -translate-x-1/2 top-5 flex items-center justify-center z-10">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center"
                      style={{
                        background: `${item.iconBg}20`,
                        border: `2px solid ${item.iconBg}60`,
                        boxShadow: `0 0 16px ${item.iconBg}40`,
                        color: item.iconBg,
                      }}
                    >
                      {item.icon}
                    </div>
                  </div>

                  <div className="w-1/2 pl-10">
                    {!isLeft && (
                      <div
                        className="p-5 rounded-xl transition-all duration-300"
                        style={{
                          background: "rgba(255,255,255,0.03)",
                          border: "1px solid rgba(255,255,255,0.07)",
                        }}
                      >
                        <TimelineCard item={item} />
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Mobile fallback: linear list */}
          <div className="md:hidden space-y-5 mt-[-2800px] relative">
            {/* Intentional: mobile is shown via the grid's first col always visible */}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineCard({ item }: { item: typeof timeline[0] }) {
  return (
    <>
      {/* Card top row */}
      <div className="flex items-center justify-between mb-3">
        <span
          className="font-mono text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-full border"
          style={{
            background: item.badgeBg,
            borderColor: item.badgeBorder,
            color: item.badgeColor,
          }}
        >
          {item.type}
        </span>
        <span className="font-mono text-[10px] text-muted-foreground">
          {item.period}
        </span>
      </div>

      {/* Title */}
      <h3 className="font-body font-bold text-foreground text-base mb-0.5">
        {item.title}
      </h3>

      {/* Org */}
      <p
        className="font-mono text-xs mb-3"
        style={{ color: item.orgColor ?? "#6b7280" }}
      >
        {item.org}
      </p>

      {/* Description */}
      <p className="text-xs text-muted-foreground leading-relaxed mb-4">
        {item.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {item.tags.map((tag) => (
          <span
            key={tag}
            className="font-mono text-[9px] px-2.5 py-0.5 rounded-full border"
            style={{
              background: "rgba(255,255,255,0.04)",
              borderColor: "rgba(255,255,255,0.1)",
              color: "#9ca3af",
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </>
  );
}
