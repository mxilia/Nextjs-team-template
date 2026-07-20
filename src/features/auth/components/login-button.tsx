import { User } from 'lucide-react'
import Link from 'next/link'

interface LoginButtonProps {
  callbackUrl?: string
}

export const LoginButton = ({ callbackUrl }: LoginButtonProps) => {
  return (
    <Link
      href={callbackUrl ? callbackUrl : '/'}
      className="flex items-center gap-2 rounded-full bg-neutral-600 p-1 px-2"
    >
      <User className="size-5" />
      <div className="text-[16px]">login</div>
    </Link>
  )
}
