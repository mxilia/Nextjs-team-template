import { UpdateProfile } from '@/types/db'
import z from 'zod'

export type PatchProfileZod = UpdateProfile

export const patchProfileSchema: z.ZodType<PatchProfileZod> = z.object({
  avatar_url: z.url().optional(),
  username: z.string().min(1).max(20).optional(),
})
