import { Command, OutputBlock, CommandContext } from "../types";
import { blogs, getBlogById, searchBlogs, BlogArticle } from "../../data/blogs";

function renderBlogTable(articleList: BlogArticle[], caption?: string): OutputBlock[] {
  if (articleList.length === 0) {
    return [
      {
        type: "text",
        text: "No blog articles found matching the query.",
        className: "text-[var(--term-muted)] italic"
      }
    ];
  }

  return [
    {
      type: "table",
      caption: caption || `TECHNICAL WRITING & JOURNALS (${articleList.length})`,
      headers: ["ID / Command", "Date", "Read Time", "Tags", "Title"],
      rows: articleList.map((b) => [
        `'read ${b.id}'`,
        b.date,
        b.readTime,
        b.tags.slice(0, 2).join(", "),
        b.title
      ])
    },
    {
      type: "text",
      text: "Tip: Type 'read <id>' (or click an ID above) to read an article inline.",
      className: "text-xs text-[var(--term-muted)] mt-1"
    }
  ];
}

function renderArticle(article: BlogArticle, ctx: CommandContext): OutputBlock[] {
  // Update browser URL for deep linking without full reload
  try {
    window.history.replaceState({}, "", `/blog/${article.id}`);
  } catch {
    // fallback
  }

  if (ctx.setReadingProgress) {
    ctx.setReadingProgress(10);
  }

  return [
    {
      type: "text",
      text: `================================================================================`,
      className: "text-[var(--term-border)]"
    },
    {
      type: "text",
      text: article.title.toUpperCase(),
      className: "text-[var(--term-accent)] font-bold text-base sm:text-lg"
    },
    {
      type: "text",
      text: `Published: ${article.date} | ${article.readTime} | Tags: ${article.tags.join(", ")}`,
      className: "text-xs text-[var(--term-secondary)] font-semibold mb-2"
    },
    {
      type: "markdown",
      content: article.content
    },
    {
      type: "text",
      text: `\nShareable URL: ${window.location.origin}/blog/${article.id}`,
      className: "text-xs text-[var(--term-muted)] italic"
    },
    {
      type: "text",
      text: `================================================================================`,
      className: "text-[var(--term-border)]"
    }
  ];
}

export const blogCommand: Command = {
  name: "blog",
  aliases: ["articles", "posts", "journals"],
  description: "List, search, filter, or read technical articles",
  usage: "blog [id] [--tag <tag>] [search <query>]",
  category: "content",
  run: (args: string[], flags, ctx: CommandContext): OutputBlock[] => {
    // Search subcommand: `blog search <query>`
    if (args.length > 0 && args[0].toLowerCase() === "search") {
      const query = args.slice(1).join(" ");
      const matches = searchBlogs(query);
      return renderBlogTable(matches, `SEARCH RESULTS FOR "${query}" (${matches.length})`);
    }

    // Flag filtering: `blog --tag <tag>`
    if (flags.tag) {
      const tagStr = String(flags.tag);
      const matches = searchBlogs("", tagStr);
      return renderBlogTable(matches, `ARTICLES TAGGED "${tagStr}" (${matches.length})`);
    }

    // Direct ID read: `blog <id>`
    if (args.length > 0) {
      const id = args[0].toLowerCase();
      const article = getBlogById(id);
      if (article) {
        return renderArticle(article, ctx);
      }
      return [
        {
          type: "error",
          message: `Article '${args[0]}' not found. Run 'blog' to list all available articles.`
        }
      ];
    }

    // Reset URL to /blog when viewing list
    try {
      window.history.replaceState({}, "", "/blog");
    } catch {
      // fallback
    }

    return renderBlogTable(blogs);
  },
  autocomplete: (_args, _flags, _ctx) => {
    const ids = blogs.map((b) => b.id);
    const tags = Array.from(new Set(blogs.flatMap((b) => b.tags)));
    return [...ids, "search", ...tags.map((t) => `--tag=${t}`)];
  }
};

export const readCommand: Command = {
  name: "read",
  description: "Read a blog article inline by ID",
  usage: "read <article-id>",
  category: "content",
  run: (args: string[], _flags, ctx: CommandContext): OutputBlock[] => {
    if (args.length === 0) {
      return [
        {
          type: "error",
          message: "Please specify an article ID. Run 'blog' to see available IDs."
        }
      ];
    }

    const id = args[0].toLowerCase();
    const article = getBlogById(id);
    if (!article) {
      return [
        {
          type: "error",
          message: `Article '${args[0]}' not found. Run 'blog' to see available IDs.`
        }
      ];
    }

    return renderArticle(article, ctx);
  },
  autocomplete: (_args, _flags, _ctx) => {
    return blogs.map((b) => b.id);
  }
};
