'use server'

import { createClient } from '@/lib/supabase/server'

export async function login(data: {
  email: string
  password: string
}): Promise<{ success: boolean; message?: string }> {
  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword(data)
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
