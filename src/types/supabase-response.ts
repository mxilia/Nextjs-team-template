import { PostgrestError } from '@supabase/supabase-js'

export type Result<T> = [data: T, error: null] | [data: null, error: PostgrestError]
