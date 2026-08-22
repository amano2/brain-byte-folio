import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const skillCategories = [
  {
    title: "Languages",
    skills: ["C", "C++", "Java", "JavaScript", "Python", "SQL"],
    color: "#c750fd", // Sampled purple
  },
  {
    title: "Frameworks & Libraries",
    skills: ["Pandas", "NumPy", "Flask", "Django", "Node", "Express"],
    color: "#ff45c1", // Sampled pink
  },
  {
    title: "Tools & Databases",
    skills: ["MySQL", "Docker", "Kubernetes", "PyTorch", "TensorFlow", "Firebase"],
    color: "#00d7d9", // Sampled cyan
  },
  {
    title: "Platforms",
    skills: ["Jupyter", "VS Code", "Google Colab", "Docker Desktop"],
    color: "#818cf8", // Sampled indigo
  },
  {
    title: "Industry Knowledge",
    skills: ["ML", "Deep Learning", "GenAI", "LLMs", "Agentic AI", "DevOps"],
    color: "#00cca7", // Sampled teal
  },
  {
    title: "Soft Skills",
    skills: ["Leadership", "Teamwork", "Problem Solving"],
    color: "#efa810", // Sampled amber
  },
];

const allTechTags = [
  "Python", "PyTorch", "TensorFlow", "LangGraph", "FastAPI", "React",
  "Django", "Docker", "Kubernetes", "SQL", "GenAI", "LLMs",
  "Pandas", "NumPy", "Firebase", "Git",
];

export default function SkillsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-24 px-6 relative" ref={ref}>
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          {/* Label */}
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-green-400" />
            <span className="font-mono text-xs uppercase tracking-widest" style={{ color: "#22c55e" }}>
              02 / Expertise
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
            <h2 className="text-4xl md:text-5xl font-bold font-body tracking-tight">
              Skills &amp;
              <span
                className="ml-1.5"
                style={{
                  background: "linear-gradient(135deg, #c084fc 0%, #818cf8 50%, #38bdf8 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                tools
              </span>
            </h2>
            <p className="text-xs text-muted-foreground font-mono md:text-right max-w-xs leading-relaxed">
              A practical toolkit for building intelligent systems, polished
              products, and everything in between.
            </p>
          </div>
        </motion.div>

        {/* Skill cards grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mb-10">
          {skillCategories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.07 * i }}
              className="p-5 rounded-2xl transition-all duration-300"
              style={{
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = `${cat.color}45`;
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)";
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.025)";
              }}
            >
              {/* Card title with colored bullet */}
              <div className="flex items-center gap-2.5 mb-4">
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ background: cat.color, boxShadow: `0 0 8px ${cat.color}60` }}
                />
                <h3 className="font-body font-bold text-foreground text-sm tracking-tight">
                  {cat.title}
                </h3>
              </div>

              {/* Skill tags — monospace single-quoted */}
              <div className="flex flex-wrap gap-1.5">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="font-mono text-[10px] px-2.5 py-1 rounded-md"
                    style={{
                      background: `${cat.color}10`,
                      border: `1px solid ${cat.color}25`,
                      color: `${cat.color}ee`,
                    }}
                  >
                    '{skill}'
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="border-t mb-6"
          style={{ borderColor: "rgba(255,255,255,0.06)" }}
        />

        {/* Flat tech tag row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-wrap gap-2"
        >
          {allTechTags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[10px] px-2.5 py-1 rounded-full border"
              style={{
                background: "rgba(255,255,255,0.03)",
                borderColor: "rgba(255,255,255,0.1)",
                color: "#6b7280",
              }}
            >
              '{tag}'
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
