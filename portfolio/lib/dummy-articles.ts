export type ArticleCategory = "systems" | "ai" | "devops" | "products";

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  readTime: number;
  tags: string[];
  category: ArticleCategory;
  publishedAt: string;
  featured: boolean;
}

export const articles: Article[] = [
  // â”€â”€ systems â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "1",
    slug: "building-reliable-apis-with-go",
    title: "Building Reliable APIs with Go",
    excerpt:
      "How I design and build production-ready REST APIs in Go using idiomatic patterns, proper error handling, and structured logging.",
    content: `
# Building Reliable APIs with Go

Go has become the language of choice for backend engineers who need performance without complexity. Here's how I approach building APIs that hold up in production.

## Project Structure

  api/
    handlers/
    middleware/
    models/
    routes.go
  main.go

## Error Handling Pattern

One of Go's superpowers is explicit error handling. Never swallow errors silently.

  func (h *UserHandler) GetUser(w http.ResponseWriter, r *http.Request) {
    id := chi.URLParam(r, "id")
    user, err := h.repo.FindByID(r.Context(), id)
    if err != nil {
      if errors.Is(err, ErrNotFound) {
        http.Error(w, "user not found", http.StatusNotFound)
        return
      }
      h.logger.Error("failed to fetch user", "id", id, "err", err)
      http.Error(w, "internal server error", http.StatusInternalServerError)
      return
    }
    json.NewEncoder(w).Encode(user)
  }

## Middleware Stack

Always compose middleware for concerns like logging, auth, and rate limiting separately from handlers.

## Database Layer

Use pgx directly for PostgreSQL. Raw SQL gives you full control over query plans.

## Conclusion

Simplicity is the core principle. Go forces you to be explicit, which results in maintainable, predictable code.
`,
    coverImage: "",
    readTime: 8,
    tags: ["Go", "API", "Backend"],
    category: "systems",
    publishedAt: "2026-02-15",
    featured: true,
  },
  {
    id: "2",
    slug: "postgresql-indexing-deep-dive",
    title: "PostgreSQL Indexing: A Deep Dive",
    excerpt:
      "B-tree, GIN, GiST, and BRIN indexes explained. When to use them, how to diagnose slow queries, and real-world indexing strategies.",
    content: `
# PostgreSQL Indexing: A Deep Dive

Indexes are the single biggest lever you have for query performance.

## B-Tree (Default)

Good for equality, range queries, sorting.

  CREATE INDEX idx_users_email ON users(email);
  EXPLAIN ANALYZE SELECT * FROM users WHERE email = 'test@example.com';

## GIN Index (Full-text + JSONB)

  CREATE INDEX idx_posts_tsv ON posts USING GIN(to_tsvector('english', content));

## Partial Index

Only index what you query:

  CREATE INDEX idx_active_users ON users(last_login_at) WHERE active = true;

## Diagnosing Slow Queries

Always start with EXPLAIN (ANALYZE, BUFFERS). Look for Seq Scans on large tables.

## Key Takeaways

- Don't over-index â€” writes pay the cost
- Use pg_stat_user_indexes to find unused indexes
- Composite index column order matters
`,
    coverImage: "",
    readTime: 12,
    tags: ["PostgreSQL", "Database", "Performance"],
    category: "systems",
    publishedAt: "2026-01-28",
    featured: true,
  },
  {
    id: "3",
    slug: "redis-patterns-backend-devs",
    title: "Redis Patterns Every Backend Dev Should Know",
    excerpt:
      "Beyond simple caching: rate limiting, pub/sub, distributed locks, leaderboards, and session management with Redis.",
    content: `
# Redis Patterns Every Backend Dev Should Know

Redis is not just a cache. It's a versatile data structure server.

## Rate Limiting with Sliding Window

  func rateLimit(ctx context.Context, rdb *redis.Client, key string, limit int, window time.Duration) (bool, error) {
    now := time.Now().UnixMilli()
    windowStart := now - window.Milliseconds()
    pipe := rdb.Pipeline()
    pipe.ZRemRangeByScore(ctx, key, "-inf", strconv.FormatInt(windowStart, 10))
    pipe.ZCard(ctx, key)
    pipe.ZAdd(ctx, key, redis.Z{Score: float64(now), Member: now})
    pipe.Expire(ctx, key, window)
    results, _ := pipe.Exec(ctx)
    count := results[1].(*redis.IntCmd).Val()
    return count < int64(limit), nil
  }

## Distributed Lock

  func acquireLock(ctx context.Context, rdb *redis.Client, key string, ttl time.Duration) (bool, error) {
    token := uuid.New().String()
    return rdb.SetNX(ctx, "lock:"+key, token, ttl).Result()
  }

## Pub/Sub for Event Fan-out

Great for real-time notifications without polling.

## Key Takeaways

Always set TTLs. Monitor memory usage. Use keyspaces thoughtfully.
`,
    coverImage: "",
    readTime: 10,
    tags: ["Redis", "Backend", "Caching"],
    category: "systems",
    publishedAt: "2025-12-20",
    featured: false,
  },

  // â”€â”€ ai â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "4",
    slug: "ai-augmented-development-workflow",
    title: "My AI-Augmented Development Workflow",
    excerpt:
      "How I use LLMs in daily development: code review, documentation, test generation, and architectural planning â€” without losing engineering judgment.",
    content: `
# My AI-Augmented Development Workflow

AI tools are productivity multipliers when used deliberately.

## Code Review Assistance

I use GPT-4 to pre-review my own PRs before requesting human reviews:

> "Review this diff as a senior backend engineer. Focus on security, edge cases, and performance. Be concise."

## Test Generation

  "Generate table-driven unit tests in Go for this function. Cover happy path, nil inputs, and boundary values."

Always read and understand the generated tests â€” never commit blindly.

## Documentation

  "Write concise API documentation for this endpoint in OpenAPI format."

## Architecture Planning

Use LLMs as a rubber duck. Describe your problem, ask for tradeoff analysis between approaches.

## What AI Should NOT Replace

- Understanding the codebase
- Making architectural decisions
- Security review
- Code ownership

AI accelerates. It does not replace judgment.
`,
    coverImage: "",
    readTime: 7,
    tags: ["AI", "Productivity", "LLM"],
    category: "ai",
    publishedAt: "2025-12-05",
    featured: true,
  },
  {
    id: "5",
    slug: "building-rag-pipelines",
    title: "Building RAG Pipelines for Internal Knowledge Bases",
    excerpt:
      "A practical guide to retrieval-augmented generation: chunking strategies, embedding models, vector stores, and reranking.",
    content: `
# Building RAG Pipelines for Internal Knowledge Bases

RAG is the practical path to making LLMs useful over private data.

## Core Architecture

  User Query
    â†’ Embedding Model â†’ Query Vector
    â†’ pgvector similarity search â†’ Top-K Chunks
    â†’ Reranker â†’ Filtered Chunks
    â†’ LLM with context â†’ Response

## Chunking Strategy

Fixed-size chunking loses context at boundaries. Use semantic chunking with overlap:

- Chunk size: 512 tokens
- Overlap: 50 tokens
- Split on paragraph boundaries

## Embedding Models

  text-embedding-ada-002   â†’ good baseline
  text-embedding-3-small   â†’ better cost/quality ratio
  BGE-M3                   â†’ open source, strong multilingual

## Reranking

Always add a cross-encoder reranker after vector search. It significantly improves relevance with minimal latency cost.

## Evaluation

Measure with RAGAS â€” faithfulness, answer relevancy, context precision.

## Key Lessons

- Garbage in, garbage out: document quality matters most
- Hybrid search (BM25 + vector) consistently outperforms vector-only
- Evaluate before deploying
`,
    coverImage: "",
    readTime: 11,
    tags: ["RAG", "AI", "LLM", "pgvector"],
    category: "ai",
    publishedAt: "2026-02-01",
    featured: false,
  },

  // â”€â”€ devops â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "6",
    slug: "docker-compose-for-developers",
    title: "Docker Compose: Local Dev That Mirrors Production",
    excerpt:
      "Set up a local development environment with Docker Compose that closely mirrors your production setup, without the overhead.",
    content: `
# Docker Compose for Local Dev

The gap between local and production is where bugs hide. Docker Compose closes that gap.

## A Real-World Compose File

  version: '3.9'
  services:
    api:
      build: .
      ports:
        - "8080:8080"
      environment:
        DATABASE_URL: postgres://user:pass@db:5432/mydb
      depends_on:
        db:
          condition: service_healthy

    db:
      image: postgres:16-alpine
      environment:
        POSTGRES_PASSWORD: pass
        POSTGRES_USER: user
        POSTGRES_DB: mydb
      healthcheck:
        test: ["CMD-SHELL", "pg_isready -U user"]
        interval: 5s
        retries: 5

    redis:
      image: redis:7-alpine

## Health Checks

Always add health checks before using depends_on. Race conditions between services cause flaky environments.

## Conclusion

Treat your Compose file as code. Version it, document it, keep it in sync with production config.
`,
    coverImage: "",
    readTime: 6,
    tags: ["Docker", "DevOps", "Local Dev"],
    category: "devops",
    publishedAt: "2026-01-10",
    featured: false,
  },
  {
    id: "7",
    slug: "kubernetes-deployment-notes",
    title: "Kubernetes Deployment Notes: What I Learned Running Prod",
    excerpt:
      "Practical lessons from running Kubernetes in production: resource limits, liveness probes, rolling updates, and the inevitable incident post-mortems.",
    content: `
# Kubernetes Deployment Notes

Running Kubernetes in production teaches you things no tutorial covers.

## Always Set Resource Limits

  resources:
    requests:
      memory: "128Mi"
      cpu: "100m"
    limits:
      memory: "256Mi"
      cpu: "500m"

Without limits, one noisy pod can destabilize an entire node.

## Liveness vs Readiness Probes

- Readiness: "is this pod ready to receive traffic?" â€” use for startup
- Liveness: "is this pod still alive?" â€” use for deadlock detection

Misconfiguring these causes cascading restarts or traffic to unhealthy pods.

## Rolling Updates with PodDisruptionBudget

  spec:
    strategy:
      type: RollingUpdate
      rollingUpdate:
        maxUnavailable: 0
        maxSurge: 1

Set maxUnavailable: 0 for zero-downtime deploys.

## What I Would Tell Past Me

- Start with HPA before vertical scaling
- Namespace everything from day one
- GitOps (ArgoCD) pays off within the first month
`,
    coverImage: "",
    readTime: 9,
    tags: ["Kubernetes", "DevOps", "Infrastructure"],
    category: "devops",
    publishedAt: "2026-01-20",
    featured: true,
  },

  // â”€â”€ products â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "8",
    slug: "fullstack-product-lessons",
    title: "Lessons from Shipping a Fullstack Product Alone",
    excerpt:
      "What I learned building and shipping a fullstack product solo: architecture decisions, tradeoffs, and what I would do differently.",
    content: `
# Lessons from Shipping a Fullstack Product Alone

Building a fullstack product alone forces you to make every decision yourself.

## Avoid Premature Abstraction

The biggest trap: building a perfect architecture before you have any users.

I spent two weeks designing a microservice architecture for a product with zero users. I rewrote it as a monolith in three days. Ship first, split later.

## Choose Boring Technology

- PostgreSQL over fancy NewSQL
- Next.js over SPA + separate API when starting
- Docker Compose over Kubernetes until traffic demands otherwise

## The Feature You Shouldn't Build

Every feature that isn't core to the user problem delays your ability to learn. I built an admin dashboard nobody asked for. I should have built the core reporting feature instead.

## Observability from Day One

Add structured logging and basic metrics before you have users. You will need it the day you do.

## What I Would Do Differently

- Talk to users before writing code
- Ship an ugly v1 faster
- Automate deployments on day one
`,
    coverImage: "",
    readTime: 8,
    tags: ["Product", "Fullstack", "Startups"],
    category: "products",
    publishedAt: "2025-11-15",
    featured: false,
  },
];
