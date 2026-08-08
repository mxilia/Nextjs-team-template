import { profileSupabase } from '@/services/supabase/postgres/profile'
import { AppErrorCode } from '@/types/app-error'
import { failure, successPaginated, toPaginationMeta } from '@/utils/api-helper'
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
