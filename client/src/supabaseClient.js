import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_PUBLIC_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_PUBLIC_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase URL and Key are required')
}

export const supabase = createClient(supabaseUrl, supabaseKey)