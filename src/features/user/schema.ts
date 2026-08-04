import { UpdateProfile } from '@/types/db'
import z from 'zod'

export const patchProfileSchema: z.ZodType<UpdateProfile> = z.object({
  avatar_url: z.url().optional(),
  username: z.string().min(1).max(20).optional(),
})

export type PatchProfileInput = z.infer<typeof patchProfileSchema>
