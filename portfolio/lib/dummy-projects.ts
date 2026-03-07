export type Domain = "systems" | "products" | "ai" | "infrastructure";

export interface Project {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  summary: string;
  problem: string;
  solution: string;
  techStack: string[];
  domain: Domain;
  status: "completed" | "experimental";
  thumbnail: string;
  screenshots: string[];
  githubUrl: string;
  liveUrl?: string;
  featured: boolean;
}

export const projects: Project[] = [
  // ── systems ──────────────────────────────────────────────
  {
    id: "1",
    slug: "api-gateway-service",
    title: "API Gateway Service",
    shortDescription:
      "High-performance reverse proxy & API gateway built with Go and Redis.",
    summary:
      "A production-ready API gateway handling authentication, rate limiting, and request routing for microservice architectures.",
    problem:
      "Microservices needed a unified entry point for authentication, rate limiting, and routing — managing these individually caused inconsistency and latency spikes.",
    solution:
      "Built a centralized gateway in Go using goroutines for concurrency, Redis for rate-limit state, and JWT middleware for auth. Reduced average latency by 40%.",
    techStack: ["Go", "Redis", "Docker", "PostgreSQL", "Nginx"],
    domain: "systems",
    status: "completed",
    thumbnail: "",
    screenshots: [],
    githubUrl: "https://github.com/faiqrofifi",
    liveUrl: undefined,
    featured: true,
  },
  // ── systems (continued) ──────────────────────────────────
  {
    id: "2",
    slug: "event-driven-order-service",
    title: "Event-Driven Order Service",
    shortDescription:
      "Async order processing pipeline with Kafka, Go, and saga pattern.",
    summary:
      "Distributed order management system using an event-driven architecture with Kafka as the message broker and the saga pattern for distributed transactions.",
    problem:
      "Synchronous order processing created tight coupling and cascading failures when downstream services were slow or unavailable.",
    solution:
      "Decomposed the order flow into saga steps published to Kafka topics. Each service consumes only its relevant events, enabling independent scaling and resilient failure handling.",
    techStack: ["Go", "Kafka", "PostgreSQL", "Docker", "OpenTelemetry"],
    domain: "systems",
    status: "completed",
    thumbnail: "",
    screenshots: [],
    githubUrl: "https://github.com/faiqrofifi",
    liveUrl: undefined,
    featured: true,
  },
  {
    id: "3",
    slug: "distributed-rate-limiter",
    title: "Distributed Rate Limiter",
    shortDescription:
      "Token bucket rate limiter synced across nodes via Redis Lua scripts.",
    summary:
      "A library-style rate limiter implementing the token bucket algorithm with atomic state stored in Redis, suitable for use across horizontally scaled API servers.",
    problem:
      "Per-process rate limiting became inconsistent when services scaled to multiple pods, allowing users to exceed limits by hitting different instances.",
    solution:
      "Used Redis Lua scripts to atomically increment and check counters, ensuring correctness across any number of service replicas without distributed lock overhead.",
    techStack: ["Go", "Redis", "Lua", "Docker"],
    domain: "systems",
    status: "completed",
    thumbnail: "",
    screenshots: [],
    githubUrl: "https://github.com/faiqrofifi",
    liveUrl: undefined,
    featured: false,
  },

  // ── products ─────────────────────────────────────────────
  {
    id: "4",
    slug: "madrasah-management-system",
    title: "Madrasah Management System",
    shortDescription:
      "Full-featured school management platform for Indonesian madrasahs.",
    summary:
      "A fullstack web application covering student enrollment, attendance tracking, grade management, and parent communication for Islamic schools.",
    problem:
      "Madrasahs relied on manual spreadsheets and paper records, leading to data loss, reporting delays, and poor parent visibility.",
    solution:
      "Built a Next.js + Go backend platform with role-based access for admins, teachers, and parents. Integrated attendance QR codes and automated report card generation.",
    techStack: ["Next.js", "Go", "PostgreSQL", "Tailwind CSS", "Docker"],
    domain: "products",
    status: "completed",
    thumbnail: "",
    screenshots: [],
    githubUrl: "https://github.com/faiqrofifi",
    liveUrl: "https://madrasah-demo.vercel.app",
    featured: true,
  },
  {
    id: "5",
    slug: "realtime-analytics-dashboard",
    title: "Realtime Analytics Dashboard",
    shortDescription:
      "Live event streaming dashboard with WebSockets, Go, and Next.js.",
    summary:
      "A fullstack real-time analytics platform where events are streamed via WebSockets and visualized in a responsive Next.js dashboard.",
    problem:
      "Business needed live visibility into user events without polling the database every second, causing load spikes.",
    solution:
      "Implemented event fan-out using Go channels and Redis Pub/Sub, streamed to the frontend via WebSockets. Reduced DB polling overhead by 90%.",
    techStack: ["Go", "Next.js", "WebSockets", "Redis", "PostgreSQL"],
    domain: "products",
    status: "completed",
    thumbnail: "",
    screenshots: [],
    githubUrl: "https://github.com/faiqrofifi",
    liveUrl: "https://analytics-demo.vercel.app",
    featured: false,
  },
  {
    id: "6",
    slug: "portfolio-cms",
    title: "Portfolio CMS",
    shortDescription:
      "Headless CMS for developer portfolios with a live preview editor.",
    summary:
      "A self-hosted headless CMS tailored for developer portfolios, providing a markdown editor, media manager, and live preview alongside a public API.",
    problem:
      "Most CMS options were too generic, requiring heavy configuration just to manage simple portfolio content like projects and articles.",
    solution:
      "Built a lightweight CMS with Next.js App Router, a markdown WYSIWYG editor, and a read-only public API. Deployed as a single Docker image with SQLite.",
    techStack: ["Next.js", "TypeScript", "SQLite", "TailwindCSS", "Docker"],
    domain: "products",
    status: "experimental",
    thumbnail: "",
    screenshots: [],
    githubUrl: "https://github.com/faiqrofifi",
    liveUrl: undefined,
    featured: false,
  },

  // ── ai ───────────────────────────────────────────────────
  {
    id: "7",
    slug: "ai-code-reviewer",
    title: "AI Code Reviewer",
    shortDescription:
      "Automated PR code reviews powered by LLM with inline GitHub comments.",
    summary:
      "Integrates with GitHub webhooks to trigger LLM-based code reviews on every pull request, posting structured inline comments.",
    problem:
      "Manual code reviews were a bottleneck. Junior devs needed fast, educational feedback without waiting for senior engineers.",
    solution:
      "Built a Node.js webhook server that forwards PR diffs to OpenAI GPT-4, parses the response into structured review comments, and posts them via GitHub API.",
    techStack: [
      "Node.js",
      "TypeScript",
      "OpenAI API",
      "GitHub API",
      "AWS Lambda",
    ],
    domain: "ai",
    status: "completed",
    thumbnail: "",
    screenshots: [],
    githubUrl: "https://github.com/faiqrofifi",
    liveUrl: "https://ai-reviewer-demo.vercel.app",
    featured: true,
  },
  {
    id: "8",
    slug: "vector-search-engine",
    title: "Vector Search / RAG",
    shortDescription:
      "Semantic document search using embeddings, pgvector, and RAG pipeline.",
    summary:
      "A semantic search engine that converts documents into vector embeddings stored in PostgreSQL pgvector, enabling similarity-based search and retrieval-augmented generation.",
    problem:
      "Keyword search was missing semantically relevant results. Users searched for concepts but got only exact keyword matches.",
    solution:
      "Integrated OpenAI text-embedding-ada with pgvector for cosine similarity queries. Added hybrid BM25 + vector search and a RAG pipeline for question answering over internal docs.",
    techStack: [
      "Python",
      "FastAPI",
      "pgvector",
      "PostgreSQL",
      "OpenAI API",
      "LangChain",
    ],
    domain: "ai",
    status: "experimental",
    thumbnail: "",
    screenshots: [],
    githubUrl: "https://github.com/faiqrofifi",
    liveUrl: undefined,
    featured: false,
  },
  {
    id: "9",
    slug: "ai-workflow-assistant",
    title: "AI Workflow Assistant",
    shortDescription:
      "LLM-powered CLI tool that automates repetitive developer workflows.",
    summary:
      "A terminal-native assistant that interprets natural language instructions and executes multi-step developer tasks: scaffolding, git operations, API testing, and log summarization.",
    problem:
      "Routine developer tasks like scaffolding a service, writing boilerplate tests, or summarizing recent error logs consumed significant time with no intelligence applied.",
    solution:
      "Built a CLI in Go that routes user prompts to function-calling GPT-4, with tool implementations for filesystem ops, git, HTTP requests, and log parsing.",
    techStack: ["Go", "OpenAI API", "Function Calling", "Docker"],
    domain: "ai",
    status: "experimental",
    thumbnail: "",
    screenshots: [],
    githubUrl: "https://github.com/faiqrofifi",
    liveUrl: undefined,
    featured: false,
  },

  // ── infrastructure ───────────────────────────────────────
  {
    id: "10",
    slug: "k8s-deployment-pipeline",
    title: "Kubernetes Deployment Pipeline",
    shortDescription:
      "Zero-downtime Kubernetes CI/CD pipeline with Helm and ArgoCD.",
    summary:
      "A fully automated GitOps deployment pipeline using ArgoCD, Helm charts, and GitHub Actions achieving zero-downtime deployments.",
    problem:
      "Manual deployments caused inconsistent environments and occasional downtime. Team needed a GitOps-native workflow.",
    solution:
      "Defined all infrastructure as Helm charts, set up ArgoCD for continuous delivery, and added automated health checks with automatic rollback on failure.",
    techStack: ["Kubernetes", "Helm", "ArgoCD", "GitHub Actions", "Prometheus"],
    domain: "infrastructure",
    status: "completed",
    thumbnail: "",
    screenshots: [],
    githubUrl: "https://github.com/faiqrofifi",
    liveUrl: undefined,
    featured: true,
  },
  {
    id: "11",
    slug: "multi-tenant-saas-backend",
    title: "Multi-Tenant SaaS Backend",
    shortDescription:
      "Row-level security multi-tenant API with Node.js and PostgreSQL.",
    summary:
      "A robust multi-tenant backend using PostgreSQL row-level security policies, tenant-aware middleware, and isolated billing per plan.",
    problem:
      "Building SaaS products requires strict data isolation between tenants while sharing infrastructure cost-efficiently.",
    solution:
      "Used PostgreSQL RLS policies to enforce tenant isolation at DB level, combined with JWT claims carrying tenant_id. Integrated Stripe for per-tenant billing.",
    techStack: ["Node.js", "TypeScript", "PostgreSQL", "Stripe", "AWS RDS"],
    domain: "infrastructure",
    status: "completed",
    thumbnail: "",
    screenshots: [],
    githubUrl: "https://github.com/faiqrofifi",
    liveUrl: undefined,
    featured: false,
  },
  {
    id: "12",
    slug: "cloud-architecture-templates",
    title: "Cloud Architecture Templates",
    shortDescription:
      "Terraform modules for production-grade AWS and GCP deployments.",
    summary:
      "A library of opinionated Terraform modules covering VPC networking, EKS/GKE clusters, RDS with failover, and CloudFront CDN — deployable in one command.",
    problem:
      "Spinning up a new cloud environment from scratch required hours of manual setup and was inconsistent across projects.",
    solution:
      "Created reusable Terraform modules with sane defaults and variable overrides. Each module is independently versioned and tested with Terratest.",
    techStack: ["Terraform", "AWS", "GCP", "Terratest", "GitHub Actions"],
    domain: "infrastructure",
    status: "completed",
    thumbnail: "",
    screenshots: [],
    githubUrl: "https://github.com/faiqrofifi",
    liveUrl: undefined,
    featured: false,
  },
];
