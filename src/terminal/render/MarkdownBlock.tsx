import React, { useState } from "react";
import { Check, Copy } from "lucide-react";

interface MarkdownBlockProps {
  content: string;
  onCommandClick?: (cmd: string) => void;
}

export default function MarkdownBlock({ content, onCommandClick }: MarkdownBlockProps) {
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const handleCopy = (code: string, idx: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  const parseInline = (text: string): React.ReactNode[] => {
    // Matches **bold**, `code`, and [link](url)
    const tokens = text.split(/(\*\*.*?\*\*|`.*?`|\[.*?\]\(.*?\))/g);
    return tokens.map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={index} className="font-bold text-[var(--term-fg)]">
            {part.slice(2, -2)}
          </strong>
        );
      }
      if (part.startsWith("`") && part.endsWith("`")) {
        const codeText = part.slice(1, -1);
        return (
          <code
            key={index}
            className="px-1.5 py-0.5 rounded text-xs font-mono bg-[var(--term-code-bg)] text-[var(--term-accent)] border border-[var(--term-border)]"
          >
            {codeText}
          </code>
        );
      }
      if (part.startsWith("[") && part.includes("](") && part.endsWith(")")) {
        const match = part.match(/\[(.*?)\]\((.*?)\)/);
        if (match) {
          const [, label, url] = match;
          return (
            <a
              key={index}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--term-secondary)] underline hover:opacity-80 transition-opacity"
            >
              {label}
            </a>
          );
        }
      }
      return part;
    });
  };

  // Split content by code fences (```)
  const lines = content.split("\n");
  const blocks: Array<{ type: "code" | "md"; content: string; lang?: string }> = [];
  let currentChunk: string[] = [];
  let inCode = false;
  let codeLang = "";

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.trim().startsWith("```")) {
      if (inCode) {
        blocks.push({ type: "code", content: currentChunk.join("\n"), lang: codeLang });
        currentChunk = [];
        inCode = false;
        codeLang = "";
      } else {
        if (currentChunk.length > 0) {
          blocks.push({ type: "md", content: currentChunk.join("\n") });
        }
        currentChunk = [];
        inCode = true;
        codeLang = line.trim().slice(3).trim() || "text";
      }
    } else {
      currentChunk.push(line);
    }
  }

  if (currentChunk.length > 0) {
    blocks.push({
      type: inCode ? "code" : "md",
      content: currentChunk.join("\n"),
      lang: inCode ? codeLang : undefined
    });
  }

  return (
    <div className="space-y-4 my-2 text-sm leading-relaxed text-[var(--term-fg)] font-mono">
      {blocks.map((b, bIdx) => {
        if (b.type === "code") {
          return (
            <div
              key={bIdx}
              className="my-3 rounded-lg border border-[var(--term-border)] bg-[var(--term-header-bg)] overflow-hidden font-mono text-xs"
            >
              <div className="flex justify-between items-center px-3 py-1.5 border-b border-[var(--term-border)] bg-[var(--term-bg)]">
                <span className="text-[10px] uppercase tracking-wider text-[var(--term-muted)]">
                  {b.lang || "code"}
                </span>
                <button
                  type="button"
                  onClick={() => handleCopy(b.content, bIdx)}
                  className="flex items-center gap-1 text-[10px] text-[var(--term-muted)] hover:text-[var(--term-fg)] transition-colors"
                >
                  {copiedIdx === bIdx ? (
                    <>
                      <Check className="w-3 h-3 text-[var(--term-accent)]" />
                      <span className="text-[var(--term-accent)]">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="p-3 overflow-x-auto text-[var(--term-fg)] bg-black/20">
                <code>{b.content}</code>
              </pre>
            </div>
          );
        }

        const paragraphs = b.content.split("\n\n");
        return (
          <div key={bIdx} className="space-y-3">
            {paragraphs.map((p, pIdx) => {
              const trimmed = p.trim();
              if (!trimmed) return null;

              if (trimmed.startsWith("# ")) {
                return (
                  <h1
                    key={pIdx}
                    className="text-lg md:text-xl font-bold text-[var(--term-accent)] mt-4 mb-2 pb-1 border-b border-[var(--term-border)]"
                  >
                    {trimmed.slice(2)}
                  </h1>
                );
              }
              if (trimmed.startsWith("## ")) {
                return (
                  <h2
                    key={pIdx}
                    className="text-base md:text-lg font-bold text-[var(--term-secondary)] mt-3 mb-1.5"
                  >
                    {trimmed.slice(3)}
                  </h2>
                );
              }
              if (trimmed.startsWith("### ")) {
                return (
                  <h3 key={pIdx} className="text-sm md:text-base font-bold text-[var(--term-fg)] mt-2 mb-1">
                    {trimmed.slice(4)}
                  </h3>
                );
              }

              const pLines = trimmed.split("\n");
              const isList = pLines.every(
                (l) => l.trim().startsWith("- ") || l.trim().startsWith("* ")
              );

              if (isList) {
                return (
                  <ul key={pIdx} className="list-disc pl-5 space-y-1 my-2">
                    {pLines.map((item, idx) => (
                      <li key={idx} className="marker:text-[var(--term-accent)]">
                        {parseInline(item.trim().slice(2))}
                      </li>
                    ))}
                  </ul>
                );
              }

              return (
                <p key={pIdx} className="leading-relaxed">
                  {pLines.map((line, lIdx) => (
                    <span key={lIdx} className="block">
                      {parseInline(line)}
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
