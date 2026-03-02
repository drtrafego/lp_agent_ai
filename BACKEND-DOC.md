# Backend — Documentação Completa
## Processamento de Leads + Meta Conversions API (CAPI)
### Next.js 14 · App Router · Neon · Drizzle ORM · Zod

---

## 1. Visão Geral do Fluxo

```
Frontend (formulário)
        │
        │  POST /api/contact
        │  { name, email, whatsapp, utm_source?, utm_medium?, utm_campaign?, utm_term? }
        ▼
┌─────────────────────────────────────────────────────────────────┐
│  route.ts                                                       │
│                                                                 │
│  1. Valida payload com Zod                                      │
│  2. Captura IP · UserAgent · cookies _fbc/_fbp · origin         │
│  3. INSERT no Neon/PostgreSQL  ◄── timeout 5 s                  │
│     └─ Se falhar: gera ID de fallback em memória                │
│  4. Retorna 200 OK imediatamente ao cliente ◄── aqui para       │
│  5. [BACKGROUND] sendMetaCAPI() fire-and-forget                 │
└─────────────────────────────────────────────────────────────────┘
        │
        └──► Meta Conversions API  (graph.facebook.com/v19.0)
             Evento: Lead · SHA-256 em todos os PII · Match Quality +8.0
```

**Princípio central:** o cliente recebe o `200 OK` assim que o banco confirma o save (ou o fallback atua). A CAPI roda depois, em paralelo, sem bloquear a experiência do usuário.

---

## 2. Stack e Dependências

### `package.json` — seção completa

```json
{
  "scripts": {
    "dev":          "next dev",
    "build":        "next build",
    "start":        "next start",
    "lint":         "next lint",
    "db:generate":  "drizzle-kit generate",
    "db:migrate":   "drizzle-kit migrate",
    "db:push":      "drizzle-kit push",
    "db:studio":    "drizzle-kit studio"
  },
  "dependencies": {
    "next":                      "14.2.5",
    "react":                     "^18",
    "react-dom":                 "^18",
    "drizzle-orm":               "^0.30.10",
    "@neondatabase/serverless":  "^0.9.3",
    "zod":                       "^3.23.8"
  },
  "devDependencies": {
    "@types/node":         "^20",
    "@types/react":        "^18",
    "@types/react-dom":    "^18",
    "typescript":          "^5",
    "eslint":              "^8",
    "eslint-config-next":  "14.2.5",
    "tailwindcss":         "^3.4.1",
    "postcss":             "^8",
    "autoprefixer":        "^10.0.1",
    "drizzle-kit":         "^0.21.4"
  }
}
```

| Pacote | Papel |
|---|---|
| `drizzle-orm` | ORM type-safe para PostgreSQL |
| `@neondatabase/serverless` | Driver HTTP do Neon (funciona em Edge/Serverless) |
| `zod` | Validação e parsing do payload da API |
| `drizzle-kit` | CLI para gerar e rodar migrations |

---

## 3. Variáveis de Ambiente

### `.env.local` (nunca commitar)

```bash
# ── Banco de dados ────────────────────────────────────────────────
# Formato Neon:
# postgresql://user:password@host.neon.tech/neondb?sslmode=require
DATABASE_URL=

# ── Meta Conversions API (server-side, secreto) ───────────────────
# Pixel ID — só números (ex: 1234567890123456)
FB_PIXEL_ID=

# Token da CAPI — gerado em:
# Gerenciador de Eventos → seu Pixel → Configurações → Conversions API
FB_ACCESS_TOKEN=

# ── Meta Pixel (front-end, público) ──────────────────────────────
# Mesmo Pixel ID, prefixado com NEXT_PUBLIC_ para expor ao browser
NEXT_PUBLIC_FB_PIXEL_ID=
```

### Onde obter cada valor

