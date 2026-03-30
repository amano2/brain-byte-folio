import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const skillCategories = [
  {
    title: "Languages",
    icon: "</>",
    skills: ["Python", "Java", "C++", "JavaScript", "SQL"],
  },
  {
    title: "AI / ML",
    icon: "🧠",
    skills: ["PyTorch", "TensorFlow", "Scikit-Learn", "Pandas", "NumPy"],
  },
  {
    title: "Backend & DevOps",
    icon: "⚙️",
    skills: ["Django", "Flask", "Docker", "Kubernetes"],
  },
];

export default function SkillsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-24 px-6" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-mono text-primary text-sm tracking-widest uppercase mb-2 text-glow">
            // Technical Toolkit
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold font-body mb-12">
            Tools I <span className="text-primary">Work With</span>
          </h3>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {skillCategories.map((category, i) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * (i + 1) }}
              className="p-6 rounded-lg border border-border bg-card card-hover group"
            >
              <div className="text-2xl mb-3">{category.icon}</div>
              <h4 className="font-mono text-primary text-sm font-semibold mb-4 text-glow">
                {category.title}
              </h4>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 rounded-full text-xs font-mono bg-secondary text-secondary-foreground border border-border group-hover:border-primary/30 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
