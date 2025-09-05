'use client'

import { useSession } from "next-auth/react"
import { createContext, useContext, ReactNode } from "react"

interface AuthContextType {
  user: {
    id: string
    email: string
    name?: string | null
    image?: string | null
    userType: string
  } | null
  isLoading: boolean
  isAuthenticated: boolean
  isOwner: boolean
  isSitter: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession()

  const value: AuthContextType = {
    user: session?.user || null,
    isLoading: status === "loading",
    isAuthenticated: !!session?.user,
    isOwner: session?.user?.userType === "OWNER",
    isSitter: session?.user?.userType === "SITTER",
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
