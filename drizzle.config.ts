import type { Config } from 'drizzle-kit'

export default {
  schema:    './src/lib/schema.ts',
  out:       './drizzle',           // pasta onde as migrations serão geradas
  dialect:   'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
} satisfies Config
