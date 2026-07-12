import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const experiences = [
  {
    title: "M.Tech in AI & Data Science",
    org: "Kalinga Institute of Industrial Technology | Bhubaneswar, Odisha",
    period: "2025 - 2027",
    detail: "Co-Branded in collaboration with LTI Mindtree and L&T EduTech",
    cgpa: "CGPA: 7.76",
    color: "#a855f7",
    icon: "🎓",
  },
  {
    title: "B.Tech. Computer Science and Engineering",
    org: "Techno India University | Kolkata, India",
    period: "2021 - 2025",
    detail: "B.Tech. Computer Science and Engineering core curriculum",
    cgpa: "CGPA: 7.91",
    color: "#06b6d4",
    icon: "🎓",
  },
  {
    title: "Design Thinking and Innovation",
    org: "IIT Bombay via Coursera",
    period: "Feb 2026 - Apr 2026",
    detail: "Credential ID: LTBJP78F3DON",
    cgpa: "Certified",
    color: "#ec4899",
    icon: "🏅",
  },
];

export default function ExperienceSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="py-24 px-6 relative" ref={ref}>
      <div
        className="absolute bottom-0 left-0 w-72 h-72 rounded-full pointer-events-none opacity-10"
        style={{
          background: "radial-gradient(circle, #06b6d4, transparent 70%)",
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
          <p className="font-mono text-xs uppercase tracking-widest mb-2" style={{ color: "#06b6d4" }}>
            // Education & Certifications
          </p>
          <h2 className="text-3xl md:text-4xl font-bold font-body">
            My{" "}
            <span className="gradient-text-cyan">Experience</span>
          </h2>
        </motion.div>

        <div className="space-y-4">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.title}
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.12 * i }}
              className="group flex items-center gap-5 p-5 rounded-2xl transition-all duration-300"
              style={{
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = `${exp.color}55`;
                (e.currentTarget as HTMLElement).style.background = `${exp.color}0d`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)";
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.025)";
              }}
            >
              {/* Icon circle */}
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-xl shrink-0"
                style={{ background: `${exp.color}20`, border: `1px solid ${exp.color}40` }}
              >
                {exp.icon}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                  <h3 className="font-body font-bold text-foreground text-sm md:text-base truncate">{exp.title}</h3>
                  <span
                    className="font-mono text-[10px] shrink-0 px-2 py-0.5 rounded-full border"
                    style={{ color: exp.color, borderColor: `${exp.color}40`, background: `${exp.color}12` }}
                  >
                    {exp.period}
                  </span>
                </div>
                <p className="font-mono text-xs text-muted-foreground mt-0.5">{exp.org}</p>
                <p className="text-xs text-muted-foreground/60 mt-0.5">{exp.detail}</p>
              </div>

              {/* CGPA / Status badge */}
              <div className="shrink-0 hidden sm:block">
                <span
                  className="text-xs font-mono font-semibold px-3 py-1 rounded-full"
                  style={{ background: `${exp.color}18`, color: exp.color }}
                >
                  {exp.cgpa}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
