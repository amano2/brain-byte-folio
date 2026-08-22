import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Maximize2 } from "lucide-react";

interface Token {
  text: string;
  color: string;
}

interface LineConfig {
  prefix?: { text: string; color: string }[];
  tokens: Token[];
  isPrint?: boolean;
}

const script: LineConfig[] = [
  {
    prefix: [
      { text: "aman@kiit", color: "#c57aff" },
      { text: ":", color: "#6b7280" },
      { text: "~", color: "#00dcb7" },
      { text: "$ ", color: "#6b7280" },
    ],
    tokens: [{ text: "cat tech_stack.py", color: "#ffffff" }],
  },
  {
    tokens: [
      { text: "languages = [", color: "#9ca3af" },
      { text: '"Python"', color: "#f17bbf" },
      { text: ", ", color: "#9ca3af" },
      { text: '"TypeScript"', color: "#f17bbf" },
      { text: ", ", color: "#9ca3af" },
      { text: '"C++"', color: "#f17bbf" },
      { text: ", ", color: "#9ca3af" },
      { text: '"SQL"', color: "#f17bbf" },
      { text: "]", color: "#9ca3af" },
    ],
  },
  {
    tokens: [
      { text: "frameworks = [", color: "#9ca3af" },
      { text: '"React"', color: "#00dcb7" },
      { text: ", ", color: "#9ca3af" },
      { text: '"FastAPI"', color: "#00dcb7" },
      { text: ", ", color: "#9ca3af" },
      { text: '"Django"', color: "#00dcb7" },
      { text: "]", color: "#9ca3af" },
    ],
  },
  {
    tokens: [
      { text: "ml_tools = [", color: "#9ca3af" },
      { text: '"PyTorch"', color: "#c57aff" },
      { text: ", ", color: "#9ca3af" },
      { text: '"LangGraph"', color: "#c57aff" },
      { text: ", ", color: "#9ca3af" },
      { text: '"TensorFlow"', color: "#c57aff" },
      { text: "]", color: "#9ca3af" },
    ],
  },
  {
    tokens: [
      { text: "devops = [", color: "#9ca3af" },
      { text: '"Docker"', color: "#efa810" },
      { text: ", ", color: "#9ca3af" },
      { text: '"Firebase"', color: "#efa810" },
      { text: ", ", color: "#9ca3af" },
      { text: '"Kubernetes"', color: "#efa810" },
      { text: "]", color: "#9ca3af" },
    ],
  },
  {
    isPrint: true,
    tokens: [
      { text: "print", color: "#00dcb7" },
      { text: "(", color: "#9ca3af" },
      { text: '"Ready to architect intelligence."', color: "#00dcb7" },
      { text: ")", color: "#9ca3af" },
    ],
  },
];

// Utility to render typed tokens up to a character limit
function renderTokens(tokens: Token[], maxChars: number) {
  let charsLeft = maxChars;
  const elements = [];

  for (let i = 0; i < tokens.length; i++) {
    if (charsLeft <= 0) break;
    const token = tokens[i];
    const take = Math.min(charsLeft, token.text.length);
    const visibleText = token.text.slice(0, take);
    elements.push(
      <span key={i} style={{ color: token.color }}>
        {visibleText}
      </span>
    );
    charsLeft -= take;
  }

  return elements;
}

function getLineLength(tokens: Token[]) {
  return tokens.reduce((acc, t) => acc + t.text.length, 0);
}

export default function TerminalWindow() {
  const [currentLine, setCurrentLine] = useState(0);
  const [typedChars, setTypedChars] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (currentLine >= script.length) {
      setIsComplete(true);
      return;
    }

    const targetLength = getLineLength(script[currentLine].tokens);

    if (typedChars < targetLength) {
      // Type each character with natural typing speed
      const speed = currentLine === 0 ? 45 : 25;
      const timer = setTimeout(() => {
        setTypedChars((c) => c + 1);
      }, speed);
      return () => clearTimeout(timer);
    } else {
      // Pause at the end of the line before moving to the next
      const lineDelay = currentLine === 0 ? 350 : currentLine === script.length - 2 ? 300 : 180;
      const timer = setTimeout(() => {
        setCurrentLine((l) => l + 1);
        setTypedChars(0);
      }, lineDelay);
      return () => clearTimeout(timer);
    }
  }, [currentLine, typedChars]);

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
        <div className="p-6 font-mono text-xs sm:text-sm leading-7 select-none min-h-[260px]">
          {script.map((line, lineIdx) => {
            // If this line hasn't started typing yet, don't render it
            if (lineIdx > currentLine) return null;

            const isCurrentLine = lineIdx === currentLine;
            const lineChars = isCurrentLine
              ? typedChars
              : getLineLength(line.tokens);

            return (
              <div
                key={lineIdx}
                className={`flex items-center flex-wrap ${
                  line.isPrint ? "pt-3" : lineIdx === 1 ? "pt-2" : "pt-0.5"
                }`}
              >
                {/* Prefix (e.g. aman@kiit:~$ ) */}
                {line.prefix && (
                  <span className="mr-2 inline-flex items-center">
                    {line.prefix.map((p, pIdx) => (
                      <span key={pIdx} style={{ color: p.color }}>
                        {p.text}
                      </span>
                    ))}
                  </span>
                )}

                {/* Render typed tokens */}
                {renderTokens(line.tokens, lineChars)}

                {/* Blinking cursor on active line or at the very end */}
                {(isCurrentLine || (isComplete && lineIdx === script.length - 1)) && (
                  <span
                    className="inline-block w-2 h-4 ml-1 align-middle animate-pulse"
                    style={{ background: "#00dcb7" }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
