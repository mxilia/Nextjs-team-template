import { messageSupabase } from '@/services/supabase/postgres/message'
import { roomSupabase } from '@/services/supabase/postgres/room'
import { messageRealtime } from '@/services/supabase/realtime/message'
import { AppErrorCode } from '@/types/app-error'
import { Message } from '@/types/db'
import { failure, parseBody, success, successPaginated, toPaginationMeta } from '@/utils/api-helper'
import { NextRequest } from 'next/server'
import z from 'zod'

export async function GET(req: NextRequest, params: Promise<{ roomId: string }>) {
  const { roomId } = await params
  const page = Math.max(1, Number(req.nextUrl.searchParams.get('page') ?? 1))
  const limit = Math.max(1, Number(req.nextUrl.searchParams.get('limit') ?? 5))

  const room = await roomSupabase.getById(roomId)
  if (room === null) {
    return failure(404, AppErrorCode.NOT_FOUND, 'room not found')
  }

  const [result, error] = await messageSupabase.getByRoomId(roomId, page, limit)
  if (error) {
    return failure(500, AppErrorCode.INTERNAL_ERROR, 'cannot fetch messages')
  }

  return successPaginated(result.rows, toPaginationMeta(page, limit, result.total))
}

const createMessageSchema = z.object({
  content: z.string().min(1).max(500),
})

export async function POST(req: NextRequest, params: Promise<{ roomId: string }>) {
  const { roomId } = await params

  const [body, parseError] = await parseBody(req, createMessageSchema)
  if (parseError !== null) {
    return parseError
  }

  const room = await roomSupabase.getById(roomId)
  if (room === null) {
    return failure(404, AppErrorCode.NOT_FOUND, 'room not found')
  }

  const [message, error] = await messageSupabase.create({
    room_id: roomId,
    content: body.content,
  } as Message)
  if (error) {
    return failure(500, AppErrorCode.INTERNAL_ERROR, 'cannot create new message')
  }

  await messageRealtime.broadcastCreated(message)

  return success(message, 201)
}
