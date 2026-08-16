import { messageSupabase } from '@/services/supabase/postgres/message'
import { AppErrorCode } from '@/types/app-error'
import { failure, protect, success } from '@/utils/api-helper'

export async function DELETE({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const [user, authError] = await protect()
  if (authError) {
    return authError
  }

  const [message, messageError] = await messageSupabase.getById(id)
  if (!message) {
    return failure(404, AppErrorCode.NOT_FOUND, 'message not found')
  }
  if (messageError) {
    return failure(500, AppErrorCode.INTERNAL_ERROR, 'cannot fetch messages')
  }

  if (message.sender_id !== user.id) {
    return failure(403, AppErrorCode.FORBIDDEN, 'you are not allowed to delete this message')
  }

  const [, error] = await messageSupabase.delete(id)
  if (error) {
    if (error.code === 'PGRST116') {
      return failure(404, AppErrorCode.NOT_FOUND, 'message not found')
    }
    return failure(500, AppErrorCode.INTERNAL_ERROR, 'cannot fetch messages')
  }

  return success(null, 204)
}
