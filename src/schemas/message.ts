import { CreateMessage } from '@/types/db'
import z from 'zod'

// doing this because we're using supabase type as main type
export type CreateMessageZod = Omit<CreateMessage, 'room_id'>

export const createMessageSchema: z.ZodType<CreateMessageZod> = z.object({
  content: z.string().min(1).max(500),
})
