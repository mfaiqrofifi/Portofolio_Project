export interface ActivityItem {
  id: string;
  slug: string;
  title: string;
  caption: string;
  description: string;
  image: string;
  date: string;
  tag: "Learning" | "Project Update" | "Event";
  relatedLinks?: { label: string; url: string }[];
}

export const activities: ActivityItem[] = [
  {
    id: "1",
    slug: "cka-certification",
    title: "Passed CKA Certification",
    caption:
      "Certified Kubernetes Administrator — validated production-grade cluster knowledge.",
    description:
      "After two months of study and hands-on practice with kubeadm, etcd backup/restore, network policies, and RBAC, I passed the CKA exam on my first attempt. The exam is fully practical — no multiple choice, all terminal work in live clusters.",
    image:
      "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&q=80",
    date: "2026-02-20",
    tag: "Learning",
    relatedLinks: [
      {
        label: "CKA Certification",
        url: "https://www.cncf.io/certification/cka/",
      },
    ],
  },
  {
    id: "2",
    slug: "api-gateway-launch",
    title: "Launched API Gateway v1.0",
    caption: "Production deployment of the Go API Gateway handling 10k req/s.",
    description:
      "After 3 months of development and load testing, the API Gateway project reached v1.0 and was deployed to production. Current throughput is ~10,000 requests/second with p99 latency under 8ms. Redis-based rate limiting is working flawlessly.",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
    date: "2026-02-05",
    tag: "Project Update",
    relatedLinks: [
      { label: "GitHub Repo", url: "https://github.com/faiqrofifi" },
    ],
  },
  {
    id: "3",
    slug: "gophercon-id-2026",
    title: "Attended GopherCon ID 2026",
    caption:
      "Connected with Go engineers from across Indonesia. Talked concurrency patterns.",
    description:
      "GopherCon Indonesia 2026 was a one-day conference packed with talks on Go in production. Highlights included a deep dive into the Go scheduler by the Tokopedia platform team and a live demo of Templ for server-side rendering. Great community energy.",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
    date: "2026-01-18",
    tag: "Event",
    relatedLinks: [{ label: "GopherCon ID", url: "https://gophercon.id" }],
  },
  {
    id: "4",
    slug: "learning-pgvector",
    title: "Deep Dive into pgvector",
    caption:
      "Spent a week exploring vector embeddings and semantic search with PostgreSQL.",
    description:
      "Built a small proof-of-concept semantic search engine to understand how vector embeddings work end-to-end. Learned about cosine similarity, HNSW index configuration, and hybrid search combining BM25 with vector similarity. Fascinating intersection of traditional databases and AI.",
    image:
      "https://images.unsplash.com/photo-1599658880436-c61792e70672?w=800&q=80",
    date: "2026-01-05",
    tag: "Learning",
    relatedLinks: [
      { label: "pgvector Docs", url: "https://github.com/pgvector/pgvector" },
    ],
  },
  {
    id: "5",
    slug: "open-source-contribution-chi",
    title: "First Open Source Contribution",
    caption:
      "Merged a PR to chi router adding improved middleware documentation.",
    description:
      "Contributed to the chi HTTP router by improving documentation for the `Compress` and `Throttle` middleware. Small contribution, but meaningful step toward being an active open source contributor. The chi maintainers were welcoming and gave helpful feedback.",
    image:
      "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&q=80",
    date: "2025-12-28",
    tag: "Project Update",
    relatedLinks: [
      { label: "chi Router", url: "https://github.com/go-chi/chi" },
    ],
  },
  {
    id: "6",
    slug: "hackathon-ai-tools",
    title: "AI Hackathon — 2nd Place",
    caption: "Built an AI-powered PR review bot in 24 hours. Took 2nd place.",
    description:
      "A 24-hour hackathon focused on developer productivity tools. Our team built an AI PR reviewer integrating GitHub webhooks with GPT-4. We placed 2nd out of 18 teams. The main feedback from judges was strong technical execution but limited onboarding UX.",
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80",
    date: "2025-12-10",
    tag: "Event",
    relatedLinks: [
      { label: "Project Repo", url: "https://github.com/faiqrofifi" },
    ],
  },
];
