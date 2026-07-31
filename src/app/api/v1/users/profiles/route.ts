import { patchProfileSchema } from '@/schemas/profile'
import { profileSupabase } from '@/services/supabase/postgres/profile'
import { AppErrorCode } from '@/types/app-error'
import {
  failure,
  parseBody,
  protect,
  success,
  successPaginated,
  toPaginationMeta,
} from '@/utils/api-helper'
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  const page = Math.max(1, Number(req.nextUrl.searchParams.get('page') ?? 1))
  const limit = Math.max(1, Number(req.nextUrl.searchParams.get('limit') ?? 5))

  const [result, error] = await profileSupabase.getAll(page, limit)
  if (error) {
    return failure(500, AppErrorCode.INTERNAL_ERROR, 'internal server error')
  }

  return successPaginated(result.rows, toPaginationMeta(page, limit, result.total))
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
