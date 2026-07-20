import { LoginButton } from '@/features/auth/components/login-button'

export const Navbar = () => {
  return (
    <div className="fixed w-full h-16 items-center flex">
      <LoginButton />
    </div>
  )
}