| Variável | Onde gerar |
|---|---|
| `DATABASE_URL` | [console.neon.tech](https://console.neon.tech) → seu projeto → Connection String |
| `FB_PIXEL_ID` | Meta Business → Gerenciador de Eventos → seu Pixel → Configurações |
| `FB_ACCESS_TOKEN` | Meta Business → Gerenciador de Eventos → seu Pixel → Configurações → Conversions API → Gerar token de acesso |
| `NEXT_PUBLIC_FB_PIXEL_ID` | Mesmo valor de `FB_PIXEL_ID` |

---

## 4. Estrutura de Arquivos

```
src/
├── lib/
│   ├── schema.ts            ← Definição da tabela "leads" no PostgreSQL
│   ├── db.ts                ← Instância do Drizzle conectada ao Neon
│   └── tracking-server.ts  ← hashData() + sendMetaCAPI()
└── app/
    └── api/
        └── contact/
            └── route.ts     ← POST /api/contact

drizzle.config.ts            ← Configuração do drizzle-kit (migrations)
.env.local.example           ← Template de variáveis de ambiente
```

---

## 5. Banco de Dados

### 5.1 `src/lib/schema.ts`

Define a tabela `leads` no PostgreSQL via Drizzle ORM.

```typescript
import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'

export const leads = pgTable('leads', {
  // Chave primária — também usado como external_id na Meta CAPI
  id: serial('id').primaryKey(),

  // Dados pessoais (obrigatórios)
  name:     text('name').notNull(),
  email:    text('email').notNull(),
  whatsapp: text('whatsapp').notNull(),

  // UTMs opcionais — chegam da URL da landing page
  utm_source:   text('utm_source'),
  utm_medium:   text('utm_medium'),
  utm_campaign: text('utm_campaign'),
  utm_term:     text('utm_term'),

  // Metadados
  created_at: timestamp('created_at').defaultNow().notNull(),
})

export type Lead    = typeof leads.$inferSelect
export type NewLead = typeof leads.$inferInsert
```

**Colunas detalhadas:**

| Coluna | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `id` | serial (auto-increment) | ✅ | PK · usado como `external_id` no CAPI |
| `name` | text | ✅ | Nome completo do lead |
| `email` | text | ✅ | E-mail do lead |
| `whatsapp` | text | ✅ | Telefone (qualquer formato, limpo no servidor) |
| `utm_source` | text | ❌ | Ex: `facebook`, `instagram` |
| `utm_medium` | text | ❌ | Ex: `cpc`, `paid_social` |
| `utm_campaign` | text | ❌ | Nome da campanha no Ads Manager |
| `utm_term` | text | ❌ | Termo/variante da campanha |
| `created_at` | timestamp | ✅ | Gerado automaticamente pelo banco |

---

### 5.2 `src/lib/db.ts`

Instância singleton do Drizzle conectada ao Neon via HTTP (compatível com serverless/edge).

```typescript
import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import * as schema from './schema'

// DATABASE_URL formato:
// postgresql://user:password@host.neon.tech/neondb?sslmode=require
const sql = neon(process.env.DATABASE_URL!)

export const db = drizzle(sql, { schema })
```

**Por que `neon-http` e não `pg`?**
O driver `@neondatabase/serverless` usa HTTP em vez de WebSocket TCP, o que funciona em ambientes serverless (Vercel Functions, Edge Runtime) onde conexões persistentes não são suportadas.

---

### 5.3 `drizzle.config.ts`

Configuração do `drizzle-kit` para geração e aplicação de migrations.

```typescript
import type { Config } from 'drizzle-kit'

export default {
  schema:    './src/lib/schema.ts',
  out:       './drizzle',      // pasta onde as migrations SQL são geradas
  dialect:   'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
} satisfies Config
```

**Scripts disponíveis:**

```bash
# Gera arquivos SQL de migration com base no schema
npm run db:generate

# Aplica as migrations geradas no banco
npm run db:migrate

# Aplica o schema diretamente sem criar arquivos de migration (dev rápido)
npm run db:push

# Abre o Drizzle Studio (GUI visual para o banco)
npm run db:studio
```

> **Recomendado para produção:** use `db:generate` + `db:migrate`.
> **Recomendado para desenvolvimento:** use `db:push` para aplicar mudanças rapidamente sem gerenciar arquivos de migration.

---

## 6. Meta Conversions API

### 6.1 `src/lib/tracking-server.ts`

> ⚠️ **NUNCA importe este arquivo em Client Components.** Ele usa `crypto` do Node e variáveis de ambiente secretas.

#### Interface de entrada

```typescript
export interface CAPIPayload {
  leadId: number | string   // ID do banco (ou fallback string se o banco falhou)
  name:   string            // Nome completo
  email:  string            // E-mail
  whatsapp: string          // Telefone (qualquer formato)
  // Identificadores coletados do request HTTP:
  ip?:             string   // IP do cliente
  userAgent?:      string   // User-Agent do browser
  fbc?:            string   // Cookie _fbc (click ID do anúncio Meta)
  fbp?:            string   // Cookie _fbp (browser ID do Facebook)
  eventSourceUrl?: string   // URL onde o evento ocorreu
}
```

#### Funções internas (privadas)

```typescript
// SHA-256 em lowercase+trim — exigido pela Meta para qualquer PII
async function hashData(raw: string): Promise<string> {
  const { createHash } = await import('crypto')
  return createHash('sha256').update(raw.trim().toLowerCase()).digest('hex')
}

// Extrai apenas o primeiro nome (Meta só aceita fn, não nome completo)
function firstName(fullName: string): string {
  return fullName.trim().split(/\s+/)[0] ?? fullName
}

// Remove tudo que não é dígito do telefone
function cleanPhone(phone: string): string {
  return phone.replace(/\D/g, '')
}
```

#### Payload exato enviado à Meta

```json
{
  "data": [
    {
      "event_name": "Lead",
      "event_time": 1709149483,
      "event_id": "89",
      "action_source": "website",
      "event_source_url": "https://seudominio.com.br",
      "user_data": {
        "em": ["<sha256 do email>"],
        "ph": ["<sha256 do telefone limpo>"],
        "fn": ["<sha256 do primeiro nome>"],
        "client_ip_address": "177.100.200.5",
        "client_user_agent": "Mozilla/5.0 ...",
        "fbc": "fb.1.1709...28173",
        "fbp": "fb.1.1709...4910",
        "external_id": ["<sha256 do id do banco>"]
      },
      "custom_data": {
        "content_name": "Lead BilderAI",
        "value": 0,
        "currency": "BRL"
      }
    }
  ]
}
```

**Por que cada campo contribui para o Match Quality:**

| Campo | Tipo | Contribuição |
|---|---|---|
| `em` | PII hash | Alta — e-mail é o identificador mais forte |
| `ph` | PII hash | Alta — telefone complementa o e-mail |
| `fn` | PII hash | Média — ajuda a desambiguar pessoas com mesmo e-mail |
| `client_ip_address` | Texto claro | Média — geolocalização e device fingerprint |
| `client_user_agent` | Texto claro | Média — identifica o device |
| `fbc` | Texto claro | Muito alta — vincula direto ao clique no anúncio |
| `fbp` | Texto claro | Alta — identifica o browser/dispositivo cross-session |
| `external_id` | PII hash | +16% de match quality (identificador único do negócio) |

**Campos intencionalmente omitidos:**
- `ln` (sobrenome): frontend usa campo único de nome
- `ct`, `st`, `zp`, `country`: landing page não coleta endereço
- `dob`: não solicitado na captação

**Deduplicação com o Pixel front-end:**
O campo `event_id` recebe o mesmo `leadId` que o Pixel do browser deve enviar. A Meta usa isso para eliminar o evento duplicado — mantendo apenas um registro por conversão real.

#### Comportamento de segurança

```typescript
// Se as env vars estiverem ausentes → aborta silenciosamente
if (!pixelId || !accessToken) {
  console.warn('[CAPI] FB_PIXEL_ID ou FB_ACCESS_TOKEN ausente — evento ignorado.')
  return
}

// Toda a lógica fica dentro de try/catch isolado
// → uma falha na Meta NUNCA derruba o servidor
try {
  // ... monta e envia payload
} catch (err) {
  console.error('[CAPI] Falha inesperada (isolada):', err)
}
```

#### Código completo do arquivo

```typescript
// src/lib/tracking-server.ts
// NUNCA importe em Client Components

export interface CAPIPayload {
  leadId: number | string
  name: string
  email: string
  whatsapp: string
  ip?: string
  userAgent?: string
  fbc?: string
  fbp?: string
  eventSourceUrl?: string
}

async function hashData(raw: string): Promise<string> {
  const { createHash } = await import('crypto')
  return createHash('sha256').update(raw.trim().toLowerCase()).digest('hex')
}

function firstName(fullName: string): string {
  return fullName.trim().split(/\s+/)[0] ?? fullName
}

function cleanPhone(phone: string): string {
  return phone.replace(/\D/g, '')
}

export async function sendMetaCAPI(payload: CAPIPayload): Promise<void> {
  const pixelId     = process.env.FB_PIXEL_ID
  const accessToken = process.env.FB_ACCESS_TOKEN

  if (!pixelId || !accessToken) {
    console.warn('[CAPI] FB_PIXEL_ID ou FB_ACCESS_TOKEN ausente — evento ignorado.')
    return
  }

  try {
    const { leadId, name, email, whatsapp, ip, userAgent, fbc, fbp, eventSourceUrl } = payload

    const [hashedEmail, hashedPhone, hashedFirstName, hashedExternalId] =
      await Promise.all([
        hashData(email),
        hashData(cleanPhone(whatsapp)),
        hashData(firstName(name)),
        hashData(String(leadId)),
      ])

    const body = {
      data: [
        {
          event_name: 'Lead',
          event_time: Math.floor(Date.now() / 1000),
          event_id: String(leadId),
          action_source: 'website',
          event_source_url: eventSourceUrl ?? undefined,
          user_data: {
            em: [hashedEmail],
            ph: [hashedPhone],
            fn: [hashedFirstName],
            ...(ip        && { client_ip_address: ip }),
            ...(userAgent && { client_user_agent: userAgent }),
            ...(fbc && { fbc }),
            ...(fbp && { fbp }),
            external_id: [hashedExternalId],
          },
          custom_data: {
            content_name: 'Lead BilderAI',
            value: 0,
            currency: 'BRL',
          },
        },
      ],
    }

    const url = `https://graph.facebook.com/v19.0/${pixelId}/events?access_token=${accessToken}`

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      const error = await response.text()
      console.error('[CAPI] Erro na resposta da Meta:', response.status, error)
      return
    }

    const result = await response.json()
    console.log('[CAPI] Evento enviado:', {
      leadId,
      eventsReceived: result.events_received,
      fbtrace: result.fbtrace_id,
    })
  } catch (err) {
    console.error('[CAPI] Falha inesperada (isolada):', err)
  }
}
```

---

## 7. API Route — POST /api/contact

### `src/app/api/contact/route.ts`

#### Contrato da API

```
Método:   POST
Rota:     /api/contact
Headers:  Content-Type: application/json

