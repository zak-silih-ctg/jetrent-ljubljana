// Auto-generated types for Supabase tables
// In production, regenerate with: npx supabase gen types typescript

export type BookingStatus =
  | 'pending_payment'
  | 'confirmed'
  | 'cancelled'
  | 'expired'
  | 'completed'

export interface JetSkiPageContent {
  hero?: { badge?: string; title?: string; subtitle?: string }
  intro?: { title?: string; description?: string }
  highlights?: { title: string; description: string; icon: string }[]
  specs?: { title?: string; subtitle?: string; rows?: { label: string; value: string }[] }
  gallery?: { title?: string; subtitle?: string }
  cta?: { title?: string; subtitle?: string; ctaText?: string }
}

// ── Convenience aliases (re-exported from Database) ──────────

export type JetSki = Database['public']['Tables']['jetskis']['Row']
export type Customer = Database['public']['Tables']['customers']['Row']
export type Booking = Database['public']['Tables']['bookings']['Row']
export type Payment = Database['public']['Tables']['payments']['Row']
export type BlockedDate = Database['public']['Tables']['blocked_dates']['Row']

export type JetSkiInsert = Database['public']['Tables']['jetskis']['Insert']
export type CustomerInsert = Database['public']['Tables']['customers']['Insert']
export type BookingInsert = Database['public']['Tables']['bookings']['Insert']
export type PaymentInsert = Database['public']['Tables']['payments']['Insert']
export type BlockedDateInsert = Database['public']['Tables']['blocked_dates']['Insert']

export type PricingRule = Database['public']['Tables']['pricing_rules']['Row']
export type PricingRuleInsert = Database['public']['Tables']['pricing_rules']['Insert']

export type Inquiry = Database['public']['Tables']['inquiries']['Row']
export type InquiryInsert = Database['public']['Tables']['inquiries']['Insert']

export type PricingRuleType = Database['public']['Enums']['pricing_rule_type']

// ── Database interface for Supabase client ───────────────────

