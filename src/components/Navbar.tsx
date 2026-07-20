import { LoginButton } from '@/features/auth/components/LoginButton'

export const Navbar = () => {
  return (
    <div className="fixed w-full h-16 items-center flex">
      <LoginButton />
    </div>
  )
}
