'use client'

import { User } from 'lucide-react'
import { LoginForm } from './login-form'
import { overlayStore } from '@/components/overlay/overlay.store'

interface LoginButtonProps {
  callbackUrl?: string
}

export const LoginButton = ({ callbackUrl = '/' }: LoginButtonProps) => {
  return (
    <button
      onClick={() => {
        overlayStore.open(<LoginForm callbackUrl={callbackUrl} />)
      }}
      className="flex items-center gap-2 rounded-full text-black bg-neutral-200 duration-200 hover:bg-blue-800/30 hover:text-blue-100 hover:border-blue-400 border p-1.5 px-2.5"
    >
      <User className="size-5" />
      <div className="text-[16px]">login</div>
    </button>
  )
}
