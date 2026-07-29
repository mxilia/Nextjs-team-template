import { createClient } from '@/lib/supabase/server'
import { Message } from '@/types/db'

export const messageRealtime = {
  async broadcastCreated(message: Message) {
    const supabase = await createClient()
    await supabase.channel(`room:${message.room_id}`).send({
      type: 'broadcast',
      event: 'message.created',
      payload: message,
    })
  },

  async broadcastUpdated(message: Message) {
    const supabase = await createClient()
    await supabase.channel(`room:${message.room_id}`).send({
      type: 'broadcast',
      event: 'message.updated',
      payload: message,
    })
  },

  async broadcastDeleted(roomId: string, messageId: string) {
    const supabase = await createClient()
    await supabase.channel(`room:${roomId}`).send({
      type: 'broadcast',
      event: 'message.deleted',
      payload: {
        id: messageId,
      },
    })
  },
}
