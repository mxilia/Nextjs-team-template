'use client'

import { toast } from 'sonner'
import { logout } from '../action'
import { useRouter } from 'next/navigation'

export const LogoutButton = () => {
  const router = useRouter()
  const onClick = async () => {
    const { success } = await logout()
    if (!success) {
      toast.error(`Failed to login, please try again`)
    } else {
      toast.success('Logout successfully')
      router.push('/')
      window.location.reload()
    }
  }
  return (
    <button
      className="flex items-center gap-2 rounded-full text-black bg-neutral-200 duration-200 hover:bg-red-800/30 hover:text-red-100 hover:border-red-400 border p-1.5 px-2.5"
      onClick={onClick}
    >
      logout
    </button>
  )
}
