'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  Plus,
  Pencil,
  X,
  Loader2,
  Check,
  Ship,
  Upload,
  Trash2,
  ChevronDown,
  ChevronUp,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import type { JetSkiPageContent } from '@/lib/supabase/types'

interface JetSkiRow {
  id: string
  name: string
  slug: string
  description: string
  tagline: string
  image_url: string
  images: string[]
  page_content: JetSkiPageContent
  is_active: boolean
  created_at: string
}

interface FormState {
  name: string
  slug: string
  description: string
  tagline: string
  imageUrl: string
  images: string[]
  pageContent: JetSkiPageContent
}

const defaultPageContent: JetSkiPageContent = {
  hero: { badge: '', title: '', subtitle: '' },
  intro: { title: '', description: '' },
  highlights: [],
  specs: { title: 'Tehnične specifikacije', subtitle: '', rows: [] },
  gallery: { title: 'Galerija', subtitle: '' },
  cta: { title: '', subtitle: '', ctaText: 'Rezerviraj termin' },
}

const emptyForm: FormState = {
  name: '',
  slug: '',
  description: '',
  tagline: '',
  imageUrl: '/images/1.jpg',
  images: [],
  pageContent: defaultPageContent,
}

export default function JetSkisPage() {
  const [jetskis, setJetskis] = useState<JetSkiRow[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<FormState>(emptyForm)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    basic: true,
    images: false,
    hero: false,
    intro: false,
    highlights: false,
    specs: false,
    gallery: false,
    cta: false,
  })

  const fetchJetskis = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/jetskis')
      if (!res.ok) return
      const data = await res.json()
      setJetskis(data.jetskis || [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchJetskis()
  }, [fetchJetskis])

  function toggleSection(key: string) {
    setExpandedSections((s) => ({ ...s, [key]: !s[key] }))
  }

  function openNewForm() {
    setForm(emptyForm)
    setEditingId(null)
    setShowForm(true)
    setExpandedSections({ basic: true, images: false, hero: false, intro: false, highlights: false, specs: false, gallery: false, cta: false })
  }

  function openEditForm(js: JetSkiRow) {
    const pc = js.page_content || defaultPageContent
    setForm({
      name: js.name,
      slug: js.slug,
      description: js.description,
      tagline: js.tagline || '',
      imageUrl: js.image_url,
      images: js.images || [],
      pageContent: { ...defaultPageContent, ...pc },
    })
    setEditingId(js.id)
    setShowForm(true)
    setExpandedSections({ basic: true, images: true, hero: false, intro: false, highlights: false, specs: false, gallery: false, cta: false })
  }

  function closeForm() {
    setShowForm(false)
    setEditingId(null)
    setForm(emptyForm)
  }

  function handleNameChange(value: string) {
    setForm((f) => ({
      ...f,
      name: value,
      slug: editingId
        ? f.slug
        : value
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, ''),
    }))
  }

  function updatePageContent(path: string, value: unknown) {
    setForm((f) => {
      const pc = JSON.parse(JSON.stringify(f.pageContent))
      const keys = path.split('.')
      let obj = pc
      for (let i = 0; i < keys.length - 1; i++) {
        if (obj[keys[i]] === undefined) obj[keys[i]] = {}
        obj = obj[keys[i]]
      }
      obj[keys[keys.length - 1]] = value
      return { ...f, pageContent: pc }
    })
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files
    if (!files || files.length === 0) return

    setUploading(true)
    const newUrls: string[] = []

    for (const file of Array.from(files)) {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('slug', form.slug || 'temp')

      try {
        const res = await fetch('/api/admin/jetskis/images', {
          method: 'POST',
          body: formData,
        })
        if (res.ok) {
          const data = await res.json()
          newUrls.push(data.url)
        }
      } catch (err) {
        console.error('Upload failed:', err)
      }
    }

    setForm((f) => ({
      ...f,
      images: [...f.images, ...newUrls],
      imageUrl: f.images.length === 0 && newUrls.length > 0 ? newUrls[0] : f.imageUrl,
    }))
    setUploading(false)
    e.target.value = ''
  }

  function removeImage(index: number) {
    setForm((f) => {
      const imgs = f.images.filter((_, i) => i !== index)
      return {
        ...f,
        images: imgs,
        imageUrl: imgs[0] || '/images/1.jpg',
      }
    })
  }

  function moveImage(index: number, direction: -1 | 1) {
    setForm((f) => {
      const imgs = [...f.images]
      const newIdx = index + direction
      if (newIdx < 0 || newIdx >= imgs.length) return f
      ;[imgs[index], imgs[newIdx]] = [imgs[newIdx], imgs[index]]
      return { ...f, images: imgs, imageUrl: imgs[0] }
    })
  }

  function addHighlight() {
    const highlights = [...(form.pageContent.highlights || [])]
    highlights.push({ title: '', description: '', icon: 'Feather' })
    updatePageContent('highlights', highlights)
  }

  function removeHighlight(index: number) {
    const highlights = (form.pageContent.highlights || []).filter((_, i) => i !== index)
    updatePageContent('highlights', highlights)
  }

  function updateHighlight(index: number, field: string, value: string) {
    const highlights = [...(form.pageContent.highlights || [])]
    highlights[index] = { ...highlights[index], [field]: value }
    updatePageContent('highlights', highlights)
  }

  function addSpecRow() {
    const rows = [...(form.pageContent.specs?.rows || [])]
    rows.push({ label: '', value: '' })
    updatePageContent('specs.rows', rows)
  }

  function removeSpecRow(index: number) {
    const rows = (form.pageContent.specs?.rows || []).filter((_, i) => i !== index)
    updatePageContent('specs.rows', rows)
  }

  function updateSpecRow(index: number, field: 'label' | 'value', value: string) {
    const rows = [...(form.pageContent.specs?.rows || [])]
    rows[index] = { ...rows[index], [field]: value }
    updatePageContent('specs.rows', rows)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)

    const payload = {
      id: editingId || undefined,
      name: form.name,
      slug: form.slug,
      description: form.description,
      tagline: form.tagline,
      imageUrl: form.images[0] || form.imageUrl,
      images: form.images,
      pageContent: form.pageContent,
    }

    try {
      const method = editingId ? 'PUT' : 'POST'
      const res = await fetch('/api/admin/jetskis', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (res.ok) {
        closeForm()
        fetchJetskis()
      }
    } catch (err) {
      console.error(err)
    } finally {
      setSaving(false)
    }
  }

  async function toggleActive(js: JetSkiRow) {
    try {
      await fetch('/api/admin/jetskis', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: js.id, isActive: !js.is_active }),
      })
      fetchJetskis()
    } catch (err) {
      console.error(err)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Jet skiji</h1>
          <p className="text-sm text-gray-500 mt-1">
            Upravljanje flote — dodajte, uredite in naložite slike za vsak jet ski.
          </p>
        </div>
        <Button onClick={openNewForm}>
          <Plus className="w-4 h-4 mr-1.5" /> Dodaj jet ski
        </Button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">
              {editingId ? 'Uredi jet ski' : 'Nov jet ski'}
            </h3>
            <button onClick={closeForm} className="text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Basic info */}
            <SectionHeader title="Osnovni podatki" sectionKey="basic" expanded={expandedSections.basic} toggle={toggleSection} />
            {expandedSections.basic && (
              <div className="space-y-4 pl-2 border-l-2 border-gray-100 ml-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-xs">Ime</Label>
                    <Input
                      value={form.name}
                      onChange={(e) => handleNameChange(e.target.value)}
                      placeholder="Sea-Doo Spark 2UP 90HP"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs">Slug (URL)</Label>
                    <Input
                      value={form.slug}
                      onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
                      placeholder="spark-1"
                      required
                    />
                    <p className="text-xs text-gray-400">Stran: /flota/{form.slug || '...'}</p>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">Kratki opis (za kartico na /flota)</Label>
                  <Input
                    value={form.tagline}
                    onChange={(e) => setForm((f) => ({ ...f, tagline: e.target.value }))}
                    placeholder="Kompakten, hiter in zabaven..."
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">Daljši opis</Label>
                  <Textarea
                    value={form.description}
                    onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                    placeholder="Podrobnejši opis jet skija..."
                    rows={2}
                  />
                </div>
              </div>
            )}

            {/* Images */}
            <SectionHeader title="Slike" sectionKey="images" expanded={expandedSections.images} toggle={toggleSection} />
            {expandedSections.images && (
              <div className="space-y-4 pl-2 border-l-2 border-gray-100 ml-1">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {form.images.map((img, idx) => (
                    <div key={idx} className="relative group aspect-[4/3] rounded-lg overflow-hidden border border-gray-200">
                      <img src={img} alt="" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100">
                        {idx > 0 && (
                          <button type="button" onClick={() => moveImage(idx, -1)} className="p-1.5 rounded bg-white/90 text-gray-700 hover:bg-white">
                            <ChevronUp className="w-3.5 h-3.5" />
                          </button>
                        )}
                        {idx < form.images.length - 1 && (
                          <button type="button" onClick={() => moveImage(idx, 1)} className="p-1.5 rounded bg-white/90 text-gray-700 hover:bg-white">
                            <ChevronDown className="w-3.5 h-3.5" />
                          </button>
                        )}
                        <button type="button" onClick={() => removeImage(idx)} className="p-1.5 rounded bg-red-500/90 text-white hover:bg-red-600">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      {idx === 0 && (
                        <span className="absolute top-1 left-1 text-[10px] bg-primary-500 text-white px-1.5 py-0.5 rounded">Naslovna</span>
                      )}
                    </div>
                  ))}
                  <label className="aspect-[4/3] rounded-lg border-2 border-dashed border-gray-300 hover:border-primary-400 flex flex-col items-center justify-center cursor-pointer transition-colors">
                    {uploading ? (
                      <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
                    ) : (
                      <>
                        <Upload className="w-5 h-5 text-gray-400 mb-1" />
                        <span className="text-xs text-gray-400">Naloži</span>
                      </>
                    )}
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      multiple
                      className="hidden"
                      onChange={handleImageUpload}
                      disabled={uploading}
                    />
                  </label>
                </div>
              </div>
            )}

            {/* Hero section */}
            <SectionHeader title="Hero sekcija" sectionKey="hero" expanded={expandedSections.hero} toggle={toggleSection} />
            {expandedSections.hero && (
              <div className="space-y-3 pl-2 border-l-2 border-gray-100 ml-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label className="text-xs">Značka (badge)</Label>
                    <Input
                      value={form.pageContent.hero?.badge || ''}
                      onChange={(e) => updatePageContent('hero.badge', e.target.value)}
                      placeholder="Naš jet ski"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs">Naslov</Label>
                    <Input
                      value={form.pageContent.hero?.title || ''}
                      onChange={(e) => updatePageContent('hero.title', e.target.value)}
                      placeholder="Sea-Doo Spark 2UP 90HP"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">Podnaslov</Label>
                  <Input
                    value={form.pageContent.hero?.subtitle || ''}
                    onChange={(e) => updatePageContent('hero.subtitle', e.target.value)}
                    placeholder="Kompakten, hiter in zabaven..."
                  />
                </div>
              </div>
            )}

            {/* Intro */}
            <SectionHeader title="Uvod" sectionKey="intro" expanded={expandedSections.intro} toggle={toggleSection} />
            {expandedSections.intro && (
              <div className="space-y-3 pl-2 border-l-2 border-gray-100 ml-1">
                <div className="space-y-1.5">
                  <Label className="text-xs">Naslov</Label>
                  <Input
                    value={form.pageContent.intro?.title || ''}
                    onChange={(e) => updatePageContent('intro.title', e.target.value)}
                    placeholder="Zakaj Sea-Doo Spark?"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">Opis</Label>
                  <Textarea
                    value={form.pageContent.intro?.description || ''}
                    onChange={(e) => updatePageContent('intro.description', e.target.value)}
                    placeholder="Podroben opis jet skija..."
                    rows={4}
                  />
                </div>
              </div>
            )}

            {/* Highlights */}
            <SectionHeader title="Prednosti" sectionKey="highlights" expanded={expandedSections.highlights} toggle={toggleSection} />
            {expandedSections.highlights && (
              <div className="space-y-3 pl-2 border-l-2 border-gray-100 ml-1">
                {(form.pageContent.highlights || []).map((h, idx) => (
                  <div key={idx} className="flex gap-2 items-start bg-gray-50 rounded-lg p-3">
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <Input
                        value={h.title}
                        onChange={(e) => updateHighlight(idx, 'title', e.target.value)}
                        placeholder="Naslov"
                        className="text-xs"
                      />
                      <Input
                        value={h.description}
                        onChange={(e) => updateHighlight(idx, 'description', e.target.value)}
                        placeholder="Opis"
                        className="text-xs"
                      />
                      <Input
                        value={h.icon}
                        onChange={(e) => updateHighlight(idx, 'icon', e.target.value)}
                        placeholder="Ikona (Feather, Gauge...)"
                        className="text-xs"
                      />
                    </div>
                    <button type="button" onClick={() => removeHighlight(idx)} className="text-red-400 hover:text-red-600 mt-2">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={addHighlight}>
                  <Plus className="w-3 h-3 mr-1" /> Dodaj prednost
                </Button>
              </div>
            )}

            {/* Specs */}
            <SectionHeader title="Specifikacije" sectionKey="specs" expanded={expandedSections.specs} toggle={toggleSection} />
            {expandedSections.specs && (
              <div className="space-y-3 pl-2 border-l-2 border-gray-100 ml-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label className="text-xs">Naslov</Label>
                    <Input
                      value={form.pageContent.specs?.title || ''}
                      onChange={(e) => updatePageContent('specs.title', e.target.value)}
                      placeholder="Tehnične specifikacije"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs">Podnaslov</Label>
                    <Input
                      value={form.pageContent.specs?.subtitle || ''}
                      onChange={(e) => updatePageContent('specs.subtitle', e.target.value)}
                      placeholder="Vse podrobnosti..."
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  {(form.pageContent.specs?.rows || []).map((row, idx) => (
                    <div key={idx} className="flex gap-2 items-center">
                      <Input
                        value={row.label}
                        onChange={(e) => updateSpecRow(idx, 'label', e.target.value)}
                        placeholder="Oznaka (npr. Motor)"
                        className="text-xs flex-1"
                      />
                      <Input
                        value={row.value}
                        onChange={(e) => updateSpecRow(idx, 'value', e.target.value)}
                        placeholder="Vrednost (npr. Rotax 900 ACE)"
                        className="text-xs flex-1"
                      />
                      <button type="button" onClick={() => removeSpecRow(idx)} className="text-red-400 hover:text-red-600">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                  <Button type="button" variant="outline" size="sm" onClick={addSpecRow}>
                    <Plus className="w-3 h-3 mr-1" /> Dodaj vrstico
                  </Button>
                </div>
              </div>
            )}

            {/* Gallery section text */}
            <SectionHeader title="Galerija (naslovi)" sectionKey="gallery" expanded={expandedSections.gallery} toggle={toggleSection} />
            {expandedSections.gallery && (
              <div className="space-y-3 pl-2 border-l-2 border-gray-100 ml-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label className="text-xs">Naslov</Label>
                    <Input
                      value={form.pageContent.gallery?.title || ''}
                      onChange={(e) => updatePageContent('gallery.title', e.target.value)}
                      placeholder="Galerija"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs">Podnaslov</Label>
                    <Input
                      value={form.pageContent.gallery?.subtitle || ''}
                      onChange={(e) => updatePageContent('gallery.subtitle', e.target.value)}
                      placeholder="Oglejte si naš jet ski..."
                    />
                  </div>
                </div>
              </div>
            )}

            {/* CTA */}
            <SectionHeader title="Poziv k akciji (CTA)" sectionKey="cta" expanded={expandedSections.cta} toggle={toggleSection} />
            {expandedSections.cta && (
              <div className="space-y-3 pl-2 border-l-2 border-gray-100 ml-1">
                <div className="space-y-1.5">
                  <Label className="text-xs">Naslov</Label>
                  <Input
                    value={form.pageContent.cta?.title || ''}
                    onChange={(e) => updatePageContent('cta.title', e.target.value)}
                    placeholder="Želite ta jet ski?"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">Podnaslov</Label>
                  <Input
                    value={form.pageContent.cta?.subtitle || ''}
                    onChange={(e) => updatePageContent('cta.subtitle', e.target.value)}
                    placeholder="Rezervirajte ga za svoj termin..."
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">Besedilo gumba</Label>
                  <Input
                    value={form.pageContent.cta?.ctaText || ''}
                    onChange={(e) => updatePageContent('cta.ctaText', e.target.value)}
                    placeholder="Rezerviraj termin"
                  />
                </div>
              </div>
            )}

            {/* Submit */}
            <div className="flex justify-end gap-2 pt-4 border-t border-gray-100">
              <Button type="button" variant="outline" onClick={closeForm}>
                Prekliči
              </Button>
              <Button type="submit" disabled={saving}>
                {saving ? (
                  <><Loader2 className="w-4 h-4 mr-1.5 animate-spin" /> Shranjujem...</>
                ) : editingId ? (
                  <><Check className="w-4 h-4 mr-1.5" /> Posodobi</>
                ) : (
                  <><Plus className="w-4 h-4 mr-1.5" /> Dodaj</>
                )}
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Jet ski cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {jetskis.length === 0 && (
          <div className="col-span-full text-center py-16 text-gray-400 text-sm">
            Ni jet skijev. Dodajte prvega.
          </div>
        )}
        {jetskis.map((js) => (
          <div
            key={js.id}
            className={cn(
              'bg-white rounded-xl border border-gray-200 overflow-hidden transition-opacity',
              !js.is_active && 'opacity-50'
            )}
          >
            {js.images && js.images.length > 0 && (
              <div className="h-32 overflow-hidden">
                <img src={js.images[0]} alt={js.name} className="w-full h-full object-cover" />
              </div>
            )}
            <div className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center">
                    <Ship className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{js.name}</h3>
                    <p className="text-xs text-gray-400">/flota/{js.slug}</p>
                  </div>
                </div>
                <Badge
                  variant="outline"
                  className={cn(
                    'text-xs border-0',
                    js.is_active
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-gray-100 text-gray-500'
                  )}
                >
                  {js.is_active ? 'Aktiven' : 'Neaktiven'}
                </Badge>
              </div>

              {js.tagline && (
                <p className="text-sm text-gray-500 mb-3">{js.tagline}</p>
              )}

              <div className="flex flex-wrap items-center gap-2 text-xs text-gray-400 mb-3">
                <span>{js.images?.length || 0} slik</span>
                <span>•</span>
                <span>{(js.page_content as JetSkiPageContent)?.highlights?.length || 0} prednosti</span>
                <span>•</span>
                <span>{(js.page_content as JetSkiPageContent)?.specs?.rows?.length || 0} specifikacij</span>
              </div>

              <div className="flex items-center gap-2 border-t border-gray-100 pt-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  onClick={() => openEditForm(js)}
                >
                  <Pencil className="w-3 h-3 mr-1" /> Uredi
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  onClick={() => toggleActive(js)}
                >
                  {js.is_active ? 'Deaktiviraj' : 'Aktiviraj'}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function SectionHeader({ title, sectionKey, expanded, toggle }: {
  title: string
  sectionKey: string
  expanded: boolean
  toggle: (key: string) => void
}) {
  return (
    <button
      type="button"
      onClick={() => toggle(sectionKey)}
      className="flex items-center justify-between w-full py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
    >
      {title}
      {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
    </button>
  )
}
