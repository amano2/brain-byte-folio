import React, { useState } from "react";

interface RetroMarkdownReaderProps {
  content: string;
}

export default function RetroMarkdownReader({ content }: RetroMarkdownReaderProps) {
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
          <strong key={index} style={{ fontWeight: "bold", color: "#000000" }}>
            {part.slice(2, -2)}
          </strong>
        );
      }
      if (part.startsWith("`") && part.endsWith("`")) {
        const codeText = part.slice(1, -1);
        return (
          <code
            key={index}
            style={{
              background: "#ece9d8",
              border: "1px solid #999999",
              color: "#000080",
              fontFamily: '"Lucida Console", "Courier New", monospace',
              fontSize: "11px",
              padding: "1px 4px",
              fontWeight: 600,
            }}
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
              style={{
                color: "#0000ee",
                textDecoration: "underline",
                cursor: "pointer",
              }}
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
      lang: inCode ? codeLang : undefined,
    });
  }

  return (
    <div
      style={{
        color: "#000000",
        fontFamily: '"MS Sans Serif", Tahoma, Arial, sans-serif',
        fontSize: "12px",
        lineHeight: "1.6",
      }}
    >
      {blocks.map((b, bIdx) => {
        if (b.type === "code") {
          const isAscii = b.lang === "text" || b.content.includes("+---") || b.content.includes("|");
          return (
            <div
              key={bIdx}
              style={{
                margin: "14px 0",
                border: "2px solid",
                borderColor: "#808080 #ffffff #ffffff #808080",
                boxShadow: "inset 1px 1px 0 #000",
                background: "#000000",
                color: isAscii ? "#00ff41" : "#00ff66",
                fontFamily: '"Lucida Console", "Courier New", monospace',
              }}
            >
              {/* MS-DOS Window Titlebar */}
              <div
                style={{
                  background: "linear-gradient(90deg, #000080 0%, #1084d0 100%)",
                  color: "#ffffff",
                  padding: "2px 6px",
                  fontSize: "11px",
                  fontWeight: "bold",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderBottom: "1px solid #808080",
                  userSelect: "none",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span
                    style={{
                      display: "inline-block",
                      background: "#000",
                      color: "#fff",
                      fontSize: "9px",
                      padding: "0 2px",
                      border: "1px solid #808080",
                    }}
                  >
                    MS-DOS
                  </span>
                  <span>COMMAND.COM - [{b.lang ? b.lang.toUpperCase() : "SOURCE"}]</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(b.content, bIdx)}
                  style={{
                    background: "#c0c0c0",
                    border: "1px solid",
                    borderColor: "#ffffff #0a0a0a #0a0a0a #ffffff",
                    color: "#000000",
                    fontSize: "10px",
                    fontWeight: "bold",
                    padding: "1px 6px",
                    cursor: "pointer",
                  }}
                >
                  {copiedIdx === bIdx ? "COPIED!" : "COPY"}
                </button>
              </div>

              {/* Terminal CRT Screen */}
              <div
                style={{
                  padding: "10px 12px",
                  overflowX: "auto",
                  fontSize: "12px",
                  lineHeight: "1.45",
                  background: "#000000",
                  color: isAscii ? "#00ff41" : "#00ff41",
                  textShadow: "0 0 2px rgba(0, 255, 65, 0.4)",
                  letterSpacing: "0.2px",
                }}
              >
                <div style={{ color: "#808080", marginBottom: "6px", fontSize: "11px" }}>
                  C:\PORTFOLIO&gt; TYPE {b.lang ? b.lang.toUpperCase() : "SRC"}.TXT
                </div>
                <pre
                  style={{
                    margin: 0,
                    fontFamily: '"Lucida Console", "Courier New", monospace',
                    whiteSpace: "pre",
                  }}
                >
                  <code>{b.content}</code>
                </pre>
              </div>
            </div>
          );
        }

        const paragraphs = b.content.split("\n\n");
        return (
          <div key={bIdx} style={{ marginBottom: "12px" }}>
            {paragraphs.map((p, pIdx) => {
              const trimmed = p.trim();
              if (!trimmed) return null;

              if (trimmed.startsWith("# ")) {
                return (
                  <div key={pIdx} style={{ marginTop: "16px", marginBottom: "12px" }}>
                    <h1
                      style={{
                        margin: 0,
                        fontSize: "18px",
                        color: "#000080",
                        fontFamily: '"MS Sans Serif", Tahoma, Arial, sans-serif',
                        fontWeight: "bold",
                        lineHeight: "1.3",
                      }}
                    >
                      {trimmed.slice(2)}
                    </h1>
                    <div
                      style={{
                        height: "2px",
                        borderTop: "1px solid #808080",
                        borderBottom: "1px solid #ffffff",
                        marginTop: "6px",
                      }}
                    />
                  </div>
                );
              }

              if (trimmed.startsWith("## ")) {
                return (
                  <div key={pIdx} style={{ marginTop: "18px", marginBottom: "8px" }}>
                    <h2
                      style={{
                        margin: 0,
                        fontSize: "14px",
                        color: "#000080",
                        fontFamily: '"MS Sans Serif", Tahoma, Arial, sans-serif',
                        fontWeight: "bold",
                      }}
                    >
                      ■ {trimmed.slice(3)}
                    </h2>
                    <div style={{ height: "1px", background: "#c0c0c0", marginTop: "4px" }} />
                  </div>
                );
              }

              if (trimmed.startsWith("### ")) {
                return (
                  <h3
                    key={pIdx}
                    style={{
                      margin: "14px 0 6px 0",
                      fontSize: "12px",
                      color: "#000000",
                      fontFamily: '"MS Sans Serif", Tahoma, Arial, sans-serif',
                      fontWeight: "bold",
                    }}
                  >
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
                  <ul
                    key={pIdx}
                    style={{
                      paddingLeft: "22px",
                      margin: "8px 0",
                      color: "#000000",
                      listStyleType: "square",
                    }}
                  >
                    {pLines.map((item, idx) => (
                      <li key={idx} style={{ marginBottom: "5px", color: "#000000" }}>
                        {parseInline(item.trim().slice(2))}
                      </li>
                    ))}
                  </ul>
                );
              }

              // Check if numbered list (e.g. 1. 2. 3.)
              const isNumberedList = pLines.every((l) => /^\d+\.\s/.test(l.trim()));
              if (isNumberedList) {
                return (
                  <ol
                    key={pIdx}
                    style={{
                      paddingLeft: "22px",
                      margin: "8px 0",
                      color: "#000000",
                    }}
                  >
                    {pLines.map((item, idx) => {
                      const text = item.trim().replace(/^\d+\.\s/, "");
                      return (
                        <li key={idx} style={{ marginBottom: "5px", color: "#000000" }}>
                          {parseInline(text)}
                        </li>
                      );
                    })}
                  </ol>
                );
              }

              return (
                <p key={pIdx} style={{ margin: "0 0 10px 0", color: "#000000", lineHeight: "1.6" }}>
                  {pLines.map((line, lIdx) => (
                    <span key={lIdx} style={{ display: "block" }}>
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