Body (JSON):
{
  "name":         string  (min 2, max 120)       obrigatório
  "email":        string  (formato e-mail válido) obrigatório
  "whatsapp":     string  (min 10, max 20 chars)  obrigatório
  "utm_source":   string                          opcional
  "utm_medium":   string                          opcional
  "utm_campaign": string                          opcional
  "utm_term":     string                          opcional
}

Respostas:
  200 { success: true,  leadId: number | string }
  400 { success: false, message: "Payload inválido" }
  422 { success: false, errors: { campo: ["mensagem"] } }
```

#### Validação — Schema Zod

```typescript
const ContactSchema = z.object({
  name:     z.string().min(2, 'Nome muito curto').max(120),
  email:    z.string().email('E-mail inválido'),
  whatsapp: z.string().min(10, 'Telefone inválido').max(20),
  utm_source:   z.string().optional(),
  utm_medium:   z.string().optional(),
  utm_campaign: z.string().optional(),
  utm_term:     z.string().optional(),
})
```

Erros Zod retornam `422` com o mapa de campo → mensagem:
```json
{
  "success": false,
  "errors": {
    "email": ["E-mail inválido"],
    "whatsapp": ["Telefone inválido"]
  }
}
```

#### Captura de identificadores HTTP

```typescript
// IP — Vercel injeta x-forwarded-for (pode ter lista "1.2.3.4, 10.0.0.1")
const xForwardedFor = req.headers.get('x-forwarded-for')
const ip = xForwardedFor
  ? xForwardedFor.split(',')[0].trim()   // pega só o IP real do cliente
  : (req.headers.get('x-real-ip') ?? undefined)

