import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function CertificationsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="certifications" className="py-24 px-6" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-mono text-primary text-sm tracking-widest uppercase mb-2 text-glow">
            // Certifications
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold font-body mb-12">
            Verified <span className="text-primary">Expertise</span>
          </h3>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="p-6 rounded-lg border border-border bg-card card-hover inline-block"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center text-xl border border-border">
              🏅
            </div>
            <div>
              <h4 className="font-body font-bold text-foreground">SAP S/4HANA</h4>
              <p className="font-mono text-xs text-muted-foreground mt-0.5">Enterprise Software Certification</p>
              <p className="text-xs text-secondary-foreground mt-1">
                Demonstrates versatility across AI/ML and enterprise systems
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
