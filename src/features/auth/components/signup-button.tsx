'use client'

import { User } from 'lucide-react'
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
      className="flex items-center gap-2 rounded-full bg-neutral-600 p-1 px-2"
    >
      <User className="size-5" />
      <div className="text-[16px]">signup</div>
    </button>
  )
}
