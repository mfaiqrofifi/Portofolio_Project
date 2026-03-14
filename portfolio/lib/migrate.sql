-- ============================================================
-- MIGRATION: Update schema to new column names
-- Run this ONCE in the Neon SQL editor
-- ============================================================

-- ── projects: rename & drop old columns ─────────────────────
ALTER TABLE projects
  ADD COLUMN IF NOT EXISTS caption     TEXT,
  ADD COLUMN IF NOT EXISTS description TEXT,
  ADD COLUMN IF NOT EXISTS demo_url    TEXT,
  ADD COLUMN IF NOT EXISTS image_url   TEXT,
  ADD COLUMN IF NOT EXISTS is_featured BOOLEAN NOT NULL DEFAULT FALSE;

-- Copy data from old columns → new columns
UPDATE projects SET
  caption     = short_description,
  description = summary,
  demo_url    = live_url,
  image_url   = thumbnail,
  is_featured = featured
WHERE caption IS NULL;

-- Drop old columns
ALTER TABLE projects
  DROP COLUMN IF EXISTS short_description,
  DROP COLUMN IF EXISTS summary,
  DROP COLUMN IF EXISTS problem,
  DROP COLUMN IF EXISTS solution,
  DROP COLUMN IF EXISTS domain,
  DROP COLUMN IF EXISTS status,
  DROP COLUMN IF EXISTS thumbnail,
  DROP COLUMN IF EXISTS screenshots,
  DROP COLUMN IF EXISTS live_url,
  DROP COLUMN IF EXISTS featured;

-- ── articles: rename cover_image → cover_image_url ──────────
ALTER TABLE articles
  ADD COLUMN IF NOT EXISTS cover_image_url TEXT;

UPDATE articles SET cover_image_url = cover_image WHERE cover_image_url IS NULL;

ALTER TABLE articles
  DROP COLUMN IF EXISTS cover_image,
  DROP COLUMN IF EXISTS tags,
  DROP COLUMN IF EXISTS category,
  DROP COLUMN IF EXISTS read_time,
  DROP COLUMN IF EXISTS featured;

-- ── activities: rename columns ───────────────────────────────
ALTER TABLE activities
  ADD COLUMN IF NOT EXISTS started_at DATE,
  ADD COLUMN IF NOT EXISTS ended_at   DATE;

-- Copy date → started_at if exists
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'activities' AND column_name = 'date'
  ) THEN
    UPDATE activities SET started_at = date WHERE started_at IS NULL;
    ALTER TABLE activities DROP COLUMN IF EXISTS date;
  END IF;
END $$;

ALTER TABLE activities
  DROP COLUMN IF EXISTS image,
  DROP COLUMN IF EXISTS tag;

-- ── activity_links: add created_at if missing ────────────────
ALTER TABLE activity_links
  ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ NOT NULL DEFAULT NOW();

-- ── contact_messages: add subject if missing ────────────────
ALTER TABLE contact_messages
  ADD COLUMN IF NOT EXISTS subject TEXT NOT NULL DEFAULT '';
