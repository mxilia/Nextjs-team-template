import { AppErrorCode } from './app-error'

export type ApiResponse<T> = ApiSuccess<T> | ApiFailure

export type ApiPaginatedResponse<T> = ApiPaginatedSuccess<T> | ApiFailure

export interface ApiSuccess<T> {
  data: T
}

export interface PaginationMeta {
  page: number
  limit: number
  total: number
  totalPages: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}

export interface ApiPaginatedSuccess<T> {
  data: T[]
  pagination: PaginationMeta
}

export interface ApiFailure {
  code: AppErrorCode
  message: string
}
