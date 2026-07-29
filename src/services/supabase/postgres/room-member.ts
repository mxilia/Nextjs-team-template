import { createClient } from '@/lib/supabase/server'
import { CreateRoomMember, RoomMember } from '@/types/db'
import { Result } from '@/types/supabase-response'

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
    if (error) {
      return [null, error]
    }

    return [data, null]
  },

  create: async (roomMember: CreateRoomMember): Promise<Result<RoomMember>> => {
    const supabase = await createClient()

    const { data, error } = await supabase.from(table).insert(roomMember).select().single()
    if (error) {
      return [null, error]
    }

    return [data, null]
  },
}
