import {
  infiniteQueryOptions,
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import { messageApi } from '../api/message'

export const getInfiniteMessagesByRoomId = (roomId: string) => {
  return infiniteQueryOptions({
    queryKey: ['messages', 'rooms', roomId],
    queryFn: ({ pageParam = 1 }) => {
      return messageApi.getByRoomId(roomId, pageParam as number, 20)
    },
    getNextPageParam: (lastPage) => {
      if (lastPage?.pagination?.page === lastPage?.pagination?.totalPages) return undefined
      const nextPage = lastPage.pagination.page + 1
      return nextPage
    },
    initialPageParam: 1,
  })
}

export const useInfiniteMessagesByRoomId = (roomId: string) => {
  return useInfiniteQuery(getInfiniteMessagesByRoomId(roomId))
}

export const useCreateMessage = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ roomId, message }: { roomId: string; message: string }) => {
      return messageApi.create({ content: message, room_id: roomId })
    },
    onSuccess: (_, { roomId }) => {
      queryClient.invalidateQueries({ queryKey: getInfiniteMessagesByRoomId(roomId).queryKey })
    },
  })
}

export const useDeleteMessageById = ({ roomId }: { roomId: string }) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id }: { id: string }) => {
      return messageApi.deleteById(id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getInfiniteMessagesByRoomId(roomId).queryKey })
    },
  })
}
