import { createClient } from '@/lib/supabase/server'
import { Room } from '@/types/db'
import { Result } from '@/types/supabase-response'

const table = 'rooms'

export const roomSupabase = {
  getById: async (id: string): Promise<Result<Room>> => {
    const supabase = await createClient()

    const { data, error } = await supabase.from(table).select('*').eq('id', id).single()
    if (error) {
      return [null, error]
    }

    return [data, null]
  },
}
