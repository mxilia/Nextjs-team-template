import z from 'zod'

export const loginSchema = z.object({
  email: z.email('invalid email address'),
  password: z.string().min(8, 'password is required'),
})

export type LoginInput = z.infer<typeof loginSchema>

export const signupSchema = z.object({
  email: z.email('invalid email address'),
  password: z.string().min(8, 'password must be at least 8 characters long'),
  invitation_code: z.string().min(1, 'invitation code is required'),
})

export type SignupInput = z.infer<typeof signupSchema>

export const profileSchema = z.object({
  username: z.string().min(3, 'username must be at least 3 characters long'),
  avatar_url: z.string().optional(),
})

export type ProfileInput = z.infer<typeof profileSchema>
