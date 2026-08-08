import { getAuthenticatedProfile } from '@/lib/auth'
import { failure, parseBody, protect, success } from '@/utils/api-helper'
import { AppErrorCode } from '@/types/app-error'
import { NextRequest } from 'next/server'
import { patchProfileSchema } from '@/features/user/schema'
import { profileSupabase } from '@/services/supabase/postgres/profile'
import { profileSchema } from '@/features/auth/schema'

export async function GET() {
  const profile = await getAuthenticatedProfile()

  if (!profile) {
    return failure(404, AppErrorCode.NOT_FOUND, 'Profile not found')
  }

  return success(profile)
}

export async function POST(req: NextRequest) {
  const [user, authError] = await protect()
  if (authError) return authError

  const [body, parseError] = await parseBody(req, profileSchema)
  if (parseError !== null) {
    return parseError
  }

  const [profile, error] = await profileSupabase.create({ ...body, id: user.id })
  if (error) {
    return failure(500, AppErrorCode.INTERNAL_ERROR, 'internal server error')
  }

  return success(profile)
}

export async function PATCH(req: NextRequest) {
  const [user, authError] = await protect()
  if (authError) return authError

  const [body, parseError] = await parseBody(req, patchProfileSchema)
  if (parseError !== null) {
    return parseError
  }

  const [profile, error] = await profileSupabase.update(user.id, body)
  if (error) {
    if (error.code === 'PGRST116') {
      return failure(404, AppErrorCode.NOT_FOUND, 'user not found')
    }
    return failure(500, AppErrorCode.INTERNAL_ERROR, 'internal server error')
  }

  return success(profile)
}
