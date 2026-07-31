import { api } from '@/lib/api-client'
import { PaginationMeta } from '@/types/api-response'
import { Profile, UpdateProfile } from '@/types/db'

export const profileApi = {
  getMe: async () => {
    return api.get<{ data: Profile }>(`/api/v1/users/profiles/me`)
  },

  getAll: async (page: number, limit: number) => {
    return api.get<{ data: Profile[]; pagination: PaginationMeta }>(`/api/v1/users/profiles`, {
      params: { page, limit },
    })
  },

  getByUsername: async (username: string) => {
    return api.get<{ data: Profile }>(`/api/v1/users/profiles/${username}`)
  },

  update: async (profile: UpdateProfile) => {
    return api.patch<{ data: Profile }>(`/api/v1/users/profiles`, { body: { profile } })
  },
}
