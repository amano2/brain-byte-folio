export interface Project {
  id: string;
  num: number;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  tags: string[];
  githubUrl: string;
  liveUrl?: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: "plant-web",
    num: 1,
    title: "Plant Disease Detection using Leaf Images",
    subtitle: "Real-Time Crop Health Diagnostic & Treatment Platform",
    description:
      "A deep learning web application that accurately classifies 38 classes of crop diseases from uploaded leaf images using transfer learning on MobileNetV2. Provides automated diagnoses, confidence metrics, and organic pesticide treatment recommendations.",
    highlights: [
      "Trained on PlantVillage dataset (38 crop-disease pairs) with high classification accuracy.",
      "Optimized lightweight MobileNetV2 architecture (~14MB footprint) for low-latency web inference.",
      "Integrated Django web backend providing instant diagnosis and organic treatment recommendations."
    ],
    tags: ["Python", "Django", "TensorFlow", "MobileNetV2", "CNN"],
    githubUrl: "https://github.com/amano2/plant-web",
    featured: true
  },
  {
    id: "agentic-copilot-trust-layer",
    num: 2,
    title: "Agentic Enterprise Copilot · Trust Layer",
    subtitle: "Asynchronous Multi-Agent Decision Support System",
    description:
      "A production-grade human-in-the-loop decision support system for regulated insurance claims using an asynchronous LangGraph supervisor pattern to coordinate specialized AI agents with strict factual verification.",
    highlights: [
      "Hybrid RAG combining ChromaDB dense vector search with TF-IDF token matching, re-ranked via Cross-Encoder.",
      "Dual-pass self-consistency scorer and independent challenger auditor agent to catch policy exclusions.",
      "Asynchronous FastAPI backend with LangGraph multi-agent coordination."
    ],
    tags: ["Python", "LangGraph", "FastAPI", "React", "ChromaDB", "Cross-Encoders"],
    githubUrl: "https://github.com/amano2/agentic-copilot-trust-layer",
    featured: true
  },
  {
    id: "genai-forecasting-assistant",
    num: 3,
    title: "iTransform — GenAI Forecasting Assistant",
    subtitle: "Retail Analytics & Glassmorphic Simulation Dashboard",
    description:
      "A full-stack retail analytics dashboard that competes multivariate SARIMAX against PyTorch LSTM models on time-series sales data, facilitating live what-if discount simulations with an automated numeric verification trust system.",
    highlights: [
      "Multivariate SARIMAX competing against PyTorch LSTM time-series models for retail sales forecasts.",
      "Zero-dependency RAG architecture with scikit-learn TF-IDF semantic matching and OpenRouter LLMs.",
      "Numeric trust system cross-referencing generated claims against SQLite within ±2% tolerance."
    ],
    tags: ["Python", "FastAPI", "React", "PyTorch", "statsmodels", "SQLite"],
    githubUrl: "https://github.com/amano2/GenAI-Powered-Analytics-Forecasting-Assistant",
    featured: true
  }
];
