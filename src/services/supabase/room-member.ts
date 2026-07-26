import { createClient } from '@/lib/supabase/server'
import { CreateRoomMember, RoomMember } from '@/types/db'
import { Result, toResult } from '@/utils/supabase-helper'

const table = 'room_members' as const

export const roomMemberSupabase = {
  getByRoomIdProfileId: async (roomId: string, profileId: string): Promise<Result<RoomMember>> => {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .eq('room_id', roomId)
      .eq('profile_id', profileId)
      .single()
    return toResult(data, error)
  },
  create: async (roomMember: CreateRoomMember) => {
    const supabase = await createClient()
    const { data, error } = await supabase.from(table).insert(roomMember).select().single()
    return toResult(data, error)
  },
}
