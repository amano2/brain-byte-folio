import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Maximize2 } from "lucide-react";

interface CodeLine {
  label: string;
  items: { text: string; color: string }[];
  isPrint?: boolean;
}

const lines: CodeLine[] = [
  {
    label: "languages = [",
    items: [
      { text: '"Python"', color: "#f17bbf" },
      { text: '"TypeScript"', color: "#f17bbf" },
      { text: '"C++"', color: "#f17bbf" },
      { text: '"SQL"', color: "#f17bbf" },
    ],
  },
  {
    label: "frameworks = [",
    items: [
      { text: '"React"', color: "#00dcb7" },
      { text: '"FastAPI"', color: "#00dcb7" },
      { text: '"Django"', color: "#00dcb7" },
    ],
  },
  {
    label: "ml_tools = [",
    items: [
      { text: '"PyTorch"', color: "#c57aff" },
      { text: '"LangGraph"', color: "#c57aff" },
      { text: '"TensorFlow"', color: "#c57aff" },
    ],
  },
  {
    label: "devops = [",
    items: [
      { text: '"Docker"', color: "#efa810" },
      { text: '"Firebase"', color: "#efa810" },
      { text: '"Kubernetes"', color: "#efa810" },
    ],
  },
  {
    label: 'print("Ready to architect intelligence.")',
    items: [],
    isPrint: true,
  },
];

export default function TerminalWindow() {
  const promptCommand = "cat tech_stack.py";
  const [typedPrompt, setTypedPrompt] = useState("");
  const [activeLineIndex, setActiveLineIndex] = useState(-1);

  // Step 1: Type the prompt command
  useEffect(() => {
    let currentIdx = 0;
    const interval = setInterval(() => {
      if (currentIdx <= promptCommand.length) {
        setTypedPrompt(promptCommand.slice(0, currentIdx));
        currentIdx++;
      } else {
        clearInterval(interval);
        // Start revealing code lines after brief delay
        setTimeout(() => {
          setActiveLineIndex(0);
        }, 400);
      }
    }, 60);

    return () => clearInterval(interval);
  }, []);

  // Step 2: Sequentially reveal lines
  useEffect(() => {
    if (activeLineIndex >= 0 && activeLineIndex < lines.length - 1) {
      const timer = setTimeout(() => {
        setActiveLineIndex((prev) => prev + 1);
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [activeLineIndex]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="w-full max-w-3xl mx-auto"
    >
      <div
        className="rounded-2xl overflow-hidden shadow-2xl text-left transition-all duration-300"
        style={{
          background: "#080a0d",
          border: "1px solid rgba(0, 220, 183, 0.18)",
          boxShadow: "0 0 40px rgba(0, 0, 0, 0.8), 0 0 20px rgba(0, 220, 183, 0.05)",
        }}
      >
        {/* Title bar */}
        <div
          className="flex items-center justify-between px-5 py-3.5 border-b"
          style={{
            background: "rgba(255,255,255,0.02)",
            borderColor: "rgba(255,255,255,0.06)",
          }}
        >
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
          </div>
          <span className="font-mono text-xs text-muted-foreground/60">
            aman@portfolio: ~/stack
          </span>
          <Maximize2 className="w-3.5 h-3.5 text-muted-foreground/40" />
        </div>

        {/* Terminal body */}
        <div className="p-6 font-mono text-xs sm:text-sm leading-7 select-none space-y-1">
          {/* Prompt line */}
          <div className="flex items-center flex-wrap">
            <span style={{ color: "#c57aff" }}>aman@kiit</span>
            <span className="text-muted-foreground">:</span>
            <span style={{ color: "#00dcb7" }}>~</span>
            <span className="text-muted-foreground">$ </span>
            <span className="text-white ml-2">{typedPrompt}</span>
            {activeLineIndex === -1 && (
              <span
                className="inline-block w-2 h-4 ml-1 align-middle animate-pulse"
                style={{ background: "#00dcb7" }}
              />
            )}
          </div>

          {/* Sequential lines animation */}
          {activeLineIndex >= 0 && (
            <div className="space-y-1 pt-3">
              {lines.slice(0, activeLineIndex + 1).map((line, idx) => {
                if (line.isPrint) {
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.25 }}
                      className="pt-3 flex items-center"
                    >
                      <span style={{ color: "#00dcb7" }}>print</span>
                      <span className="text-muted-foreground">(</span>
                      <span style={{ color: "#00dcb7" }}>
                        "Ready to architect intelligence."
                      </span>
                      <span className="text-muted-foreground">)</span>
                      {idx === activeLineIndex && (
                        <span
                          className="inline-block w-2 h-4 ml-1.5 align-middle animate-pulse"
                          style={{ background: "#00dcb7" }}
                        />
                      )}
                    </motion.div>
                  );
                }

                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25 }}
                    className="flex items-center flex-wrap"
                  >
                    <span className="text-muted-foreground">{line.label}</span>
                    {line.items.map((item, itemIdx) => (
                      <span key={itemIdx} className="inline-flex items-center">
                        <span style={{ color: item.color }}>{item.text}</span>
                        {itemIdx < line.items.length - 1 && (
                          <span className="text-muted-foreground mr-1.5">,</span>
                        )}
                      </span>
                    ))}
                    <span className="text-muted-foreground">]</span>
                    {idx === activeLineIndex && activeLineIndex < lines.length - 1 && (
                      <span
                        className="inline-block w-2 h-4 ml-1.5 align-middle animate-pulse"
                        style={{ background: "#00dcb7" }}
                      />
                    )}
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
