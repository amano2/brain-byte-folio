import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Calendar, Clock, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import blogsData from "../data/blogs.json";

interface BlogEntry {
  id: string;
  title: string;
  summary: string;
  content: string;
  date: string;
  readTime: string;
  tags: string[];
}

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // Scroll to top and check admin query param / session
  useEffect(() => {
    window.scrollTo(0, 0);
    const params = new URLSearchParams(window.location.search);
    if (params.get("admin") === "true") {
      localStorage.setItem("portfolio_admin_authed", "true");
      setIsAdmin(true);
    } else {
      setIsAdmin(localStorage.getItem("portfolio_admin_authed") === "true");
    }
  }, []);

  const blogs: BlogEntry[] = blogsData;

  // Extract all unique tags
  const allTags = Array.from(new Set(blogs.flatMap((blog) => blog.tags)));

  // Filter blogs
  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = selectedTag ? blog.tags.includes(selectedTag) : true;
    return matchesSearch && matchesTag;
  });

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col justify-between relative overflow-hidden">
      <Header />

      {/* Background orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-[10%] -left-10 w-[300px] h-[300px] rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, #a855f7 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <div
          className="absolute top-[40%] -right-10 w-[250px] h-[250px] rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, #06b6d4 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      <div className="max-w-5xl mx-auto px-6 pt-32 pb-24 w-full flex-1">
        {/* Back Link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-mono text-muted-foreground hover:text-purple-400 mb-8 transition-colors group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          Back to Portfolio
        </Link>

        {/* Headline */}
        <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest mb-2" style={{ color: "#a855f7" }}>
              // Journals & Insights
            </p>
            <h1 className="text-4xl md:text-5xl font-bold font-body">
              Technical <span className="gradient-text-purple">Writing</span>
            </h1>
            <p className="text-muted-foreground mt-3 text-sm md:text-base max-w-xl">
              Thought pieces, engineering diaries, and tutorials covering Machine Learning, Full-Stack Architecture, and Agentic AI systems.
            </p>
          </div>
          {isAdmin && (
            <Link
              to="/write"
              className="px-5 py-2 font-mono text-xs rounded-lg border border-purple-500/30 text-purple-300 hover:bg-purple-500/10 transition-all flex items-center gap-1.5 self-start md:self-end cursor-pointer"
            >
              <span>+ Write Article</span>
            </Link>
          )}
        </div>

        {/* Filter Controls Row */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center mb-8 border-b border-white/5 pb-6">
          {/* Search bar */}
          <div className="relative w-full md:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-full pl-9 pr-4 py-2 text-sm text-foreground focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 transition-all font-mono"
            />
          </div>

          {/* Tags list */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto justify-start">
            <button
              onClick={() => setSelectedTag(null)}
              className={`px-3 py-1 rounded-full text-xs font-mono border transition-all cursor-pointer ${
                !selectedTag
                  ? "bg-purple-500/25 border-purple-500/40 text-purple-300"
                  : "bg-white/5 border-white/10 text-muted-foreground hover:border-white/20"
              }`}
            >
              All
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                className={`px-3 py-1 rounded-full text-xs font-mono border transition-all cursor-pointer ${
                  selectedTag === tag
                    ? "bg-purple-500/25 border-purple-500/40 text-purple-300 shadow-[0_0_12px_rgba(168,85,247,0.15)]"
                    : "bg-white/5 border-white/10 text-muted-foreground hover:border-white/20"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Blog grid */}
        {filteredBlogs.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBlogs.map((blog, i) => (
              <motion.article
                key={blog.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.05 * i }}
                className="group relative flex flex-col justify-between p-6 rounded-2xl transition-all duration-300 border border-white/5 bg-white/20 hover:border-purple-500/30 hover:bg-white/[0.04] overflow-hidden"
              >
                {/* Visual card glow */}
                <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute -top-1/2 -left-1/2 w-full h-full rounded-full bg-purple-500/5 blur-[40px]" />
                </div>

                <div className="relative z-10">
                  {/* Category labels */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {blog.tags.map((t) => (
                      <span
                        key={t}
                        className="text-[9px] font-mono px-2 py-0.5 rounded-full border border-purple-500/20 bg-purple-500/10 text-purple-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <h3 className="font-body font-bold text-lg text-foreground mb-3 group-hover:text-purple-300 transition-colors leading-snug">
                    <Link to={`/blog/${blog.id}`}>{blog.title}</Link>
                  </h3>

                  {/* Summary */}
                  <p className="text-xs text-muted-foreground leading-relaxed mb-6 line-clamp-3">
                    {blog.summary}
                  </p>
                </div>

                {/* Footer metadata */}
                <div className="relative z-10 pt-4 border-t border-white/5 flex justify-between items-center text-[10px] font-mono text-muted-foreground/60">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{blog.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{blog.readTime}</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border border-dashed border-white/10 rounded-2xl bg-white/5">
            <p className="text-muted-foreground text-sm font-mono">// No articles found matching your criteria</p>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
