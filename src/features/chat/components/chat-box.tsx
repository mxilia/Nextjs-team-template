import { Profile } from '@/types/db'

interface ChatBoxProps {
  text: string
  profile?: Profile
}

export const ChatBox = ({ text }: ChatBoxProps) => {
  return <div>{text}</div>
}
