'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '../provider'
import { useForm } from 'react-hook-form'
import { ProfileInput, profileSchema } from '../schema'
import { useCreateProfileMe, useProfileMe } from '@/services/hooks/profile'
import { toast } from 'sonner'

export const ProfileFormModal = () => {
  const { register, handleSubmit, formState } = useForm<ProfileInput>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: '',
      avatar_url: '',
    },
  })
  const { user } = useAuth()
  const { data: profileMeData, isLoading } = useProfileMe()
  const { mutate, isPending } = useCreateProfileMe({
    config: {
      onSuccess: () => {
        toast.success('Registerd profile successfully.')
      },
      onError: () => {
        toast.error('Failed to register profile. Please try again.')
      },
    },
  })

  const onSubmit = async (data: ProfileInput) => {
    mutate(data)
  }

  if (!(user && !profileMeData?.data) || isLoading) return null
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-1">
        <input
          type="text"
          placeholder="username"
          {...register('username')}
          className="bg-neutral-600 text-white pl-2 placeholder:text-gray-400 border border-neutral-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="text-red-500">{formState.errors.username?.message}</div>
        <input
          type="text"
          placeholder="avatar url"
          {...register('avatar_url')}
          className="bg-neutral-600 text-white pl-2 placeholder:text-gray-400 border border-neutral-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="text-red-500">{formState.errors.avatar_url?.message}</div>
        <button
          className="border rounded-full w-fit px-4 py-1 border-neutral-200 disabled:bg-neutral-800 disabled:text-gray-400 disabled:border-neutral-800"
          disabled={formState.isSubmitting || !formState.isDirty || isPending}
          type="submit"
        >
          submit
        </button>
      </form>
    </div>
  )
}
