import { motion } from "framer-motion";
import TerminalWindow from "./TerminalWindow";

export default function HeroSection() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 py-20 relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(hsl(140 100% 50%) 1px, transparent 1px), linear-gradient(90deg, hsl(140 100% 50%) 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }} />

      <div className="relative z-10 text-center max-w-4xl mx-auto space-y-8">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="font-mono text-primary text-sm tracking-widest uppercase text-glow"
        >
          &gt; Hello, World
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold font-body tracking-tight"
        >
          Hi, I'm{" "}
          <span className="text-primary text-glow-strong">Aman Hossain</span>.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl md:text-2xl text-muted-foreground font-light max-w-2xl mx-auto"
        >
          M.Tech Student in AI & Data Science | Full-Stack ML Developer
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex gap-4 justify-center flex-wrap"
        >
          <a
            href="#projects"
            className="px-6 py-3 bg-primary text-primary-foreground font-mono text-sm font-semibold rounded-md hover:shadow-[0_0_20px_hsl(140_100%_50%/0.4)] transition-all duration-300"
          >
            View My Projects
          </a>
          <a
            href="https://drive.google.com/file/d/1ikHEDfmDKGMtPQDexIk52CpeumRpaP8Y/view?usp=drive_link"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 border border-primary text-primary font-mono text-sm font-semibold rounded-md hover:bg-primary/10 transition-all duration-300"
          >
            Download CV
          </a>
        </motion.div>

        <div className="pt-8">
          <TerminalWindow />
        </div>
      </div>
    </section>
  );
}
