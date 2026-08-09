'use client'

import { useProfileMe } from '@/services/hooks/profile'
import { useAuth } from '../provider'
import { LoginButton } from './login-button'
import { SignupButton } from './signup-button'

export const AuthSection = () => {
  const { user } = useAuth()
  const { data: profileMeData } = useProfileMe()
  return (
    <div>
      {user ? (
        <div>{profileMeData?.data ? profileMeData?.data.username : 'annonymous'}</div>
      ) : (
        <>
          <LoginButton />
          <SignupButton />
        </>
      )}
    </div>
  )
}
