import { supabase } from '@/lib/supabase/client'

export async function getAuthenticatedUser() {
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

  const response = await fetch('/api/v1/users/profile/me')
  if (!response.ok) {
    return null
  }

  const result = await response.json()
  return result.data
}

export async function requireAuthenticatedProfile() {
  const profile = await getAuthenticatedProfile()

  if (!profile) {
    throw new Error('unauthorized')
  }

  return profile
}
