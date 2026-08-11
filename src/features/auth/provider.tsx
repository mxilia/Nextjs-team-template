'use client'

import { createContext, useContext, useState } from 'react'
import { User } from '@supabase/supabase-js'

type AuthContextType = {
  user: User | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({
  initialUser,
  children,
}: {
  initialUser: User | null
  children: React.ReactNode
}) {
  const [user] = useState<User | null>(initialUser)

  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}
