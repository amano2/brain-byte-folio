import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Copy, Check, Eye, Code, Edit, Download } from "lucide-react";
import Header from "../components/Header";
import MarkdownRenderer from "../components/MarkdownRenderer";

export default function WriteBlog() {
  const ADMIN_PASSCODE = "aman2026";
  const [passcode, setPasscode] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState("");
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [tags, setTags] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"edit" | "preview" | "both">("both");

  // Check auth on load
  useEffect(() => {
    const isAuthed = localStorage.getItem("portfolio_admin_authed") === "true";
    setIsAuthenticated(isAuthed);
  }, []);

  const handleVerifyPasscode = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === ADMIN_PASSCODE) {
      localStorage.setItem("portfolio_admin_authed", "true");
      setIsAuthenticated(true);
      setAuthError("");
    } else {
      setAuthError("Invalid passcode. Please try again.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("portfolio_admin_authed");
    setIsAuthenticated(false);
    setPasscode("");
  };

  // Default to today's date
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setDate(today);
  }, []);

  // Automatic slug generation from title
  const generatedId = title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // remove non-word chars except spaces/dashes
    .replace(/[\s_]+/g, "-") // replace spaces with dashes
    .replace(/^-+|-+$/g, ""); // trim leading/trailing dashes

  // Automatic read time estimation
  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;
  const readTime = Math.max(1, Math.ceil(wordCount / 200)) + " min read";

  // Parse tags string into list
  const tagsList = tags
    .split(",")
    .map((tag) => tag.trim())
    .filter((tag) => tag !== "");

  // Create the compiled JSON output
  const compiledJson = JSON.stringify(
    {
      id: generatedId || "new-post-id",
      title: title || "New Article Title",
      summary: summary || "Provide a summary here...",
      content: content || "# Draft Content",
      date: date,
      readTime: readTime,
      tags: tagsList.length > 0 ? tagsList : ["General"],
    },
    null,
    2
  );

  const handleCopyJson = () => {
    navigator.clipboard.writeText(compiledJson);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([compiledJson], { type: "application/json" });
    element.href = URL.createObjectURL(file);
    element.download = `${generatedId || "new-post"}.json`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-background text-foreground flex flex-col justify-between relative overflow-hidden">
        <Header />

        {/* Ambient background glowing orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[350px] h-[350px] rounded-full opacity-[0.06]"
            style={{
              background: "radial-gradient(circle, #a855f7 0%, transparent 70%)",
              filter: "blur(80px)",
            }}
          />
        </div>

        <div className="max-w-md mx-auto px-6 py-40 w-full flex-1 flex flex-col justify-center relative z-10">
          <div className="p-8 rounded-2xl border border-white/10 bg-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.3)] backdrop-blur-md">
            <h2 className="text-xl font-bold font-body text-foreground mb-1 text-center">Admin Access</h2>
            <p className="text-xs text-muted-foreground text-center mb-6">Enter passcode to unlock the Blog Composer</p>

            <form onSubmit={handleVerifyPasscode} className="space-y-4">
              <div className="space-y-1">
                <input
                  type="password"
                  placeholder="Enter passcode..."
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-purple-500/50 transition-all font-mono text-center"
                />
              </div>

              {authError && (
                <p className="text-xs text-red-400 font-mono text-center">{authError}</p>
              )}

              <button
                type="submit"
                className="w-full py-2 bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold rounded-lg hover:opacity-90 transition-all cursor-pointer font-mono text-xs"
              >
                Verify Passcode
              </button>
            </form>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col justify-between relative overflow-hidden">
      <Header />

      {/* Ambient background glowing orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-10 right-10 w-[300px] h-[300px] rounded-full opacity-[0.03]"
          style={{
            background: "radial-gradient(circle, #a855f7 0%, transparent 70%)",
            filter: "blur(70px)",
          }}
        />
        <div
          className="absolute bottom-10 left-10 w-[250px] h-[250px] rounded-full opacity-[0.03]"
          style={{
            background: "radial-gradient(circle, #06b6d4 0%, transparent 70%)",
            filter: "blur(70px)",
          }}
        />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 pt-28 pb-20 w-full flex-1 relative z-10 flex flex-col">
        {/* Back Link */}
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-xs font-mono text-muted-foreground hover:text-purple-400 mb-6 transition-colors group self-start"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          Back to Blog
        </Link>

        {/* Dashboard Title */}
        <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/5 pb-4">
          <div className="flex justify-between items-end w-full md:w-auto">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest mb-1.5" style={{ color: "#a855f7" }}>
                // Content Management System
              </p>
              <h1 className="text-2xl md:text-3xl font-bold font-body">
                Blog <span className="gradient-text-purple">Composer</span>
              </h1>
            </div>
            <button
              onClick={handleLogout}
              className="md:hidden px-3 py-1 font-mono text-[10px] rounded border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors"
            >
              Lock
            </button>
          </div>

          <div className="flex items-center gap-4">
            {/* View Toggles */}
            <div className="flex bg-white/5 border border-white/10 rounded-full p-1 self-start font-mono text-xs">
              <button
                onClick={() => setActiveTab("edit")}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full transition-all cursor-pointer ${
                  activeTab === "edit" ? "bg-purple-500/20 text-purple-300 border border-purple-500/30" : "text-muted-foreground hover:text-white"
                }`}
              >
                <Edit className="w-3 h-3" />
                <span>Editor Only</span>
              </button>
              <button
                onClick={() => setActiveTab("both")}
                className={`hidden md:flex items-center gap-1.5 px-4 py-1.5 rounded-full transition-all cursor-pointer ${
                  activeTab === "both" ? "bg-purple-500/20 text-purple-300 border border-purple-500/30" : "text-muted-foreground hover:text-white"
                }`}
              >
                <Eye className="w-3 h-3" />
                <span>Split Pane</span>
              </button>
              <button
                onClick={() => setActiveTab("preview")}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full transition-all cursor-pointer ${
                  activeTab === "preview" ? "bg-purple-500/20 text-purple-300 border border-purple-500/30" : "text-muted-foreground hover:text-white"
                }`}
              >
                <Eye className="w-3 h-3" />
                <span>Preview Only</span>
              </button>
            </div>
            <button
              onClick={handleLogout}
              className="hidden md:block px-3 py-1.5 font-mono text-xs rounded-full border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
            >
              Lock Editor
            </button>
          </div>
        </div>

        {/* CMS Panel Workspace */}
        <div className="grid lg:grid-cols-12 gap-8 flex-1 items-stretch">
          {/* Left panel inputs/markdown input */}
          {(activeTab === "edit" || activeTab === "both") && (
            <div className={`${activeTab === "both" ? "lg:col-span-6" : "lg:col-span-12"} space-y-4 flex flex-col`}>
              <div className="p-5 rounded-2xl border border-white/5 bg-white/20 space-y-4">
                <h3 className="font-mono text-xs uppercase tracking-widest text-purple-400 mb-2">// Article Details</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {/* Title */}
                  <div className="space-y-1">
                    <label className="text-xs font-mono text-muted-foreground">Title</label>
                    <input
                      type="text"
                      placeholder="e.g. Deep Learning in Web Dev"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-purple-500/50 transition-all font-mono"
                    />
                  </div>
                  {/* Date */}
                  <div className="space-y-1">
                    <label className="text-xs font-mono text-muted-foreground">Publication Date</label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-purple-500/50 transition-all font-mono"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {/* Tags */}
                  <div className="space-y-1">
                    <label className="text-xs font-mono text-muted-foreground">Tags (comma-separated)</label>
                    <input
                      type="text"
                      placeholder="e.g. Python, Deep Learning, Django"
                      value={tags}
                      onChange={(e) => setTags(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-purple-500/50 transition-all font-mono"
                    />
                  </div>
                  {/* Slug/ID Preview */}
                  <div className="space-y-1">
                    <label className="text-xs font-mono text-muted-foreground">URL Slug (Auto Generated)</label>
                    <div className="w-full bg-white/[0.02] border border-white/5 rounded-lg px-3 py-2 text-sm text-muted-foreground font-mono truncate">
                      {generatedId || "(type a title to generate slug)"}
                    </div>
                  </div>
                </div>

                {/* Summary */}
                <div className="space-y-1">
                  <label className="text-xs font-mono text-muted-foreground">Short Summary Card Preview</label>
                  <textarea
                    placeholder="Short summary displayed on the blog list grid..."
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    rows={2}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-purple-500/50 transition-all"
                  />
                </div>
              </div>

              {/* Editor Textarea */}
              <div className="flex-1 flex flex-col p-5 rounded-2xl border border-white/5 bg-white/20 min-h-[350px]">
                <div className="flex justify-between items-center mb-2 font-mono text-xs">
                  <span className="text-purple-400">// Markdown Editor</span>
                  <span className="text-muted-foreground/60">
                    {wordCount} words | {readTime}
                  </span>
                </div>
                <textarea
                  placeholder="# Article Heading&#10;&#10;Write your markdown content here. Use standard styling:&#10;- Unordered lists&#10;- **Bold text**&#10;- `Inline code`&#10;- Block code wrapped in three backticks."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full flex-1 bg-white/5 border border-white/10 rounded-lg p-4 text-sm font-mono text-foreground focus:outline-none focus:border-purple-500/50 transition-all resize-none min-h-[250px] leading-relaxed"
                />
              </div>
            </div>
          )}

          {/* Right panel live preview and exporter */}
          {(activeTab === "preview" || activeTab === "both") && (
            <div className={`${activeTab === "both" ? "lg:col-span-6" : "lg:col-span-12"} flex flex-col space-y-4`}>
              {/* Live Preview Panel */}
              <div className="flex-1 p-6 rounded-2xl border border-white/5 bg-white/20 overflow-y-auto max-h-[600px] min-h-[300px]">
                <h3 className="font-mono text-xs uppercase tracking-widest text-purple-400 border-b border-white/5 pb-2 mb-4">
                  // Live Document Preview
                </h3>
                <div className="mb-4">
                  {tagsList.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {tagsList.map((t) => (
                        <span key={t} className="text-[9px] font-mono px-2 py-0.5 rounded-full border border-purple-500/20 bg-purple-500/10 text-purple-300">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                  <h2 className="text-2xl md:text-3xl font-bold font-body text-foreground mb-2">
                    {title || "Article Title"}
                  </h2>
                  <div className="flex gap-3 text-[10px] font-mono text-muted-foreground/60">
                    <span>{date}</span>
                    <span>•</span>
                    <span>{readTime}</span>
                  </div>
                </div>
                <div className="prose prose-invert max-w-none pt-4 border-t border-white/5">
                  <MarkdownRenderer content={content || "*Nothing written yet. Use the editor to begin drafting.*"} />
                </div>
              </div>

              {/* Copy / Export Console */}
              <div className="p-5 rounded-2xl border border-white/5 bg-white/20">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-4">
                  <div>
                    <h4 className="font-body font-bold text-sm text-foreground">Export Database Entry</h4>
                    <p className="text-[11px] text-muted-foreground">Generate the code to add to your JSON data store.</p>
                  </div>
                  <div className="flex gap-2 font-mono text-xs">
                    <button
                      onClick={handleDownload}
                      className="flex items-center gap-1.5 px-4 py-2 border border-white/10 bg-white/5 hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download file</span>
                    </button>
                    <button
                      onClick={handleCopyJson}
                      className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold rounded-lg hover:opacity-90 shadow-md transition-all cursor-pointer"
                    >
                      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? "Copied!" : "Copy JSON Block"}</span>
                    </button>
                  </div>
                </div>

                {/* Instructions Block */}
                <div className="p-4 rounded-xl bg-black/20 border border-white/5 text-[11px] leading-relaxed text-muted-foreground space-y-1.5 font-mono">
                  <p className="text-purple-400 font-semibold uppercase">// How to publish this article:</p>
                  <p>1. Copy the JSON block generated by this composer dashboard.</p>
                  <p>2. Open your local project file at <span className="text-white">src/data/blogs.json</span>.</p>
                  <p>3. Paste this block as the first item inside the main JSON array list (add a comma after it).</p>
                  <p>4. Save, then run <span className="text-white">git add</span>, commit, and push! The site will automatically build and deploy.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
