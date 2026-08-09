'use server'

import { createClient } from '@/lib/supabase/server'
import { loginSchema, signupSchema } from './schema'
import { createHmac } from 'crypto'

export async function login(data: unknown): Promise<{ success: boolean; message?: string }> {
  const parsed = loginSchema.safeParse(data)

  if (!parsed.success) {
    return {
      success: false,
      message: 'Invalid input',
    }
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword(parsed.data)
  if (error) {
    return {
      success: false,
      message: error.message,
    }
  }
  return {
    success: true,
  }
}

export async function signup(data: unknown): Promise<{ success: boolean; message?: string }> {
  const parsed = signupSchema.safeParse(data)

  if (!parsed.success) {
    return {
      success: false,
      message: 'Invalid input',
    }
  }

  const supabase = await createClient()
  const { email, password, invitation_code } = parsed.data

  const inviteHash = createHmac('sha256', process.env.INVITE_SECRET!)
    .update(invitation_code)
    .digest('hex')

  const { error: inviteCodeError } = await supabase.rpc('claim_invite_code', {
    p_code_hash: inviteHash,
  })

  if (inviteCodeError) {
    return {
      success: false,
      message: inviteCodeError.message,
    }
  }

  const { error: signUpError } = await supabase.auth.signUp({
    email,
    password,
  })
  if (signUpError) {
    return {
      success: false,
      message: signUpError.message,
    }
  }

  return {
    success: true,
  }
}

export async function logout(): Promise<{
  success: boolean
  message?: string
}> {
  const supabase = await createClient()
  const { error } = await supabase.auth.signOut()
  if (error) {
    return {
      success: false,
      message: error.message,
    }
  }
  return {
    success: true,
  }
}
