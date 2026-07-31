import { api } from '@/lib/api-client'
import { CreateMessage, Message } from '@/types/db'

export const messageApi = {
  getByRoomId: async (roomId: string, page: number, limit: number) => {
    return api.get<{ data: Message[] }>(`/api/v1/messages/room/${roomId}`, {
      params: { page: page, limit: limit },
    })
  },

  create: async (roomId: string, message: CreateMessage) => {
    return api.post<{ data: Message }>(`/api/v1/messages/room/${roomId}`, { body: { message } })
  },

  deleteById: async (id: string) => {
    return api.delete<{ data: null }>(`/api/v/1/messages/${id}`)
  },
}
