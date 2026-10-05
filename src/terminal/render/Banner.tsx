import React, { useState, useEffect } from "react";

interface BannerProps {
  onCommandClick: (cmd: string) => void;
  onBootComplete?: () => void;
}

const ASCII_BANNER = `
 █████╗ ███╗   ███╗ █████╗ ███╗   ██╗    ██╗  ██╗ ██████╗ ███████╗███████╗ █████╗ ██╗███╗   ██╗
██╔══██╗████╗ ████║██╔══██╗████╗  ██║    ██║  ██║██╔═══██╗██╔════╝██╔════╝██╔══██╗██║████╗  ██║
███████║██╔████╔██║███████║██╔██╗ ██║    ███████║██║   ██║███████╗███████╗███████║██║██╔██╗ ██║
██╔══██║██║╚██╔╝██║██╔══██║██║╚██╗██║    ██╔══██║██║   ██║╚════██║╚════██║██╔══██║██║██║╚██╗██║
██║  ██║██║ ╚═╝ ██║██║  ██║██║ ╚████║    ██║  ██║╚██████╔╝███████║███████║██║  ██║██║██║ ╚████║
╚═╝  ╚═╝╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝    ╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚══════╝╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝
`;

const BOOT_LINES = [
  "Initializing AmanOS v2.4 ... OK",
  "Mounting virtual filesystem (/projects, /blog, /skills) ... OK",
  "Loading neural agents & model weights ... OK",
  "Ready."
];

export default function Banner({ onCommandClick, onBootComplete }: BannerProps) {
  const [bootIndex, setBootIndex] = useState(0);
  const [bootDone, setBootDone] = useState(false);

  useEffect(() => {
    // Check reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setBootDone(true);
      if (onBootComplete) onBootComplete();
      return;
    }

    if (bootIndex < BOOT_LINES.length) {
      const timer = setTimeout(() => {
        setBootIndex((prev) => prev + 1);
      }, 150);
      return () => clearTimeout(timer);
    } else {
      setBootDone(true);
      if (onBootComplete) onBootComplete();
    }
  }, [bootIndex, onBootComplete]);

  // Allow clicking or pressing any key to skip boot animation
  useEffect(() => {
    const handleKey = () => {
      setBootDone(true);
      if (onBootComplete) onBootComplete();
    };
    window.addEventListener("keydown", handleKey, { once: true });
    return () => window.removeEventListener("keydown", handleKey);
  }, [onBootComplete]);

  return (
    <div className="font-mono space-y-2 mb-4">
      {/* Boot Messages */}
      {!bootDone ? (
        <div className="space-y-0.5 text-xs text-[var(--term-muted)]">
          {BOOT_LINES.slice(0, bootIndex).map((line, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span className="text-[var(--term-accent)]">&gt;</span>
              <span>{line}</span>
            </div>
          ))}
          <p className="text-[10px] text-[var(--term-muted)] mt-2 italic">
            [Press any key or click to skip...]
          </p>
        </div>
      ) : (
        <>
          {/* ASCII Banner */}
          <div className="overflow-x-auto select-none py-1">
            <pre className="text-[7px] sm:text-[9px] md:text-[11px] leading-[1.15] text-[var(--term-accent)] font-bold">
              {ASCII_BANNER}
            </pre>
          </div>

          <div className="text-xs sm:text-sm space-y-1 text-[var(--term-fg)] border-t border-b border-[var(--term-border)] py-2 my-2">
            <p className="font-bold text-[var(--term-secondary)]">
              Aman Hossain · AI/ML Engineer & Full-Stack Developer
            </p>
            <p className="text-xs text-[var(--term-muted)]">
              M.Tech Data Science @ KIIT University × LTIMindtree | Trajectory Hallucination Detection & Multi-Agent Systems
            </p>
            <p className="text-xs mt-1">
              Type <button type="button" onClick={() => onCommandClick("help")} className="text-[var(--term-accent)] font-bold underline cursor-pointer">'help'</button> to see all available commands, or explore via the quick shortcuts below:
            </p>
          </div>

          {/* Quick command chips for non-technical visitors */}
          <div className="flex flex-wrap items-center gap-2 pt-1 pb-2">
            <span className="text-[11px] uppercase tracking-wider text-[var(--term-muted)]">
              Quick start:
            </span>
            {[
              { cmd: "about", label: "About Me" },
              { cmd: "projects", label: "Projects" },
              { cmd: "skills", label: "Skills" },
              { cmd: "blog", label: "Blog & Papers" },
              { cmd: "contact", label: "Contact" }
            ].map((chip) => (
              <button
                key={chip.cmd}
                type="button"
                onClick={() => onCommandClick(chip.cmd)}
                className="px-2.5 py-1 rounded text-xs border border-[var(--term-border)] bg-[var(--term-code-bg)] text-[var(--term-accent)] hover:border-[var(--term-accent)] hover:bg-[var(--term-accent)]/10 transition-all cursor-pointer font-mono shadow-sm"
              >
                {chip.cmd} &bull; <span className="opacity-70">{chip.label}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
