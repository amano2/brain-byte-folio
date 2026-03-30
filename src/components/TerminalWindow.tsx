import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const commands = [
  { prompt: "aman@dev:~$", command: "cat skills.py", delay: 800 },
  { prompt: ">>>", command: 'languages = ["Python", "Java", "C++", "JavaScript", "SQL"]', delay: 600 },
  { prompt: ">>>", command: 'ai_ml = ["PyTorch", "TensorFlow", "Scikit-Learn", "Pandas", "NumPy"]', delay: 600 },
  { prompt: ">>>", command: 'backend = ["Django", "Flask", "Docker", "Kubernetes"]', delay: 600 },
  { prompt: ">>>", command: 'print(f"Ready to build the future. 🚀")', delay: 500 },
  { prompt: "", command: "Ready to build the future. 🚀", delay: 0 },
];

export default function TerminalWindow() {
  const [visibleLines, setVisibleLines] = useState(0);
  const [typedChars, setTypedChars] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!started) return;
    if (visibleLines >= commands.length) return;

    const currentCommand = commands[visibleLines];
    const fullText = currentCommand.command;

    if (typedChars < fullText.length) {
      const speed = 30 + Math.random() * 30;
      const timer = setTimeout(() => setTypedChars((c) => c + 1), speed);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setVisibleLines((l) => l + 1);
        setTypedChars(0);
      }, currentCommand.delay);
      return () => clearTimeout(timer);
    }
  }, [started, visibleLines, typedChars]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="rounded-lg border border-border bg-card overflow-hidden border-glow">
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-2.5 bg-secondary/50 border-b border-border">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
          <span className="ml-2 text-xs font-mono text-muted-foreground">aman@portfolio ~ skills.py</span>
        </div>

        {/* Terminal body */}
        <div className="p-4 font-mono text-sm leading-relaxed min-h-[200px] scanline">
          {commands.slice(0, visibleLines).map((line, i) => (
            <div key={i} className="flex gap-2">
              {line.prompt && <span className="text-primary text-glow shrink-0">{line.prompt}</span>}
              <span className={line.prompt ? "text-foreground" : "text-secondary-foreground italic"}>{line.command}</span>
            </div>
          ))}

          {visibleLines < commands.length && started && (
            <div className="flex gap-2">
              {commands[visibleLines].prompt && (
                <span className="text-primary text-glow shrink-0">{commands[visibleLines].prompt}</span>
              )}
              <span className="text-foreground">
                {commands[visibleLines].command.slice(0, typedChars)}
                <span className="inline-block w-2 h-4 bg-primary ml-0.5 cursor-blink align-middle" />
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
