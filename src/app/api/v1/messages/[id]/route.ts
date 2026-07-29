import { messageSupabase } from '@/services/supabase/postgres/message'
import { AppErrorCode } from '@/types/app-error'
import { failure, success } from '@/utils/api-helper'

export async function DELETE(params: Promise<{ id: string }>) {
  const { id } = await params

  const [_, error] = await messageSupabase.delete(id)
  if (error) {
    if (error.code === 'PGRST116') {
      return failure(404, AppErrorCode.NOT_FOUND, 'message not found')
    }
    return failure(500, AppErrorCode.INTERNAL_ERROR, 'cannot fetch messages')
  }

  return success(null, 204)
}
