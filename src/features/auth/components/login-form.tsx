'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { LoginInput, loginSchema } from '../schema'
import { toast } from 'sonner'
import { login } from '../action'
import { overlayStore } from '@/components/overlay/overlay.store'

interface LoginFormProps {
  callbackUrl?: string
}

export const LoginForm = ({ callbackUrl = '/' }: LoginFormProps) => {
  const router = useRouter()
  const { register, handleSubmit, formState } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data: LoginInput) => {
    const { success, message } = await login(data)
    if (!success) {
      toast.error(`Failed to login. ${message}`)
    } else {
      toast.success('Login successfully')
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
        <button
          className="border rounded-full w-fit px-4 py-1 border-neutral-200 disabled:bg-neutral-800 disabled:text-gray-400 disabled:border-neutral-800"
          disabled={formState.isSubmitting || !formState.isDirty}
          type="submit"
        >
          login
        </button>
      </form>
    </div>
  )
}
