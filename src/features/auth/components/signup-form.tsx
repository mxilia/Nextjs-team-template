'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { SignupInput, signupSchema } from '../schema'
import { toast } from 'sonner'
import { signup } from '../action'
import { overlayStore } from '@/components/overlay/overlay.store'

interface SignupFormProps {
  callbackUrl?: string
}

export const SignupForm = ({ callbackUrl = '/' }: SignupFormProps) => {
  const router = useRouter()
  const { register, handleSubmit, formState } = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: '',
      password: '',
      invitation_code: '',
    },
  })

  const onSubmit = async (data: SignupInput) => {
    const { success, message } = await signup(data)
    if (!success) {
      toast.error(`Failed to signup. ${message}`)
    } else {
      toast.success('Signup successfully')
      overlayStore.close()
      router.push(callbackUrl)
      setTimeout(() => {
        window.location.reload()
      }, 600)
    }
  }
  return (
    <div className="h-100 w-70 bg-black border-neutral-200 border p-3 rounded-md flex flex-col">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-1">
        <input
          type="email"
          placeholder="email"
          {...register('email')}
          className="bg-neutral-600 text-white pl-2 placeholder:text-gray-400 border border-neutral-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="text-red-500">{formState.errors.email?.message}</div>
        <input
          type="password"
          placeholder="password"
          {...register('password')}
          className="bg-neutral-600 text-white pl-2 placeholder:text-gray-400 border border-neutral-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="text-red-500">{formState.errors.password?.message}</div>
        <input
          type="text"
          placeholder="invitation code"
          {...register('invitation_code')}
          className="bg-neutral-600 text-white pl-2 placeholder:text-gray-400 border border-neutral-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="text-red-500">{formState.errors.invitation_code?.message}</div>
        <button
          className="border rounded-full w-fit px-4 py-1 border-neutral-200 disabled:bg-neutral-800 disabled:text-gray-400 disabled:border-neutral-800"
          disabled={formState.isSubmitting || !formState.isDirty}
          type="submit"
        >
          signup
        </button>
      </form>
    </div>
  )
}
