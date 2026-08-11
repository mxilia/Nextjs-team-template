import { AuthSection } from '@/features/auth/components/auth-section'

export const Navbar = () => {
  return (
    <div className="fixed w-full h-20 items-center flex justify-between pr-20 border-b border-blue-300/20 bg-black/40 backdrop-blur-xl backdrop-saturate-150">
      <div></div>
      <AuthSection />
    </div>
  )
}
