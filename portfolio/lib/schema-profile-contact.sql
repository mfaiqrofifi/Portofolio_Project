-- Profile table (About page content)
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

-- Contact links table (Contact page social links)
CREATE TABLE IF NOT EXISTS contact_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  label VARCHAR(100) NOT NULL,
  value VARCHAR(255) NOT NULL,
  href VARCHAR(500) NOT NULL,
  icon VARCHAR(50) NOT NULL DEFAULT 'link',
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default profile (single row — only one profile exists)
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

-- Insert default contact links
INSERT INTO contact_links (label, value, href, icon, display_order)
VALUES
  ('GitHub', 'github.com/faiqrofifi', 'https://github.com/faiqrofifi', 'github', 1),
  ('LinkedIn', 'linkedin.com/in/faiqrofifi', 'https://linkedin.com/in/faiqrofifi', 'linkedin', 2),
  ('Email', 'faiq@example.com', 'mailto:faiq@example.com', 'mail', 3)
ON CONFLICT DO NOTHING;
