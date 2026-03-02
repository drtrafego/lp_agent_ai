import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import * as schema from './schema'

// ─────────────────────────────────────────────────────────
//  Inicialização LAZY do banco de dados.
//
//  O neon() NÃO pode ser chamado no topo do módulo porque o
//  Next.js importa os arquivos durante o build (static analysis),
//  quando DATABASE_URL ainda não está disponível.
//
//  A função getDb() só é chamada dentro dos handlers de request,
//  onde as variáveis de ambiente já estão injetadas pelo runtime.
// ─────────────────────────────────────────────────────────

export function getDb() {
  const url = process.env.DATABASE_URL
  if (!url) throw new Error('[db] DATABASE_URL não configurada.')
  return drizzle(neon(url), { schema })
}
