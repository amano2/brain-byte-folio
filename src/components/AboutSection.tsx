import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 px-6 relative" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-14 items-center">
          {/* Left: Text content */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            {/* Section label */}
            <div className="flex items-center gap-2 mb-6">
              <span className="w-2 h-2 rounded-full bg-[#00c259]" />
              <span className="font-mono text-xs uppercase tracking-widest text-[#00c259]">
                ABOUT AMAN
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-4xl md:text-5xl font-bold font-body leading-[1.15] mb-6 text-foreground tracking-tight">
              Building intelligent
              <br />
              products with{" "}
              <span style={{ color: "#00c259" }}>purpose.</span>
            </h2>

            {/* Bio */}
            <p className="text-muted-foreground text-sm leading-relaxed mb-8 max-w-md">
              I'm Aman Hossain, an M.Tech student at KIIT focused on Artificial
              Intelligence, Machine Learning, Data Science, and Full-Stack
              Development. I enjoy turning complex ideas into thoughtful,
              reliable digital experiences.
            </p>

            {/* Badges */}
            <div className="flex flex-wrap gap-2.5">
              <span
                className="px-3.5 py-1.5 rounded-full font-mono text-xs border"
                style={{
                  background: "rgba(0, 194, 89, 0.12)",
                  borderColor: "rgba(0, 194, 89, 0.3)",
                  color: "#00c259",
                }}
              >
                M.Tech @ KIIT
              </span>
              <span
                className="px-3.5 py-1.5 rounded-full font-mono text-xs border"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  borderColor: "rgba(255,255,255,0.12)",
                  color: "#e5e7eb",
                }}
              >
                AI / ML
              </span>
              <span
                className="px-3.5 py-1.5 rounded-full font-mono text-xs border"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  borderColor: "rgba(255,255,255,0.12)",
                  color: "#e5e7eb",
                }}
              >
                Full-Stack Dev
              </span>
            </div>
          </motion.div>

          {/* Right: Code block */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div
              className="rounded-2xl overflow-hidden shadow-2xl"
              style={{
                background: "#0c0e12",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              {/* Header bar */}
              <div
                className="flex items-center justify-between px-5 py-3.5"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)" }}
              >
                <span className="font-mono text-xs text-muted-foreground">
                  aman@dev:~$
                </span>
                <span className="font-mono text-xs font-semibold" style={{ color: "#c750fd" }}>
                  profile.json
                </span>
              </div>

              {/* Code body */}
              <div className="p-6 font-mono text-sm leading-8 select-none">
                <div>
                  <span style={{ color: "#c750fd" }}>const </span>
                  <span style={{ color: "#00c259" }}>focus</span>
                  <span className="text-foreground"> = [</span>
                </div>
                <div className="pl-6">
                  <div className="text-muted-foreground">"intelligence",</div>
                  <div className="text-muted-foreground">"impact",</div>
                  <div className="text-muted-foreground">"innovation"</div>
                </div>
                <div className="text-foreground">];</div>
                <div className="mt-4 flex items-center" style={{ color: "#00c259" }}>
                  Ready to architect intelligence.
                  <span
                    className="inline-block w-2 h-4 ml-1.5 bg-[#00c259] animate-pulse"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
