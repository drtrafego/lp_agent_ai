import { pgTable, text, timestamp, uuid, integer } from 'drizzle-orm/pg-core'

// ─────────────────────────────────────────────
//  Tabela: leads (Sincronizada com CRM/Neon)
// ─────────────────────────────────────────────
export const leads = pgTable('leads', {
  /** Chave primária UUID */
  id: uuid('id').defaultRandom().primaryKey().notNull(),

  // ── Dados pessoais ──────────────────────────
  name: text('name').notNull(),
  email: text('email'),
  whatsapp: text('whatsapp'),

  // ── Integração CRM ──────────────────────────
  organization_id: text('organization_id').notNull(),
  status: text('status').notNull(), // Obrigatório para o Kanban

  // ── Rastreamento UTM ────────────────────────
  utm_source: text('utm_source'),
  utm_medium: text('utm_medium'),
  utm_campaign: text('utm_campaign'),
  utm_term: text('utm_term'),
  utm_content: text('utm_content'),

  // ── Metadados ───────────────────────────────
  created_at: timestamp('created_at', { mode: 'string' }).defaultNow().notNull(),
})

export type Lead = typeof leads.$inferSelect
export type NewLead = typeof leads.$inferInsert