export type Database = {
  public: {
    Tables: {
      jetskis: {
        Row: {
          id: string
          name: string
          slug: string
          description: string
          tagline: string
          daily_price_low: number
          daily_price_high: number
          daily_price_short: number
          image_url: string
          images: string[]
          specs: Record<string, string | number>
          page_content: JetSkiPageContent
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description: string
          tagline?: string
          daily_price_low: number
          daily_price_high: number
          daily_price_short: number
          image_url: string
          images?: string[]
          specs?: Record<string, string | number>
          page_content?: JetSkiPageContent
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string
          tagline?: string
          daily_price_low?: number
          daily_price_high?: number
          daily_price_short?: number
          image_url?: string
          images?: string[]
          specs?: Record<string, string | number>
          page_content?: JetSkiPageContent
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      customers: {
        Row: {
          id: string
          first_name: string
          last_name: string
          email: string
          phone: string
          country: string
          created_at: string
        }
        Insert: {
          id?: string
          first_name: string
          last_name: string
          email: string
          phone: string
          country: string
          created_at?: string
        }
        Update: {
          id?: string
          first_name?: string
          last_name?: string
          email?: string
          phone?: string
          country?: string
          created_at?: string
        }
        Relationships: []
      }
      bookings: {
        Row: {
          id: string
          reference: string
          jetski_id: string
          customer_id: string
          start_date: string
          end_date: string
          num_days: number
          daily_rate: number
          rental_total: number
          delivery_km: number
          delivery_fee: number
          total_price: number
          deposit_amount: number
          security_deposit: number
          status: Database['public']['Enums']['booking_status']
          pickup_location: string | null
          customer_message: string | null
          admin_notes: string | null
          expires_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          reference?: string
          jetski_id: string
          customer_id: string
          start_date: string
          end_date: string
          num_days: number
          daily_rate: number
          rental_total: number
          delivery_km?: number
          delivery_fee?: number
          total_price: number
          deposit_amount: number
          security_deposit?: number
          status?: Database['public']['Enums']['booking_status']
          pickup_location?: string | null
          customer_message?: string | null
          admin_notes?: string | null
          expires_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          reference?: string
          jetski_id?: string
          customer_id?: string
          start_date?: string
          end_date?: string
          num_days?: number
          daily_rate?: number
          rental_total?: number
          delivery_km?: number
          delivery_fee?: number
          total_price?: number
          deposit_amount?: number
          security_deposit?: number
          status?: Database['public']['Enums']['booking_status']
          pickup_location?: string | null
          customer_message?: string | null
          admin_notes?: string | null
          expires_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'bookings_jetski_id_fkey'
            columns: ['jetski_id']
            isOneToOne: false
            referencedRelation: 'jetskis'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'bookings_customer_id_fkey'
            columns: ['customer_id']
            isOneToOne: false
            referencedRelation: 'customers'
            referencedColumns: ['id']
          },
        ]
      }
      payments: {
        Row: {
          id: string
          booking_id: string
          amount: number
          payment_type: Database['public']['Enums']['payment_type']
          payment_method: string
          status: Database['public']['Enums']['payment_status']
          reference_number: string
          notes: string | null
          received_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          booking_id: string
          amount: number
          payment_type: Database['public']['Enums']['payment_type']
          payment_method?: string
          status?: Database['public']['Enums']['payment_status']
          reference_number: string
          notes?: string | null
          received_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          booking_id?: string
          amount?: number
          payment_type?: Database['public']['Enums']['payment_type']
          payment_method?: string
          status?: Database['public']['Enums']['payment_status']
          reference_number?: string
          notes?: string | null
          received_at?: string | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'payments_booking_id_fkey'
            columns: ['booking_id']
            isOneToOne: false
            referencedRelation: 'bookings'
            referencedColumns: ['id']
          },
        ]
      }
      blocked_dates: {
        Row: {
          id: string
          jetski_id: string
          start_date: string
          end_date: string
          reason: string
          created_at: string
        }
        Insert: {
          id?: string
          jetski_id: string
          start_date: string
          end_date: string
          reason?: string
          created_at?: string
        }
        Update: {
          id?: string
          jetski_id?: string
          start_date?: string
          end_date?: string
          reason?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'blocked_dates_jetski_id_fkey'
            columns: ['jetski_id']
            isOneToOne: false
            referencedRelation: 'jetskis'
            referencedColumns: ['id']
          },
        ]
      }
      pricing_rules: {
        Row: {
          id: string
          name: string
          rule_type: Database['public']['Enums']['pricing_rule_type']
          start_date: string
          end_date: string
          price_per_day: number
          priority: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          rule_type: Database['public']['Enums']['pricing_rule_type']
          start_date: string
          end_date: string
          price_per_day: number
          priority?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          rule_type?: Database['public']['Enums']['pricing_rule_type']
          start_date?: string
          end_date?: string
          price_per_day?: number
          priority?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          key: string
          value: Record<string, unknown>
          updated_at: string
        }
        Insert: {
          key: string
          value: Record<string, unknown>
          updated_at?: string
        }
        Update: {
          key?: string
          value?: Record<string, unknown>
          updated_at?: string
        }
        Relationships: []
      }
      inquiries: {
        Row: {
          id: string
          name: string
          email: string
          phone: string
          date_from: string | null
          date_to: string | null
          destination: string | null
          has_tow_hitch: boolean | null
          message: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone: string
          date_from?: string | null
          date_to?: string | null
          destination?: string | null
          has_tow_hitch?: boolean | null
          message?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string
          date_from?: string | null
          date_to?: string | null
          destination?: string | null
          has_tow_hitch?: boolean | null
          message?: string | null
          created_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      booking_status: BookingStatus
      payment_status: 'pending' | 'received' | 'refunded'
      payment_type: 'deposit' | 'remaining' | 'full'
      pricing_rule_type: 'low_season' | 'high_season' | 'weekend' | 'daily' | 'custom'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
