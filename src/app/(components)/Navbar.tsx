'use client'

import Link from 'next/link'
import React from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useAuth } from '@/hooks/useAuth'

const Navbar = () => {
  const { data: session, status } = useSession()
  const { user, isAuthenticated } = useAuth()

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' })
  }

  return (
    <div className="bg-[#4f30cb] flex justify-between flex-row items-center p-4 shadow-sm">
      <Link href="/" className="flex items-center gap-3">
        <h1 className="text-2xl font-fredoka font-bold text-[#ffb347]">PetCare</h1>
      </Link>

      <div className="flex text-white flex-row gap-6 items-center">
        <Link 
          href="/buscar-cuidador" 
          className="hover:text-[#ffb347] transition-colors font-medium"
        >
          Buscar Cuidador
        </Link>
        
        {status === "loading" ? (
          <div className="bg-white/20 px-4 py-2 rounded-lg">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : isAuthenticated ? (
          <div className="flex items-center gap-4">
            <span className="text-sm">
              Olá, {user?.name || user?.email}
            </span>
            <Link 
              href="/dashboard" 
              className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors font-medium"
            >
              Dashboard
            </Link>
            <Link 
              href="/perfil" 
              className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors font-medium"
            >
              Perfil
            </Link>
            <button
              onClick={handleSignOut}
              className="bg-red-500/20 hover:bg-red-500/30 px-4 py-2 rounded-lg transition-colors font-medium"
            >
              Sair
            </button>
          </div>
        ) : (
          <Link 
            href="/login" 
            className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors font-medium"
          >
            Entrar
          </Link>
        )}
      </div>
    </div>
  )
}

export default Navbar