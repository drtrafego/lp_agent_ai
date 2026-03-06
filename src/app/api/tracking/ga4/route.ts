import { NextRequest, NextResponse } from 'next/server'
import { sendGA4Event } from '@/lib/tracking-server'

/**
 * POST /api/tracking/ga4
 * Proxy para enviar eventos ao GA4 via Measurement Protocol (Server-Side).
 */
export async function POST(req: NextRequest) {
    try {
        const { clientId, eventName, params } = await req.json()

        if (!clientId || !eventName) {
            return NextResponse.json(
                { error: 'clientId and eventName are required' },
                { status: 400 }
            )
        }

        // Dispara o evento server-side (não bloqueante para o cliente)
        // Aborta silenciosamente se GA_MEASUREMENT_ID ou GA_API_SECRET não existirem
        await sendGA4Event(clientId, eventName, params || {})

        return NextResponse.json({ success: true })
    } catch (err) {
        console.error('[api/tracking/ga4] Erro:', err)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
