import { ApiFailure } from '@/types/api-response'
import { env } from './env'

type RequestOptions = {
  method?: string
  headers?: Record<string, string>
  body?: unknown
  cookie?: string
  params?: Record<string, string | number | boolean | undefined | null>
  cache?: RequestCache
  next?: NextFetchRequestConfig
}

function buildUrlWithParams(url: string, params?: RequestOptions['params']): string {
  if (!params) return url

  const filteredParams = Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== undefined && value !== null),
  )

  if (Object.keys(filteredParams).length === 0) return url
  const queryString = new URLSearchParams(filteredParams as Record<string, string>).toString()

  return `${url}?${queryString}`
}

export async function getServerCookies(): Promise<string> {
  // True if client, False if server
  if (typeof window !== 'undefined') return ''

  try {
    // Dynamic import next/headers only on server-side
    const { cookies } = await import('next/headers')
    const cookieStore = await cookies()

    return cookieStore
      .getAll()
      .map((c) => `${c.name}=${c.value}`)
      .join('; ')
  } catch (error) {
    console.error('Failed to access cookies:', error)
    return ''
  }
}

async function fetchApi<T>(url: string, options: RequestOptions = {}): Promise<T> {
  const { method = 'GET', headers = {}, body, cookie, params, cache = 'no-store', next } = options

  // Get cookies from the request when running on server
  let cookieHeader = cookie
  if (typeof window === 'undefined' && !cookie) {
    cookieHeader = await getServerCookies()
  }

  const fullUrl = buildUrlWithParams(`${env.NEXT_PUBLIC_API_URL}${url}`, params)

  const isFormData = body instanceof FormData

  const response = await fetch(fullUrl, {
    method,
    headers: {
      ...(isFormData
        ? {}
        : {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          }),
      ...headers,
      ...(cookieHeader ? { Cookie: cookieHeader } : {}),
    },
    body: body ? (isFormData ? body : JSON.stringify(body)) : undefined,
    credentials: 'include',
    cache,
    next,
  })

  if (!response.ok) {
    const body = await response.json()
    throw body as ApiFailure
  }

  return response.json()
}

export const api = {
  get<T>(url: string, options?: RequestOptions): Promise<T> {
    return fetchApi<T>(url, { ...options, method: 'GET' })
  },
  post<T>(url: string, body?: unknown, options?: RequestOptions): Promise<T> {
    return fetchApi<T>(url, { ...options, method: 'POST', body })
  },
  put<T>(url: string, body?: unknown, options?: RequestOptions): Promise<T> {
    return fetchApi<T>(url, { ...options, method: 'PUT', body })
  },
  patch<T>(url: string, body?: unknown, options?: RequestOptions): Promise<T> {
    return fetchApi<T>(url, { ...options, method: 'PATCH', body })
  },
  delete<T>(url: string, options?: RequestOptions): Promise<T> {
    return fetchApi<T>(url, { ...options, method: 'DELETE' })
  },
}