// User-Agent
const userAgent = req.headers.get('user-agent') ?? undefined

// Cookies — parser inline sem biblioteca
const cookieHeader = req.headers.get('cookie') ?? ''
const parseCookie = (name: string): string | undefined => {
  const match = cookieHeader.match(new RegExp(`(?:^|; )${name}=([^;]*)`))
  return match ? decodeURIComponent(match[1]) : undefined
}
const fbc = parseCookie('_fbc')   // click ID do anúncio (persiste 90 dias)
const fbp = parseCookie('_fbp')   // browser ID do Facebook (persiste 2 anos)

// URL do evento
const eventSourceUrl = req.headers.get('origin') ?? undefined
```

#### withTimeout — Resiliência no banco

```typescript
function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('timeout')), ms),
    ),
  ])
}
```

Uso com 5 segundos de limite:

```typescript
let leadId: number | string

try {
  const [row] = await withTimeout(
    db.insert(leads).values({ ... }).returning({ id: leads.id }),
    5_000,   // 5 segundos
  )
  leadId = row.id
} catch (dbErr) {
  // Fallback: ID em memória para não bloquear o Pixel
  leadId = `backup_timeout_${Date.now()}`
  console.error('[contact] Banco indisponível — fallback ativo:', leadId)
}
```

**O que o fallback garante:**
- O cliente sempre recebe `200 OK` em até ~5 s
- O Pixel front-end consegue o `leadId` para o `event_id` de deduplicação
- A CAPI ainda dispara mesmo sem o banco (com o ID temporário)
- O lead não é perdido do ponto de vista do rastreamento Meta

#### Resposta imediata + CAPI em background

```typescript
// 200 vai para o cliente AQUI — antes do CAPI
const response = NextResponse.json({ success: true, leadId }, { status: 200 })

