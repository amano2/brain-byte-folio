import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 px-6 relative" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <p className="font-mono text-xs uppercase tracking-widest mb-2" style={{ color: "#a855f7" }}>
            // About Me
          </p>
          <h2 className="text-3xl md:text-4xl font-bold font-body">
            From Code to{" "}
            <span className="gradient-text-purple">Intelligence</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mt-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4 text-muted-foreground leading-relaxed"
          >
            <p>
              I'm a passionate developer transitioning from a solid foundation in Computer Science
              to the cutting edge of Artificial Intelligence and Data Science. My journey bridges
              full-stack development with machine learning, creating intelligent systems that solve
              real-world problems.
            </p>
            <p>
              Currently pursuing my M.Tech at Kalinga Institute of Industrial Technology (KIIT),
              I focus on building responsible, explainable AI systems while maintaining strong
              software engineering practices.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-4"
          >
            {/* Education cards */}
            <div
              className="p-4 rounded-xl transition-all duration-300 card-hover"
              style={{
                background: "rgba(168,85,247,0.07)",
                border: "1px solid rgba(168,85,247,0.25)",
              }}
            >
              <div className="flex justify-between items-start mb-1">
                <span className="font-mono text-xs" style={{ color: "#c084fc" }}>M.Tech — AI & Data Science</span>
                <span className="font-mono text-xs text-muted-foreground">2025 - 27</span>
              </div>
              <p className="font-body font-semibold text-foreground text-sm">Kalinga Institute of Industrial Technology</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">Co-Branded in collaboration with LTI Mindtree and L&T EduTech</p>
              <p className="font-mono text-xs text-muted-foreground mt-1">CGPA: 7.76</p>
            </div>

            <div
              className="p-4 rounded-xl transition-all duration-300 card-hover"
              style={{
                background: "rgba(6,182,212,0.07)",
                border: "1px solid rgba(6,182,212,0.25)",
              }}
            >
              <div className="flex justify-between items-start mb-1">
                <span className="font-mono text-xs" style={{ color: "#22d3ee" }}>B.Tech — Computer Science</span>
                <span className="font-mono text-xs text-muted-foreground">2021 - 25</span>
              </div>
              <p className="font-body font-semibold text-foreground text-sm">Techno India University</p>
              <p className="font-mono text-xs text-muted-foreground mt-1">CGPA: 7.91</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
