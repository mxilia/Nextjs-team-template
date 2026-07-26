// utils/result.ts

import type { PostgrestError } from '@supabase/supabase-js'

export type Result<T> =
  | {
      success: true
      data: T
    }
  | {
      success: false
      error: string
      cause?: PostgrestError
    }

export function toResult<T>(data: T | null, error: PostgrestError | null): Result<T> {
  if (error) {
    return {
      success: false,
      error: error.message,
      cause: error,
    }
  }

  if (data === null) {
    return {
      success: false,
      error: 'Expected a row but got null',
    }
  }

  return {
    success: true,
    data,
  }
}