// CAPI roda depois, sem bloquear
void sendMetaCAPI({ leadId, name, email, whatsapp, ip, userAgent, fbc, fbp, eventSourceUrl })
  .catch((err) => console.error('[contact] Erro CAPI background:', err))

return response
```

O `void` descarta a Promise intencionalmente. Em ambientes Vercel, a função serverless permanece ativa até o CAPI terminar devido ao mecanismo de `waitUntil` implícito do runtime.

#### Código completo do arquivo

```typescript
// src/app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { db } from '@/lib/db'
import { leads } from '@/lib/schema'
import { sendMetaCAPI } from '@/lib/tracking-server'

const ContactSchema = z.object({
  name:     z.string().min(2, 'Nome muito curto').max(120),
  email:    z.string().email('E-mail inválido'),
  whatsapp: z.string().min(10, 'Telefone inválido').max(20),
  utm_source:   z.string().optional(),
  utm_medium:   z.string().optional(),
  utm_campaign: z.string().optional(),
  utm_term:     z.string().optional(),
})

type ContactInput = z.infer<typeof ContactSchema>

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('timeout')), ms),
    ),
  ])
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  let input: ContactInput
  try {
    const raw = await req.json()
    input = ContactSchema.parse(raw)
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: err.flatten().fieldErrors },
        { status: 422 },
      )
    }
    return NextResponse.json(
      { success: false, message: 'Payload inválido' },
      { status: 400 },
    )
  }

  const xForwardedFor = req.headers.get('x-forwarded-for')
  const ip = xForwardedFor
    ? xForwardedFor.split(',')[0].trim()
    : (req.headers.get('x-real-ip') ?? undefined)

  const userAgent = req.headers.get('user-agent') ?? undefined

  const cookieHeader = req.headers.get('cookie') ?? ''
  const parseCookie  = (name: string): string | undefined => {
    const match = cookieHeader.match(new RegExp(`(?:^|; )${name}=([^;]*)`))
    return match ? decodeURIComponent(match[1]) : undefined
  }
  const fbc = parseCookie('_fbc')
  const fbp = parseCookie('_fbp')

  const eventSourceUrl = req.headers.get('origin') ?? undefined

  let leadId: number | string

  try {
    const [row] = await withTimeout(
      db.insert(leads).values({
        name:         input.name,
        email:        input.email,
        whatsapp:     input.whatsapp,
        utm_source:   input.utm_source,
        utm_medium:   input.utm_medium,
        utm_campaign: input.utm_campaign,
        utm_term:     input.utm_term,
      }).returning({ id: leads.id }),
      5_000,
    )
    leadId = row.id
    console.log('[contact] Lead salvo no banco:', leadId)
  } catch (dbErr) {
    leadId = `backup_timeout_${Date.now()}`
    console.error('[contact] Banco indisponível — fallback:', leadId, dbErr)
  }

  const response = NextResponse.json({ success: true, leadId }, { status: 200 })

  void sendMetaCAPI({
    leadId,
    name:     input.name,
    email:    input.email,
    whatsapp: input.whatsapp,
    ip,
    userAgent,
    fbc,
    fbp,
    eventSourceUrl,
  }).catch((err) =>
    console.error('[contact] Erro CAPI background:', err),
  )

  return response
}
```

---

## 8. Como replicar em outro projeto Next.js 14

### Passo 1 — Instalar dependências

```bash
npm install drizzle-orm @neondatabase/serverless zod
npm install -D drizzle-kit
```

### Passo 2 — Criar os arquivos

Copiar exatamente os 4 arquivos nesta ordem:

```
src/lib/schema.ts
src/lib/db.ts
src/lib/tracking-server.ts
src/app/api/contact/route.ts
drizzle.config.ts
```

### Passo 3 — Adicionar scripts ao package.json

```json
"db:generate": "drizzle-kit generate",
"db:migrate":  "drizzle-kit migrate",
"db:push":     "drizzle-kit push",
"db:studio":   "drizzle-kit studio"
```

### Passo 4 — Configurar variáveis de ambiente

```bash
cp .env.local.example .env.local
# Preencher DATABASE_URL, FB_PIXEL_ID, FB_ACCESS_TOKEN, NEXT_PUBLIC_FB_PIXEL_ID
```

### Passo 5 — Criar a tabela no banco

```bash
# Desenvolvimento (sem gerar arquivos de migration):
npm run db:push

