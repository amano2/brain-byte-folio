import { describe, it, expect } from "vitest";
import { blogs, getBlogById, searchBlogs } from "../../data/blogs";

describe("Blog Data & Queries", () => {
  it("contains 4 technical articles", () => {
    expect(blogs.length).toBe(4);
  });

  it("retrieves the AgentTrace article by ID", () => {
    const article = getBlogById("agenttrace-hallucination-detection");
    expect(article).toBeDefined();
    expect(article?.title).toContain("AgentTrace");
    expect(article?.content).toContain("Error Propagation Problem");
  });

  it("filters articles by tag", () => {
    const agenticArticles = searchBlogs("", "Agentic AI");
    expect(agenticArticles.length).toBeGreaterThan(0);
    agenticArticles.forEach((a) => {
      expect(a.tags).toContain("Agentic AI");
    });
  });

  it("searches articles by text query", () => {
    const results = searchBlogs("SARIMAX");
    expect(results.length).toBe(1);
    expect(results[0].id).toBe("battling-hallucinations-retail-analytics");
  });
});
