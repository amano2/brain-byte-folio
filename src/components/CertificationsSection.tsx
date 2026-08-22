import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink } from "lucide-react";

export default function CertificationsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="certifications" className="pb-16 px-6" ref={ref}>
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-xs uppercase tracking-widest text-[#c084fc]">
              03 // CREDENTIALS
            </span>
          </div>
          <div className="flex items-end justify-between">
            <h2 className="text-3xl md:text-4xl font-bold font-mono text-foreground tracking-tight">
              Certifications
            </h2>
            <span className="font-mono text-xs text-muted-foreground hidden sm:block">
              verified learning
            </span>
          </div>
        </motion.div>

        {/* Certification row */}
        <motion.a
          href="https://drive.google.com/file/d/1E7JlWh6J-lvtzN32NXO8KL_2kAISTMKB/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="group flex items-center gap-5 p-5 rounded-2xl transition-all duration-300"
          style={{
            background: "rgba(168,85,247,0.04)",
            border: "1px solid rgba(168,85,247,0.22)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(168,85,247,0.5)";
            (e.currentTarget as HTMLElement).style.background = "rgba(168,85,247,0.08)";
            (e.currentTarget as HTMLElement).style.boxShadow = "0 0 25px rgba(168,85,247,0.15)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(168,85,247,0.22)";
            (e.currentTarget as HTMLElement).style.background = "rgba(168,85,247,0.04)";
            (e.currentTarget as HTMLElement).style.boxShadow = "none";
          }}
        >
          {/* Icon */}
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
            style={{
              background: "rgba(168,85,247,0.15)",
              border: "1px solid rgba(168,85,247,0.35)",
              color: "#c084fc",
            }}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 3v16l7-4 7 4V3a2 2 0 00-2-2H7a2 2 0 00-2 2z"
              />
            </svg>
          </div>

          {/* Text */}
          <div className="flex-1 min-w-0">
            <p className="font-mono font-bold text-base text-foreground group-hover:text-white transition-colors">
              Design Thinking and Innovation
            </p>
            <p className="font-mono text-xs text-muted-foreground mt-1">
              IIT Bombay via Coursera · Feb–Apr 26
            </p>
          </div>

          {/* External link */}
          <ExternalLink
            className="w-5 h-5 shrink-0 text-[#c084fc] group-hover:text-purple-300 transition-colors"
          />
        </motion.a>
      </div>
    </section>
  );
}
