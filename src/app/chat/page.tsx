import { ChatList } from '@/features/chat/components/chat-list'
import { SendMessageTab } from '@/features/chat/components/send-message-tab'
import { getAuthenticatedProfile, getAuthenticatedUser } from '@/lib/auth'
import { redirect } from 'next/navigation'

const ChatPage = async () => {
  const user = await getAuthenticatedUser()
  const profile = await getAuthenticatedProfile()
  if (!user || !profile) {
    redirect('/')
  }
  return (
    <div className="pt-20 min-h-screen flex flex-col items-center">
      <ChatList />
      <SendMessageTab />
    </div>
  )
}

export default ChatPage
