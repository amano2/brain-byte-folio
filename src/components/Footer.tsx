import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Github, Linkedin, Mail, Send } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <footer id="contact" className="py-28 px-6 relative overflow-hidden bg-[#07080a]" ref={ref}>
      {/* Ambient background glows matching Image 4 */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Deep purple ambient glow at top-center */}
        <div
          className="absolute -top-[100px] left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(ellipse, rgba(199, 80, 253, 0.16) 0%, rgba(168, 85, 247, 0.05) 50%, transparent 75%)",
            filter: "blur(110px)",
          }}
        />
        {/* Deep green/mint ambient glow at bottom-left */}
        <div
          className="absolute bottom-[-50px] -left-[100px] w-[550px] h-[450px] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(0, 255, 85, 0.12) 0%, rgba(0, 194, 89, 0.03) 50%, transparent 75%)",
            filter: "blur(100px)",
          }}
        />
      </div>

      <div className="max-w-3xl mx-auto relative text-center">
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-8"
        >
          <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#00ff55]">
            <span className="w-2 h-2 rounded-full bg-[#00ff55] animate-pulse" />
            OPEN TO MEANINGFUL COLLABORATIONS
          </span>
        </motion.div>

        {/* Main heading */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-6xl font-bold font-body leading-tight mb-4 tracking-tight"
        >
          <span className="text-foreground">Say Hi! and tell me</span>
          <br />
          <span
            style={{
              background: "linear-gradient(135deg, #c750fd 0%, #ff45c1 45%, #50fafd 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            about your idea
          </span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-muted-foreground text-sm leading-relaxed mb-10 max-w-md mx-auto"
        >
          Whether you are building intelligent products, exploring a bold concept, or
          simply want to connect, I would love to hear from you.
        </motion.p>

        {/* Social buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex justify-center gap-3.5 flex-wrap mb-7"
        >
          {[
            {
              href: "https://github.com/amano2",
              icon: <Github className="w-4 h-4" />,
              label: "GitHub",
            },
            {
              href: "https://www.linkedin.com/in/aman-hossain-53a893242/",
              icon: <Linkedin className="w-4 h-4" />,
              label: "LinkedIn",
            },
            {
              href: "mailto:amanhossainmail@gmail.com",
              icon: <Mail className="w-4 h-4" />,
              label: "Email",
            },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.label}
              className="group flex items-center gap-2 px-5 py-2.5 rounded-full font-mono text-xs text-muted-foreground hover:text-foreground transition-all duration-300"
              style={{
                background: "rgba(255,255,255,0.035)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.2)";
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.07)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.035)";
              }}
            >
              {item.icon}
              {item.label} ↗
            </a>
          ))}
        </motion.div>

        {/* Primary CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex justify-center mb-20"
        >
          <a
            href="mailto:amanhossainmail@gmail.com"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full font-mono text-sm font-bold text-[#09090b] transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, #c084fc 0%, #f472b6 40%, #38bdf8 100%)",
              boxShadow: "0 0 35px rgba(244,114,182,0.35), 0 0 70px rgba(56,189,248,0.2)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = "0 0 45px rgba(244,114,182,0.5), 0 0 90px rgba(56,189,248,0.3)";
              (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = "0 0 35px rgba(244,114,182,0.35), 0 0 70px rgba(56,189,248,0.2)";
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
            }}
          >
            Start a conversation
            <Send className="w-4 h-4 text-[#09090b]" />
          </a>
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-6"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <p className="font-mono text-xs text-muted-foreground/60">
            © 2025 Aman Hossain
          </p>
          <Link
            to="/blog"
            className="font-mono text-xs text-muted-foreground/60 hover:text-foreground transition-colors"
          >
            Blog ↗
          </Link>
          <p className="font-mono text-xs text-muted-foreground/40">
            Built with React · Vite · Framer Motion
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
