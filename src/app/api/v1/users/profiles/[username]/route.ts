import { profileSupabase } from '@/services/supabase/postgres/profile'
import { AppErrorCode } from '@/types/app-error'
import { failure, success } from '@/utils/api-helper'

export async function GET(params: Promise<{ username: string }>) {
  const { username } = await params
  const [user, error] = await profileSupabase.getByUsername(username)
  if (error) {
    if (error.code === 'PGRST116') {
      return failure(404, AppErrorCode.NOT_FOUND, 'user not found')
    }
    return failure(500, AppErrorCode.INTERNAL_ERROR, 'internal server error')
  }
  return success(user)
}
