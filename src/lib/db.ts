import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import * as schema from './schema'

// Neon espera a DATABASE_URL no formato:
// postgresql://user:password@host.neon.tech/neondb?sslmode=require
const sql = neon(process.env.DATABASE_URL!)

export const db = drizzle(sql, { schema })
