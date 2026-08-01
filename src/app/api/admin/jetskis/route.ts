import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'
import { verifyAdmin } from '@/lib/supabase/auth'

/**
 * GET /api/admin/jetskis
 *
 * Returns all jet skis (including inactive).
 */
export async function GET() {
  const user = await verifyAdmin()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = createServerClient()

  const { data, error } = await supabase
    .from('jetskis')
    .select('*')
    .order('created_at', { ascending: true })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ jetskis: data })
}

/**
 * POST /api/admin/jetskis
 *
 * Add a new jet ski.
 */
export async function POST(req: NextRequest) {
  const user = await verifyAdmin()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json()
  const { name, slug, description, tagline, dailyPriceLow, dailyPriceHigh, dailyPriceShort, imageUrl, images, pageContent } = body

  if (!name || !slug) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const supabase = createServerClient()

  const { data, error } = await supabase
    .from('jetskis')
    .insert({
      name,
      slug,
      description: description || '',
      tagline: tagline || '',
      daily_price_low: dailyPriceLow || 60,
      daily_price_high: dailyPriceHigh || 80,
      daily_price_short: dailyPriceShort || 100,
      image_url: imageUrl || '/images/1.jpg',
      images: images || ['/images/1.jpg'],
      page_content: pageContent || {},
    })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ jetski: data })
}

/**
 * PUT /api/admin/jetskis
 *
 * Update an existing jet ski.
 */
export async function PUT(req: NextRequest) {
  const user = await verifyAdmin()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json()
  const { id, name, slug, description, tagline, dailyPriceLow, dailyPriceHigh, dailyPriceShort, imageUrl, images, pageContent, isActive } = body

  if (!id) {
    return NextResponse.json({ error: 'Missing jet ski id' }, { status: 400 })
  }

  const supabase = createServerClient()

  const updateData: Record<string, unknown> = {}
  if (name !== undefined) updateData.name = name
  if (slug !== undefined) updateData.slug = slug
  if (description !== undefined) updateData.description = description
  if (tagline !== undefined) updateData.tagline = tagline
  if (dailyPriceLow !== undefined) updateData.daily_price_low = dailyPriceLow
  if (dailyPriceHigh !== undefined) updateData.daily_price_high = dailyPriceHigh
  if (dailyPriceShort !== undefined) updateData.daily_price_short = dailyPriceShort
  if (imageUrl !== undefined) updateData.image_url = imageUrl
  if (images !== undefined) updateData.images = images
  if (pageContent !== undefined) updateData.page_content = pageContent
  if (isActive !== undefined) updateData.is_active = isActive

  const { data, error } = await supabase
    .from('jetskis')
    .update(updateData)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ jetski: data })
}
