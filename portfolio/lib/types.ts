// ── Projects ────────────────────────────────────────────────
export interface Project {
  id: string;
  slug: string;
  title: string;
  short_description: string | null;
  summary: string | null;
  problem: string | null;
  solution: string | null;
  tech_stack: string[];
  domain: "systems" | "products" | "ai" | "infrastructure" | null;
  status: "completed" | "experimental" | null;
  thumbnail: string | null;
  screenshots: string[];
  github_url: string | null;
  live_url: string | null;
  featured: boolean;
  created_at: string;
}

// ── Articles ─────────────────────────────────────────────────
export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string | null;
  cover_image: string | null;
  read_time: number | null;
  tags: string[];
  category: "systems" | "ai" | "devops" | "products" | null;
  published_at: string | null;
  featured: boolean;
  created_at: string;
}

// ── Activities ───────────────────────────────────────────────
export interface Activity {
  id: string;
  slug: string;
  title: string;
  caption: string | null;
  description: string | null;
  image: string | null;
  date: string | null;
  tag: "Learning" | "Project Update" | "Event" | null;
  created_at: string;
}

export interface ActivityLink {
  id: string;
  activity_id: string;
  label: string;
  url: string;
}

export interface ActivityWithLinks extends Activity {
  links: ActivityLink[];
}

// ── Contact Messages ─────────────────────────────────────────
export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

// ── Profile (About page) ─────────────────────────────────────
export interface TechStackGroup {
  group: string;
  items: string[];
}

export interface Profile {
  id: string;
  name: string;
  role: string;
  location: string | null;
  status: string | null;
  focus: string | null;
  bio: string | null;
  photo_url: string | null;
  tech_stack: TechStackGroup[];
  strengths: string[];
  updated_at: string;
  created_at: string;
}

// ── Contact Links (Contact page) ─────────────────────────────
export interface ContactLink {
  id: string;
  label: string;
  value: string;
  href: string;
  icon: string;
  display_order: number;
  created_at: string;
}

// ── Home Page ────────────────────────────────────────────────
export interface HomeDomain {
  key: string;
  label: string;
  desc: string;
}

export interface Home {
  id: string;
  tagline: string;
  name: string;
  title: string;
  intro: string;
  domains: HomeDomain[];
  footer_hint: string | null;
  updated_at: string;
  created_at: string;
}
