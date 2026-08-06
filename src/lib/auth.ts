import { createClient } from '@/lib/supabase/server'
import { profileSupabase } from '@/services/supabase/postgres/profile'

export async function getAuthenticatedUser() {
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    return null
  }

  return user
}

export async function requireAuthenticatedUser() {
  const user = await getAuthenticatedUser()

  if (!user) {
    throw new Error('unauthorized')
  }

  return user
}

export async function getAuthenticatedProfile() {
  const user = await getAuthenticatedUser()

  if (!user) {
    return null
  }

  const [profile, error] = await profileSupabase.getById(user.id)

  if (error || !profile) {
    return null
  }

  return profile
}

export async function requireAuthenticatedProfile() {
  const profile = await getAuthenticatedProfile()

  if (!profile) {
    throw new Error('unauthorized')
  }

  return profile
}
