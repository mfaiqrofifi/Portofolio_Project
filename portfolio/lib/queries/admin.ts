import { sql } from "@/lib/db";
import type {
  Project,
  Article,
  Activity,
  ActivityLink,
  Profile,
  ContactLink,
  Home,
} from "@/lib/types";

// ── HELPERS ──────────────────────────────────────────────────
function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-");
}

// ── PROJECTS ──────────────────────────────────────────────────

export async function createProject(data: {
  title: string;
  short_description?: string;
  summary?: string;
  problem?: string;
  solution?: string;
  tech_stack?: string[];
  domain?: string;
  status?: string;
  thumbnail?: string;
  screenshots?: string[];
  github_url?: string;
  live_url?: string;
  featured?: boolean;
}): Promise<Project> {
  const slug = slugify(data.title);
  const rows = await sql`
    INSERT INTO projects (
      slug, title, short_description, summary, problem, solution,
      tech_stack, domain, status, thumbnail, screenshots,
      github_url, live_url, featured
    ) VALUES (
      ${slug},
      ${data.title},
      ${data.short_description ?? null},
      ${data.summary ?? null},
      ${data.problem ?? null},
      ${data.solution ?? null},
      ${data.tech_stack ?? []},
      ${data.domain ?? null},
      ${data.status ?? "experimental"},
      ${data.thumbnail ?? null},
      ${data.screenshots ?? []},
      ${data.github_url ?? null},
      ${data.live_url ?? null},
      ${data.featured ?? false}
    )
    ON CONFLICT (slug) DO UPDATE SET slug = projects.slug || '-2'
    RETURNING *
  `;
  return rows[0] as Project;
}

export async function updateProject(
  id: string,
  data: Partial<Omit<Project, "id" | "slug" | "created_at">>,
): Promise<Project> {
  const rows = await sql`
    UPDATE projects SET
      title              = COALESCE(${data.title ?? null}, title),
      short_description  = COALESCE(${data.short_description ?? null}, short_description),
      summary            = COALESCE(${data.summary ?? null}, summary),
      problem            = COALESCE(${data.problem ?? null}, problem),
      solution           = COALESCE(${data.solution ?? null}, solution),
      tech_stack         = COALESCE(${data.tech_stack ?? null}, tech_stack),
      domain             = COALESCE(${data.domain ?? null}, domain),
      status             = COALESCE(${data.status ?? null}, status),
      thumbnail          = COALESCE(${data.thumbnail ?? null}, thumbnail),
      screenshots        = COALESCE(${data.screenshots ?? null}, screenshots),
      github_url         = COALESCE(${data.github_url ?? null}, github_url),
      live_url           = COALESCE(${data.live_url ?? null}, live_url),
      featured           = COALESCE(${data.featured ?? null}, featured)
    WHERE id = ${id}
    RETURNING *
  `;
  return rows[0] as Project;
}

export async function deleteProject(id: string): Promise<void> {
  await sql`DELETE FROM projects WHERE id = ${id}`;
}

// ── ARTICLES ──────────────────────────────────────────────────

export async function createArticle(data: {
  title: string;
  excerpt?: string;
  content?: string;
  cover_image?: string;
  read_time?: number;
  tags?: string[];
  category?: string;
  published_at?: string;
  featured?: boolean;
}): Promise<Article> {
  const slug = slugify(data.title);
  const rows = await sql`
    INSERT INTO articles (
      slug, title, excerpt, content, cover_image, read_time,
      tags, category, published_at, featured
    ) VALUES (
      ${slug},
      ${data.title},
      ${data.excerpt ?? null},
      ${data.content ?? null},
      ${data.cover_image ?? null},
      ${data.read_time ?? null},
      ${data.tags ?? []},
      ${data.category ?? null},
      ${data.published_at ? new Date(data.published_at).toISOString() : new Date().toISOString()},
      ${data.featured ?? false}
    )
    ON CONFLICT (slug) DO UPDATE SET slug = articles.slug || '-2'
    RETURNING *
  `;
  return rows[0] as Article;
}

export async function updateArticle(
  id: string,
  data: Partial<Omit<Article, "id" | "slug" | "created_at">>,
): Promise<Article> {
  const rows = await sql`
    UPDATE articles SET
      title        = COALESCE(${data.title ?? null}, title),
      excerpt      = COALESCE(${data.excerpt ?? null}, excerpt),
      content      = COALESCE(${data.content ?? null}, content),
      cover_image  = COALESCE(${data.cover_image ?? null}, cover_image),
      read_time    = COALESCE(${data.read_time ?? null}, read_time),
      tags         = COALESCE(${data.tags ?? null}, tags),
      category     = COALESCE(${data.category ?? null}, category),
      published_at = COALESCE(${data.published_at ?? null}, published_at),
      featured     = COALESCE(${data.featured ?? null}, featured)
    WHERE id = ${id}
    RETURNING *
  `;
  return rows[0] as Article;
}

export async function deleteArticle(id: string): Promise<void> {
  await sql`DELETE FROM articles WHERE id = ${id}`;
}

// ── ACTIVITIES ────────────────────────────────────────────────

