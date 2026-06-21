import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const services = [
  {
    icon: "🧠",
    title: "Machine Learning",
    desc: "Building and deploying supervised & unsupervised models with PyTorch, TensorFlow, and Scikit-Learn.",
    color: "#a855f7",
    border: "rgba(168,85,247,0.3)",
  },
  {
    icon: "⚖️",
    title: "Responsible AI",
    desc: "Fairness auditing, explainability (RLAIF), and Constitutional AI to build ethical, transparent systems.",
    color: "#ec4899",
    border: "rgba(236,72,153,0.3)",
  },
  {
    icon: "🌐",
    title: "Full-Stack Dev",
    desc: "End-to-end web apps using Django, FastAPI, React, and Node.js with CI/CD pipeline integration.",
    color: "#06b6d4",
    border: "rgba(6,182,212,0.3)",
  },
  {
    icon: "📊",
    title: "Data Science",
    desc: "Data wrangling, visualization, and analysis with Pandas, NumPy, and Matplotlib for actionable insights.",
    color: "#6366f1",
    border: "rgba(99,102,241,0.3)",
  },
  {
    icon: "🐳",
    title: "DevOps & Cloud",
    desc: "Containerization with Docker and Kubernetes, CI/CD pipelines, and automated deployments.",
    color: "#14b8a6",
    border: "rgba(20,184,166,0.3)",
  },
  {
    icon: "🔬",
    title: "Deep Learning",
    desc: "CNN architectures (MobileNetV2), transfer learning, and computer vision for real-world detection tasks.",
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
          {services.map((svc, i) => (
            <motion.div
              key={svc.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.08 * i }}
              className="service-card p-6 rounded-2xl transition-all duration-300 cursor-default group"
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
              <div
                className="service-icon w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4 transition-all duration-300"
                style={{ background: `${svc.color}18` }}
              >
                {svc.icon}
              </div>
              <h3 className="font-body font-bold text-foreground mb-2 text-base">{svc.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{svc.desc}</p>
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
          {["Python", "Java", "C++", "C", "JavaScript", "SQL", "FastAPI", "Django", "Docker", "Kubernetes", "PyTorch", "TensorFlow", "Pandas", "NumPy", "Matplotlib"].map((skill) => (
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
