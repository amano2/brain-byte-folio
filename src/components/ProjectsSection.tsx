import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const projects = [
  {
    title: "Verity: AI-Powered News Verifier",
    description:
      "A news verification platform that automates misinformation detection using Google Gemini 2.5 Flash and LangChain. Features a Truth Score algorithm and a bespoke, newspaper-themed UI for professional-grade readability.",
    tags: ["Gemini 2.5 Flash", "LangChain", "FastAPI", "React.js", "Scraping"],
    link: "https://github.com/amano2/Verity",
  },
  {
    title: "Responsible AI Suite",
    description:
      "A technical suite focused on AI fairness and ethics, featuring a Fairness Lab for auditing demographic gaps and a Constitutional HR AI built with Gemini 2.0 Flash to ensure transparency in hiring.",
    tags: ["Gemini 2.0 Flash", "RLAIF", "AI Ethics", "Fairness Lab", "Python"],
    link: "https://github.com/amano2/responsibleAI",
  },
  {
    title: "Plant Disease Detection",
    description:
      "Automated image-based detection system using MobileNetV2 and deep learning to identify plant diseases from leaf images, helping farmers reduce crop loss through timely intervention.",
    tags: ["Deep Learning", "MobileNetV2", "Django", "Computer Vision", "PlantVillage"],
    link: "https://github.com/amano2/plant-web",
  },
];

export default function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-24 px-6" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-mono text-primary text-sm tracking-widest uppercase mb-2 text-glow">
            // Featured Projects
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold font-body mb-12">
            What I've <span className="text-primary">Built</span>
          </h3>
        </motion.div>

        <div className="space-y-6">
          {projects.map((project, i) => (
            <motion.a
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 * (i + 1) }}
              className="block p-6 rounded-lg border border-border bg-card card-hover group"
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="flex items-start justify-between mb-3">
                <h4 className="text-xl font-body font-bold text-foreground group-hover:text-primary transition-colors">
                  {project.title}
                </h4>
                <span className="font-mono text-primary text-xs text-glow opacity-0 group-hover:opacity-100 transition-opacity">
                  → View
                </span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded text-xs font-mono bg-secondary text-secondary-foreground border border-border"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
