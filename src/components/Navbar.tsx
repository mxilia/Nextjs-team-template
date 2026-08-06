import { AuthSection } from '@/features/auth/components/auth-section'

export const Navbar = () => {
  return (
    <div className="fixed w-full h-16 items-center flex">
      <AuthSection />
    </div>
  )
}
