import React, { useState } from "react";
import { profile } from "../data/profile";
import { projects } from "../data/projects";
import { skillGroups } from "../data/skills";
import { blogs, BlogArticle } from "../data/blogs";
import MarkdownBlock from "../terminal/render/MarkdownBlock";
import { Terminal as TerminalIcon, Github, Linkedin, Mail, FileText, ArrowLeft, ExternalLink } from "lucide-react";

interface SimpleViewProps {
  onToggleTerminal: () => void;
  selectedArticleId?: string;
}

export default function SimpleView({ onToggleTerminal, selectedArticleId }: SimpleViewProps) {
  const [activeBlog, setActiveBlog] = useState<BlogArticle | null>(() => {
    if (selectedArticleId) {
      return blogs.find((b) => b.id.toLowerCase() === selectedArticleId.toLowerCase()) || null;
    }
    return null;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-black">
      {/* Top Navigation */}
      <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 font-mono font-bold text-sm tracking-wider text-cyan-400">
            <span>AMAN.DEV</span>
            <span className="text-xs text-slate-500 font-normal">/ simple view</span>
          </div>

          <button
            type="button"
            onClick={onToggleTerminal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20 text-xs font-mono transition-all cursor-pointer shadow-sm"
          >
            <TerminalIcon className="w-3.5 h-3.5" />
            <span>Switch to Terminal (CLI)</span>
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12 space-y-16">
        {/* If viewing an article */}
        {activeBlog ? (
          <article className="space-y-6">
            <button
              type="button"
              onClick={() => setActiveBlog(null)}
              className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:underline cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to overview</span>
            </button>

            <header className="border-b border-slate-800 pb-4">
              <div className="flex flex-wrap gap-2 mb-2">
                {activeBlog.tags.map((t) => (
                  <span
                    key={t}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-800 text-cyan-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                {activeBlog.title}
              </h1>
              <p className="text-xs font-mono text-slate-400">
                Published {activeBlog.date} &bull; {activeBlog.readTime}
              </p>
            </header>

            <div className="text-slate-300 text-sm leading-relaxed">
              <MarkdownBlock content={activeBlog.content} />
            </div>
          </article>
        ) : (
          <>
            {/* Hero / About */}
            <section className="space-y-4">
              <p className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">
                // Portfolio & Research Profile
              </p>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                {profile.name}
              </h1>
              <p className="text-lg text-cyan-300 font-medium">
                {profile.role}
              </p>
              <p className="text-slate-300 text-sm leading-relaxed max-w-2xl">
                {profile.bio}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500 text-slate-950 font-semibold text-xs hover:bg-cyan-400 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Email Me</span>
                </a>
                <a
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-900 text-slate-200 text-xs hover:bg-slate-800 transition-colors"
                >
                  <FileText className="w-3.5 h-3.5 text-cyan-400" />
                  <span>View Resume</span>
                </a>
                <a
                  href={profile.github.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-900 text-slate-200 text-xs hover:bg-slate-800 transition-colors"
                >
                  <Github className="w-3.5 h-3.5 text-slate-400" />
                  <span>GitHub</span>
                </a>
                <a
                  href={profile.linkedin.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-900 text-slate-200 text-xs hover:bg-slate-800 transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5 text-cyan-400" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </section>

            {/* Education & Certification */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-white border-b border-slate-800 pb-2 flex items-center justify-between">
                <span>Education & Certifications</span>
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {profile.education.map((e, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-slate-800 bg-slate-900/50 space-y-1">
                    <span className="text-xs font-mono text-cyan-400 font-semibold">{e.period}</span>
                    <h3 className="font-bold text-sm text-white">{e.degree}</h3>
                    <p className="text-xs text-slate-400">{e.institution}</p>
                    <p className="text-xs font-mono text-emerald-400 font-semibold mt-1">CGPA: {e.cgpa}</p>
                    {e.notes && <p className="text-[11px] text-slate-500 pt-1">{e.notes}</p>}
                  </div>
                ))}
              </div>
              <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/30">
                <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">Certification:</span>
                <p className="text-sm font-semibold text-slate-200 mt-0.5">
                  {profile.certifications[0]?.name} &bull; <span className="text-xs font-normal text-slate-400">{profile.certifications[0]?.issuer} ({profile.certifications[0]?.period})</span>
                </p>
              </div>
            </section>

            {/* Research Paper Feature */}
            <section className="space-y-3 p-5 rounded-2xl border border-cyan-900/40 bg-gradient-to-br from-cyan-950/30 to-slate-900/40">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-900/50 text-cyan-300 font-bold border border-cyan-800">
                RESEARCH PUBLICATION // LTIMINDTREE COLLABORATION
              </span>
              <h2 className="text-lg font-bold text-white">
                {profile.research.title}
              </h2>
              <p className="text-xs text-slate-400">
                Authors: {profile.research.coAuthors.join(", ")} &bull; {profile.research.institution}
              </p>
              <p className="text-xs text-slate-300 leading-relaxed">
                {profile.research.summary}
              </p>
              <p className="text-xs font-mono text-emerald-400 font-semibold">
                Key Result: {profile.research.keyResults}
              </p>
              <button
                type="button"
                onClick={() => {
                  const paperBlog = blogs.find((b) => b.id === profile.research.blogId);
                  if (paperBlog) setActiveBlog(paperBlog);
                }}
                className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:underline pt-1 cursor-pointer"
              >
                <span>Read Full Technical Breakdown &rarr;</span>
              </button>
            </section>

            {/* Projects */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-white border-b border-slate-800 pb-2">
                Flagship Projects
              </h2>
              <div className="space-y-4">
                {projects.map((p) => (
                  <div
                    key={p.id}
                    className="p-5 rounded-xl border border-slate-800 bg-slate-900/40 hover:border-slate-700 transition-colors space-y-2.5"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <h3 className="font-bold text-base text-white">{p.title}</h3>
                      <a
                        href={p.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-mono text-cyan-400 hover:underline"
                      >
                        <span>GitHub</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                    <p className="text-xs font-mono text-cyan-300/80">{p.subtitle}</p>
                    <p className="text-xs text-slate-300 leading-relaxed">{p.description}</p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {p.tags.map((t) => (
                        <span
                          key={t}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Skills */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-white border-b border-slate-800 pb-2">
                Technical Skills Matrix
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {skillGroups.map((g) => (
                  <div key={g.id} className="p-4 rounded-xl border border-slate-800 bg-slate-900/30 space-y-2">
                    <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
                      {g.category}
                    </h3>
                    <p className="text-[11px] text-slate-400">{g.description}</p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {g.skills.map((s) => (
                        <span
                          key={s}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-200"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Blog Articles */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-white border-b border-slate-800 pb-2">
                Technical Writing & Articles
              </h2>
              <div className="space-y-3">
                {blogs.map((b) => (
                  <div
                    key={b.id}
                    onClick={() => setActiveBlog(b)}
                    className="p-4 rounded-xl border border-slate-800 bg-slate-900/30 hover:border-cyan-500/40 hover:bg-slate-900/60 transition-all cursor-pointer space-y-1.5 group"
                  >
                    <div className="flex flex-wrap items-center justify-between text-xs text-slate-500">
                      <span className="font-mono">{b.date} &bull; {b.readTime}</span>
                      <span className="text-cyan-400 group-hover:underline text-[11px] font-mono">
                        Read Article &rarr;
                      </span>
                    </div>
                    <h3 className="font-bold text-sm text-slate-200 group-hover:text-cyan-300 transition-colors">
                      {b.title}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {b.summary}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}
      </main>

      <footer className="border-t border-slate-800/80 py-6 text-center text-xs font-mono text-slate-500">
        &copy; {new Date().getFullYear()} Aman Hossain &bull; Hosted on Firebase
      </footer>
    </div>
  );
}
