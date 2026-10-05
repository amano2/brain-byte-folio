import rawBlogs from "./blogs.json";

export interface BlogArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  date: string;
  readTime: string;
  tags: string[];
}

export const blogs: BlogArticle[] = rawBlogs as BlogArticle[];

export function getBlogById(id: string): BlogArticle | undefined {
  return blogs.find((b) => b.id.toLowerCase() === id.toLowerCase());
}

export function searchBlogs(query: string, tag?: string): BlogArticle[] {
  const q = query.trim().toLowerCase();
  return blogs.filter((b) => {
    const matchesTag = tag ? b.tags.some((t) => t.toLowerCase() === tag.toLowerCase()) : true;
    const matchesQuery = q
      ? b.title.toLowerCase().includes(q) ||
        b.summary.toLowerCase().includes(q) ||
        b.content.toLowerCase().includes(q)
      : true;
    return matchesTag && matchesQuery;
  });
}
