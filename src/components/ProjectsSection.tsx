import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const projects = [
  {
    title: "Plant Disease Detection using Leaf Images",
    subtitle: "Final Year Project in B. Tech. — DL & Django Developer",
    description:
      "Engineered an automated, image-based plant disease detection system using deep learning and computer vision to enable early diagnosis and support sustainable agriculture. Employed transfer learning using pre-trained CNN architectures and MobileNetV2 to classify diseases in plant leaf images with high accuracy. Fine-tuned the models on a curated dataset (PlantVillage) containing thousands of annotated leaf images across multiple plant species and disease types.",
    tags: ["Deep Learning", "MobileNetV2", "Django", "Computer Vision", "PlantVillage"],
    link: "https://github.com/amano2/plant-web",
    color: "#a855f7",
    accentBg: "rgba(168,85,247,0.12)",
    accent: "#c084fc",
    number: "01",
  },
  {
    title: "Agentic Enterprise Copilot · Trust Layer",
    subtitle: "Asynchronous Multi-Agent Decision Support System",
    description:
      "Developed a production-grade, human-in-the-loop decision support system for regulated insurance claims using an asynchronous LangGraph supervisor pattern to coordinate specialized AI agents. Features a hybrid RAG pipeline combining ChromaDB vector search with TF-IDF token matching, optimized by a Cross-Encoder re-ranker. Utilizes a dual-pass self-consistency scorer and an independent challenger auditor agent to automatically flag ambiguous cases or policy exclusions.",
    tags: ["Python", "LangGraph", "FastAPI", "React", "ChromaDB"],
    link: "https://github.com/amano2/agentic-copilot-trust-layer",
    color: "#06b6d4",
    accentBg: "rgba(6,182,212,0.12)",
    accent: "#22d3ee",
    number: "02",
  },
  {
    title: "iTransform — GenAI Forecasting Assistant",
    subtitle: "Retail Analytics & Glassmorphic React Dashboard",
    description:
      "Developed a full-stack retail analytics dashboard that competes multivariate SARIMAX against a PyTorch LSTM model on time-series sales data, facilitating live what-if discount simulations. Implemented a zero-dependency RAG architecture featuring a scikit-learn TF-IDF semantic context matcher coupled with OpenRouter LLMs. Engineered a multi-layered trust system to cross-reference generated numeric claims against a SQLite database within a ±2% tolerance.",
    tags: ["Python", "FastAPI", "React", "PyTorch", "statsmodels", "SQLite"],
    link: "https://github.com/amano2/GenAI-Powered-Analytics-Forecasting-Assistant",
    color: "#ec4899",
    accentBg: "rgba(236,72,153,0.12)",
    accent: "#f472b6",
    number: "03",
  },
];

export default function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-24 px-6 relative" ref={ref}>
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none opacity-[0.06]"
        style={{
          background: "radial-gradient(circle, #a855f7, #06b6d4, transparent 70%)",
          filter: "blur(100px)",
        }}
      />

      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="font-mono text-xs uppercase tracking-widest mb-2" style={{ color: "#ec4899" }}>
            // Featured Projects
          </p>
          <h2 className="text-3xl md:text-4xl font-bold font-body">
            Case{" "}
            <span className="gradient-text-purple">Studies</span>
          </h2>
        </motion.div>

        <div className="space-y-6">
          {projects.map((project, i) => (
            <motion.a
              key={project.title}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.15 * i }}
              className="group block rounded-2xl overflow-hidden transition-all duration-300"
              style={{
                background: "rgba(255,255,255,0.025)",
                border: `1px solid rgba(255,255,255,0.06)`,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = `${project.color}55`;
                (e.currentTarget as HTMLElement).style.boxShadow = `0 0 40px ${project.color}18`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              <div className="flex flex-col md:flex-row">
                {/* Left colour panel */}
                <div
                  className="md:w-64 p-6 flex flex-col justify-between shrink-0"
                  style={{ background: project.accentBg }}
                >
                  <span
                    className="font-mono text-4xl font-bold opacity-30 select-none"
                    style={{ color: project.color }}
                  >
                    {project.number}
                  </span>
                  <div className="mt-6 flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono px-2 py-0.5 rounded-full border"
                        style={{
                          borderColor: `${project.color}50`,
                          color: project.accent,
                          background: `${project.color}15`,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right content */}
                <div className="flex-1 p-6 flex flex-col justify-between">
                  <div>
                    <p className="font-mono text-xs uppercase tracking-widest mb-1" style={{ color: project.accent }}>
                      {project.subtitle}
                    </p>
                    <h3 className="font-body font-bold text-xl text-foreground mb-3 group-hover:text-white transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{project.description}</p>
                  </div>
                  <div className="flex items-center gap-2 mt-4">
                    <span className="text-xs font-mono" style={{ color: project.accent }}>
                      View on GitHub ↗
                    </span>
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
