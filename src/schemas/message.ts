import { CreateMessage } from '@/types/db'
import z from 'zod'

export const createMessageSchema: z.ZodType<Omit<CreateMessage, 'room_id'>> = z.object({
  content: z.string().min(1).max(500),
})
