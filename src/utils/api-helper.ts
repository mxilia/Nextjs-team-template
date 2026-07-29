import { ApiFailure, ApiPaginatedSuccess, ApiSuccess, PaginationMeta } from '@/types/api-response'
import { AppErrorCode } from '@/types/app-error'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { getAuthenticatedUser } from '@/lib/auth/server'

export async function protect() {
  const user = await getAuthenticatedUser()

  if (!user) {
    return [null, failure(401, AppErrorCode.UNAUTHORIZED, 'Unauthorized')] as const
  }

  return [user, null] as const
}

export const success = <T>(data: T, status = 200) =>
  NextResponse.json(
    {
      data,
    } satisfies ApiSuccess<T>,
    {
      status,
    },
  )

export const successPaginated = <T>(data: T[], pagination: PaginationMeta, status = 200) =>
  NextResponse.json(
    {
      data,
      pagination,
    } satisfies ApiPaginatedSuccess<T>,
    { status },
  )

export const failure = (status: number, code: AppErrorCode, message: string) =>
  NextResponse.json(
    {
      code,
      message,
    } satisfies ApiFailure,
    {
      status,
    },
  )

export type ParseResult<T> = [data: T | null, error: NextResponse] | [data: T, error: null]

export async function parseBody<T>(
  req: NextRequest,
  schema: z.ZodType<T>,
): Promise<ParseResult<T>> {
  const json = await req.json()
  const result = schema.safeParse(json)

  if (!result.success) {
    return [
      null,
      failure(400, AppErrorCode.INVALID_BODY, result.error.issues[0]?.message ?? 'invalid body'),
    ]
  }

  return [result.data, null]
}

export function toPaginationMeta(page: number, limit: number, total: number): PaginationMeta {
  const totalPages = Math.ceil(total / limit)

  return {
    page,
    limit,
    total,
    totalPages,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1,
  }
}
