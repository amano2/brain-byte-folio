import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, ChevronRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MarkdownRenderer from "@/components/MarkdownRenderer";
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

export default function BlogPost() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [scrollProgress, setScrollProgress] = useState(0);

  // Retrieve blog post
  const blog: BlogEntry | undefined = blogsData.find((b) => b.id === id);

  // Scroll to top and set scroll listener
  useEffect(() => {
    window.scrollTo(0, 0);

    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [id]);

  // If blog doesn't exist, redirect or show message
  if (!blog) {
    return (
      <main className="min-h-screen bg-background text-foreground flex flex-col justify-between">
        <Header />
        <div className="max-w-xl mx-auto text-center py-40 px-6">
          <h1 className="text-2xl font-bold font-body mb-4">Article Not Found</h1>
          <p className="text-muted-foreground mb-8 text-sm">
            The article you are looking for does not exist or has been removed.
          </p>
          <Link
            to="/blog"
            className="px-6 py-2.5 rounded-lg border border-purple-500/40 text-purple-300 font-mono text-xs hover:bg-purple-500/10 transition-all"
          >
            Back to Articles
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col justify-between relative overflow-hidden">
      <Header />

      {/* Reading progress bar */}
      <div className="fixed top-0 left-0 w-full h-[3px] bg-white/5 z-[60]">
        <div
          className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 shadow-[0_0_8px_#a855f7]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Ambient backgrounds */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-[15%] left-[20%] w-[350px] h-[350px] rounded-full opacity-5"
          style={{
            background: "radial-gradient(circle, #a855f7 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute bottom-[20%] right-[15%] w-[300px] h-[300px] rounded-full opacity-5"
          style={{
            background: "radial-gradient(circle, #06b6d4 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
      </div>

      <div className="max-w-3xl mx-auto px-6 pt-32 pb-24 w-full flex-1 relative z-10">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground/60 mb-8">
          <Link to="/" className="hover:text-purple-400 transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/blog" className="hover:text-purple-400 transition-colors">Blog</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-muted-foreground truncate max-w-[150px] md:max-w-xs">{blog.title}</span>
        </div>

        {/* Action Header */}
        <button
          onClick={() => navigate("/blog")}
          className="inline-flex items-center gap-2 text-xs font-mono text-muted-foreground hover:text-purple-400 mb-8 transition-colors group cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          Back to Articles
        </button>

        {/* Article Metadata */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {blog.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-mono px-2.5 py-0.5 rounded-full border border-purple-500/25 bg-purple-500/10 text-purple-300"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-3xl md:text-5xl font-bold font-body leading-tight text-foreground mb-4">
            {blog.title}
          </h1>

          <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground border-b border-white/5 pb-6">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>{blog.date}</span>
            </div>
            <span className="text-white/10">•</span>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>{blog.readTime}</span>
            </div>
            <span className="text-white/10">•</span>
            <span className="text-xs text-purple-400/80">By Aman Hossain</span>
          </div>
        </div>

        {/* Markdown Content */}
        <article className="prose prose-invert max-w-none">
          <MarkdownRenderer content={blog.content} />
        </article>

        {/* Read More / Next CTA */}
        <div
          className="mt-16 p-8 rounded-2xl border border-white/5 bg-white/20 relative overflow-hidden text-center"
          style={{
            background: "linear-gradient(135deg, rgba(168,85,247,0.04) 0%, rgba(6,182,212,0.04) 100%)",
          }}
        >
          <h4 className="font-body font-bold text-lg text-foreground mb-2">Enjoyed reading this?</h4>
          <p className="text-xs text-muted-foreground max-w-md mx-auto leading-relaxed mb-6">
            I write regularly about machine learning algorithms, agentic workflows, and web dev tips. Let's discuss your ideas or custom projects.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link
              to="/blog"
              className="px-5 py-2 font-mono text-xs rounded-lg border border-white/10 hover:bg-white/5 transition-all"
            >
              Other Articles
            </Link>
            <a
              href="mailto:amanhossainmail@gmail.com"
              className="px-5 py-2 font-mono text-xs rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold shadow-[0_0_15px_rgba(168,85,247,0.25)] hover:opacity-90 transition-all"
            >
              Let's Talk
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
