export { getSupabase } from './client'
export { createServerClient } from './server'
export { createAuthBrowser } from './auth-browser'
// Note: import { verifyAdmin, createAuthServer } directly from '@/lib/supabase/auth'
// They use next/headers which cannot be re-exported through a barrel used by client components.
export type {
  Database,
  BookingStatus,
  JetSki,
  JetSkiPageContent,
  Customer,
  Booking,
  Payment,
  BlockedDate,
  PricingRule,
  PricingRuleInsert,
  PricingRuleType,
} from './types'
