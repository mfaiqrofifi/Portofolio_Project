/**
 * Seed script — populate Neon DB with initial portfolio data
 * Run: npx tsx lib/seed.ts
 */

import { neon } from "@neondatabase/serverless";
import "dotenv/config";

const sql = neon(process.env.DATABASE_URL!);

async function seed() {
  console.log("🌱 Seeding database...");

  // ── Projects ──────────────────────────────────────────────
  await sql`
    INSERT INTO projects (slug, title, short_description, summary, problem, solution, tech_stack, domain, status, github_url, live_url, featured)
    VALUES
      (
        'api-gateway-service',
        'API Gateway Service',
        'High-performance reverse proxy & API gateway built with Go and Redis.',
        'A production-ready API gateway handling authentication, rate limiting, and request routing for microservice architectures.',
        'Microservices needed a unified entry point for authentication, rate limiting, and routing.',
        'Built a centralized gateway in Go using goroutines for concurrency and Redis for rate-limit state.',
        ARRAY['Go', 'Redis', 'Docker', 'PostgreSQL', 'Nginx'],
        'systems',
        'completed',
        'https://github.com/faiqrofifi',
        NULL,
        TRUE
      ),
      (
        'event-driven-order-service',
        'Event-Driven Order Service',
        'Async order processing pipeline with Kafka, Go, and saga pattern.',
        'Distributed order management system using an event-driven architecture with Kafka as the message broker.',
        'Synchronous order processing created tight coupling and cascading failures.',
        'Decomposed the order flow into saga steps published to Kafka topics.',
        ARRAY['Go', 'Kafka', 'PostgreSQL', 'Docker', 'OpenTelemetry'],
        'systems',
        'completed',
        'https://github.com/faiqrofifi',
        NULL,
        TRUE
      ),
      (
        'madrasah-management-system',
        'Madrasah Management System',
        'Full-featured school management platform for Indonesian madrasahs.',
        'A fullstack web application covering student enrollment, attendance tracking, and grade management.',
        'Madrasahs relied on manual spreadsheets and paper records.',
        'Built a Next.js + Go backend platform with role-based access for admins, teachers, and parents.',
        ARRAY['Next.js', 'Go', 'PostgreSQL', 'Tailwind CSS', 'Docker'],
        'products',
        'completed',
        'https://github.com/faiqrofifi',
        'https://madrasah-demo.vercel.app',
        TRUE
      ),
      (
        'ai-code-reviewer',
        'AI Code Reviewer',
        'Automated PR code reviews powered by LLM with inline GitHub comments.',
        'Integrates with GitHub webhooks to trigger LLM-based code reviews on every pull request.',
        'Manual code reviews were a bottleneck for junior devs needing fast feedback.',
        'Built a Node.js webhook server that forwards PR diffs to OpenAI GPT-4.',
        ARRAY['Node.js', 'TypeScript', 'OpenAI API', 'GitHub API', 'AWS Lambda'],
        'ai',
        'completed',
        'https://github.com/faiqrofifi',
        'https://ai-reviewer-demo.vercel.app',
        TRUE
      ),
      (
        'k8s-deployment-pipeline',
        'Kubernetes Deployment Pipeline',
        'Zero-downtime Kubernetes CI/CD pipeline with Helm and ArgoCD.',
        'A fully automated GitOps deployment pipeline using ArgoCD, Helm charts, and GitHub Actions.',
        'Manual deployments caused inconsistent environments and occasional downtime.',
        'Defined all infrastructure as Helm charts and set up ArgoCD for continuous delivery.',
        ARRAY['Kubernetes', 'Helm', 'ArgoCD', 'GitHub Actions', 'Prometheus'],
        'infrastructure',
        'completed',
        'https://github.com/faiqrofifi',
        NULL,
        TRUE
      )
    ON CONFLICT (slug) DO NOTHING
  `;
  console.log("  ✓ Projects seeded");

  // ── Articles ──────────────────────────────────────────────
  await sql`
    INSERT INTO articles (slug, title, excerpt, content, published_at)
    VALUES
      (
        'building-reliable-apis-with-go',
        'Building Reliable APIs with Go',
        'How I design and build production-ready REST APIs in Go using idiomatic patterns, proper error handling, and structured logging.',
        '# Building Reliable APIs with Go\n\nGo has become the language of choice for backend engineers who need performance without complexity...',
        '2026-02-15'
      ),
      (
        'postgresql-indexing-deep-dive',
        'PostgreSQL Indexing: A Deep Dive',
        'B-tree, GIN, GiST, and BRIN indexes explained. When to use them, how to diagnose slow queries, and real-world indexing strategies.',
        '# PostgreSQL Indexing: A Deep Dive\n\nIndexes are the single biggest lever you have for query performance...',
        '2026-01-28'
      ),
      (
        'redis-patterns-backend-devs',
        'Redis Patterns Every Backend Dev Should Know',
        'Beyond simple caching: rate limiting, pub/sub, distributed locks, leaderboards, and session management with Redis.',
        '# Redis Patterns Every Backend Dev Should Know\n\nRedis is not just a cache. It is a versatile data structure server...',
        '2026-01-10'
      )
    ON CONFLICT (slug) DO NOTHING
  `;
  console.log("  ✓ Articles seeded");

  // ── Activities ────────────────────────────────────────────
  const activityRows = await sql`
    INSERT INTO activities (slug, title, caption, description, date, tag)
    VALUES
      (
        'cka-certification',
        'Passed CKA Certification',
        'Certified Kubernetes Administrator — validated production-grade cluster knowledge.',
        'After two months of study and hands-on practice with kubeadm, etcd backup/restore, network policies, and RBAC, I passed the CKA exam on my first attempt.',
        '2026-02-20',
        'Learning'
      ),
      (
        'api-gateway-launch',
        'Launched API Gateway v1.0',
        'Production deployment of the Go API Gateway handling 10k req/s.',
        'After 3 months of development and load testing, the API Gateway project reached v1.0 and was deployed to production.',
        '2026-02-05',
        'Project Update'
      ),
      (
        'gophercon-id-2026',
        'Attended GopherCon ID 2026',
        'Connected with Go engineers from across Indonesia. Talked concurrency patterns.',
        'GopherCon Indonesia 2026 was a one-day conference packed with talks on Go in production.',
        '2026-01-18',
        'Event'
      )
    ON CONFLICT (slug) DO NOTHING
    RETURNING id, slug
  `;
  console.log("  ✓ Activities seeded");

  // ── Activity Links ────────────────────────────────────────
  if (activityRows.length > 0) {
    const cka = activityRows.find((r) => r.slug === "cka-certification");
    const gateway = activityRows.find((r) => r.slug === "api-gateway-launch");
    const gophercon = activityRows.find((r) => r.slug === "gophercon-id-2026");

    if (cka) {
      await sql`
        INSERT INTO activity_links (activity_id, label, url)
        VALUES (${cka.id}, 'CKA Certification', 'https://www.cncf.io/certification/cka/')
      `;
    }
    if (gateway) {
      await sql`
        INSERT INTO activity_links (activity_id, label, url)
        VALUES (${gateway.id}, 'GitHub Repo', 'https://github.com/faiqrofifi')
      `;
    }
    if (gophercon) {
      await sql`
        INSERT INTO activity_links (activity_id, label, url)
        VALUES (${gophercon.id}, 'GopherCon ID', 'https://gophercon.id')
      `;
    }
    console.log("  ✓ Activity links seeded");
  }

  console.log("✅ Seeding complete!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
