import { createClient } from '@/lib/supabase/server'
import { CreateProfile, Profile, UpdateProfile } from '@/types/db'
import { Result } from '@/types/supabase-response'
const table = 'profiles' as const

export const profileSupabase = {
  getAll: async (
    page: number,
    limit: number,
  ): Promise<Result<{ rows: Profile[]; total: number }>> => {
    const supabase = await createClient()
    const from = (page - 1) * limit
    const to = from + limit - 1

    const { data, error, count } = await supabase.from(table).select('*').range(from, to)
    if (error) {
      return [null, error]
    }

    return [{ rows: data ?? [], total: count ?? 0 }, error]
  },

  getById: async (id: string): Promise<Result<Profile>> => {
    const supabase = await createClient()

    const { data, error } = await supabase.from(table).select('*').eq('id', id).single()
    if (error) {
      return [null, error]
    }

    return [data, null]
  },

  getByUsername: async (username: string): Promise<Result<Profile>> => {
    const supabase = await createClient()

    const { data, error } = await supabase.from(table).select('*').eq('username', username).single()
    if (error) {
      return [null, error]
    }

    return [data, null]
  },

  create: async (profile: CreateProfile): Promise<Result<Profile>> => {
    const supabase = await createClient()

    const { data, error } = await supabase.from(table).insert(profile).select().single()
    if (error) {
      return [null, error]
    }

    return [data, null]
  },

  update: async (id: string, profile: UpdateProfile): Promise<Result<Profile>> => {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from(table)
      .update(profile)
      .eq('id', id)
      .select()
      .single()
    if (error) {
      return [null, error]
    }

    return [data, null]
  },
}
