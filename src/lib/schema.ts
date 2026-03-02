import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'

// ─────────────────────────────────────────────
//  Tabela: leads
// ─────────────────────────────────────────────
export const leads = pgTable('leads', {
  /** Chave primária — também usado como external_id na Meta CAPI */
  id: serial('id').primaryKey(),

  // ── Dados pessoais ──────────────────────────
  name:     text('name').notNull(),
  email:    text('email').notNull(),
  whatsapp: text('whatsapp').notNull(),

  // ── Rastreamento UTM ────────────────────────
  utm_source:   text('utm_source'),
  utm_medium:   text('utm_medium'),
  utm_campaign: text('utm_campaign'),
  utm_term:     text('utm_term'),
  utm_content:  text('utm_content'),

  // ── Metadados ───────────────────────────────
  created_at: timestamp('created_at').defaultNow().notNull(),
})

export type Lead    = typeof leads.$inferSelect
export type NewLead = typeof leads.$inferInsert
