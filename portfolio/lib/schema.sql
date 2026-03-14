-- ============================================================
-- PORTFOLIO DATABASE SCHEMA — Neon PostgreSQL
-- Run this once in the Neon SQL editor or via psql
-- ============================================================

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ── projects ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS projects (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  slug        TEXT        NOT NULL UNIQUE,
  title       TEXT        NOT NULL,
  caption     TEXT,
  description TEXT,
  tech_stack  TEXT[]      NOT NULL DEFAULT '{}',
  github_url  TEXT,
  demo_url    TEXT,
  image_url   TEXT,
  is_featured BOOLEAN     NOT NULL DEFAULT FALSE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── articles ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS articles (
  id              UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  slug            TEXT        NOT NULL UNIQUE,
  title           TEXT        NOT NULL,
  excerpt         TEXT,
  content         TEXT,
  cover_image_url TEXT,
  published_at    DATE,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── activities ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS activities (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  slug        TEXT        NOT NULL UNIQUE,
  title       TEXT        NOT NULL,
  caption     TEXT,
  description TEXT,
  started_at  DATE,
  ended_at    DATE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── activity_links ───────────────────────────────────────────
CREATE TABLE IF NOT EXISTS activity_links (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  activity_id UUID        NOT NULL REFERENCES activities(id) ON DELETE CASCADE,
  label       TEXT        NOT NULL,
  url         TEXT        NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── contact_messages ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS contact_messages (
  id         UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  name       TEXT        NOT NULL,
  email      TEXT        NOT NULL,
  subject    TEXT        NOT NULL,
  message    TEXT        NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── indexes ──────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_projects_slug        ON projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_featured    ON projects(is_featured);
CREATE INDEX IF NOT EXISTS idx_articles_slug        ON articles(slug);
CREATE INDEX IF NOT EXISTS idx_articles_published   ON articles(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_activities_slug      ON activities(slug);
CREATE INDEX IF NOT EXISTS idx_activities_started   ON activities(started_at DESC);
CREATE INDEX IF NOT EXISTS idx_activity_links_aid   ON activity_links(activity_id);
