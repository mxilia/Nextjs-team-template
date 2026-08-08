'use client'

import { useAuth } from '../provider'
import { LoginButton } from './login-button'
import { SignupButton } from './signup-button'

export const AuthSection = () => {
  const { user, profile } = useAuth()
  return (
    <div>
      {user ? (
        <div>{profile ? profile.username : 'no profile'}</div>
      ) : (
        <>
          <LoginButton />
          <SignupButton />
        </>
      )}
    </div>
  )
}
