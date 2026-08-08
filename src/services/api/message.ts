import { api } from '@/lib/api-client'
import { PaginationMeta } from '@/types/api-response'
import { CreateMessage, Message } from '@/types/db'

export const messageApi = {
  getByRoomId: async (roomId: string, page: number, limit: number) => {
    return api.get<{ data: Message[]; pagination: PaginationMeta }>(
      `/api/v1/messages/room/${roomId}`,
      {
        params: { page, limit },
      },
    )
  },

  create: async (message: CreateMessage) => {
    return api.post<{ data: Message }>(`/api/v1/messages/room/${message.room_id}`, {
      body: { message },
    })
  },

  deleteById: async (id: string) => {
    return api.delete<{ data: null }>(`/api/v1/messages/${id}`)
  },
}
