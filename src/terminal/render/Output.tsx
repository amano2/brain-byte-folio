import React from "react";
import { OutputBlock } from "../types";
import MarkdownBlock from "./MarkdownBlock";

interface OutputProps {
  blocks: OutputBlock[];
  onCommandClick: (cmd: string) => void;
}

export default function Output({ blocks, onCommandClick }: OutputProps) {
  // Renders text with clickable command hints formatted like 'command' or `command`
  const renderTextWithCommands = (text: string) => {
    const parts = text.split(/('[\w\s-:.-]+'|`[\w\s-:.-]+`)/g);
    return parts.map((part, idx) => {
      const isQuoted =
        (part.startsWith("'") && part.endsWith("'")) ||
        (part.startsWith("`") && part.endsWith("`"));

      if (isQuoted) {
        const cmdCandidate = part.slice(1, -1).trim();
        // Check if looks like a command (e.g., "help", "about", "projects 1", "read ...")
        const isCmd = /^(help|about|whoami|projects|open|skills|education|certs|blog|read|contact|resume|social|research|theme|ls|cd|cat|pwd|tree|neofetch|clear|history|hackermode|games)(\s.*)?$/i.test(
          cmdCandidate
        );

        if (isCmd) {
          return (
            <button
              key={idx}
              type="button"
              onClick={() => onCommandClick(cmdCandidate)}
              className="text-[var(--term-accent)] underline hover:opacity-80 font-mono transition-opacity cursor-pointer mx-0.5 inline-block text-left"
              title={`Click to run: ${cmdCandidate}`}
            >
              {part}
            </button>
          );
        }
      }
      return <span key={idx}>{part}</span>;
    });
  };

  return (
    <div className="space-y-2 font-mono text-sm leading-relaxed">
      {blocks.map((block, idx) => {
        switch (block.type) {
          case "text":
            return (
              <div key={idx} className={block.className || "text-[var(--term-fg)] whitespace-pre-wrap break-words"}>
                {renderTextWithCommands(block.text)}
              </div>
            );

          case "table":
            return (
              <div key={idx} className="my-2 overflow-x-auto">
                {block.caption && (
                  <p className="text-xs uppercase tracking-wider text-[var(--term-muted)] mb-1">
                    {block.caption}
                  </p>
                )}
                <table className="min-w-full border-collapse font-mono text-xs">
                  <thead>
                    <tr className="border-b border-[var(--term-border)] text-left text-[var(--term-accent)]">
                      {block.headers.map((h, hIdx) => (
                        <th key={hIdx} className="py-1.5 px-3 font-semibold whitespace-nowrap">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--term-border)]/40 text-[var(--term-fg)]">
                    {block.rows.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-[var(--term-code-bg)] transition-colors">
                        {row.map((cell, cIdx) => (
                          <td key={cIdx} className="py-1.5 px-3 whitespace-nowrap">
                            {typeof cell === "string" ? renderTextWithCommands(cell) : cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );

          case "links":
            return (
              <div key={idx} className="my-2 space-y-1.5 pl-2 border-l-2 border-[var(--term-accent)]">
                {block.links.map((link, lIdx) => (
                  <div key={lIdx} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-xs">
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--term-secondary)] underline hover:opacity-80 font-bold transition-opacity"
                    >
                      {link.label} &rarr;
                    </a>
                    {link.description && (
                      <span className="text-[var(--term-muted)] text-[11px]">
                        {link.description}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            );

          case "markdown":
            return (
              <MarkdownBlock
                key={idx}
                content={block.content}
                onCommandClick={onCommandClick}
              />
            );

          case "ascii":
            return (
              <pre
                key={idx}
                className="overflow-x-auto text-xs leading-none select-none my-1"
                style={{ color: block.color || "var(--term-accent)" }}
              >
                {block.art}
              </pre>
            );

          case "error":
            return (
              <div key={idx} className="text-[var(--term-error)] text-xs my-1 space-y-1">
                <p>&#10006; {block.message}</p>
                {block.suggestion && (
                  <p className="text-[var(--term-muted)]">
                    Did you mean{" "}
                    <button
                      type="button"
                      onClick={() => onCommandClick(block.suggestion!)}
                      className="text-[var(--term-accent)] underline hover:opacity-80 cursor-pointer"
                    >
                      '{block.suggestion}'
                    </button>
                    ? Type{" "}
                    <button
                      type="button"
                      onClick={() => onCommandClick("help")}
                      className="text-[var(--term-accent)] underline hover:opacity-80 cursor-pointer"
                    >
                      'help'
                    </button>{" "}
                    to list available commands.
                  </p>
                )}
              </div>
            );

          case "component":
            return <div key={idx}>{block.component}</div>;

          default:
            return null;
        }
      })}
    </div>
  );
}
