'use client'

import { Mail } from 'lucide-react'
import { overlayStore } from '@/components/overlay/overlay.store'
import { SignupForm } from './signup-form'

interface SignupButtonProps {
  callbackUrl?: string
}

export const SignupButton = ({ callbackUrl = '/' }: SignupButtonProps) => {
  return (
    <button
      onClick={() => {
        overlayStore.open(<SignupForm callbackUrl={callbackUrl} />)
      }}
      className="flex items-center gap-2 rounded-full bg-none border-neutral-200 duration-200 text-white border hover:bg-blue-800/30 hover:text-blue-100 hover:border-blue-400 p-1.5 px-2.5"
    >
      <Mail className="size-5" />
      <div className="text-[16px]">signup</div>
    </button>
  )
}
