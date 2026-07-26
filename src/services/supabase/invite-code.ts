import { createClient } from '@/lib/supabase/server'
import { InviteCode } from '@/types/db'
import { Result, toResult } from '@/utils/supabase-helper'

const table = 'invite_codes' as const

export const inviteCodeSupabase = {
  getById: async (id: string): Promise<Result<InviteCode>> => {
    const supabase = await createClient()
    const { data, error } = await supabase.from(table).select('*').eq('id', id).single()
    return toResult(data, error)
  },
}
