import { profile } from "../data/profile";
import { projects } from "../data/projects";
import { skillGroups } from "../data/skills";
import { blogs } from "../data/blogs";

export type FSNodeType = "file" | "directory";

export interface FSFile {
  type: "file";
  name: string;
  content: string;
}

export interface FSDirectory {
  type: "directory";
  name: string;
  children: Record<string, FSNode>;
}

export type FSNode = FSFile | FSDirectory;

// Build the Virtual Filesystem tree
export function buildVirtualFileSystem(): FSDirectory {
  const root: FSDirectory = {
    type: "directory",
    name: "~",
    children: {}
  };

  // ~/about.txt
  root.children["about.txt"] = {
    type: "file",
    name: "about.txt",
    content: `${profile.name} — ${profile.title}\n\n${profile.bio}\n\nAcademics:\n${profile.education
      .map((e) => `* ${e.degree} — ${e.institution} (CGPA ${e.cgpa})`)
      .join("\n")}`
  };

  // ~/contact.txt
  root.children["contact.txt"] = {
    type: "file",
    name: "contact.txt",
    content: `Email: ${profile.email}\nGitHub: ${profile.github.url}\nLinkedIn: ${profile.linkedin.url}\nResume: ${profile.resumeUrl}`
  };

  // ~/projects/
  const projectsDir: FSDirectory = {
    type: "directory",
    name: "projects",
    children: {}
  };
  projects.forEach((p) => {
    projectsDir.children[`${p.id}.md`] = {
      type: "file",
      name: `${p.id}.md`,
      content: `# ${p.title}\n\n**${p.subtitle}**\n\n${p.description}\n\n## Tech Stack\n${p.tags.join(
        ", "
      )}\n\n## Highlights\n${p.highlights.map((h) => `- ${h}`).join("\n")}\n\n[GitHub Repository](${p.githubUrl})`
    };
  });
  root.children["projects"] = projectsDir;

  // ~/skills/
  const skillsDir: FSDirectory = {
    type: "directory",
    name: "skills",
    children: {}
  };
  skillGroups.forEach((s) => {
    skillsDir.children[`${s.id}.txt`] = {
      type: "file",
      name: `${s.id}.txt`,
      content: `${s.category}\n${s.description}\n\nSkills:\n${s.skills.map((k) => `- ${k}`).join("\n")}`
    };
  });
  root.children["skills"] = skillsDir;

  // ~/blog/
  const blogDir: FSDirectory = {
    type: "directory",
    name: "blog",
    children: {}
  };
  blogs.forEach((b) => {
    blogDir.children[`${b.id}.md`] = {
      type: "file",
      name: `${b.id}.md`,
      content: b.content
    };
  });
  root.children["blog"] = blogDir;

  return root;
}

export const vfsRoot = buildVirtualFileSystem();

/**
 * Normalizes an arbitrary path string given the current working directory.
 * Returns an array of segment strings relative to root `~`.
 */
export function normalizePath(path: string, currentPath = "~"): string[] {
  let fullPath = path.trim();

  // If path does not start with ~ or /, prepend currentPath
  if (!fullPath.startsWith("~") && !fullPath.startsWith("/")) {
    fullPath = currentPath === "~" ? `~/${fullPath}` : `${currentPath}/${fullPath}`;
  } else if (fullPath.startsWith("/")) {
    fullPath = `~${fullPath}`;
  }

  // Split and resolve . and ..
  const rawSegments = fullPath.split("/").filter((s) => s.length > 0);
  const resolved: string[] = [];

  for (const seg of rawSegments) {
    if (seg === "~") {
      resolved.length = 0; // reset to root
    } else if (seg === ".") {
      // current directory, no-op
    } else if (seg === "..") {
      if (resolved.length > 0) {
        resolved.pop();
      }
    } else {
      resolved.push(seg);
    }
  }

  return resolved;
}

/**
 * Formats segment array back to a path string like `~/projects`.
 */
export function formatPath(segments: string[]): string {
  if (segments.length === 0) return "~";
  return `~/${segments.join("/")}`;
}

/**
 * Resolves a node from the virtual file system given an array of segments.
 */
export function getNode(segments: string[], root = vfsRoot): FSNode | null {
  let current: FSNode = root;

  for (const seg of segments) {
    if (current.type !== "directory") return null;
    const next = current.children[seg];
    if (!next) return null;
    current = next;
  }

  return current;
}

/**
 * Lists available child names for tab-autocompletion.
 */
export function getChildNames(dirSegments: string[], root = vfsRoot): string[] {
  const node = getNode(dirSegments, root);
  if (!node || node.type !== "directory") return [];
  return Object.keys(node.children).map((name) => {
    return node.children[name].type === "directory" ? `${name}/` : name;
  });
}
