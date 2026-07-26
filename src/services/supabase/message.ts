import { createClient } from '@/lib/supabase/server'
import { CreateMessage, Message } from '@/types/db'
import { Result, toResult } from '@/utils/supabase-helper'

const table = 'messages' as const

export const messageSupabase = {
  getByRoomId: async (
    roomId: string,
    page: number,
    limit: number,
  ): Promise<Result<{ rows: Message[]; total: number | null }>> => {
    const supabase = await createClient()
    const from = (page - 1) * limit
    const to = from + limit - 1
    const { data, error, count } = await supabase
      .from(table)
      .select('*')
      .eq('room_id', roomId)
      .order('created_at', { ascending: false })
      .range(from, to)
    return toResult({ rows: data ?? [], total: count }, error)
  },
  create: async (message: CreateMessage): Promise<Result<Message>> => {
    const supabase = await createClient()
    const { data, error } = await supabase.from(table).insert(message).select().single()
    return toResult(data, error)
  },
  delete: async (id: string): Promise<Result<null>> => {
    const supabase = await createClient()
    const { error } = await supabase.from(table).delete().eq('id', id)
    return toResult(null, error)
  },
}
