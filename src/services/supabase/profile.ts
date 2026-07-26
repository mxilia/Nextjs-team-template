import { createClient } from '@/lib/supabase/server'
import { CreateProfile, Profile, UpdateProfile } from '@/types/db'
import { Paginated, Result, toPaginated, toResult } from '@/utils/supabase-helper'

const table = 'profiles' as const

export const profileSupabase = {
  getAll: async (page: number, limit: number): Promise<Result<Paginated<Profile>>> => {
    const supabase = await createClient()
    const from = (page - 1) * limit
    const to = from + limit - 1
    const { data, error, count } = await supabase.from(table).select('*').range(from, to)
    return toResult(toPaginated(data ?? [], count ?? 0, page, limit), error)
  },
  getByUsername: async (username: string): Promise<Result<Profile>> => {
    const supabase = await createClient()
    const { data, error } = await supabase.from(table).select('*').eq('username', username).single()
    return toResult(data, error)
  },
  create: async (profile: CreateProfile): Promise<Result<Profile>> => {
    const supabase = await createClient()
    const { data, error } = await supabase.from(table).insert(profile).select().single()
    return toResult(data, error)
  },
  update: async (id: string, profile: UpdateProfile): Promise<Result<Profile>> => {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from(table)
      .update(profile)
      .eq('id', id)
      .select()
      .single()
    return toResult(data, error)
  },
}
