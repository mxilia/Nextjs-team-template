import { LoginButton } from '@/features/auth/components/login-button'
import { SignupButton } from '@/features/auth/components/signup-button'

export const Navbar = () => {
  return (
    <div className="fixed w-full h-16 items-center flex">
      <LoginButton />
      <SignupButton />
    </div>
  )
}
