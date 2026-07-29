/**
 * ============================================================
 *  DATABASE LAYER
 * ------------------------------------------------------------
 *  Default: local SQLite file at data/anb-advisors.db — zero
 *  setup, works out of the box for development and small/solo
 *  deployments (e.g. a single VPS with a persistent disk).
 *
 *  For serverless hosting (Vercel, Netlify, etc.) the filesystem
 *  is READ-ONLY / ephemeral, so swap this file for a hosted
 *  database before going live. Drop-in options:
 *    - Postgres (Neon / Supabase / RDS) via `pg` or Prisma
 *    - PlanetScale / MySQL
 *    - Supabase client SDK
 *  The exported functions below (insertLead, listLeads) are the
 *  only surface the rest of the app talks to — reimplement their
 *  bodies against your chosen database and nothing else needs
 *  to change. Full instructions: GUIDE.md → "Swapping the database".
 * ============================================================
 */
import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

export type LeadType = "book_consultation" | "speak_to_ca" | "contact";

export interface LeadInput {
  type: LeadType;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  areaOfInterest?: string;
  message?: string;
  source?: string;
  userAgent?: string;
  ipHash?: string;
}

const dataDir = path.join(process.cwd(), "data");
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, "anb-advisors.db");
const db = new Database(dbPath);

db.pragma("journal_mode = WAL");

db.exec(`
  CREATE TABLE IF NOT EXISTS leads (
    id TEXT PRIMARY KEY,
    type TEXT NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    company TEXT,
    area_of_interest TEXT,
    message TEXT,
    source TEXT,
    user_agent TEXT,
    ip_hash TEXT,
    status TEXT NOT NULL DEFAULT 'new',
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );
`);

export function insertLead(id: string, lead: LeadInput) {
  const stmt = db.prepare(`
    INSERT INTO leads (id, type, name, email, phone, company, area_of_interest, message, source, user_agent, ip_hash)
    VALUES (@id, @type, @name, @email, @phone, @company, @areaOfInterest, @message, @source, @userAgent, @ipHash)
  `);
  stmt.run({
    id,
    type: lead.type,
    name: lead.name,
    email: lead.email,
    phone: lead.phone ?? null,
    company: lead.company ?? null,
    areaOfInterest: lead.areaOfInterest ?? null,
    message: lead.message ?? null,
    source: lead.source ?? null,
    userAgent: lead.userAgent ?? null,
    ipHash: lead.ipHash ?? null,
  });
}

export function listLeads(limit = 100) {
  return db
    .prepare(`SELECT * FROM leads ORDER BY created_at DESC LIMIT ?`)
    .all(limit);
}

export default db;
