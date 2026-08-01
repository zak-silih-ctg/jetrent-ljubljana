import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'

const BUCKET = 'contracts'
const FILE_PATH = 'Jet4You_najemna_pogodba.pdf'

export async function GET(request: NextRequest) {
  const ref = request.nextUrl.searchParams.get('ref')

  if (!ref) {
    return NextResponse.json({ error: 'Missing reference' }, { status: 400 })
  }

  const supabase = createServerClient()

  // Verify the booking reference exists
  const { data: booking } = await supabase
    .from('bookings')
    .select('id')
    .eq('reference', ref)
    .single()

  if (!booking) {
    return NextResponse.json({ error: 'Invalid reference' }, { status: 403 })
  }

  // Download PDF from Supabase Storage
  const { data, error } = await supabase.storage
    .from(BUCKET)
    .download(FILE_PATH)

  if (error || !data) {
    return NextResponse.json({ error: 'File not found' }, { status: 404 })
  }

  const buffer = Buffer.from(await data.arrayBuffer())

  return new NextResponse(buffer, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${FILE_PATH}"`,
    },
  })
}
