'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import { Heart, Menu, X, Search, UserPlus } from 'lucide-react'

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <nav className="bg-white shadow-lg border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group" onClick={closeMobileMenu}>
            <div className="bg-gradient-to-r from-[#4f30cb] to-[#6b46c1] p-2 rounded-xl group-hover:scale-105 transition-transform">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-fredoka font-bold bg-gradient-to-r from-[#4f30cb] to-[#6b46c1] bg-clip-text text-transparent">
              PetCare
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/buscar-cuidador" 
              className="flex items-center gap-2 text-gray-700 hover:text-[#4f30cb] transition-colors font-medium group"
            >
              <Search className="h-4 w-4 group-hover:scale-110 transition-transform" />
              Buscar Cuidador
            </Link>
            
            <Link 
              href="/cadastro-petsitter"
              className="flex items-center gap-2 bg-gradient-to-r from-[#4f30cb] to-[#6b46c1] text-white px-4 py-2 rounded-lg hover:from-[#4527a8] hover:to-[#553c9a] transition-all font-medium shadow-md hover:shadow-lg"
            >
              <UserPlus className="h-4 w-4" />
              Cadastrar Cuidador
            </Link>

          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5 text-gray-700" />
              ) : (
                <Menu className="h-5 w-5 text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-100 shadow-lg">
              <Link 
                href="/buscar-cuidador" 
                className="flex items-center gap-3 text-gray-700 hover:text-[#4f30cb] hover:bg-gray-50 px-4 py-3 rounded-lg transition-colors font-medium"
                onClick={closeMobileMenu}
              >
                <Search className="h-5 w-5" />
                Buscar Cuidador
              </Link>
              
              <Link 
                href="/cadastro"
                className="flex items-center gap-3 bg-gradient-to-r from-[#4f30cb] to-[#6b46c1] text-white px-4 py-3 rounded-lg hover:from-[#4527a8] hover:to-[#553c9a] transition-all font-medium mx-2"
                onClick={closeMobileMenu}
              >
                <UserPlus className="h-5 w-5" />
                Cadastrar Cuidador
              </Link>

            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar