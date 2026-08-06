import { getAuthenticatedProfile } from '@/lib/auth'
import { failure, success } from '@/utils/api-helper'
import { AppErrorCode } from '@/types/app-error'

export async function GET() {
  const profile = await getAuthenticatedProfile()

  if (!profile) {
    return failure(404, AppErrorCode.NOT_FOUND, 'Profile not found')
  }

  return success(profile)
}
