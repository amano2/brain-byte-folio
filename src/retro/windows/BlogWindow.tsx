import React, { useState, useEffect } from "react";
import { blogs, BlogArticle } from "../../data/blogs";
import MarkdownBlock from "../../terminal/render/MarkdownBlock"; // reuse the markdown renderer!

interface BlogWindowProps {
  initialArticleId?: string;
}

export default function BlogWindow({ initialArticleId }: BlogWindowProps) {
  const [activeArticle, setActiveArticle] = useState<BlogArticle | null>(() => {
    if (initialArticleId) {
      return blogs.find(b => b.id === initialArticleId) || null;
    }
    return null;
  });

  // Sync if deep link changes
  useEffect(() => {
    if (initialArticleId) {
      const art = blogs.find(b => b.id === initialArticleId);
      if (art) setActiveArticle(art);
    }
  }, [initialArticleId]);

  return (
    <div style={{ padding: "0px", height: "100%", display: "flex", flexDirection: "column", background: "white" }}>
      {/* Menu bar */}
      <div style={{ display: "flex", background: "#c0c0c0", padding: "2px 4px", fontSize: "12px", borderBottom: "1px solid #808080" }}>
        <span style={{ padding: "0 6px" }}><u>F</u>ile</span>
        <span style={{ padding: "0 6px" }}><u>E</u>dit</span>
        <span style={{ padding: "0 6px" }}><u>S</u>earch</span>
        <span style={{ padding: "0 6px" }}><u>H</u>elp</span>
      </div>

      <div style={{ display: "flex", flex: 1, minHeight: 0 }}>
        {/* Sidebar: article list */}
        <div style={{ width: "200px", borderRight: "2px ridge #c0c0c0", background: "#fdfdfd", overflowY: "auto", padding: "4px" }}>
          <div style={{ fontWeight: "bold", fontSize: "12px", padding: "4px", borderBottom: "1px solid #c0c0c0", marginBottom: "4px" }}>
            Articles ({blogs.length})
          </div>
          {blogs.map(b => (
            <div
              key={b.id}
              onClick={() => setActiveArticle(b)}
              style={{
                padding: "4px",
                fontSize: "12px",
                cursor: "pointer",
                background: activeArticle?.id === b.id ? "#000080" : "transparent",
                color: activeArticle?.id === b.id ? "white" : "black",
                borderBottom: "1px solid #eee",
                display: "flex",
                alignItems: "flex-start",
                gap: "4px"
              }}
            >
              <img src="/icons/windows98-icons/png/notepad-0.png" width="16" alt="doc" style={{ marginTop: "2px" }} />
              <div>
                <div style={{ lineHeight: "1.2" }}>{b.title}</div>
                <div style={{ fontSize: "10px", color: activeArticle?.id === b.id ? "#c0c0c0" : "#888", marginTop: "2px" }}>{b.date}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Content area: article reader */}
        <div style={{ flex: 1, padding: "16px", overflowY: "auto", fontFamily: "'Courier New', Courier, monospace", fontSize: "14px", lineHeight: "1.6" }}>
          {activeArticle ? (
            <div>
              <h1 style={{ marginTop: 0, fontSize: "20px" }}>{activeArticle.title}</h1>
              <div style={{ color: "#666", fontSize: "12px", marginBottom: "16px", paddingBottom: "8px", borderBottom: "1px dashed #c0c0c0" }}>
                Date: {activeArticle.date} | Read time: {activeArticle.readTime}
              </div>
              
              {/* Reuse our MarkdownBlock but wrap it to ensure it fits the retro style somewhat */}
              <div className="retro-markdown-override" style={{ color: "black" }}>
                <MarkdownBlock content={activeArticle.content} />
              </div>
            </div>
          ) : (
            <div style={{ color: "#666", fontStyle: "italic", textAlign: "center", marginTop: "40px" }}>
              Select a document from the left to read.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
