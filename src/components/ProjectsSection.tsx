import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink } from "lucide-react";

const projects = [
  {
    number: "01",
    category: "COMPUTER VISION · 2024",
    title: "Plant Disease Detection",
    titleGradient: null,
    description:
      "An intelligent image classification platform that identifies plant diseases from leaf imagery and delivers fast, actionable guidance through a Django-powered interface.",
    tags: ["Deep Learning", "MobileNetV2", "Django"],
    link: "https://github.com/amano2/plant-web",
    // Exact sampled values from Image 3
    panelBg: "#281934",
    panelBorder: "rgba(171,69,252,0.3)",
    numberColor: "#fe9a00",      // Sampled #fe9a00
    tagColor: "#fe9a00",
    tagBorder: "rgba(254,154,0,0.25)",
    tagText: "#fe9a00",
    accentColor: "#ab45fc",      // Sampled #ab45fc
  },
  {
    number: "02",
    category: "AGENTIC SYSTEMS · 2025",
    title: "Agentic Enterprise Copilot·",
    titleSuffix: " Trust Layer",
    titleSuffixColor: "#00bc7d",
    description:
      "A grounded enterprise copilot designed around traceable retrieval, tool orchestration, and reliable workflows for high-stakes internal knowledge.",
    tags: ["LangGraph", "FastAPI", "React", "ChromaDB"],
    link: "https://github.com/amano2/agentic-copilot-trust-layer",
    // Exact sampled values from Image 3
    panelBg: "#102820",
    panelBorder: "rgba(0,188,125,0.3)",
    numberColor: "#00bc7d",      // Sampled #00bc7d
    tagColor: "#00bc7d",
    tagBorder: "rgba(0,188,125,0.25)",
    tagText: "#00bc7d",
    accentColor: "#00bc7d",      // Sampled #00bc7d
  },
  {
    number: "03",
    category: "FORECASTING INTELLIGENCE · 2025",
    title: "iTransform—",
    titleSuffix: " GenAI Forecasting Assistant",
    titleSuffixColor: "#ff2056",
    description:
      "A conversational forecasting workspace that pairs time-series models with GenAI explanations, helping teams explore signals, scenarios, and decisions in one place.",
    tags: ["PyTorch", "FastAPI", "React", "statsmodels", "SQLite"],
    link: "https://github.com/amano2/GenAI-Powered-Analytics-Forecasting-Assistant",
    // Exact sampled values from Image 3
    panelBg: "#31141b",
    panelBorder: "rgba(255,32,86,0.3)",
    numberColor: "#ff2056",      // Sampled #ff2056
    tagColor: "#ff2056",
    tagBorder: "rgba(255,32,86,0.25)",
    tagText: "#ff2056",
    accentColor: "#ff2056",      // Sampled #ff2056
  },
];


export default function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-24 px-6 relative" ref={ref}>
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-[#22c55e]" />
            <span className="font-mono text-xs uppercase tracking-widest text-[#22c55e]">
              03 / Selected Work
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
            <h2 className="text-4xl md:text-5xl font-bold font-body tracking-tight text-foreground">
              Projects<span style={{ color: "#22c55e" }}>.</span>
            </h2>
            <p className="text-xs text-muted-foreground font-mono max-w-[240px] text-left md:text-right leading-relaxed">
              A collection of systems built to turn complex problems into useful experiences.
            </p>
          </div>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="mb-6 border-t"
          style={{ borderColor: "rgba(255,255,255,0.06)" }}
        />

        {/* Project rows */}
        <div className="space-y-4">
          {projects.map((project, i) => (
            <motion.a
              key={project.number}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 32 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.12 * i }}
              className="group flex flex-col md:flex-row rounded-xl overflow-hidden transition-all duration-300"
              style={{
                border: `1px solid ${project.panelBorder}`,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = `0 0 40px ${project.tagColor}20`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              {/* Left colored panel */}
              <div
                className="md:w-56 shrink-0 p-6 flex flex-col justify-between"
                style={{ background: project.panelBg }}
              >
                {/* Number + arrow */}
                <div className="flex items-start justify-between">
                  <span
                    className="font-mono font-bold text-4xl leading-none"
                    style={{ color: project.numberColor }}
                  >
                    {project.number}
                  </span>
                  <ExternalLink
                    className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity"
                    style={{ color: project.numberColor }}
                  />
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mt-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[9px] px-2 py-0.5 rounded"
                      style={{
                        background: `${project.tagColor}18`,
                        border: `1px solid ${project.tagBorder}`,
                        color: project.tagText,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right content panel */}
              <div
                className="flex-1 p-6 flex flex-col justify-between"
                style={{
                  background: "rgba(255,255,255,0.02)",
                }}
              >
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-3">
                    {project.category}
                  </p>
                  <h3 className="font-body font-bold text-xl text-foreground mb-3 leading-snug group-hover:text-white transition-colors">
                    {project.title}
                    {project.titleSuffix && (
                      <span style={{ color: project.titleSuffixColor }}>
                        {project.titleSuffix}
                      </span>
                    )}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-xl">
                    {project.description}
                  </p>
                </div>

                <div className="mt-5">
                  <span
                    className="font-mono text-xs"
                    style={{ color: project.accentColor }}
                  >
                    View case study ↗
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
