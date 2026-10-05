export interface Education {
  degree: string;
  institution: string;
  period: string;
  cgpa: string;
  notes?: string;
}

export interface Certification {
  name: string;
  issuer: string;
  period?: string;
  credentialUrl?: string;
}

export interface Profile {
  name: string;
  title: string;
  role: string;
  bio: string;
  focus: string[];
  email: string;
  github: {
    username: string;
    url: string;
  };
  linkedin: {
    name: string;
    url: string;
  };
  resumeUrl: string;
  education: Education[];
  certifications: Certification[];
  research: {
    title: string;
    summary: string;
    coAuthors: string[];
    institution: string;
    collaboration: string;
    blogId: string;
    keyResults: string;
  };
}

export const profile: Profile = {
  name: "Aman Hossain",
  title: "AI/ML Engineer & Full-Stack Developer",
  role: "M.Tech Data Science Scholar & Full-Stack AI Engineer",
  bio: "M.Tech in Data Science at KIIT University in collaboration with LTIMindtree. Specializing in autonomous multi-agent systems, LLM reliability & hallucination mitigation, time-series forecasting, and scalable full-stack ML architectures.",
  focus: [
    "AI/ML & Deep Learning",
    "Agentic Workflows & Multi-Agent Systems",
    "LLM Hallucination Detection & Trust Layers",
    "Time-Series Forecasting",
    "Full-Stack Python & React Architecture"
  ],
  email: "amanhossainmail@gmail.com",
  github: {
    username: "amano2",
    url: "https://github.com/amano2"
  },
  linkedin: {
    name: "Aman Hossain",
    url: "https://www.linkedin.com/in/aman-hossain-53a893242/"
  },
  resumeUrl: "https://docs.google.com/document/d/11tImHxaCmOKJL9geTI3tuFIyR_sbw9OXD987QWxEKQ8/edit?usp=sharing",
  education: [
    {
      degree: "M.Tech in Data Science",
      institution: "KIIT University (in collaboration with LTIMindtree)",
      period: "2024 - 2026",
      cgpa: "7.76",
      notes: "Research focus on step-level hallucination detection in LLM agent trajectories (AgentTrace)."
    },
    {
      degree: "B.Tech in Computer Science & Engineering",
      institution: "Kalinga Institute of Industrial Technology (KIIT)",
      period: "2020 - 2024",
      cgpa: "7.91",
      notes: "Focus on machine learning, data structures, and computer vision systems."
    }
  ],
  certifications: [
    {
      name: "Design Thinking",
      issuer: "Coursera",
      period: "2024",
      credentialUrl: "https://coursera.org"
    }
  ],
  research: {
    title: "AgentTrace: Step-Level Hallucination Detection and Attribution in Multi-Step LLM Agent Workflows",
    summary: "A three-layer confidence-gated cascade (SLM Ensemble -> QLoRA Llama-3.1-8B -> Nemotron-340B) for real-time hallucination localization and automated active correction.",
    coAuthors: ["P. Somnath Reddy", "Aman Hossain", "Ayaan Khan"],
    institution: "Department of Artificial Intelligence and Data Science, KIIT University",
    collaboration: "In collaboration with LTIMindtree",
    blogId: "agenttrace-hallucination-detection",
    keyResults: "+24.40% absolute gain over AGENTHALLU SOTA (65.50% localization accuracy) at 411.90 ms per-step latency."
  }
};
