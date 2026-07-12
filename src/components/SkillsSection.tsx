import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const skillCategories = [
  {
    icon: "🌐",
    title: "Languages",
    skills: ["C", "C++", "Java", "JavaScript", "Python", "SQL"],
    color: "#a855f7",
    border: "rgba(168,85,247,0.3)",
  },
  {
    icon: "📦",
    title: "Frameworks & Libraries",
    skills: ["Pandas", "NumPy", "Matplotlib", "ScikitLearn", "Flask", "Django", "Node", "Express"],
    color: "#ec4899",
    border: "rgba(236,72,153,0.3)",
  },
  {
    icon: "⚙️",
    title: "Tools & Databases",
    skills: ["Excel", "PowerPoint", "MySQL", "Postman", "PyTorch", "TensorFlow", "Docker", "Kubernetes", "Firebase"],
    color: "#06b6d4",
    border: "rgba(6,182,212,0.3)",
  },
  {
    icon: "🖥️",
    title: "Platforms",
    skills: ["Jupyter Notebook", "VS Code", "IntelliJ IDEA", "MySQL Workbench", "Google Colab", "Docker Desktop"],
    color: "#6366f1",
    border: "rgba(99,102,241,0.3)",
  },
  {
    icon: "🧠",
    title: "Industry Knowledge",
    skills: ["Data Structures & Algorithms (DSA)", "Machine Learning", "Data Science", "Deep Learning", "GenAI", "LLMs", "Agentic AI", "Web Development (Flask & Django)", "DevOps", "CI/CD Pipeline"],
    color: "#14b8a6",
    border: "rgba(20,184,166,0.3)",
  },
  {
    icon: "🤝",
    title: "Soft Skills",
    skills: ["Time Management", "Organization", "Leadership", "Teamwork", "Problem Solving"],
    color: "#f59e0b",
    border: "rgba(245,158,11,0.3)",
  },
];

export default function SkillsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-24 px-6 relative" ref={ref}>
      {/* Subtle background orb */}
      <div
        className="absolute top-0 right-0 w-80 h-80 rounded-full pointer-events-none opacity-10"
        style={{
          background: "radial-gradient(circle, #a855f7, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="font-mono text-xs uppercase tracking-widest mb-2" style={{ color: "#a855f7" }}>
            // What I'm Offering
          </p>
          <h2 className="text-3xl md:text-4xl font-bold font-body">
            Skills &{" "}
            <span className="gradient-text-purple">Expertise</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
          {skillCategories.map((svc, i) => (
            <motion.div
              key={svc.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.08 * i }}
              className="service-card p-6 rounded-2xl transition-all duration-300 cursor-default group flex flex-col justify-between"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: `1px solid ${svc.border}`,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = `rgba(${svc.color === "#a855f7" ? "168,85,247" : svc.color === "#ec4899" ? "236,72,153" : svc.color === "#06b6d4" ? "6,182,212" : svc.color === "#6366f1" ? "99,102,241" : svc.color === "#14b8a6" ? "20,184,166" : "245,158,11"},0.08)`;
                (e.currentTarget as HTMLElement).style.borderColor = svc.color;
                (e.currentTarget as HTMLElement).style.boxShadow = `0 0 24px ${svc.color}22`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)";
                (e.currentTarget as HTMLElement).style.borderColor = svc.border;
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              <div>
                <div
                  className="service-icon w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4 transition-all duration-300"
                  style={{ background: `${svc.color}18` }}
                >
                  {svc.icon}
                </div>
                <h3 className="font-body font-bold text-foreground mb-3 text-base">{svc.title}</h3>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {svc.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-[10px] font-mono px-2 py-0.5 rounded-full border transition-all duration-300"
                      style={{
                        borderColor: `${svc.color}35`,
                        color: `${svc.color}dd`,
                        background: `${svc.color}08`,
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Language tags row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-10 flex flex-wrap gap-2"
        >
          {["Python", "LangGraph", "FastAPI", "React", "Django", "PyTorch", "TensorFlow", "Docker", "Kubernetes", "ChromaDB", "SQLite", "ScikitLearn", "SQL", "JavaScript", "Java", "C++"].map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 rounded-full text-xs font-mono border"
              style={{
                background: "rgba(168,85,247,0.07)",
                borderColor: "rgba(168,85,247,0.25)",
                color: "#c084fc",
              }}
            >
              {skill}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
