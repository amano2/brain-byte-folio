import { motion } from "framer-motion";
import { ArrowUpRight, Download } from "lucide-react";
import TerminalWindow from "./TerminalWindow";

export default function HeroSection() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-32 pb-20 relative overflow-hidden bg-[#07080a]">
      {/* Background ambient lighting matching reference */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft purple ambient glow on the left */}
        <div
          className="absolute top-[18%] -left-[120px] w-[550px] h-[550px] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(197, 122, 255, 0.14) 0%, rgba(168, 85, 247, 0.04) 50%, transparent 70%)",
            filter: "blur(90px)",
          }}
        />
        {/* Soft green/teal ambient glow on the right */}
        <div
          className="absolute top-[28%] -right-[120px] w-[550px] h-[550px] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(0, 220, 183, 0.13) 0%, rgba(0, 194, 89, 0.03) 50%, transparent 70%)",
            filter: "blur(100px)",
          }}
        />
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto space-y-7">
        {/* Available for opportunities badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center"
        >
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono tracking-widest border"
            style={{
              background: "rgba(0, 220, 183, 0.06)",
              borderColor: "rgba(0, 220, 183, 0.3)",
              color: "#00dcb7",
            }}
          >
            <span className="w-2 h-2 rounded-full bg-[#00dcb7] animate-pulse" />
            Available for opportunities
          </span>
        </motion.div>

        {/* < BUILD • LEARN • SHIP /> */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <p className="font-mono text-xs md:text-sm tracking-[0.25em] font-medium uppercase" style={{ color: "#00dcb7" }}>
            &lt; BUILD &nbsp;•&nbsp; LEARN &nbsp;•&nbsp; SHIP &nbsp;/&gt;
          </p>
        </motion.div>

        {/* Main Heading: Hello! I'm Aman Hossain */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-5xl sm:text-6xl md:text-7xl font-bold font-body tracking-tight leading-tight text-white"
        >
          Hello! I'm{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #c57aff 0%, #f17bbf 50%, #60e7fb 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Aman
          </span>{" "}
          Hossain
        </motion.h1>

        {/* Subtitle / Bio */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-sm md:text-base text-[#9ca3af] leading-relaxed max-w-2xl mx-auto font-body"
        >
          Designing intelligent systems and thoughtful digital experiences at the intersection of
          machine learning, data, and full-stack engineering.
        </motion.p>

        {/* 4 Role pill badges */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="flex flex-wrap justify-center gap-2.5 pt-1"
        >
          <span
            className="px-4 py-1.5 rounded-full font-mono text-xs border"
            style={{
              background: "rgba(197, 122, 255, 0.08)",
              borderColor: "rgba(197, 122, 255, 0.3)",
              color: "#c57aff",
            }}
          >
            AI &amp; ML
          </span>
          <span
            className="px-4 py-1.5 rounded-full font-mono text-xs border"
            style={{
              background: "rgba(0, 220, 183, 0.08)",
              borderColor: "rgba(0, 220, 183, 0.3)",
              color: "#00dcb7",
            }}
          >
            Data Science
          </span>
          <span
            className="px-4 py-1.5 rounded-full font-mono text-xs border"
            style={{
              background: "rgba(241, 123, 191, 0.08)",
              borderColor: "rgba(241, 123, 191, 0.3)",
              color: "#f17bbf",
            }}
          >
            Full-Stack Dev
          </span>
          <span
            className="px-4 py-1.5 rounded-full font-mono text-xs border"
            style={{
              background: "rgba(0, 216, 164, 0.08)",
              borderColor: "rgba(0, 216, 164, 0.3)",
              color: "#00d8a4",
            }}
          >
            M.Tech @ KIIT
          </span>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex gap-3.5 justify-center flex-wrap pt-2"
        >
          <a
            href="#projects"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-mono text-sm font-bold text-[#070b0c] transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, #00dcb7, #00d8a4)",
              boxShadow: "0 0 30px rgba(0, 220, 183, 0.45)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = "0 0 45px rgba(0, 220, 183, 0.65)";
              (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = "0 0 30px rgba(0, 220, 183, 0.45)";
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
            }}
          >
            View My Work
            <ArrowUpRight className="w-4 h-4 text-[#070b0c]" />
          </a>
          <a
            href="https://docs.google.com/document/d/11tImHxaCmOKJL9geTI3tuFIyR_sbw9OXD987QWxEKQ8/edit?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-mono text-sm font-semibold transition-all duration-300"
            style={{
              background: "#ffffff",
              color: "#070b0c",
              boxShadow: "0 0 20px rgba(255, 255, 255, 0.15)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "#f3f4f6";
              (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "#ffffff";
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
            }}
          >
            <Download className="w-4 h-4 text-[#00dcb7]" />
            Download CV
          </a>
        </motion.div>

        {/* Terminal window */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="pt-6"
        >
          <TerminalWindow />
        </motion.div>

        {/* Scroll to explore */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="pt-8 flex items-center justify-center gap-4 text-muted-foreground/40 font-mono text-xs tracking-[0.25em]"
        >
          <span className="w-12 h-px bg-white/10" />
          <span>SCROLL TO EXPLORE</span>
          <span className="w-12 h-px bg-white/10" />
        </motion.div>
      </div>
    </section>
  );
}
