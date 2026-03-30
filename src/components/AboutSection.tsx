import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 px-6" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-mono text-primary text-sm tracking-widest uppercase mb-2 text-glow">
            // About Me
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold font-body mb-8">
            From Code to <span className="text-primary">Intelligence</span>
          </h3>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
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
              Currently pursuing my M.Tech at KIIT University, I focus on building responsible, 
              explainable AI systems while maintaining strong software engineering practices.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-4"
          >
            {/* Education cards */}
            <div className="p-4 rounded-lg border border-border bg-card card-hover">
              <div className="flex justify-between items-start mb-1">
                <span className="font-mono text-primary text-xs text-glow">M.Tech — AI & Data Science</span>
                <span className="font-mono text-xs text-muted-foreground">Current</span>
              </div>
              <p className="font-body font-semibold text-foreground">KIIT University</p>
              <p className="font-mono text-sm text-secondary-foreground mt-1">CGPA: 7.38</p>
            </div>

            <div className="p-4 rounded-lg border border-border bg-card card-hover">
              <div className="flex justify-between items-start mb-1">
                <span className="font-mono text-primary text-xs text-glow">B.Tech — Computer Science</span>
                <span className="font-mono text-xs text-muted-foreground">Completed</span>
              </div>
              <p className="font-body font-semibold text-foreground">Techno India University</p>
              <p className="font-mono text-sm text-secondary-foreground mt-1">CGPA: 7.91</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
