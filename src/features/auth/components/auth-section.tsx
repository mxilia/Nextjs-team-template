'use client'

import { useAuth } from '../provider'
import { LoginButton } from './login-button'
import { SignupButton } from './signup-button'

export const AuthSection = () => {
  const { user } = useAuth()
  return (
    <div>
      {user ? (
        <div>{user.email}</div>
      ) : (
        <>
          <LoginButton />
          <SignupButton />
        </>
      )}
    </div>
  )
}
