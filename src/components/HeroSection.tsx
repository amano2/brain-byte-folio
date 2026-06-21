import { motion } from "framer-motion";
import TerminalWindow from "./TerminalWindow";

export default function HeroSection() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 py-20 relative overflow-hidden">
      {/* Background gradient orbs */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Large purple orb — top right */}
        <div
          className="orb-float absolute -top-20 -right-20 w-[420px] h-[420px] rounded-full opacity-25"
          style={{
            background: "radial-gradient(circle, #a855f7 0%, #6d28d9 40%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        {/* Cyan orb — bottom left */}
        <div
          className="orb-float-slow absolute -bottom-10 -left-10 w-[360px] h-[360px] rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, #06b6d4 0%, #0891b2 40%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        {/* Pink orb — center-left */}
        <div
          className="orb-float-delay absolute top-1/2 left-10 w-[200px] h-[200px] rounded-full opacity-15"
          style={{
            background: "radial-gradient(circle, #ec4899 0%, #db2777 50%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `linear-gradient(hsl(140 100% 50%) 1px, transparent 1px), linear-gradient(90deg, hsl(140 100% 50%) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto space-y-8">
        {/* Pre-heading badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center"
        >
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold border"
            style={{
              background: "rgba(168,85,247,0.12)",
              borderColor: "rgba(168,85,247,0.4)",
              color: "#c084fc",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
            Available for opportunities
          </span>
        </motion.div>

        {/* Main heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <p className="font-mono text-muted-foreground text-sm tracking-widest uppercase mb-3">
            Hello! I'm
          </p>
          <h1 className="text-5xl md:text-7xl font-bold font-body tracking-tight leading-tight">
            <span className="gradient-text-purple">Aman</span>{" "}
            <span className="text-foreground">Hossain</span>
          </h1>
        </motion.div>

        {/* Role tag row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2"
        >
          {[
            { label: "AI & ML", color: "rgba(168,85,247,0.15)", border: "rgba(168,85,247,0.4)", text: "#c084fc" },
            { label: "Data Science", color: "rgba(6,182,212,0.15)", border: "rgba(6,182,212,0.4)", text: "#22d3ee" },
            { label: "Full-Stack Dev", color: "rgba(236,72,153,0.15)", border: "rgba(236,72,153,0.4)", text: "#f472b6" },
            { label: "M.Tech @ KIIT", color: "rgba(99,102,241,0.15)", border: "rgba(99,102,241,0.4)", text: "#a5b4fc" },
          ].map((tag) => (
            <span
              key={tag.label}
              className="nav-pill border"
              style={{
                background: tag.color,
                borderColor: tag.border,
                color: tag.text,
              }}
            >
              {tag.label}
            </span>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex gap-4 justify-center flex-wrap"
        >
          <a
            href="#projects"
            className="px-6 py-3 font-mono text-sm font-semibold rounded-lg transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, #a855f7, #06b6d4)",
              color: "#fff",
              boxShadow: "0 0 24px rgba(168,85,247,0.35)",
            }}
          >
            View My Work ↗
          </a>
          <a
            href="https://docs.google.com/document/d/11tImHxaCmOKJL9geTI3tuFIyR_sbw9OXD987QWxEKQ8/edit?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 border font-mono text-sm font-semibold rounded-lg hover:bg-white/5 transition-all duration-300"
            style={{ borderColor: "rgba(168,85,247,0.5)", color: "#c084fc" }}
          >
            Download CV
          </a>
        </motion.div>

        {/* Terminal window — unchanged */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="pt-4"
        >
          <TerminalWindow />
        </motion.div>
      </div>
    </section>
  );
}