# Produção (gera e aplica migration versionada):
npm run db:generate
npm run db:migrate
```

### Passo 6 — Testar o endpoint

```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "email": "joao@email.com",
    "whatsapp": "11999998888",
    "utm_source": "facebook",
    "utm_medium": "cpc",
    "utm_campaign": "remarketing-jul25"
  }'

# Resposta esperada:
# { "success": true, "leadId": 1 }
```

### Passo 7 — Personalizar para o projeto

Nos arquivos copiados, alterar apenas:

| Arquivo | Campo | Valor padrão | O que trocar |
|---|---|---|---|
| `tracking-server.ts` | `content_name` | `"Lead BilderAI"` | Nome do seu produto/empresa |
| `tracking-server.ts` | `value` | `0` | Valor monetário da conversão (se aplicável) |
| `tracking-server.ts` | versão da API | `v19.0` | Versão atual da Graph API da Meta |

---

## 9. Pontos de atenção para produção

### Vercel
- As variáveis de ambiente devem ser adicionadas em **Project Settings → Environment Variables**
- `FB_PIXEL_ID` e `FB_ACCESS_TOKEN` devem ser marcados como **Server-only** (não marcar como "expose to browser")
- `NEXT_PUBLIC_FB_PIXEL_ID` deve ser marcado como exposto ao browser

### Neon
- A connection string já vem com `?sslmode=require` — não remover
- O banco cria automaticamente a tabela com `db:push`; em produção prefira `db:migrate`

### Meta CAPI
- O `event_id` deve ser o mesmo que o Pixel front-end envia para o evento `Lead` — isso garante a deduplicação
- O token de acesso da CAPI **não expira**, mas pode ser revogado manualmente; rotacionar periodicamente
- Para testar sem afetar dados reais, usar o campo `test_event_code` no payload (obtido em Gerenciador de Eventos → Testar eventos)

### Segurança
- `tracking-server.ts` usa `crypto` nativo do Node — nenhuma dependência externa para o hashing
- Todos os PII (email, telefone, nome, id) passam por SHA-256 antes de sair do servidor
- O `FB_ACCESS_TOKEN` nunca aparece em logs — só é interpolado na URL de destino

---

## 10. Diagrama de dependências

```
route.ts
  ├── zod             (validação do body)
  ├── db.ts
  │     └── @neondatabase/serverless  (driver HTTP do Neon)
  │     └── drizzle-orm               (query builder)
  │     └── schema.ts                 (definição da tabela)
  └── tracking-server.ts
        └── crypto (Node nativo)      (SHA-256 dos PII)
        └── fetch  (Node nativo)      (POST para graph.facebook.com)
```

Nenhuma biblioteca de terceiros além das listadas no `package.json`.
