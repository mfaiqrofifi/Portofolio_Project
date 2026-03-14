-- =========================================================
-- Portfolio Database Schema - Complete Setup
-- Run this entire SQL script in Neon Console SQL Editor
-- =========================================================

-- ── 1. PROFILE TABLE (About Page) ────────────────────────
CREATE TABLE IF NOT EXISTS profile (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  role VARCHAR(255) NOT NULL,
  location VARCHAR(255),
  status VARCHAR(255),
  focus TEXT,
  bio TEXT,
  photo_url TEXT,
  tech_stack JSONB DEFAULT '[]'::jsonb,
  strengths JSONB DEFAULT '[]'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO profile (name, role, location, status, focus, bio, tech_stack, strengths)
VALUES (
  'Faiq Rofifi',
  'Software Engineer',
  'Indonesia',
  'open to opportunities',
  'systems · fullstack products · AI workflows · infrastructure',
  'Available for backend engineering roles, consulting, or interesting collaborations.',
  '[
    {"group": "Languages", "items": ["Go", "Rust", "Python", "TypeScript", "SQL"]},
    {"group": "Frontend", "items": ["Next.js", "React", "Tailwind CSS"]},
    {"group": "Databases", "items": ["PostgreSQL", "Redis", "MongoDB", "ClickHouse"]},
    {"group": "AI / ML", "items": ["OpenAI API", "LangChain", "pgvector", "Hugging Face"]},
    {"group": "Infrastructure", "items": ["Docker", "Kubernetes", "Terraform", "Nginx"]},
    {"group": "Cloud", "items": ["AWS", "GCP", "Cloudflare"]},
    {"group": "Observability", "items": ["Prometheus", "Grafana", "OpenTelemetry"]}
  ]'::jsonb,
  '[
    "Designing production REST / gRPC APIs and distributed backends",
    "Fullstack product delivery with Next.js + Go, from schema to UI",
    "LLM integrations: RAG pipelines, function calling, AI-powered tooling",
    "Distributed systems: message queues, event-driven architecture, sagas",
    "CI/CD pipelines, GitOps with ArgoCD, zero-downtime Kubernetes deployments",
    "Performance debugging: profiling, tracing, load testing, query optimization"
  ]'::jsonb
)
ON CONFLICT DO NOTHING;

-- ── 2. CONTACT LINKS TABLE (Contact Page) ────────────────
CREATE TABLE IF NOT EXISTS contact_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  label VARCHAR(100) NOT NULL,
  value VARCHAR(255) NOT NULL,
  href VARCHAR(500) NOT NULL,
  icon VARCHAR(50) NOT NULL DEFAULT 'link',
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO contact_links (label, value, href, icon, display_order)
VALUES
  ('GitHub', 'github.com/faiqrofifi', 'https://github.com/faiqrofifi', 'github', 1),
  ('LinkedIn', 'linkedin.com/in/faiqrofifi', 'https://linkedin.com/in/faiqrofifi', 'linkedin', 2),
  ('Email', 'faiq@example.com', 'mailto:faiq@example.com', 'mail', 3)
ON CONFLICT DO NOTHING;

-- ── 3. HOME TABLE (Home Page) ─────────────────────────────
CREATE TABLE IF NOT EXISTS home (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tagline VARCHAR(255) NOT NULL DEFAULT '~ /home/faiq',
  name VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  intro TEXT NOT NULL,
  domains JSONB DEFAULT '[]'::jsonb,
  footer_hint TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO home (tagline, name, title, intro, domains, footer_hint)
VALUES (
  '~ /home/faiq',
  'Faiq Rofifi',
  'Software Engineer',
  'I build reliable systems, fullstack products, and AI-powered workflows. Focused on correctness, observability, and keeping complexity where it belongs.',
  '[
    {
      "key": "systems",
      "label": "systems",
      "desc": "REST & gRPC APIs, distributed services, message queues"
    },
    {
      "key": "products",
      "label": "products",
      "desc": "fullstack web applications from schema to UI"
    },
    {
      "key": "ai",
      "label": "ai",
      "desc": "LLM integrations, RAG pipelines, AI-powered tooling"
    },
    {
      "key": "infrastructure",
      "label": "infrastructure",
      "desc": "CI/CD, Kubernetes, GitOps, cloud architecture"
    }
  ]'::jsonb,
  'open to backend, fullstack, and AI engineering roles'
)
ON CONFLICT DO NOTHING;

-- =========================================================
-- Verification Queries (run these after to verify)
-- =========================================================

-- Check if data was inserted correctly:
-- SELECT * FROM profile;
-- SELECT * FROM contact_links ORDER BY display_order;
-- SELECT * FROM home;
