import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function CertificationsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="certifications" className="py-24 px-6" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="font-mono text-xs uppercase tracking-widest mb-2" style={{ color: "#6366f1" }}>
            // Verified Expertise
          </p>
          <h2 className="text-3xl md:text-4xl font-bold font-body">
            My{" "}
            <span className="gradient-text-cyan">Certifications</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Design Thinking */}
          <motion.a
            href="https://drive.google.com/file/d/1E7JlWh6J-lvtzN32NXO8KL_2kAISTMKB/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="group p-6 rounded-2xl block transition-all duration-300"
            style={{
              background: "rgba(168,85,247,0.07)",
              border: "1px solid rgba(168,85,247,0.25)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(168,85,247,0.6)";
              (e.currentTarget as HTMLElement).style.background = "rgba(168,85,247,0.12)";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 0 24px rgba(168,85,247,0.15)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(168,85,247,0.25)";
              (e.currentTarget as HTMLElement).style.background = "rgba(168,85,247,0.07)";
              (e.currentTarget as HTMLElement).style.boxShadow = "none";
            }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-xl"
                style={{ background: "rgba(168,85,247,0.2)", border: "1px solid rgba(168,85,247,0.4)" }}
              >
                🎨
              </div>
              <div>
                <h4 className="font-body font-bold text-foreground group-hover:text-white transition-colors">
                  Design Thinking and Innovation
                </h4>
                <p className="font-mono text-xs text-muted-foreground mt-0.5">IIT Bombay via Coursera</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed mb-4">
              Mastered human-centered design methodologies and systematic innovation frameworks
              under senior faculty guidance.
            </p>
            <div className="flex justify-between items-center">
              <span className="font-mono text-[10px] text-muted-foreground">ID: LTBJP78F3DON</span>
              <span className="font-mono text-[10px]" style={{ color: "#c084fc" }}>Feb 26 - Apr 26 ↗</span>
            </div>
          </motion.a>

          {/* SAP */}
          <motion.a
            href="https://drive.google.com/file/d/1aoCQQSNlH53soyfESFcGm1HCcDteZven/view?usp=drivesdk"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="group p-6 rounded-2xl block transition-all duration-300"
            style={{
              background: "rgba(6,182,212,0.07)",
              border: "1px solid rgba(6,182,212,0.25)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(6,182,212,0.6)";
              (e.currentTarget as HTMLElement).style.background = "rgba(6,182,212,0.12)";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 0 24px rgba(6,182,212,0.15)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(6,182,212,0.25)";
              (e.currentTarget as HTMLElement).style.background = "rgba(6,182,212,0.07)";
              (e.currentTarget as HTMLElement).style.boxShadow = "none";
            }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-xl"
                style={{ background: "rgba(6,182,212,0.2)", border: "1px solid rgba(6,182,212,0.4)" }}
              >
                🏅
              </div>
              <div>
                <h4 className="font-body font-bold text-foreground group-hover:text-white transition-colors">
                  SAP S/4HANA
                </h4>
                <p className="font-mono text-xs text-muted-foreground mt-0.5">Enterprise Software</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Demonstrates versatility across AI/ML and enterprise systems for large-scale operations.
            </p>
            <div className="flex justify-end mt-4">
              <span className="font-mono text-[10px]" style={{ color: "#22d3ee" }}>View Certificate ↗</span>
            </div>
          </motion.a>
        </div>
      </div>
    </section>
  );
}
