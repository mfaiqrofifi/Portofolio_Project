-- Home page content table
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

-- Insert default home page content (single row — only one home config exists)
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
