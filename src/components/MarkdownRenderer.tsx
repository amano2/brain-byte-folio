import { useState } from "react";
import { Check, Copy } from "lucide-react";

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  // Helper to parse inline styles: **bold** and `code`
  const parseInlineStyles = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*|`.*?`)/g);
    return parts.map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={index} className="font-bold text-foreground">{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith("`") && part.endsWith("`")) {
        return (
          <code key={index} className="px-1.5 py-0.5 rounded text-xs font-mono bg-white/10 text-cyan-400 border border-white/5">
            {part.slice(1, -1)}
          </code>
        );
      }
      return part;
    });
  };

  // Split content into blocks by checking code block boundaries (```)
  const lines = content.split("\n");
  const blocks: Array<{ type: "markdown" | "code"; content: string; language?: string }> = [];
  let currentBlock: string[] = [];
  let inCodeBlock = false;
  let codeLang = "";

  lines.forEach((line) => {
    if (line.trim().startsWith("```")) {
      if (inCodeBlock) {
        // End of code block
        blocks.push({ type: "code", content: currentBlock.join("\n"), language: codeLang });
        currentBlock = [];
        inCodeBlock = false;
      } else {
        // Start of code block
        if (currentBlock.length > 0) {
          blocks.push({ type: "markdown", content: currentBlock.join("\n") });
        }
        currentBlock = [];
        inCodeBlock = true;
        codeLang = line.trim().slice(3).trim() || "text";
      }
    } else {
      currentBlock.push(line);
    }
  });

  if (currentBlock.length > 0) {
    blocks.push({
      type: inCodeBlock ? "code" : "markdown",
      content: currentBlock.join("\n"),
      language: inCodeBlock ? codeLang : undefined,
    });
  }

  return (
    <div className="space-y-6 text-muted-foreground leading-relaxed text-sm md:text-base font-body">
      {blocks.map((block, blockIdx) => {
        if (block.type === "code") {
          return (
            <div
              key={blockIdx}
              className="my-6 rounded-xl border border-white/10 bg-secondary/30 overflow-hidden font-mono text-xs md:text-sm"
            >
              {/* Code block Header */}
              <div className="flex justify-between items-center px-4 py-2 bg-secondary/80 border-b border-white/5">
                <span className="text-[10px] tracking-wider uppercase text-muted-foreground font-semibold">
                  {block.language}
                </span>
                <button
                  onClick={() => handleCopy(block.content, blockIdx)}
                  className="flex items-center gap-1 text-[10px] text-muted-foreground hover:text-white transition-colors"
                >
                  {copiedIndex === blockIdx ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-green-400" />
                      <span className="text-green-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              {/* Code Content */}
              <pre className="p-4 overflow-x-auto text-left leading-relaxed text-foreground bg-black/20">
                <code>{block.content}</code>
              </pre>
            </div>
          );
        }

        // Render Markdown Blocks
        const paragraphs = block.content.split("\n\n");
        let listItems: string[] = [];

        return (
          <div key={blockIdx} className="space-y-4">
            {paragraphs.map((p, pIdx) => {
              const trimmed = p.trim();
              if (!trimmed) return null;

              // Check if heading
              if (trimmed.startsWith("# ")) {
                return (
                  <h1 key={pIdx} className="text-2xl md:text-3xl font-bold font-body text-foreground mt-8 mb-4 border-b border-white/5 pb-2">
                    {trimmed.slice(2)}
                  </h1>
                );
              }
              if (trimmed.startsWith("## ")) {
                return (
                  <h2 key={pIdx} className="text-xl md:text-2xl font-bold font-body text-foreground mt-6 mb-3">
                    {trimmed.slice(3)}
                  </h2>
                );
              }
              if (trimmed.startsWith("### ")) {
                return (
                  <h3 key={pIdx} className="text-lg md:text-xl font-bold font-body text-foreground mt-4 mb-2">
                    {trimmed.slice(4)}
                  </h3>
                );
              }

              // Check if bullet items
              const linesOfParagraph = trimmed.split("\n");
              const isList = linesOfParagraph.every(l => l.trim().startsWith("- ") || l.trim().startsWith("* "));

              if (isList) {
                return (
                  <ul key={pIdx} className="list-disc pl-6 space-y-2 my-4">
                    {linesOfParagraph.map((item, idx) => (
                      <li key={idx} className="marker:text-cyan-400">
                        {parseInlineStyles(item.trim().slice(2))}
                      </li>
                    ))}
                  </ul>
                );
              }

              // Normal text paragraph
              return (
                <p key={pIdx} className="text-muted-foreground leading-relaxed">
                  {p.split("\n").map((line, lineIdx) => (
                    <span key={lineIdx} className="block">
                      {parseInlineStyles(line)}
                    </span>
                  ))}
                </p>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