export async function createActivity(data: {
  title: string;
  caption?: string;
  description?: string;
  image?: string;
  date?: string;
  tag?: string;
  links?: { label: string; url: string }[];
}): Promise<Activity> {
  const slug = slugify(data.title);
  const rows = await sql`
    INSERT INTO activities (slug, title, caption, description, image, date, tag)
    VALUES (
      ${slug},
      ${data.title},
      ${data.caption ?? null},
      ${data.description ?? null},
      ${data.image ?? null},
      ${data.date ? new Date(data.date).toISOString().split("T")[0] : new Date().toISOString().split("T")[0]},
      ${data.tag ?? null}
    )
    ON CONFLICT (slug) DO UPDATE SET slug = activities.slug || '-2'
    RETURNING *
  `;
  const activity = rows[0] as Activity;

  if (data.links && data.links.length > 0) {
    for (const link of data.links) {
      await sql`
        INSERT INTO activity_links (activity_id, label, url)
        VALUES (${activity.id}, ${link.label}, ${link.url})
      `;
    }
  }
  return activity;
}

export async function updateActivity(
  id: string,
  data: Partial<Omit<Activity, "id" | "slug" | "created_at">> & {
    links?: { label: string; url: string }[];
  },
): Promise<Activity> {
  const rows = await sql`
    UPDATE activities SET
      title       = COALESCE(${data.title ?? null}, title),
      caption     = COALESCE(${data.caption ?? null}, caption),
      description = COALESCE(${data.description ?? null}, description),
      image       = COALESCE(${data.image ?? null}, image),
      date        = COALESCE(${data.date ?? null}, date),
      tag         = COALESCE(${data.tag ?? null}, tag)
    WHERE id = ${id}
    RETURNING *
  `;

  if (data.links !== undefined) {
    await sql`DELETE FROM activity_links WHERE activity_id = ${id}`;
    for (const link of data.links) {
      await sql`
        INSERT INTO activity_links (activity_id, label, url)
        VALUES (${id}, ${link.label}, ${link.url})
      `;
    }
  }
  return rows[0] as Activity;
}

export async function deleteActivity(id: string): Promise<void> {
  await sql`DELETE FROM activity_links WHERE activity_id = ${id}`;
  await sql`DELETE FROM activities WHERE id = ${id}`;
}

// ── PROFILE ───────────────────────────────────────────────────

export async function updateProfile(
  id: string,
  data: Partial<
    Omit<
      Profile,
      "id" | "created_at" | "updated_at" | "tech_stack" | "strengths"
    >
  > & {
    tech_stack?: { group: string; items: string[] }[];
    strengths?: string[];
  },
): Promise<Profile> {
  const rows = await sql`
    UPDATE profile SET
      name        = COALESCE(${data.name ?? null}, name),
      role        = COALESCE(${data.role ?? null}, role),
      location    = COALESCE(${data.location ?? null}, location),
      status      = COALESCE(${data.status ?? null}, status),
      focus       = COALESCE(${data.focus ?? null}, focus),
      bio         = COALESCE(${data.bio ?? null}, bio),
      photo_url   = COALESCE(${data.photo_url ?? null}, photo_url),
      tech_stack  = COALESCE(${data.tech_stack ? JSON.stringify(data.tech_stack) : null}::jsonb, tech_stack),
      strengths   = COALESCE(${data.strengths ? JSON.stringify(data.strengths) : null}::jsonb, strengths),
      updated_at  = NOW()
    WHERE id = ${id}
    RETURNING *
  `;
  return rows[0] as Profile;
}

// ── CONTACT LINKS ─────────────────────────────────────────────

export async function createContactLink(data: {
  label: string;
  value: string;
  href: string;
  icon?: string;
  display_order?: number;
}): Promise<ContactLink> {
  const rows = await sql`
    INSERT INTO contact_links (label, value, href, icon, display_order)
    VALUES (
      ${data.label},
      ${data.value},
      ${data.href},
      ${data.icon ?? "link"},
      ${data.display_order ?? 0}
    )
    RETURNING *
  `;
  return rows[0] as ContactLink;
}

export async function updateContactLink(
  id: string,
  data: Partial<Omit<ContactLink, "id" | "created_at">>,
): Promise<ContactLink> {
  const rows = await sql`
    UPDATE contact_links SET
      label         = COALESCE(${data.label ?? null}, label),
      value         = COALESCE(${data.value ?? null}, value),
      href          = COALESCE(${data.href ?? null}, href),
      icon          = COALESCE(${data.icon ?? null}, icon),
      display_order = COALESCE(${data.display_order ?? null}, display_order)
    WHERE id = ${id}
    RETURNING *
  `;
  return rows[0] as ContactLink;
}

export async function deleteContactLink(id: string): Promise<void> {
  await sql`DELETE FROM contact_links WHERE id = ${id}`;
}

// ── HOME PAGE ───────────────────────────────────────────────

export async function updateHome(
  id: string,
  data: Partial<Omit<Home, "id" | "created_at" | "updated_at">>,
): Promise<Home> {
  const rows = await sql`
    UPDATE home SET
      tagline     = COALESCE(${data.tagline ?? null}, tagline),
      name        = COALESCE(${data.name ?? null}, name),
      title       = COALESCE(${data.title ?? null}, title),
      intro       = COALESCE(${data.intro ?? null}, intro),
      domains     = COALESCE(${data.domains ? JSON.stringify(data.domains) : null}::jsonb, domains),
      footer_hint = COALESCE(${data.footer_hint ?? null}, footer_hint),
      updated_at  = NOW()
    WHERE id = ${id}
    RETURNING *
  `;
  return rows[0] as Home;
}
