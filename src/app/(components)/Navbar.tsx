import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <div className="bg-[#4f30cb] flex justify-between flex-row items-center p-4 shadow-sm">
      <Link href="/" className="flex items-center gap-3">
        <div className="w-10 h-10 bg-[#ffb347] rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-lg">PC</span>
        </div>
        <h1 className="text-2xl font-fredoka font-bold text-[#ffb347]">PetCare</h1>
      </Link>

      <div className="flex text-white flex-row gap-6 items-center">
        <Link 
          href="/buscar-cuidador" 
          className="hover:text-[#ffb347] transition-colors font-medium"
        >
          Buscar Cuidador
        </Link>
        <Link 
          href="/login" 
          className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors font-medium"
        >
          Entrar
        </Link>
      </div>
    </div>
  )
}

export default Navbar