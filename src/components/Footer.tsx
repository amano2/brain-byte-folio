import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <footer id="contact" className="py-24 px-6 relative overflow-hidden" ref={ref}>
      {/* Background orbs */}
      <div
        className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full pointer-events-none opacity-20"
        style={{
          background: "radial-gradient(ellipse, #a855f7, #06b6d4, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div className="max-w-4xl mx-auto relative">
        {/* Big CTA heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <p className="font-mono text-xs uppercase tracking-widest mb-4" style={{ color: "#a855f7" }}>
            // Let's Connect
          </p>
          <h2 className="text-4xl md:text-6xl font-bold font-body leading-tight">
            <span className="text-foreground">Say </span>
            <span className="gradient-text-purple">Hi!</span>
            <span className="text-foreground"> and tell</span>
            <br />
            <span className="text-foreground">me about your </span>
            <span className="gradient-text-cyan">idea</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-sm max-w-md mx-auto">
            Open to collaborations, research opportunities, and interesting projects. Let's build something remarkable together.
          </p>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center gap-4 mb-10"
        >
          {[
            {
              href: "https://github.com/amano2",
              icon: <Github className="w-5 h-5" />,
              label: "GitHub",
              color: "#a855f7",
            },
            {
              href: "https://www.linkedin.com/in/aman-hossain-53a893242/",
              icon: <Linkedin className="w-5 h-5" />,
              label: "LinkedIn",
              color: "#06b6d4",
            },
            {
              href: "mailto:amanhossainmail@gmail.com",
              icon: <Mail className="w-5 h-5" />,
              label: "Email",
              color: "#ec4899",
            },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.label}
              className="group flex items-center gap-2 px-5 py-3 rounded-xl transition-all duration-300"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = `${item.color}60`;
                (e.currentTarget as HTMLElement).style.background = `${item.color}12`;
                (e.currentTarget as HTMLElement).style.color = item.color;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
                (e.currentTarget as HTMLElement).style.color = "";
              }}
            >
              <span className="text-muted-foreground group-hover:text-current transition-colors">{item.icon}</span>
              <span className="font-mono text-xs text-muted-foreground group-hover:text-current transition-colors">{item.label}</span>
            </a>
          ))}
        </motion.div>

        {/* Email CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <a
            href="mailto:amanhossainmail@gmail.com"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-mono text-sm font-semibold transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, #a855f7, #06b6d4)",
              color: "#fff",
              boxShadow: "0 0 32px rgba(168,85,247,0.3)",
            }}
          >
            <Mail className="w-4 h-4" />
            amanhossainmail@gmail.com
          </a>
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <p className="font-mono text-xs text-muted-foreground/50">
            © {new Date().getFullYear()} Aman Hossain
          </p>
          <p className="font-mono text-xs text-muted-foreground/30">
            Built with React · Vite · Framer Motion
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
