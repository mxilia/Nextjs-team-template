'use client'

import { toast } from 'sonner'
import { logout } from '../action'
import { useRouter } from 'next/navigation'
import { overlayStore } from '@/components/overlay/overlay.store'
import { ConfirmationModal } from '@/components/modal/confirmation-modal'

export const LogoutButton = () => {
  const router = useRouter()
  const onClick = async () => {
    overlayStore.open(
      <ConfirmationModal
        title="Logout"
        description="You will be signed off and will have to login again later."
        onCancel={() => {
          overlayStore.close()
        }}
        onConfirm={async () => {
          const { success } = await logout()
          if (!success) {
            toast.error(`Failed to login, please try again`)
          } else {
            toast.success('Logout successfully')
            router.push('/')
            overlayStore.close()
            setTimeout(() => {
              window.location.reload()
            }, 600)
          }
        }}
      />,
    )
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
