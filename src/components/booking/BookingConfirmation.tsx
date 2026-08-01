'use client'

import Link from 'next/link'
import { CheckCircle2, Copy, Check, FileDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { bookingContent } from '@/data/booking'
import { businessInfo } from '@/data/business'
import { formatEUR, formatDate, bankDetails, flikDetails } from '@/lib/booking'
import type { PriceBreakdown } from '@/lib/booking'
import type { JetSki } from '@/lib/supabase'
import { useState } from 'react'

interface BookingConfirmationProps {
  reference: string
  dateRange: { start: Date; end: Date }
  jetski: JetSki
  price: PriceBreakdown
}

export default function BookingConfirmation({
  reference,
  dateRange,
  jetski,
  price,
}: BookingConfirmationProps) {
  const content = bookingContent.confirmation
  const [copied, setCopied] = useState(false)

  function copyReference() {
    navigator.clipboard.writeText(reference)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-8">
      {/* Success header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 mb-4">
          <CheckCircle2 className="w-8 h-8 text-emerald-600" />
        </div>
        <h2 className="heading-2 text-gray-900 mb-2">{content.title}</h2>
        <p className="text-gray-500">{content.subtitle}</p>
      </div>

      <div className="max-w-xl mx-auto space-y-6">
        {/* Reference card */}
        <div className="bg-primary-50 border border-primary-200 rounded-2xl p-6 text-center">
          <p className="text-sm text-primary-700 mb-1">{content.referenceLabel}</p>
          <div className="flex items-center justify-center gap-2">
            <span className="text-2xl font-bold font-mono text-primary-900 tracking-wider">
              {reference}
            </span>
            <button
              onClick={copyReference}
              className="text-primary-500 hover:text-primary-700 transition-colors"
              aria-label="Kopiraj referenco"
            >
              {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
            </button>
          </div>
          <Badge variant="outline" className="mt-3 border-amber-400 text-amber-700 bg-amber-50">
            {content.statusPending}
          </Badge>
        </div>

        {/* Booking details */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">{content.dates}</span>
            <span className="font-medium text-gray-900">
              {formatDate(dateRange.start)} — {formatDate(dateRange.end)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">{content.jetski}</span>
            <span className="font-medium text-gray-900">{jetski.name}</span>
          </div>
          <div className="flex justify-between border-t border-gray-100 pt-3">
            <span className="text-gray-500">{content.totalPrice}</span>
            <span className="font-semibold text-gray-900">{formatEUR(price.totalPrice)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">{content.depositToPay}</span>
            <span className="font-bold text-primary-600">{formatEUR(price.depositAmount)}</span>
          </div>
        </div>

        {/* Bank details */}
        <div className="bg-gray-50 rounded-2xl border border-gray-100 p-6 space-y-3 text-sm">
          <h3 className="font-semibold text-gray-900 mb-3">{content.bankDetails}</h3>
          <div className="flex justify-between">
            <span className="text-gray-500">IBAN</span>
            <span className="font-mono font-medium text-gray-900">{bankDetails.iban}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">SWIFT/BIC</span>
            <span className="font-mono font-medium text-gray-900">{bankDetails.swift}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Referenca</span>
            <span className="font-mono font-medium text-gray-900">{reference}</span>
          </div>
          <div className="flex justify-between border-t border-gray-200 pt-3">
            <span className="text-gray-700 font-medium">Znesek</span>
            <span className="font-bold text-primary-600">{formatEUR(price.depositAmount)}</span>
          </div>
        </div>

        {/* Flik details */}
        <div className="bg-gray-50 rounded-2xl border border-gray-100 p-6 space-y-3 text-sm">
          <h3 className="font-semibold text-gray-900 mb-3">{content.flikTitle}</h3>
          <div className="flex justify-between">
            <span className="text-gray-500">{content.flikPhone}</span>
            <span className="font-mono font-medium text-gray-900">{flikDetails.phone}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">{content.flikEmail}</span>
            <span className="font-medium text-gray-900">{flikDetails.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Referenca</span>
            <span className="font-mono font-medium text-gray-900">{reference}</span>
          </div>
          <div className="flex justify-between border-t border-gray-200 pt-3">
            <span className="text-gray-700 font-medium">Znesek</span>
            <span className="font-bold text-primary-600">{formatEUR(price.depositAmount)}</span>
          </div>
        </div>

        {/* Contract download */}
        <div className="bg-primary-50 border border-primary-200 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-primary-900 mb-2 flex items-center gap-2">
            <FileDown className="w-4 h-4" />
            {content.contractTitle}
          </h3>
          <p className="text-sm text-primary-700 mb-3">
            {content.contractText}{' '}
            <a href={`mailto:${businessInfo.contact.email}`} className="font-medium underline">
              {businessInfo.contact.email}
            </a>.
          </p>
          <Button asChild variant="outline" size="sm">
            <a href={`/api/contract?ref=${encodeURIComponent(reference)}`} download="Jet4You_najemna_pogodba.pdf">
              <FileDown className="w-4 h-4 mr-2" />
              {content.contractDownload}
            </a>
          </Button>
        </div>

        {/* Reminder */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <p className="text-sm font-medium text-amber-800 mb-1">{content.reminderTitle}</p>
          <p className="text-sm text-amber-700">{content.reminderText}</p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
          <Button asChild variant="outline">
            <Link href="/">{content.backHome}</Link>
          </Button>
          <Button asChild variant="cta">
            <Link href="/rezervacija">{content.newBooking}</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
