import { createClient } from '@/lib/supabase/server'
import { CreateMessage, Message } from '@/types/db'
import { Result } from '@/types/supabase-response'

const table = 'messages' as const

export const messageSupabase = {
  getById: async (id: string): Promise<Result<Message>> => {
    const supabase = await createClient()

    const { data, error } = await supabase.from(table).select('*').eq('id', id).single()
    if (error) {
      return [null, error]
    }

    return [data, null]
  },

  getByRoomId: async (
    roomId: string,
    page: number,
    limit: number,
  ): Promise<Result<{ rows: Message[]; total: number }>> => {
    const supabase = await createClient()
    const from = (page - 1) * limit
    const to = from + limit - 1

    const { data, error, count } = await supabase
      .from(table)
      .select('*')
      .eq('room_id', roomId)
      .order('created_at', { ascending: false })
      .range(from, to)
    if (error) {
      return [null, error]
    }

    return [{ rows: data ?? [], total: count ?? 0 }, null]
  },

  create: async (message: CreateMessage): Promise<Result<Message>> => {
    const supabase = await createClient()

    const { data, error } = await supabase.from(table).insert(message).select().single()
    if (error) {
      return [null, error]
    }

    return [data, null]
  },

  delete: async (id: string): Promise<Result<null>> => {
    const supabase = await createClient()
    const { error } = await supabase.from(table).delete().eq('id', id).single()
    return [null, error]
  },
}
