'use client'

import { useInfiniteMessagesByRoomId } from '@/services/hooks/message'
import { defaultRoomId } from '../const'
import { useMemo } from 'react'
import { ChatBox } from './chat-box'

export const ChatList = () => {
  const { data } = useInfiniteMessagesByRoomId(defaultRoomId)
  const messages = useMemo(() => data?.pages.flatMap((page) => page.data) ?? [], [data])
  return (
    <div>
      {messages?.map((e) => (
        <ChatBox key={e.id} text={e.content} />
      ))}
    </div>
  )
}
