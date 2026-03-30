import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const projects = [
  {
    title: "Responsible AI Toolkit",
    description:
      "A comprehensive toolkit for AI explainability and fairness auditing using SHAP, LIME, and custom fairness metrics. Helps developers build transparent and unbiased machine learning models.",
    tags: ["SHAP", "LIME", "Fairness Auditing", "Python", "Explainable AI"],
    link: "https://github.com/amano2/responsibleAI",
  },
  {
    title: "Plant Disease Detection",
    description:
      "Deep learning system using MobileNetV2 architecture to identify plant diseases from leaf images. Integrated with a Django backend for real-time prediction via web interface.",
    tags: ["MobileNetV2", "Django", "TensorFlow", "Computer Vision"],
    link: "https://github.com/amano2/plant-web",
  },
  {
    title: "Livestock Diagnostics Platform",
    description:
      "An intelligent diagnostic system with a Flask backend serving real-time prediction APIs for livestock health assessment. Enables veterinarians to get instant AI-powered insights.",
    tags: ["Flask", "REST API", "Real-Time ML", "Healthcare AI"],
    link: "https://github.com/amano2/krishidost",
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
