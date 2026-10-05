export interface SkillGroup {
  id: string;
  category: string;
  description: string;
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    id: "languages",
    category: "Languages",
    description: "Core programming and querying languages for data science and web development.",
    skills: ["Python", "SQL", "JavaScript", "HTML5", "CSS3", "R"]
  },
  {
    id: "frameworks",
    category: "Frameworks & Libraries",
    description: "Deep learning frameworks, agentic orchestrators, and web application libraries.",
    skills: [
      "PyTorch",
      "TensorFlow",
      "LangGraph",
      "LangChain",
      "FastAPI",
      "Django",
      "Scikit-learn",
      "statsmodels",
      "React"
    ]
  },
  {
    id: "tools",
    category: "Tools & Databases",
    description: "Data storage, vector databases, containerization, and version control.",
    skills: ["PostgreSQL", "SQLite", "ChromaDB", "Git", "Docker", "FAISS"]
  },
  {
    id: "platforms",
    category: "Platforms",
    description: "Cloud hosts, GPU acceleration environments, and compute infrastructure.",
    skills: ["Linux", "HuggingFace Spaces", "Firebase", "Kaggle", "Google Colab"]
  },
  {
    id: "industry",
    category: "Industry Knowledge",
    description: "Core domain proficiencies in modern artificial intelligence and machine learning.",
    skills: [
      "Multi-Agent Systems",
      "RAG Pipelines",
      "Time-Series Forecasting",
      "Computer Vision",
      "Model Fine-Tuning (QLoRA)"
    ]
  },
  {
    id: "soft",
    category: "Soft Skills",
    description: "Team collaboration, project methodology, and technical communication.",
    skills: [
      "Problem Solving",
      "Agile Methodologies",
      "Technical Writing",
      "Cross-Functional Collaboration"
    ]
  }
];
