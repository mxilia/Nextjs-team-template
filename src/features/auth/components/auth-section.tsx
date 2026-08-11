'use client'

import { useAuth } from '../provider'
import { LoginButton } from './login-button'
import { SignupButton } from './signup-button'
import { ProfileMe } from './profile-me'
import { LogoutButton } from './logout-button'

export const AuthSection = () => {
  const { user } = useAuth()
  return (
    <div className="flex gap-2">
      {user ? (
        <>
          <ProfileMe />
          <LogoutButton />
        </>
      ) : (
        <>
          <LoginButton />
          <SignupButton />
        </>
      )}
    </div>
  )
}
